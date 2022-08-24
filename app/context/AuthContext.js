import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { auth } from "../config/firebase";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_fullName_error":
      return { ...state, fullNameError: action.payload };
    case "add_email_error":
      return { ...state, emailError: action.payload };
    case "add_password_error":
      return { ...state, passwordError: action.payload };
    case "add_confirmPassword_error":
      return { ...state, confirmPasswordError: action.payload };
    case "signin":
      return {
        token: action.payload,
        fullNameError: "",
        emailError: "",
        passwordError: "",
        confirmPasswordError: "",
      };
    case "signout":
      return {
        token: action.payload,
        fullNameError: "",
        emailError: "",
        passwordError: "",
        confirmPasswordError: "",
      };
    case "clear_fullName_error_message":
      return { ...state, fullNameError: "" };
    case "clear_email_error_message":
      return { ...state, emailError: "" };
    case "clear_password_error_message":
      return { ...state, passwordError: "" };
    case "clear_confirmPassword_error_message":
      return { ...state, confirmPasswordError: "" };
    default:
      return state;
  }
};

const signup =
  (dispatch) =>
  async ({ email, password, confirmPassword }) => {
    let errors = [];

    if (!email) {
      errors.push("Email must be provided.");
    }

    if (!password) {
      errors.push("Password must be provided.");
    }

    if (!confirmPassword) {
      errors.push("Confirm password must be provided.");
    } else if (confirmPassword !== password) {
      errors.push("Passwords do not match.");
    }

    if (errors.length === 0) {
      try {
        const authUser = await auth.createUserWithEmailAndPassword(
          email,
          password
        );

        const token = authUser.user.uid;
        await AsyncStorage.setItem("token", token);

        dispatch({ type: "signin", payload: token });
      } catch (error) {
        if (error.message.toLowerCase().includes("email"))
          dispatch({ type: "add_email_error", payload: error.message });
        if (error.message.toLowerCase().includes("password"))
          dispatch({ type: "add_password_error", payload: error.message });
      }
    } else {
      console.log(errors);
      errors.forEach((el) => {
        if (el.toLowerCase().includes("name"))
          dispatch({ type: "add_fullName_error", payload: el });
        if (el.toLowerCase().includes("email"))
          dispatch({ type: "add_email_error", payload: el });
        if (el.toLowerCase() === "password must be provided.")
          dispatch({ type: "add_password_error", payload: el });
        if (el.toLowerCase().includes("confirm"))
          dispatch({ type: "add_confirmPassword_error", payload: el });
        if (el.toLowerCase().includes("passwords"))
          dispatch({ type: "add_confirmPassword_error", payload: el });
      });
    }
  };

const signin =
  (dispatch) =>
  async ({ email, password }, getSavedFlights) => {
    try {
      const authUser = await auth.signInWithEmailAndPassword(email, password);

      getSavedFlights();

      const token = authUser.user.uid;
      await AsyncStorage.setItem("token", token);

      dispatch({ type: "signin", payload: token });
    } catch (error) {
      console.log(error);
      if (error.message.toLowerCase().includes("email"))
        dispatch({ type: "add_email_error", payload: error.message });
      else if (error.message.toLowerCase().includes("there is no user"))
        dispatch({
          type: "add_email_error",
          payload: "No user found with this email.",
        });
      else if (error.message.toLowerCase().includes("password"))
        dispatch({ type: "add_password_error", payload: error.message });
    }
  };

const signout = (dispatch) => async () => {
  try {
    await auth.signOut();
    await AsyncStorage.removeItem("token");
    dispatch({ type: "signout" });
  } catch (error) {
    dispatch({ type: "add_error", payload: error.message });
  }
};

const tryLocalSignIn = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });
  }
};

const clearFullNameErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_fullName_error_message" });
};

const clearEmailErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_email_error_message" });
};

const clearPasswordErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_password_error_message" });
};

const clearConfirmPasswordErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_confirmPassword_error_message" });
};

export const { Context, Provider } = createDataContext(
  authReducer,
  {
    signup,
    signin,
    signout,
    tryLocalSignIn,
    clearFullNameErrorMessage,
    clearEmailErrorMessage,
    clearPasswordErrorMessage,
    clearConfirmPasswordErrorMessage,
  },
  {
    token: "",
    fullNameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  }
);
