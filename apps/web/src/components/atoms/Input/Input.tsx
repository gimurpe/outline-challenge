import React from "react";
import { Field, ErrorMessage } from "formik";
import classNames from "classnames";
import { Box } from "../../display";
import styles from "./styles";

interface InputProps {
  type: "email" | "password";
  name: string;
  placeholder?: string;
  className?: string;
  hasError?: boolean;
}

export const Input: React.FC<InputProps> = ({
  type = "email",
  name,
  placeholder,
  hasError = false,
}) => {
  return (
    <Box className="input" css={styles}>
      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        className={classNames("input__field", {
          "input__field--error": hasError,
        })}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="input__error"
        data-testid={`${name}-error`}
      />
    </Box>
  );
};
