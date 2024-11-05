import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import Grid from "@mui/material/Grid2";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";

import { productInitialValues, categories } from "../../../../constants";
import { productValidationSchema } from "../../../../utils/validations";
import { StyledTitle } from "./style";

const ProductForm = ({ open, setOpen, product, setProduct, fetchProducts }) => {
  // Hanle close dialog
  const handleClose = () => {
    setOpen(!open);
    formik.resetForm();
    if (product) {
      setProduct(null);
    }
  };

  // Formikt
  const formik = useFormik({
    initialValues: productInitialValues,
    validationSchema: productValidationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  // Set Product values on update
  useEffect(() => {
    if (product && product !== null) {
      formik.setFieldValue("category", product?.category);
      formik.setFieldValue("description", product?.description);
      formik.setFieldValue("image", product?.image);
      formik.setFieldValue("price", product?.price);
    }
  }, [product]);

  // Handle submit form
  const handleSubmit = async (body) => {
    try {
      if (product && product !== null) {
        const response = await axios.put(
          `https://fakestoreapi.com/products/${product.id}`,
          body
        );

        if (response.status === 200) {
          toast.success("Product updated successfully");
          fetchProducts();
          handleClose();
        }
      } else {
        const response = await axios.post(
          "https://fakestoreapi.com/products",
          body
        );

        if (response.status === 200) {
          toast.success("Product created successfully");
          fetchProducts();
          handleClose();
        }
      }
    } catch (error) {
      console.log("Error in product submit:", error);
    }
  };
  return (
    <Dialog
      open={open}
      maxWidth="md"
      fullWidth
      sx={{ "& .MuiDialog-paper": { width: "60%", maxWidth: "500px" } }}
    >
      <StyledTitle>{product ? "Update Product" : "Add Product"}</StyledTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid spacing={2}>
            {/* Category autocomplete */}
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={categories}
                value={formik.values.category}
                onChange={(event, newValue) => {
                  formik.setFieldValue("category", newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="normal"
                    label="Category"
                    error={
                      formik.touched.category && Boolean(formik.errors.category)
                    }
                    helperText={
                      formik.touched.category && formik.errors.category
                    }
                  />
                )}
              />
            </Grid>
            {/* Description Text field */}
            <Grid itme xs={12} md={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Description"
                name="description"
                multiline
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Grid>
            {/* Image Url Text Field */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Image URL"
                name="image"
                value={formik.values.image}
                onChange={formik.handleChange}
                error={formik.touched.image && Boolean(formik.errors.image)}
                helperText={formik.touched.image && formik.errors.image}
              />
            </Grid>
            {/* Price Text Field */}
            <Grid>
              <TextField
                fullWidth
                margin="normal"
                label="Price"
                name="price"
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ mb: 2, mx: 2 }}>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProductForm;
