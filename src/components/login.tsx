import { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Paper,
  Avatar,
  TextField,
  Stack,
  FormControlLabel,
  Button,
  Link as MuiLink,
  responsiveFontSizes,
} from "@mui/material";

import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Checkbox from "@mui/material/Checkbox";
import { Margin, Password } from "@mui/icons-material";
import SignUp from "./signup";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  formSliceActions

} from "../redux/slices/formSlice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Welcome from "./welcome";


interface LoginProps {
  onNavigate: (view: string) => void;
}

// const Login = () => {
  const Login: React.FC<LoginProps> = ({ onNavigate }) => {
  // const navigate = useNavigate();
  const paperStyle = {
    padding: 20,
    height: "60vh",
    width: "80vh",
    margin: "5.5rem auto",
  };

  const btnstyle = { margin: "9px 0" };

  const errorStyle = { color: "red" };

  const initialValues = { username: "", password: "" };
  const [formValues, setFormValues] = useState<{
    username: string;
    password: string;
  }>(initialValues);

  const [formErrors, setFormErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  
  const signUpFormData = useSelector((state: RootState) => state.form.formData);
 
  console.log(signUpFormData);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target);

    
    const { name, value } = e.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const errors = validate(formValues);
  //   setFormErrors(errors);
  //   setSubmit(true);
  //   console.log(!formErrors);
  //   if(formErrors){
  //     alert("You logged in")
  //   }
  //   setFormValues(initialValues)
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validate(formValues);
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
        
          if (formValues.username === signUpFormData.email && formValues.password === signUpFormData.password) {
          
            setIsLoggedIn(true);
          } else {
            alert("Invalid credentials. Please try again.");
            
          }
        }
      };
 
  useEffect(() => {
    
    if (!isSubmit) {
   
      setFormValues({ username: "", password: "" });
    }
  }, [isSubmit]);

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values: { username: string; password: string }) => {
    const errors: { username?: string; password?: string } = {};
    
    if (!values.username) {
      errors.username = "Username is required.";
    }
    if (!values.password) {
      errors.password = "Password is required.";
    }
    return errors;
  };

  useEffect(() => {
    if (isLoggedIn) {
      // onNavigate('welcome'); //added
      <Welcome/>
    }
  }, [isLoggedIn] );

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
      {isLoggedIn ? (
        <Welcome/>
        ) : (
        <form onSubmit={handleSubmit}>
          <Grid>
            <Avatar style={{ margin: "auto", backgroundColor: "skyblue" }}>
              <LockOpenOutlinedIcon />
            </Avatar>
            <Typography
              variant="h6"
              aria-label="Sign in text"
              fontWeight={600}
              padding={"5px"}
              align="center"
            >
              Sign In
            </Typography>
          </Grid>
          <Stack spacing={2}>
            {/* <p style={errorStyle}>{formErrors.username}</p> */}
            <TextField
              label="Username"
              // placeholder="Enter Username"
              size="small"
              variant="outlined"
              // required
              fullWidth
              name="username"
              value={formValues?.username}
              onChange={handleChange}
              error={!!formErrors.username}
              helperText={formErrors.username}
            />
            {/* <p style={errorStyle}>{formErrors.password}</p> */}
            <TextField
              label="Password"
              // placeholder="Enter Password"
              type="password"
              size="small"
              fullWidth
              variant="outlined"
              // required
              name="password"
              value={formValues.password}
              onChange={handleChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
            />
          </Stack>
          <FormControlLabel
            control={
              <Checkbox
                name="checkBox"
                color="primary"
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Remember me"
          />

          <Button
            variant="contained"
            type="submit"
            color="primary"
            fullWidth
            style={btnstyle}
            
          >
            Submit
          </Button>
          {/* <Typography>
          <Link href="#" underline="none">
            Forgot Password
          </Link>
        </Typography>

        <Typography>Do you have an account?  
          <Link href="#" underline="none">
                 Sign up
          </Link>
        </Typography> */}
          <Typography>
            <MuiLink href="#" underline="none">
              Forgot Password
            </MuiLink>
          </Typography>

          {/* Use the RouterLink alias for the React Router Link component */}
          <Typography>
            Do you have an account?
            {/* <RouterLink to="/signup">Sign up</RouterLink> */}
            <button onClick={() => onNavigate('signup')}  style={{ border: 'none', background: 'none', padding: 0, margin: 0, cursor: 'pointer', color:"blue", fontWeight:"bold" }} >Sign Up</button>
          </Typography>
        </form>
         )} 
      </Paper>
    </Grid>
  );
};

export default Login;


