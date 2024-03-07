

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Checkbox,
  InputAdornment,
  Snackbar,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useTranslation } from "react-i18next";
import { RootState } from "../redux/store";
import {
  formSliceActions

} from "../redux/slices/formSlice";
import Login from "./login";
import { useNavigate} from "react-router-dom";

// interface SignUpProps {
//   onNavigate: (view: string) => any;
// }

interface SignUpProps {
  onSignUpSuccess: () => void;
  onNavigate: (view: string) => any;
}



  const Signup: React.FC<SignUpProps> = ({ onNavigate, onSignUpSuccess}) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  
  
  // const navigate = useNavigate(); 
  const [signUpData, setsignUpData] = useState({
    name: "",
    email: "",
    gender: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    termsAndConditions: false,
  });

  const [isSubmitting, setSubmitting] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"error" | "success">(
    "error"
  );
  const [showLogin, setShowLogin] = useState(false);
 
  const [isPasswordMatch, setPasswordMatch] = useState(true);
  const [isEmailValid, setEmailValid] = useState(true);
  const [isPhoneNumberValid, setPhoneNumberValid] = useState(true);
  const [isConfirmPasswordValid, setConfirmPasswordValid] = useState(true);

  const paperStyle = {
    padding: 20,
    maxWidth: "100%",
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const marginTop = { marginTop: 5 };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailValid(emailRegex.test(value));
    }
    if (name === "phoneNumber") {
      const phoneNumberRegex = /^\d{10}$/;
      const isValidPhoneNumber =
        typeof fieldValue === "string" &&
        phoneNumberRegex.test(fieldValue) &&
        fieldValue.length === 10;
      setPhoneNumberValid(isValidPhoneNumber);
    }

    if (name === "confirmPassword") {
      const isMatch = value === fieldValue;
      setPasswordMatch(isMatch);
    }

    setsignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Name validation
    if (!signUpData.name) {
      errors.name = "Name is required.";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!signUpData.email) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(signUpData.email)) {
      errors.email = "Invalid email format.";
    }

    // Gender validation
    if (!signUpData.gender) {
      errors.gender = "Gender is required.";
    }

    // Phone number validation
    const phoneNumberRegex = /^\d{10}$/;
    if (!signUpData.phoneNumber) {
      errors.phoneNumber = "Phone Number is required.";
    } else if (!phoneNumberRegex.test(signUpData.phoneNumber)) {
      errors.phoneNumber = "Phone Number must be 10 digits.";
    }

    // Password validation
    if (!signUpData.password) {
      errors.password = "Password is required.";
    }

    // Confirm Password validation
    if (!signUpData.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required.";
    } else if (signUpData.confirmPassword !== signUpData.password) {
      errors.confirmPassword = "Passwords do not match.";
    }

    // Terms and conditions validation
    if (!signUpData.termsAndConditions) {
      errors.termsAndConditions = "Please accept terms and conditions.";
    }

    const errorMessage = Object.values(errors).join(" ");
    setOpenSnackbar(errorMessage !== "");
    setSnackbarMessage(errorMessage);
    setSnackbarSeverity(errorMessage ? "error" : "success");

    return Object.keys(errors).length === 0;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    console.log("Form Submitted", signUpData);
    setSubmitting(true);

    const snackbarMsg = `Form submitted successfully!  Name: ${signUpData.name}, Email: ${signUpData.email}`;

    setSnackbarMessage(snackbarMsg);
    setSnackbarSeverity("success");
    setOpenSnackbar(true);

    dispatch(
      formSliceActions.setFormData(signUpData)
    );

    setTimeout(() => {
      // dispatch(resetForm());
      setSubmitting(false);
      setOpenSnackbar(false);
      setShowLogin(true);
      // onNavigate("login");
      onSignUpSuccess();
      
    }, 5000);
  };

  // if (showLogin) {
  //   // onNavigate("login");
  //   onNavigate("login")

  // }

  // const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   // Validate signup data here
  //   if (!validateForm) {
  //     // Dispatch action to store signup data
  //     // dispatch(formSliceActions.setFormData(signUpData));
  //     // Show success snackbar
  //     setSnackbarMessage('Sign up successful!');
  //     setSnackbarSeverity('success');
  //     setOpenSnackbar(true);
  //     // Reset form data
  //     // setsignUpData({ email: '', password: '' });
  //     // Callback to parent component to switch view to login
  //     onSignUpSuccess();
  //   } else {
  //     // Show error snackbar if validation fails
  //     setSnackbarMessage('Sign up failed. Please check your inputs.');
  //     setSnackbarSeverity('error');
  //     setOpenSnackbar(true);
  //   }
  // };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleLanguageChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value as string);
  };

  return (
    <Grid container justifyContent="center" my={5} spacing={2}>
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Paper style={paperStyle} elevation={20}>
          <Grid item xs={12}>
            <Grid container justifyContent="center">
              <Grid item>
                <Avatar style={avatarStyle}></Avatar>
              </Grid>
              <Grid item>
                <Typography
                  variant="h6"
                  aria-label="Sign in text"
                  fontWeight={600}
                  padding={"5px"}
                  align="center"
                >
                  {t("signUp.title")}
                </Typography>
                <Typography variant="caption">
                  {t("signUp.description")}
                </Typography>
              </Grid>
            </Grid>

            <Select
              value={i18n.language}
              onChange={handleLanguageChange}
              displayEmpty
              fullWidth
              style={{ marginBottom: 20 }}
              size="small"
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="fr">Français</MenuItem>
              <MenuItem value="es">Español</MenuItem>
              <MenuItem value="hi">हिन्दी</MenuItem>
            </Select>
          </Grid>

          <form onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="name"
                  label={t("formLabels.name")}
                  placeholder={t("placeholders.name")}
                  value={signUpData.name}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  // fullWidth
                  // name="email"
                  // label={t("formLabels.email")}
                  // placeholder={t("placeholders.email")}
                  // value={signUpData.email}
                  // onChange={handleChange}
                  // size="small"/

                  fullWidth
                  name="email"
                  label={t("formLabels.email")}
                  placeholder={t("placeholders.email")}
                  value={signUpData.email}
                  onChange={handleChange}
                  size="small"
                  error={!isEmailValid && signUpData.email !== ""}
                  helperText={
                    !isEmailValid && signUpData.email !== ""
                      ? "Invalid email format"
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl component="fieldset" fullWidth>
                  <RadioGroup
                    aria-label="gender"
                    name="gender"
                    value={signUpData.gender}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label={t("gender.female")}
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label={t("gender.male")}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                {/* <TextField
                  fullWidth
                  name="phoneNumber"
                  label={t("formLabels.phoneNumber")}
                  placeholder={t("placeholders.phoneNumber")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">+91</InputAdornment>
                    ),
                  }}
                  value={signUpData.phoneNumber}
                  onChange={handleChange}
                  size="small"
                /> */}
                <TextField
                  fullWidth
                  name="phoneNumber"
                  label={t("formLabels.phoneNumber")}
                  placeholder={t("placeholders.phoneNumber")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">+91</InputAdornment>
                    ),
                  }}
                  value={signUpData.phoneNumber}
                  onChange={handleChange}
                  size="small"
                  error={!isPhoneNumberValid}
                  helperText={
                    !isPhoneNumberValid
                      ? "Phone Number must be exactly 10 digits"
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="password"
                  type="password"
                  label={t("formLabels.password")}
                  placeholder={t("placeholders.password")}
                  value={signUpData.password}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                {/* <TextField
                  fullWidth
                  name="confirmPassword"
                  type="password"
                  label={t("formLabels.confirmPassword")}
                  placeholder={t("placeholders.confirmPassword")}
                  value={signUpData.confirmPassword}
                  onChange={handleChange}
                  size="small"
                /> */}
                <TextField
                  fullWidth
                  name="confirmPassword"
                  type="password"
                  label={t("formLabels.confirmPassword")}
                  placeholder={t("placeholders.confirmPassword")}
                  value={signUpData.confirmPassword}
                  onChange={handleChange}
                  size="small"
                  error={!isPasswordMatch}
                  helperText={!isPasswordMatch ? "Passwords do not match" : ""}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="termsAndConditions"
                      checked={signUpData.termsAndConditions}
                      onChange={handleChange}
                    />
                  }
                  label={t("formLabels.termsAndConditions")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={
                    isSubmitting ||
                    !signUpData.name ||
                    !signUpData.email ||
                    !signUpData.gender ||
                    !signUpData.phoneNumber ||
                    !signUpData.password ||
                    !signUpData.confirmPassword ||
                    !signUpData.termsAndConditions ||
                    !isEmailValid
                  }
                  color="primary"
                >
                  {isSubmitting ? t("buttons.loading") : t("buttons.signUp")}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          elevation={6}
          variant="filled"
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Grid>
  );
};

export default Signup;
function onSignUpSuccess() {
  throw new Error("Function not implemented.");
}

