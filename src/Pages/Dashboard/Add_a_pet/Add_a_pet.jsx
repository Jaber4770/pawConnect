import React from "react";
import {
    Box,
    Button,
    MenuItem,
    Select,
    TextField,
    Typography,
    FormControl,
    InputLabel,
    FormHelperText,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const initialValues = {
    name: "",
    age: "",
    location: "",
    category: "",
    breed: "",
    gender: "",
    size: "",
    color: "",
    goodWithKids: false,
    goodWithOtherPets: false,
    vaccinated: false,
    neutered: false,
    adoptionStatus: "Available",
    image: "",
    shortDescription: "",
    longDescription: "",
};

const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    age: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
    breed: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
    size: Yup.string().required("Required"),
    color: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "Only alphabets and spaces allowed")
        .required("Required"),
    shortDescription: Yup.string().required("Required"),
    longDescription: Yup.string().required("Required"),
    image: Yup.string().url("Must be a valid URL").required("Required"),
});

const Add_a_pet = () => {
    const handleSubmit = async (values, { resetForm }) => {
        try {
            const response = await axios.post("/api/pets", {
                ...values,
                dateAdded: new Date().toISOString(),
            });
            console.log("Pet added successfully:", response.data);
            resetForm();
        } catch (error) {
            console.error("Error adding pet:", error);
        }
    };

    return (
        <Box
            maxWidth="900px"
            mx="auto"
            mt={4}
            p={4}
            boxShadow={3}
            borderRadius={2}
            bgcolor="#fff"
        >
            <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
                Add a Pet
            </Typography>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue, touched, errors }) => (
                    <Form>
                        {/* Two-column layout */}
                        <Box
                            display="grid"
                            gridTemplateColumns="repeat(2, 1fr)"
                            gap={3}
                            mb={3}
                        >
                            {[
                                { name: "name", label: "Name" },
                                { name: "age", label: "Age" },
                                { name: "location", label: "Location" },
                                { name: "breed", label: "Breed" },
                                { name: "gender", label: "Gender" },
                                { name: "size", label: "Size" },
                                {
                                    name: "color",
                                    label: "Color",
                                    inputProps: {
                                        inputMode: "text",
                                        pattern: "[A-Za-z\\s]+",
                                        title: "Only letters and spaces allowed",
                                    },
                                },
                                { name: "image", label: "Image URL" },
                            ].map(({ name, label, inputProps }) => (
                                <Box key={name}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        name={name}
                                        label={label}
                                        error={touched[name] && Boolean(errors[name])}
                                        helperText={<ErrorMessage name={name} />}
                                        inputProps={inputProps}
                                    />
                                </Box>
                            ))}
                        </Box>

                        <Box mb={3}>
                            <FormControl
                                fullWidth
                                error={touched.category && Boolean(errors.category)}
                            >
                                <InputLabel id="category-label">Category</InputLabel>
                                <Field
                                    name="category"
                                    as={Select}
                                    labelId="category-label"
                                    label="Category"
                                >
                                    <MenuItem value="dogs">Dogs</MenuItem>
                                    <MenuItem value="cats">Cats</MenuItem>
                                    <MenuItem value="birds">Birds</MenuItem>
                                </Field>
                                <FormHelperText>
                                    <ErrorMessage name="category" />
                                </FormHelperText>
                            </FormControl>
                        </Box>

                        <Box mb={3}>
                            <Field
                                as={TextField}
                                fullWidth
                                multiline
                                rows={2}
                                name="shortDescription"
                                label="Short Description"
                                error={touched.shortDescription && Boolean(errors.shortDescription)}
                                helperText={<ErrorMessage name="shortDescription" />}
                            />
                        </Box>

                        <Box mb={3}>
                            <Field
                                as={TextField}
                                fullWidth
                                multiline
                                rows={4}
                                name="longDescription"
                                label="Long Description"
                                error={touched.longDescription && Boolean(errors.longDescription)}
                                helperText={<ErrorMessage name="longDescription" />}
                            />
                        </Box>

                        {/* Checkboxes in row */}
                        <FormGroup row sx={{ mb: 3 }}>
                            {[
                                { name: "goodWithKids", label: "Good With Kids" },
                                { name: "goodWithOtherPets", label: "Good With Other Pets" },
                                { name: "vaccinated", label: "Vaccinated" },
                                { name: "neutered", label: "Neutered" },
                            ].map(({ name, label }) => (
                                <FormControlLabel
                                    key={name}
                                    control={
                                        <Field
                                            as={Checkbox}
                                            name={name}
                                            color="primary"
                                            checked={values[name]}
                                        />
                                    }
                                    label={label}
                                />
                            ))}
                        </FormGroup>

                        <Box mt={4}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="outlined"
                                sx={{
                                    borderColor: "orange",
                                    color: "orange",
                                    fontWeight: "bold",
                                    "&:hover": {
                                        backgroundColor: "orange",
                                        color: "white",
                                        borderColor: "orange",
                                    },
                                }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default Add_a_pet;
