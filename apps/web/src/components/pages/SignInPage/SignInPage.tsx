import { Triangle } from "react-loader-spinner";
import { Box, Flex } from "../../display";
import SignInForm from "../../forms/SignInForm/SignInForm";
import styles from "./styles";
import { useAuth } from "../../../hooks/useAuth";

export const SignInPage = () => {
  const { loading } = useAuth();
  return (
    <Flex css={styles}>
      <Flex className="sign-in-page__title-content">
        <Box className="sign-in-page__title-icon">
          {loading ? (
            <Triangle
              visible={true}
              height="150"
              width="150"
              color="#4fa94d"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            <i className="fa-solid fa-code"></i>
          )}
        </Box>
        <Box as="h1" className="sign-in-page__title">
          Outline Challenge
        </Box>
      </Flex>

      <SignInForm />
    </Flex>
  );
};
