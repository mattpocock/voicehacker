import React from 'react';
import FloatingWhiteBox from '../components/FloatingWhiteBox';
import FullWidthButton from '../components/FullWidthButton';
import Header from '../components/Header';
import Input from '../components/Input';
import Padding from '../components/Padding';
import { Formik } from 'formik';
import Label from '../components/Label';
import useAuthentication from '../hooks/useAuthentication';
import Description from '../components/Description';

const LoginPage = () => {
  const auth = useAuthentication();

  const handleFormSubmission = (values: {
    username: string;
    password: string;
  }) => {
    auth.submitSignIn(values.username, values.password);
  };

  console.log(auth);

  return (
    <>
      <Header white>Log In</Header>
      <Padding />
      <FloatingWhiteBox>
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={handleFormSubmission}
        >
          {({ values, handleChange, handleSubmit }) => (
            <>
              <Label>Username</Label>
              <Input
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
              />
              <Padding padding="1rem" />
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                onChange={handleChange}
                value={values.password}
              />
              <Padding padding="1rem" />
              {auth.error && (
                <>
                  <Description>{auth.error.message}</Description>
                  <Padding padding="1rem" />
                </>
              )}
              <FullWidthButton
                type="submit"
                onClick={() => handleSubmit()}
                disabled={!(values.username && values.password)}
              >
                Submit
              </FullWidthButton>
            </>
          )}
        </Formik>
      </FloatingWhiteBox>
    </>
  );
};

export default LoginPage;
