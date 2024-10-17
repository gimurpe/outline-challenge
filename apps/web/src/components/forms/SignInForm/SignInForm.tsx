import React from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useAuth } from "../../../hooks/useAuth";
import { Flex } from "../../display";
import styles from "./styles";
import { Input } from "../../atoms/Input/Input";

interface Props {
  redirectTo?: string;
}

export const signInSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Invalid Email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/[0-9]/, "Password must contain at least one number"),
});

const SignInForm: React.FC<Props> = () => {
  const { logIn } = useAuth();

  const onSubmit = (user: { email: string; password: string }) => {
    logIn(user);
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={signInSchema}
      validateOnChange
    >
      {({ handleSubmit, errors, touched }) => (
        <Flex className="sign-in-form" css={styles}>
          <Form onSubmit={handleSubmit}>
            <Flex className="sign-in-form__content-wrapper">
              <Input
                type="email"
                name="email"
                placeholder="Email*"
                hasError={touched["email"] && Boolean(errors["email"])}
              />
              <Input
                type="password"
                name="password"
                placeholder="Password*"
                hasError={Boolean(touched["password"] && errors["password"])}
              />
              <button type="submit" className="sign-in-form__submit-btn">
                Sign In
              </button>
            </Flex>
          </Form>
        </Flex>
      )}
    </Formik>
  );
};

export default SignInForm;
