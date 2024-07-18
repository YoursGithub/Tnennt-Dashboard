import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { checkEmail, createStore, getCreatedStores } from "../controller/StoreCreateController";
import { getDocument } from "../Database/db";
import { getDocs , collection } from "firebase/firestore";
import { db } from "../../firebase";
const Store = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openEmailDialog, setOpenEmailDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [showStoreForm, setShowStoreForm] = useState(false);
  const [storeDetails, setStoreDetails] = useState({
  
  });

  const [stores, setStores] = useState([]);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();



  const handleDeleteStore = (index) => {
    const newStores = stores.filter((_, i) => i !== index);
    setStores(newStores);
    localStorage.setItem("stores", JSON.stringify(newStores));
  };

  const handleStoreFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if(storeDetails.phoneNumber.length != 10 || isNaN(storeDetails.phoneNumber)) return alert("Invalid Phone Number!!");

      if( await getDocument(`Store/${storeDetails.storeName}`) ) return alert("Store already created!!");
  
      await createStore(user, storeDetails);

      location.href='/store';
     
    } catch (error) {
      alert("Something went wrong!!");
      console.log(error);
    }
   
  };

  const handleStoreClick = (storeId) => {
    navigate('/products', { state: { storeId: storeId.id } });
  };

  const handleCreateStore = () => {
    setOpenEmailDialog(true);
  };

  const handleEmailVerification = async () => {
    const exists = await checkEmail(email);

    if (!exists) return alert("User not created!!");

    if (exists?.storeName) return alert("Store already created!!");

    alert("Welcome");

    setUser(exists);

    setOpenEmailDialog(false);
    setShowStoreForm(true);
  };

const getAllStores = async () => {
  const result = await getCreatedStores();
  setStores(result); 
}


useEffect(() => {
  getAllStores();
}, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, position: "relative" }}>
        {!showStoreForm && (
          <Button
            variant="contained"
            color="success"
            onClick={handleCreateStore}
            sx={{ position: "absolute", top: 20, right: 20 }}
          >
            Create your store
          </Button>
        )}

        <Dialog
          open={openEmailDialog}
          onClose={() => setOpenEmailDialog(false)}
        >
          <DialogTitle>Email Verification</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEmailDialog(false)}>Cancel</Button>
            <Button onClick={handleEmailVerification}>Verify</Button>
          </DialogActions>
        </Dialog>

        <Box sx={{ mt: 10, display: "flex", justifyContent: "space-between" }}>
          {showStoreForm && (
            <Paper elevation={3} sx={{ p: 3, width: "45%" }}>
              <form onSubmit={handleStoreFormSubmit} className="store-form" noValidate>
                <TextField
                  label="Phone Number"
                  type="tel"
                  value={storeDetails.phoneNumber}
                  onChange={(e) =>
                    setStoreDetails({
                      ...storeDetails,
                      phoneNumber: e.target.value,
                    })
                  }
                  required
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Store Email"
                  type="email"
                  value={storeDetails.storeEmail}
                  onChange={(e) =>
                    setStoreDetails({
                      ...storeDetails,
                      storeEmail: e.target.value,
                    })
                  }
                  required
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Store Name"
                  type="text"
                  value={storeDetails.storeName}
                  onChange={(e) =>
                    setStoreDetails({
                      ...storeDetails,
                      storeName: e.target.value.toLowerCase(),
                    })
                  }
                  required
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Store category"
                  type="text"
                  value={storeDetails.category}
                  onChange={(e) =>
                    setStoreDetails({
                      ...storeDetails,
                      category: e.target.value.toLowerCase(),
                    })
                  }
                  required
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Location"
                  type="text"
                  value={storeDetails.location}
                  onChange={(e) =>
                    setStoreDetails({
                      ...storeDetails,
                      location: e.target.value,
                    })
                  }
                  required
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="UPI ID"
                  type="text"
                  value={storeDetails.upiId}
                  onChange={(e) =>
                    setStoreDetails({ ...storeDetails, upiId: e.target.value })
                  }
                  required
                  fullWidth
                  margin="normal"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Create
                </Button>
              </form>
            </Paper>
          )}

          <Paper elevation={3} sx={{ p: 3, width: "45%" }}>
            <h2>Created Stores</h2>
            {stores.map((store, index) => (
              <Box
                key={index}
                sx={{
                  mb: 2,
                  p: 2,
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              >
                <b>Store: {store.storeName}</b>
                <p>Email: {store.storeEmail}</p>
                <p>Category: {store.category}</p>
                <p>Location: {store.location}</p>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleStoreClick(store)}
                  >
                    View
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteStore(index);
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            ))}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Store;
