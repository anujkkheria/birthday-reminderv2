import React, { useState, useContext } from "react";
import { TextField, Button, InputAdornment } from "@mui/material";
import { userContext } from "../../../context/user";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
// import googleauthimg from "../../../assets/btn_google_signin_dark_focus_web@2x.png";
import ILoginOptions from "./ILoginOptions";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { state, setUser } = useContext(userContext);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [LoginOptions, setLoginOptions] = useState<ILoginOptions>({
    email: "",
    password: "",
  });

  const changeVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const onCredentialchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLoginOptions({ ...LoginOptions, [e.target.name]: e.target.value });
    console.log(LoginOptions);
  };
  const navigate = useNavigate();

  const onSubmit = () => {
    fetch(`${BASE_URL}/auth/Login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(LoginOptions),
    })
      .then((result) => result.json())
      .then((result) => {
        setUser({ ...result?.body });
        console.log(state);
      })
      .then(() => navigate("/dashboard"));
  };
  return (
    <div className="flex flex-col items-center m-5 gap-4 px-14 py-5">
      <h2 className=" text-2xl">Login</h2>
      <TextField
        size="small"
        label={"email"}
        value={LoginOptions.email}
        name="email"
        onChange={(event) => onCredentialchange(event)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email />
            </InputAdornment>
          ),
        }}
        type="text"
        fullWidth
      />
      <TextField
        size="small"
        label={"password"}
        name="password"
        value={LoginOptions.password}
        onChange={(event) => onCredentialchange(event)}
        type={showPassword ? "text" : "password"}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end" onClick={() => changeVisibility()}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </InputAdornment>
          ),
        }}
        fullWidth
      />
      <Button
        variant="contained"
        sx={{ bgcolor: "black", borderRadius: 15, padding: "10px 30px" }}
        onClick={() => onSubmit()}
      >
        Login
      </Button>
      or
      <Button
        variant="contained"
        sx={{ bgcolor: "black", borderRadius: 15, padding: "10px 30px" }}
        onClick={() => onSubmit()}
      >
        SignUp
      </Button>
    </div>
  );
};

export default Login;
