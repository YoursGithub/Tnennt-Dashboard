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
  ThemeProvider,
  createTheme,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { createProduct } from '../controller/ProductCreateController';

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#141519',
      paper: '#1E1E1E',
    },
  },
});

const Products = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({});
  const [numberOfSizes, setNumberOfSizes] = useState(0);

  const specialCategories = ['clothing', 'electronics', 'footwear'];

  const location = useLocation();
  const storeId = location?.state?.storeId || null;
  const [Images, setImages] = useState([]);

  const ProductPrice = newProduct?.ProductMrpPrice - (newProduct?.ProductMrpPrice * newProduct?.ProductDiscount / 100).toFixed(2);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value.toLowerCase() });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageData = e.target.result;
        const uniqueKey = Date.now();
        setImages((prevImages) => [
          ...prevImages,
          { id: uniqueKey, data: imageData, name: file.name, file: file },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value.toLowerCase();
    setNewProduct({ ...newProduct, 'ProductType': category, sizes: [] });
  };

  const handleNumberOfSizesChange = (e) => {
    let num = parseInt(e.target.value, 10);
    num = isNaN(num) ? 0 : num;
    if (num >= 0) {
      setNumberOfSizes(num);
      setNewProduct({
        ...newProduct,
        sizes: Array(num).fill({}),
      });
    }
  };

  const handleSizeChange = (index, field, value) => {
    const updatedSizes = [...newProduct.sizes];
    updatedSizes[index] = { ...updatedSizes[index], [field]: value };

    if (updatedSizes[index]?.ProductDiscount && updatedSizes[index]?.ProductMrpPrice) {
      updatedSizes[index] = { ...updatedSizes[index], 'ProductPrice': (updatedSizes[index]?.ProductMrpPrice - (updatedSizes[index]?.ProductDiscount * updatedSizes[index]?.ProductMrpPrice / 100)).toFixed(2) };
    }
    setNewProduct({ ...newProduct, sizes: updatedSizes });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!storeId) return alert("No Store Id Found");

    if (Images.length === 0) return alert("Insert Images");

    newProduct['ProductPrice'] = ProductPrice.toFixed(2);
    newProduct['storeId'] = storeId;

    try {
      await createProduct(Images, newProduct)
      alert("Created")
    } catch (error) {
      alert("Errorrr : " + error.message)
    }
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const showSizesField = specialCategories.includes(newProduct?.ProductType?.toLowerCase());

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex', bgcolor: '#141519', minHeight: '100vh' }}>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h4" sx={{ mb: 4, color: 'white' }}>
            Product List
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 3, bgcolor: '#1E1E1E' }}>
                <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
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
                  {Images.map((image) => (
                    <div
                      key={image.id}
                      className="border-[1px] rounded-[15px] border-[#848484] w-[14vw] h-[14vw] bg-cover bg-center bg-no-repeat flex justify-center items-center"
                      style={{
                        backgroundImage: `url(${image.data})`,
                      }}
                    />
                  ))}
                  <br />
                  <TextField
                    fullWidth
                    label="Product Type"
                    name="ProductType"
                    value={newProduct.ProductType}
                    onChange={handleCategoryChange}
                    sx={{ mb: 2 }}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Store Owner Category "
                    name="StoreOwnerCategory"
                    value={newProduct.StoreOwnerCategory}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Product Name"
                    name="ProductName"
                    value={newProduct.ProductName}
                    onChange={handleInputChange}
                    required
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Product Description"
                    name="ProductDescription"
                    value={newProduct.ProductDescription}
                    onChange={handleInputChange}
                    multiline
                    rows={3}
                    sx={{ mb: 2 }}
                    required
                  />
                  
                  {showSizesField && (
                    <>
                      <TextField
                        label="Number of Sizes"
                        type="number"
                        value={numberOfSizes}
                        onChange={handleNumberOfSizesChange}
                        sx={{ mb: 2 }}
                      />
                      {newProduct?.sizes && newProduct.sizes.map((size, index) => (
                        <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2 }}>
                          <TextField
                            label={`Variation  ${index + 1}`}
                            value={size['ProductVariations']}
                            onChange={(e) => handleSizeChange(index, 'ProductVariations', e.target.value)}
                          />
                          <TextField
                            label=" Quantity"
                            name="ProductStockQuantity"
                            value={size['ProductStockQuantity']}
                            onChange={(e) => handleSizeChange(index, 'ProductStockQuantity', e.target.value)}
                            type="number"
                            sx={{ mb: 2 }}
                            required
                          />
                          <TextField
                            label="Discount"
                            name="ProductDiscount"
                            value={size['ProductDiscount']}
                            onChange={(e) => handleSizeChange(index, 'ProductDiscount', e.target.value)}
                            type="number"
                            required
                          />
                          <TextField
                            label="MRP Price"
                            name="ProductMrpPrice"
                            value={size['ProductMrpPrice']}
                            onChange={(e) => handleSizeChange(index, 'ProductMrpPrice', e.target.value)}
                            type="number"
                            required
                          />
                          <TextField
                            label="Item Price"
                            name="ProductPrice"
                            value={size['ProductPrice'] || 0}
                            type="number"
                          />
                        </Box>
                      ))}
                    </>
                  )}

                  {!showSizesField && (
                    <>
                      <TextField
                        fullWidth
                        label="Product Quantity"
                        name="ProductStockQuantity"
                        value={newProduct.ProductStockQuantity}
                        onChange={handleInputChange}
                        type="number"
                        sx={{ mb: 2 }}
                        required
                      />
                      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <TextField
                          label="Discount"
                          name="ProductDiscount"
                          value={newProduct.ProductDiscount}
                          onChange={handleInputChange}
                          type="number"
                          required
                        />
                        <TextField
                          label="MRP Price"
                          name="ProductMrpPrice"
                          value={newProduct.ProductMrpPrice}
                          onChange={handleInputChange}
                          type="number"
                          required
                        />
                        <TextField
                          label="Item Price"
                          name="ProductPrice"
                          value={ProductPrice}
                          type="number"
                        />
                      </Box>                  
                    </>
                  )}
                  
                  <Button type="submit" variant="contained" color="primary">
                    Add Product
                  </Button>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Products;