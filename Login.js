import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Login.css';
import userStore from '../stores/userStore';
import websiteStore from '../stores/userStore';
import secureLocalStorage from 'react-secure-storage';

const Login = () => {
  const navigate = useNavigate();


  // Define validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required'),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      console.log(values)

      const param = {
        email:values?.email,
        password:values?.password
      }

      // Call the login function from userStore with the form values
      const response = await websiteStore.login(param);
      secureLocalStorage.setItem("authToken",response?.token); // Store token securely
      const tokenData = secureLocalStorage.getItem("authToken",); // Store token securely
      console.log(tokenData,"tokendata");
      
      if(response){
        navigate('/'); 

      }
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Admin Login</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              {errors.general && (
                <div className="error-message">{errors.general}</div>
              )}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="form-input"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="form-input"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="form-button"
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
