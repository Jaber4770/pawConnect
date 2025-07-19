import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import axios from "axios";
import { TextField, Button, Typography, Box } from "@mui/material";

const petCategories = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    { value: "rabbit", label: "Rabbit" },
    { value: "bird", label: "Bird" },
    { value: "other", label: "Other" },
];

const validationSchema = Yup.object({
    petName: Yup.string().required("Pet name is required"),
    petAge: Yup.string().required("Pet age is required"),
    petLocation: Yup.string().required("Location is required"),
    shortDescription: Yup.string().required("Short description is required"),
    longDescription: Yup.string().required("Long description is required"),
    petCategory: Yup.object().required("Category is required"),
    petImage: Yup.mixed().required("Image is required"),
});

const Add_a_pet = () => {
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "YOUR_CLOUDINARY_UPLOAD_PRESET");

        try {
            setUploading(true);
            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/YOUR_CLOUDINARY_CLOUD_NAME/image/upload`,
                formData
            );
            setUploading(false);
            return res.data.secure_url;
        } catch (err) {
            setUploading(false);
            setUploadError("Image upload failed.");
            return null;
        }
    };

    const handleSubmit = async (values, { setSubmitting, setErrors, resetForm }) => {
        const imageUrl = await handleImageUpload(values.petImage);

        if (!imageUrl) {
            setErrors({ petImage: "Failed to upload image" });
            setSubmitting(false);
            return;
        }

        const petData = {
            petName: values.petName,
            petAge: values.petAge,
            petLocation: values.petLocation,
            shortDescription: values.shortDescription,
            longDescription: values.longDescription,
            petCategory: values.petCategory.value,
            imageUrl,
            addedAt: new Date().toISOString(),
            adopted: false,
            // Include user info here if needed (e.g., userId)
        };

        try {
            // Replace with your API endpoint
            await axios.post("/api/pets", petData);
            resetForm();
            alert("Pet added successfully!");
        } catch (error) {
            setErrors({ submit: "Failed to submit form. Please try again." });
        }

        setSubmitting(false);
    };

    return (
        <Box maxWidth={600} mx="auto" mt={5}>
            <Typography variant="h4" gutterBottom>
                Add a Pet
            </Typography>

            <Formik
                initialValues={{
                    petName: "",
                    petAge: "",
                    petCategory: null,
                    petLocation: "",
                    shortDescription: "",
                    longDescription: "",
                    petImage: null,
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, isSubmitting, errors }) => (
                    <Form noValidate>
                        {/* Pet Name */}
                        <Box mb={2}>
                            <Field
                                name="petName"
                                as={TextField}
                                label="Pet Name"
                                fullWidth
                                error={!!errors.petName}
                                helperText={<ErrorMessage name="petName" />}
                            />
                        </Box>

                        {/* Pet Age */}
                        <Box mb={2}>
                            <Field
                                name="petAge"
                                as={TextField}
                                label="Pet Age"
                                fullWidth
                                error={!!errors.petAge}
                                helperText={<ErrorMessage name="petAge" />}
                            />
                        </Box>

                        {/* Pet Category - react-select */}
                        <Box mb={2}>
                            <Typography variant="body1">Pet Category</Typography>
                            <Select
                                options={petCategories}
                                onChange={(option) => setFieldValue("petCategory", option)}
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        backgroundColor: "white",      // 👈 sets white background
                                    }),
                                    menu: (base) => ({
                                        ...base,
                                        backgroundColor: "white",      // 👈 dropdown list background
                                    }),
                                }}
                            />
                            <div style={{ color: "red", fontSize: "0.8rem" }}>
                                <ErrorMessage name="petCategory" />
                            </div>
                        </Box>

                        {/* Pet Location */}
                        <Box mb={2}>
                            <Field
                                name="petLocation"
                                as={TextField}
                                label="Pickup Location"
                                fullWidth
                                error={!!errors.petLocation}
                                helperText={<ErrorMessage name="petLocation" />}
                            />
                        </Box>

                        {/* Short Description */}
                        <Box mb={2}>
                            <Field
                                name="shortDescription"
                                as={TextField}
                                label="Short Description"
                                fullWidth
                                error={!!errors.shortDescription}
                                helperText={<ErrorMessage name="shortDescription" />}
                            />
                        </Box>

                        {/* Long Description */}
                        <Box mb={2}>
                            <Field
                                name="longDescription"
                                as={TextField}
                                label="Long Description"
                                multiline
                                rows={4}
                                fullWidth
                                error={!!errors.longDescription}
                                helperText={<ErrorMessage name="longDescription" />}
                            />
                        </Box>

                        {/* Pet Image */}
                        <Box mb={2}>
                            <Typography variant="body1">Pet Image</Typography>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(event) =>
                                    setFieldValue("petImage", event.currentTarget.files[0])
                                }
                            />
                            <div style={{ color: "red", fontSize: "0.8rem" }}>
                                <ErrorMessage name="petImage" />
                                {uploadError && <div>{uploadError}</div>}
                            </div>
                        </Box>

                        {/* Submit */}
                        <Box mt={3}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting || uploading}
                            >
                                {isSubmitting || uploading ? "Submitting..." : "Submit"}
                            </Button>
                            {errors.submit && (
                                <Typography color="error" mt={2}>
                                    {errors.submit}
                                </Typography>
                            )}
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default Add_a_pet;
