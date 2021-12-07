import React from "react";
import { Formik } from "formik";
import {
  Label,
  Input,
  Select,
  Textarea,
  Radio,
  Checkbox,
  Slider,
  Box,
  Flex,
  Button,
  Text,
} from "theme-ui";
import * as Yup from "yup";

import styled from "@emotion/styled";

const formik = () => {
  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        checkbox: "",
        sound: "",
        letter: "",
        comment: "",
        slider: "",
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().max(255).required("First name is required"),
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
      })}
      onSubmit={(
        values,
        { resetForm, setErrors, setStatus, setSubmitting }
      ) => {
        console.log(values);
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        submitForm,
        touched,
        values,
      }) => (
        <Box as="form" onSubmit={handleSubmit} p={[3, 4]}>
          <Label htmlFor="username">Username</Label>
          <Input
            name="username"
            id="username"
            mb={3}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.username}
          />
          {errors.username && touched.username && (
            <ErrorMessage my={[2]}>{errors.username}</ErrorMessage>
          )}
          <Label htmlFor="email">Email</Label>
          <Input
            type="text"
            name="email"
            id="email"
            mb={3}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
          />
          {errors.email && touched.email && (
            <ErrorMessage my={[2]}>{errors.email}</ErrorMessage>
          )}
          <Box>
            <Label mb={3}>
              <Checkbox
                name="checkbox"
                onChange={handleChange}
                value={values.checkbox}
              />
              CheckBox
            </Label>
          </Box>
          <Label htmlFor="sound">Sound</Label>
          <Select name="sound" id="sound" mb={3} onChange={handleChange}>
            <option>Beep</option>
            <option>Boop</option>
            <option>Blip</option>
          </Select>
          <Label htmlFor="comment">Comment</Label>
          <Textarea
            name="comment"
            id="comment"
            rows={6}
            mb={3}
            onChange={handleChange}
            value={values.comment}
          />
          <Flex mb={3}>
            <Label>
              <Radio name="letter" onChange={handleChange} value="alpha" />
              Alpha
            </Label>
            <Label>
              <Radio name="letter" onChange={handleChange} value="bravo" />{" "}
              Bravo
            </Label>
            <Label>
              <Radio name="letter" onChange={handleChange} value="charlie" />{" "}
              Charlie
            </Label>
          </Flex>
          <Label>Slider</Label>
          <Slider
            mb={3}
            name="slider"
            value={values.slider}
            onChange={handleChange}
          />
          <Button type="submit">Submit</Button>
        </Box>
      )}
    </Formik>
  );
};

export default formik;

const ErrorMessage = styled(Text)`
  display: block;
  margin: 0.5rem 0;
  color: ${({ theme }) => theme.colors.red[600]};
`;
