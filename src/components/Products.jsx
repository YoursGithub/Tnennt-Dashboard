import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
const Products = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    image: '',
    category: '',
    name: '',
    description: '',
    quantity: '',
    discount: '',
    mrpPrice: '',
    itemPrice: '',
    sizes: [],
  });
  const [numberOfSizes, setNumberOfSizes] = useState(0);

  const specialCategories = ['clothing', 'electronics', 'footwear'];

  const location = useLocation();
  const  storeId  = location?.state?.storeId || null ;

  useEffect(() => {
  


  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewProduct({ ...newProduct, image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value.toLowerCase();
    setNewProduct({ ...newProduct, category, sizes: [] });
    setNumberOfSizes(0);
  };

  const handleNumberOfSizesChange = (e) => {
    const num = parseInt(e.target.value, 10);
    setNumberOfSizes(num);
    setNewProduct({
      ...newProduct,
      sizes: Array(num).fill({ size: '', price: '' }),
    });
  };

  const handleSizeChange = (index, field, value) => {
    const updatedSizes = [...newProduct.sizes];
    updatedSizes[index] = { ...updatedSizes[index], [field]: value };
    setNewProduct({ ...newProduct, sizes: updatedSizes });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if( !storeId  ) return alert("No Store Id Found") ;

    console.log(newProduct);

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
  
    setNumberOfSizes(0);
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const showSizesField = specialCategories.includes(newProduct.category.toLowerCase());

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Product List
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Add New Product
              </Typography>
              <form onSubmit={handleSubmit}>
                <input
                  accept="image/*"
                  type="file"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <Button variant="contained" component="span" sx={{ mb: 2 }}>
                    Upload Image
                  </Button>
                </label>
                {newProduct.image && (
                  <img src={newProduct.image} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '16px' }} />
                )}
                <TextField
                  fullWidth
                  label="Product Category"
                  name="category"
                  value={newProduct.category}
                  onChange={handleCategoryChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Product Name"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Product Description"
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  multiline
                  rows={3}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Product Quantity"
                  name="quantity"
                  value={newProduct.quantity}
                  onChange={handleInputChange}
                  type="number"
                  sx={{ mb: 2 }}
                />
                {showSizesField && (
                  <>
                    <TextField
                      fullWidth
                      label="Number of Sizes"
                      type="number"
                      value={numberOfSizes}
                      onChange={handleNumberOfSizesChange}
                      sx={{ mb: 2 }}
                    />
                    {newProduct.sizes.map((size, index) => (
                      <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <TextField
                          label={`Size ${index + 1}`}
                          value={size.size}
                          onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                        />
                        <TextField
                          label={`Price for Size ${index + 1}`}
                          type="number"
                          value={size.price}
                          onChange={(e) => handleSizeChange(index, 'price', e.target.value)}
                        />
                      </Box>
                    ))}
                  </>
                )}
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <TextField
                    label="Discount"
                    name="discount"
                    value={newProduct.discount}
                    onChange={handleInputChange}
                    type="number"
                  />
                  <TextField
                    label="MRP Price"
                    name="mrpPrice"
                    value={newProduct.mrpPrice}
                    onChange={handleInputChange}
                    type="number"
                  />
                  <TextField
                    label="Item Price"
                    name="itemPrice"
                    value={newProduct.itemPrice}
                    onChange={handleInputChange}
                    type="number"
                  />
                </Box>
                <Button type="submit" variant="contained" color="primary">
                  Add Product
                </Button>
              </form>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Product List
            </Typography>
            <Grid container spacing={2}>
              {products.map((product, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={product.image}
                      alt={product.name}
                    />
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6">{product.name}</Typography>
                        <IconButton onClick={() => handleDeleteProduct(index)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {product.category}
                      </Typography>
                      <Typography variant="body2">{product.description}</Typography>
                      <Typography variant="body2">Quantity: {product.quantity}</Typography>
                      <Typography variant="body2">Price: ${product.itemPrice}</Typography>
                      {product.sizes && product.sizes.length > 0 && (
                        <Typography variant="body2">
                          Sizes: {product.sizes.map(s => `${s.size} ($${s.price})`).join(', ')}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Products;