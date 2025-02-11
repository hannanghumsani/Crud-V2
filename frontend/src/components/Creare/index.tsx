"use client";

import React, { useEffect, useState, Suspense } from "react";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import CreateUserFormUI from "./UI/creareUI";
import { createUser, getUserById, updateUser } from "@/ApiS/userApi";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    gender: string;
}

const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    gender: "",
};

const validationSchemaUser = Yup.object({
    firstName: Yup.string()
        .matches(/^[A-Za-z]+$/, "Only alphabetic characters are allowed")
        .min(3, "First name must be at least 3 characters")
        .max(30, "First name must be at most 30 characters")
        .required("First name is required"),

    lastName: Yup.string()
        .matches(/^[A-Za-z]+$/, "Only alphabetic characters are allowed")
        .min(3, "Last name must be at least 3 characters")
        .max(30, "Last name must be at most 30 characters")
        .required("Last name is required"),

    email: Yup.string()
        .email("Invalid email")
        .min(5, "Email must be at least 5 characters")
        .max(40, "Email must be at most 40 characters")
        .required("Email is required"),

    city: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "Only alphabetic characters are allowed")
        .min(3, "City must be at least 3 characters")
        .max(30, "City must be at most 30 characters")
        .required("City is required"),

    gender: Yup.string()
        .oneOf(["Male", "Female"], "Invalid gender")
        .required("Gender is required"),
});

// Component wrapped in Suspense
const CreateUserForm: React.FC = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CreateUserFormContent />
        </Suspense>
    );
};

const CreateUserFormContent: React.FC = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
        try {
            console.log("Form Submitted:", values);
            setLoading(true);
            let resp: any;
            const userId = searchParams.get("userId");

            if (userId) {
                resp = await updateUser(userId, values);
            } else {
                resp = await createUser(values);
            }

            if (resp?.status === 201) {
                toast.success(resp?.data?.message, {
                    position: "top-right",
                    autoClose: 1000,
                });
                router.push("/detail");
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Something went wrong!", {
                position: "top-right",
                autoClose: 2000,
            });
            setLoading(false);
        } finally {
            actions.setSubmitting(false);
            setLoading(false);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchemaUser,
        onSubmit: handleSubmit,
    });

    const getByIdUser = async (id: any) => {
        try {
            setLoading(true);
            const resp = await getUserById(id);
            if (resp?.status === 200) {
                const user = resp?.data?.user;
                formik.setValues(user);
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to fetch user.", {
                position: "top-right",
                autoClose: 1000,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const userID = searchParams.get("userId");
        if (userID) {
            getByIdUser(userID);
        }
    }, [searchParams]); // Added searchParams dependency

    return <CreateUserFormUI {...formik} loading={loading} />;
};

export default CreateUserForm;
