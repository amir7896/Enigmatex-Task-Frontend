import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";

import { BoldTableCell } from "./style";
import { ProductForm } from "./components";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState({});
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState(null);

  // Fetch data from the API
  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
      groupProductsByCategory(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Group products by category
  const groupProductsByCategory = (products) => {
    const grouped = products.reduce((acc, product) => {
      const { category } = product;
      if (!acc[category]) acc[category] = [];
      acc[category].push(product);
      return acc;
    }, {});
    setGroupedProducts(grouped);
  };

  // Handle add product dialog
  const handleOpenDialog = () => {
    setOpen(true);
  };

  //   Handle edit product
  const handleEdit = (product) => {
    setProduct(product);
    setOpen(true);
  };

  return (
    <Box p={3}>
      {/* Top Buttons */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button variant="contained" color="primary">
          Back
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOpenDialog}
        >
          Add Product
        </Button>
      </Box>

      {/* Product Listing */}
      <Box>
        {Object.keys(groupedProducts).map((category) => (
          <Box key={category} mb={4}>
            <Typography variant="h6" gutterBottom>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <BoldTableCell>Image</BoldTableCell>
                    <BoldTableCell>Title</BoldTableCell>
                    <BoldTableCell>Description</BoldTableCell>
                    <BoldTableCell>Price</BoldTableCell>
                    <BoldTableCell>Rating</BoldTableCell>
                    <BoldTableCell>Actions</BoldTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {groupedProducts[category].map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <img
                          src={product.image}
                          alt={product.title}
                          style={{ width: 50, height: 50 }}
                        />
                      </TableCell>
                      <TableCell>{product.title}</TableCell>
                      <TableCell>{product.description}</TableCell>
                      <TableCell>${product.price}</TableCell>
                      <TableCell>{product.rating.rate} / 5</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleEdit(product)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ))}
      </Box>

      {/* Product Form Dialog */}
      <ProductForm
        open={open}
        setOpen={setOpen}
        product={product}
        setProduct={setProduct}
        fetchProducts={fetchProducts}
      />
    </Box>
  );
};

export default Products;
