import React, { useState, useEffect} from 'react';
import Sidebar from '../components/Sidebar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';

const Store = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openEmailDialog, setOpenEmailDialog] = useState(false);
  const [email, setEmail] = useState('');
  const [showStoreForm, setShowStoreForm] = useState(false);
  const [storeDetails, setStoreDetails] = useState({
    phoneNumber: '',
    storeEmail: '',
    storeName: '',
    storeDomain: '',
    location: '',
    upiId: ''
  });


  const navigate = useNavigate();

  useEffect(() => {
    const savedStores = localStorage.getItem('stores');
    if (savedStores) {
      setStores(JSON.parse(savedStores));
    }
  }, []);

  const handleDeleteStore = (index) => {
    const newStores = stores.filter((_, i) => i !== index);
    setStores(newStores);
    localStorage.setItem('stores', JSON.stringify(newStores));
  };

  const handleStoreFormSubmit = (e) => {
    e.preventDefault();
    const newStores = [...stores, storeDetails];
    setStores(newStores);
    localStorage.setItem('stores', JSON.stringify(newStores));
    setShowStoreForm(false);
    setStoreDetails({
      phoneNumber: '',
      storeEmail: '',
      storeName: '',
      storeDomain: '',
      location: '',
      upiId: ''
    });
  };

  const handleStoreClick = (storeId) => {
    navigate(`/products`);
  };
  const [stores, setStores] = useState([]);

  const handleCreateStore = () => {
    setOpenEmailDialog(true);
  };

  const handleEmailVerification = () => {
    if (email === 'subha@gmail.com') {
      setOpenEmailDialog(false);
      setShowStoreForm(true);
    } else {
      alert('Invalid email');
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, position: 'relative' }}>
        <Button 
          variant="contained" 
          color="success" 
          onClick={handleCreateStore}
          sx={{ position: 'absolute', top: 20, right: 20 }}
        >
          Create your store
        </Button>

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

        <Box sx={{ mt: 10, display: 'flex', justifyContent: 'space-between' }}>
          {showStoreForm && (
            <Paper elevation={3} sx={{ p: 3, width: '45%' }}>
              <form onSubmit={handleStoreFormSubmit} className="store-form">
                <TextField
                  label="Phone Number"
                  type="tel"
                  value={storeDetails.phoneNumber}
                  onChange={(e) => setStoreDetails({...storeDetails, phoneNumber: e.target.value})}
                  required
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Store Email"
                  type="email"
                  value={storeDetails.storeEmail}
                  onChange={(e) => setStoreDetails({...storeDetails, storeEmail: e.target.value})}
                  required
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Store Name"
                  type="text"
                  value={storeDetails.storeName}
                  onChange={(e) => setStoreDetails({...storeDetails, storeName: e.target.value})}
                  required
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Store Domain"
                  type="text"
                  value={storeDetails.storeDomain}
                  onChange={(e) => setStoreDetails({...storeDetails, storeDomain: e.target.value})}
                  required
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Location"
                  type="text"
                  value={storeDetails.location}
                  onChange={(e) => setStoreDetails({...storeDetails, location: e.target.value})}
                  required
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="UPI ID"
                  type="text"
                  value={storeDetails.upiId}
                  onChange={(e) => setStoreDetails({...storeDetails, upiId: e.target.value})}
                  required
                  fullWidth
                  margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                  Create
                </Button>
              </form>
            </Paper>
          )}

<Paper elevation={3} sx={{ p: 3, width: '45%' }}>
  <h2>Created Stores</h2>
  {stores.map((store, index) => (
    <Box 
      key={index} 
      sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '4px' }}
    >
      <h3>{store.storeName}</h3>
      <p>Email: {store.storeEmail}</p>
      <p>Domain: {store.storeDomain}</p>
      <p>Location: {store.location}</p>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => handleStoreClick(index)}
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