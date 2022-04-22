import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import { APP_ROUTES } from "../../constants/routes";

import "./index.css";

const LoginComponent: React.FC = () => {
  const navigateTo = useNavigate();

  return (
    <div className="login-component">
      <header className="page-title">Login Page</header>
      <div className="form-container">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .matches(/[ a-zA-Z]/, "First name can only contain alphabets")
              .max(20, "Must be 20 characters or less")
              .required("Required"),
            lastName: Yup.string()
              .matches(/[ a-zA-Z]/, "First name can only contain alphabets")
              .max(20, "Must be 20 characters or less")
              .required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .min(8, "Password is too short - should be 8 chars minimum.")
              .matches(
                /[ a-zA-Z0-9@:/\\,-]/,
                "Password can only contain Latin letters."
              )
              .required("No password provided."),
          })}
          onSubmit={values => {
            navigateTo(APP_ROUTES.IMAGE_LIST, { state: { values } });
          }}
        >
          {({ handleSubmit, getFieldProps, touched, errors }) => (
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  className="form-control"
                  {...getFieldProps("firstName")}
                />
                {touched.firstName && errors.firstName ? (
                  <div className="error">{errors.firstName}</div>
                ) : null}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  {...getFieldProps("lastName")}
                />
                {touched.lastName && errors.lastName ? (
                  <div className="error">{errors.lastName}</div>
                ) : null}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                  {...getFieldProps("email")}
                />
                {touched.email && errors.email ? (
                  <div className="error">{errors.email}</div>
                ) : null}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="text"
                  className="form-control"
                  placeholder="Password"
                  {...getFieldProps("password")}
                />
                {touched.password && errors.password ? (
                  <div className="error">{errors.password}</div>
                ) : null}
              </div>

              <button type="submit" className="submit-btn btn btn-primary">
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginComponent;
