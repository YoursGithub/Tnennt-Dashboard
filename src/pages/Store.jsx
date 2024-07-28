import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  TextField,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StorefrontIcon from "@mui/icons-material/Storefront";
import {
  checkEmail,
  createStore,
  getCreatedStores,
} from "../controller/StoreCreateController";
import { getDocument } from "../Database/db";

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const StoreForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const ElegantCard = styled(Card)(({ theme }) => ({
  transition: "0.3s",
  boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
  "&:hover": {
    boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
  },
  background: "linear-gradient(145deg, #2c2c2c 0%, #1e1e1e 100%)",
  color: "#FFFFFF",
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

const CardTopContent = styled(CardContent)({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
});

const CardBottomContent = styled(CardContent)({
  paddingTop: 0,
});

const Store = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openEmailDialog, setOpenEmailDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [showStoreForm, setShowStoreForm] = useState(false);
  const [storeDetails, setStoreDetails] = useState({});
  const [stores, setStores] = useState([]);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getAllStores();
  }, []);

  const getAllStores = async () => {
    const result = await getCreatedStores();
    setStores(result);
  };

  const handleDeleteStore = (index) => {
    const newStores = stores.filter((_, i) => i !== index);
    setStores(newStores);
    localStorage.setItem("stores", JSON.stringify(newStores));
  };

  const handleStoreFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (storeDetails.phoneNumber.length !== 10 || isNaN(storeDetails.phoneNumber)) {
        return alert("Invalid Phone Number!");
      }

      if (await getDocument(`Store/${storeDetails.storeName}`)) {
        return alert("Store already exists!");
      }

      await createStore(user, storeDetails);
      window.location.href = "/store";
    } catch (error) {
      alert("Something went wrong!");
      console.error(error);
    }
  };

  const handleStoreClick = (storeId) => {
    navigate("/products", { state: { storeId: storeId.id } });
  };

  const handleCreateStore = () => {
    setOpenEmailDialog(true);
  };

  const handleEmailVerification = async () => {
    const exists = await checkEmail(email);

    if (!exists) return alert("User not created!");
    if (exists?.storeName) return alert("Store already exists!");

    alert("Welcome");
    setUser(exists);
    setOpenEmailDialog(false);
    setShowStoreForm(true);
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "#141519", minHeight: "100vh" }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, position: "relative" }}>
        {!showStoreForm && (
          <StyledButton
            variant="contained"
            color="success"
            onClick={handleCreateStore}
            sx={{ position: "absolute", top: 20, right: 20 }}
          >
            Create your store
          </StyledButton>
        )}

        <Dialog open={openEmailDialog} onClose={() => setOpenEmailDialog(false)}>
          <DialogTitle>Email Verification</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEmailDialog(false)}>Cancel</Button>
            <Button onClick={handleEmailVerification} variant="contained" color="primary">
              Verify
            </Button>
          </DialogActions>
        </Dialog>

        <Box sx={{ mt: 10 }}>
          <Grid container spacing={3}>
            {showStoreForm && (
              <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ p: 3, backgroundColor: "#1E1E1E", color: "#FFFFFF" }}>
                  <Typography variant="h5" gutterBottom>
                    Create New Store
                  </Typography>
                  <StoreForm onSubmit={handleStoreFormSubmit} noValidate>
                    {[
                      { label: "Phone Number", type: "number", key: "phoneNumber" },
                      { label: "Store Email", type: "email", key: "storeEmail" },
                      { label: "Store Name", type: "text", key: "storeName" },
                      { label: "Store Category", type: "text", key: "category" },
                      { label: "Location", type: "text", key: "location" },
                      { label: "UPI ID", type: "text", key: "upiId" },
                    ].map((field) => (
                      <TextField
                        key={field.key}
                        label={field.label}
                        type={field.type}
                        value={storeDetails[field.key] || ""}
                        onChange={(e) =>
                          setStoreDetails({
                            ...storeDetails,
                            [field.key]: field.key === "storeName" || field.key === "category"
                              ? e.target.value.toLowerCase()
                              : e.target.value,
                          })
                        }
                        required
                        fullWidth
                        variant="outlined"
                        sx={{ 
                          mb: 2,
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "rgba(255, 255, 255, 0.23)" },
                            "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
                          },
                          "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
                          "& .MuiOutlinedInput-input": { color: "#FFFFFF" },
                        }}
                      />
                    ))}
                    <StyledButton type="submit" variant="contained" color="primary">
                      Create
                    </StyledButton>
                  </StoreForm>
                </Paper>
              </Grid>
            )}

<Grid item xs={12} md={showStoreForm ? 6 : 12}>
              <Paper elevation={3} sx={{ p: 3, backgroundColor: "#1E1E1E", color: "#FFFFFF" }}>
                <Typography variant="h5" gutterBottom>
                  Created Stores
                </Typography>
                <Grid container spacing={2}>
                  {stores.map((store, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <ElegantCard>
                        <CardTopContent>
                          <Avatar
                            sx={{
                              width: 80,
                              height: 80,
                              bgcolor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
                              mb: 2,
                            }}
                          >
                            <StorefrontIcon sx={{ fontSize: 40 }} />
                          </Avatar>
                          <Typography variant="h6" gutterBottom>
                            {store.storeName}
                          </Typography>
                        </CardTopContent>
                        <CardBottomContent>
                          <Typography variant="body2" className="text-center" color="text.secondary" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                            Email: {store.storeEmail}
                          </Typography>
                          <Typography variant="body2" className="text-center" color="text.secondary" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                            Category: {store.category}
                          </Typography>
                          <Typography variant="body2" className="text-center" color="text.secondary" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                            Location: {store.location}
                          </Typography>
                        </CardBottomContent>
                        <CardActions sx={{ justifyContent: "space-between" }}>
                          <IconButton 
                            size="small" 
                            onClick={() => handleStoreClick(store)}
                            sx={{ color: "#4CAF50" }}
                          >
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteStore(index);
                            }}
                            sx={{ color: "#F44336" }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </CardActions>
                      </ElegantCard>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Store;