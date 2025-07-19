import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
    Box,
    Button,
    TextField,
    Typography,
    CircularProgress,
} from "@mui/material";
import axios from "axios";

// Replace with your Cloudinary upload preset and URL
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "YOUR_UPLOAD_PRESET";

const validationSchema = Yup.object({
    petImage: Yup.mixed().required("Pet picture is required"),
    maxDonation: Yup.number()
        .required("Maximum donation amount is required")
        .min(1, "Minimum 1"),
    lastDate: Yup.date()
        .required("Last date of donation is required")
        .min(new Date(), "Last date cannot be in the past"),
    shortDescription: Yup.string()
        .max(100, "Short description must be 100 characters or less")
        .required("Short description is required"),
    longDescription: Yup.string().required("Long description is required"),
});

const Create_Donation_Campaign = () => {
    const [uploading, setUploading] = useState(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");

    // Upload image to Cloudinary and return URL
    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

        try {
            setUploading(true);
            const response = await axios.post(CLOUDINARY_URL, formData);
            setUploading(false);
            return response.data.secure_url;
        } catch (error) {
            setUploading(false);
            console.error("Image upload failed", error);
            throw error;
        }
    };

    return (
        <Box maxWidth="600px" mx="auto" mt={4} p={2} boxShadow={3}>
            <Typography variant="h5" mb={3}>
                Create Donation Campaign
            </Typography>

            <Formik
                initialValues={{
                    petImage: null,
                    maxDonation: "",
                    lastDate: "",
                    shortDescription: "",
                    longDescription: "",
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, resetForm, setFieldError }) => {
                    try {
                        let imageUrl = uploadedImageUrl;

                        // If user selected a new file and no uploaded URL yet
                        if (values.petImage && !uploadedImageUrl) {
                            imageUrl = await uploadImage(values.petImage);
                            setUploadedImageUrl(imageUrl);
                        }

                        // Prepare data to send to backend
                        const campaignData = {
                            petImage: imageUrl,
                            maxDonation: values.maxDonation,
                            lastDate: values.lastDate,
                            shortDescription: values.shortDescription,
                            longDescription: values.longDescription,
                            createdAt: new Date().toISOString(),
                            paused: false, // default paused status
                        };

                        // TODO: Replace with your backend API endpoint
                        await axios.post("/api/donation-campaigns", campaignData);

                        alert("Donation campaign created successfully!");
                        resetForm();
                        setUploadedImageUrl("");
                    } catch (error) {
                        console.error(error);
                        setFieldError("general", "Failed to create campaign. Try again.");
                    }
                    setSubmitting(false);
                }}
            >
                {({ values, setFieldValue, isSubmitting, errors }) => (
                    <Form>
                        {/* Pet Picture */}
                        <Box mb={2}>
                            <Typography>Pet Picture *</Typography>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                    if (e.currentTarget.files && e.currentTarget.files[0]) {
                                        const file = e.currentTarget.files[0];
                                        setFieldValue("petImage", file);
                                        // Optionally upload immediately
                                        try {
                                            const url = await uploadImage(file);
                                            setUploadedImageUrl(url);
                                        } catch { }
                                    }
                                }}
                            />
                            <ErrorMessage
                                name="petImage"
                                component="div"
                                style={{ color: "red", fontSize: "0.8rem" }}
                            />
                            {uploading && <CircularProgress size={20} />}
                            {uploadedImageUrl && (
                                <Box mt={1}>
                                    <img
                                        src={uploadedImageUrl}
                                        alt="Uploaded"
                                        style={{ maxWidth: "100%", maxHeight: 150 }}
                                    />
                                </Box>
                            )}
                        </Box>

                        {/* Maximum Donation Amount */}
                        <Box mb={2}>
                            <Field
                                as={TextField}
                                label="Maximum Donation Amount"
                                name="maxDonation"
                                type="number"
                                fullWidth
                                variant="outlined"
                                error={Boolean(errors.maxDonation)}
                                helperText={<ErrorMessage name="maxDonation" />}
                            />
                        </Box>

                        {/* Last Date of Donation */}
                        <Box mb={2}>
                            <Field
                                as={TextField}
                                label="Last Date of Donation"
                                name="lastDate"
                                type="date"
                                fullWidth
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                error={Boolean(errors.lastDate)}
                                helperText={<ErrorMessage name="lastDate" />}
                            />
                        </Box>

                        {/* Short Description */}
                        <Box mb={2}>
                            <Field
                                as={TextField}
                                label="Short Description"
                                name="shortDescription"
                                fullWidth
                                variant="outlined"
                                error={Boolean(errors.shortDescription)}
                                helperText={<ErrorMessage name="shortDescription" />}
                            />
                        </Box>

                        {/* Long Description */}
                        <Box mb={2}>
                            <Field
                                as={TextField}
                                label="Long Description"
                                name="longDescription"
                                fullWidth
                                variant="outlined"
                                multiline
                                rows={5}
                                error={Boolean(errors.longDescription)}
                                helperText={<ErrorMessage name="longDescription" />}
                            />
                        </Box>

                        {/* General form error */}
                        {errors.general && (
                            <Typography color="error" mb={2}>
                                {errors.general}
                            </Typography>
                        )}

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting || uploading}
                            fullWidth
                        >
                            {isSubmitting ? "Submitting..." : "Create Campaign"}
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default Create_Donation_Campaign;
