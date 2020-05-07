import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
// import styled from 'styled-components';
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import {
  InputField,
  SubmitButton,
  FormHeader,
  FormContainer,
  // Label,
  // RememberMeLabel,
  InputErrMsg
} from './common-elements'
import { Card } from '../../UI/theme'
import { signInWithEmailAndPassword } from '../../firebase/firebaseAuth'

// const RememberMeSection = styled.div`
//   margin-top: 10px;
//   display: flex;
//   align-items: center;
// `;
// const Checkbox = styled.input`
//   margin: 0 3px;
//   background: transparent;
// `;
function LogInForm(props) {
  const [signInState] = useState({
    loginEmail: '',
    loginPassword: ''
  })

  return (
    <Card>
      <FormHeader>Sign In!</FormHeader>
      <Formik
        initialValues={{ ...signInState }}
        validateOnBlur={true}
        validateOnChange={true}
        validationSchema={Yup.object().shape({
          loginEmail: Yup.string()
            .email('Invalid email!')
            .required('Email is required!'),
          loginPassword: Yup.string()
            .min(2, 'Password is to short')
            .max(10, 'Password is to long')
            .required('Password is required!')
        })}
        onSubmit={({ loginEmail, loginPassword }, { setErrors, resetForm }) => {
          signInWithEmailAndPassword(loginEmail, loginPassword)
            .then(() => {
              resetForm()
              setTimeout(() => {
                props.history.push('/notes')
              }, 500)
              //TODO SHOW TOAST
            })
            .catch((error) => {
              //TODO check if there is possible to get multiply of errors message
              const errorCode = error.code
              if (errorCode === 'auth/invalid-email') {
                setErrors({ loginEmail: 'Invalid Email!' })
              } else if (errorCode === 'auth/user-disabled') {
                setErrors({ loginEmail: 'User is disabled!' })
              } else if (errorCode === 'auth/user-not-found') {
                setErrors({ loginEmail: 'User is not found!' })
              } else if (errorCode === 'auth/wrong-password') {
                setErrors({
                  loginPassword: 'Wrong password'
                })
              } else {
                setErrors({
                  loginEmail: 'Invalid Email',
                  loginPassword: 'Invalid password'
                })
              }
            })
        }}
        render={({ handleChange, errors, values, touched, handleBlur }) => (
          <Form>
            <FormContainer>
              <InputField
                isInvalid={errors.loginEmail && touched.loginEmail}
                value={values.loginEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your email"
                id="loginEmail"
                name="loginEmail"
              />
              <InputErrMsg isInvalid={errors.loginEmail && touched.loginEmail}>
                {errors.loginEmail}
              </InputErrMsg>
              <InputField
                isInvalid={errors.loginPassword && touched.loginPassword}
                value={values.loginPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter password"
                type="password"
                id="loginPassword"
                name="loginPassword"
              />
              <InputErrMsg
                isInvalid={errors.loginPassword && touched.loginPassword}
              >
                {errors.loginPassword}
              </InputErrMsg>
              <SubmitButton disabled={props.isLoggedIn} type="submit">
                Sign in <span className="fas fa-sign-in-alt" />
              </SubmitButton>
            </FormContainer>
          </Form>
        )}
      />
    </Card>
  )
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  }
}

export default withRouter(connect(mapStateToProps, {})(LogInForm))
