import React from "react";
import { Form, Button, Row, Col, Card, Spinner } from "react-bootstrap";
import { FormikProps } from "formik";
import FormInput from "../../../commonComp/inputField";
import { useSearchParams } from "next/navigation";

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    gender: string;
}
interface CustomProps {
    loading: boolean;
}

type CreateUserFormProps = FormikProps<FormValues> & CustomProps;

const CreateUserFormUI: React.FC<CreateUserFormProps> = ({
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    loading
},) => {
    const searchParams = useSearchParams()
    return (
        <Card className="bg-dark text-light p-4 border-secondary">
            <h3 className="text-center text-info mb-4">{searchParams.get("userId") ? "Update User" : "Create User"}</h3>
            {loading ? <div className="d-flex justify-content-center align-items-center vh-100">
                <Spinner variant="light" />
            </div> : <> <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={4}>
                        <FormInput
                            label="First Name"
                            type="text"
                            name="firstName"
                            controlId="firstName"
                            placeholder="Enter first name"
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            invalid={touched.firstName && !!errors.firstName}
                            errorMessage={errors.firstName}
                        />
                    </Col>
                    <Col md={4}>
                        <FormInput
                            label="Last Name"
                            type="text"
                            name="lastName"
                            controlId="lastName"
                            placeholder="Enter last name"
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            invalid={touched.lastName && !!errors.lastName}
                            errorMessage={errors.lastName}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col md={4}>
                        <FormInput
                            label="Email"
                            type="email"
                            name="email"
                            controlId="email"
                            placeholder="Enter email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            invalid={touched.email && !!errors.email}
                            errorMessage={errors.email}
                        />
                    </Col>
                    <Col md={4}>
                        <FormInput
                            label="City"
                            type="text"
                            name="city"
                            controlId="city"
                            placeholder="Enter city"
                            value={values.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            invalid={touched.city && !!errors.city}
                            errorMessage={errors.city}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col md={4}>
                        <FormInput
                            label="Gender"
                            type="select"
                            name="gender"
                            controlId="gender"
                            options={[
                                { label: "Male", value: "Male" },
                                { label: "Female", value: "Female" },
                            ]}
                            value={values.gender}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            invalid={touched.gender && !!errors.gender}
                            errorMessage={errors.gender}
                        />
                    </Col>
                </Row>

                <div className="mt-3 d-flex justify-content-center">
                    <Button type="submit" variant="info">
                        {searchParams.get("userId") ? "Update" : "Submit"}
                    </Button>
                </div>
            </Form></>}

        </Card>
    );
};

export default CreateUserFormUI;
