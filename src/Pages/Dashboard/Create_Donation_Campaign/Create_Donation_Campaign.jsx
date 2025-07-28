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
import useAuth from "../../../Hooks/useAuth";
import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";

//  Cloudinary config
const CLOUDINARY_URL = `${import.meta.env.VITE_CLOUDINARY_URL}`;
const CLOUDINARY_UPLOAD_PRESET = `${import.meta.env.VITE_Preset}`;

const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    petImage: Yup.mixed().required("Pet picture is required"),
    maxDonation: Yup.number()
        .required("Maximum donation amount is required")
        .min(1, "Minimum 1"),
    lastDate: Yup.date()
        .required("Last date of donation is required")
        .min(new Date(new Date().setHours(0, 0, 0, 0)), "Last date cannot be in the past"),
    shortDescription: Yup.string()
        .max(100, "Short description must be 100 characters or less")
        .required("Short description is required"),
    longDescription: Yup.string().required("Long description is required"),
});

const Create_Donation_Campaign = () => {
    const [uploading, setUploading] = useState(false);
    const { user } = useAuth();
    const axios = useAxios();

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

        try {
            setUploading(true);
            const response = await axios.post(CLOUDINARY_URL, formData);
            return response.data.secure_url;
        } catch (error) {
            console.error("Image upload failed", error);
            throw error;
        } finally {
            setUploading(false);
        }
    };

 
    return (
        <Box maxWidth="800px" mx="auto" mt={4} p={2} boxShadow={3}>
            <Typography variant="h5" mb={3}>
                Create Donation Campaign
            </Typography>

            <Formik
                initialValues={{
                    title: "",
                    petImage: null,
                    maxDonation: "",
                    lastDate: "",
                    shortDescription: "",
                    longDescription: "",
                    addedBy: user?.email || "",
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, resetForm, setStatus }) => {
                    try {
                        setStatus({});
                        const imageUrl = await uploadImage(values.petImage);

                        const campaignData = {
                            title: values.title,
                            petImage: imageUrl,
                            description: values.shortDescription,
                            longDescription: values.longDescription,
                            goal: Number(values.maxDonation),
                            lastDate: values.lastDate,
                            category: values.category || "Pet"
                        };


                        await axios.post(`/donation-campaign`, campaignData);
                        await Swal.fire({
                            icon: "success",
                            title: "Success!",
                            text: "Donation campaign created successfully!",
                        });

                        // Reset form to initial values
                        resetForm({
                            values: {
                                petImage: null,
                                maxDonation: "",
                                title:"",
                                lastDate: "",
                                shortDescription: "",
                                longDescription: "",
                                addedBy: user?.email || "",
                                category: ""
                            }
                        });

                    } catch (error) {
                        setStatus({ general: "Failed to create campaign. Try again." });
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ setFieldValue, isSubmitting, status, values, errors }) => (
                    <Form>
                        {/* Pet Picture */}
                        <Box mb={2}>
                            <Typography>Pet Picture *</Typography>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.currentTarget.files?.[0]) {
                                        setFieldValue("petImage", e.currentTarget.files[0]);
                                    }
                                }}
                            />
                            <ErrorMessage
                                name="petImage"
                                component="div"
                                style={{ color: "red", fontSize: "0.8rem" }}
                            />
                            {uploading && <CircularProgress size={20} />}
                        </Box>

                        {/* Title */}
                        <Box mb={2}>
                            <Field
                                as={TextField}
                                label="Campaign Title"
                                name="title"
                                fullWidth
                                variant="outlined"
                                error={Boolean(errors.title)}
                                helperText={<ErrorMessage name="title" />}
                            />
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

                        <Box mb={2}>
                            <Field
                                as={TextField}
                                label="Added By"
                                name="addedBy"
                                fullWidth
                                variant="outlined"
                                value={user.email}
                                InputProps={{ readOnly: true }}
                            />
                        </Box>

                        
                        {/* General Error */}
                        {status?.general && (
                            <Typography color="error" mb={2}>
                                {status.general}
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
