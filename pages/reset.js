import React, { useState } from "react";
import { toast } from "react-toastify";
import { Router, useRouter } from "next/router";
import axios from "axios";
import { FORGOT_PASSWORD_CHANGE } from "../constants/routes";
import styles from "../styles/Reset.module.css";
import { Button } from "@material-ui/core";
import { style } from "@mui/system";

const reset = () => {
  const router = useRouter();
  const paramURL = router.query;
  console.log(paramURL);

  const [newPassword, setNewPassword] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState([]);

  const changePassword = () => {
    if (newPassword !== confirmPassword) {
      toast.error("password doesnt match");
    } else {
      axios
        .post(`${FORGOT_PASSWORD_CHANGE}/${paramURL.token}`, {
          password: confirmPassword,
        })
        .then((res) => {
          console.log(res);
          if (res.data.success === true) {
            toast.success("Woah!!! Password Changed.");
            // Router.push("/login");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
        });
    }
  };

  return (
    <div className={styles.resetForm + " " + "container"}>
      <h1>Reset Your Password</h1>
      <form action="">
        <label htmlFor="userEmail">New Password</label>
        <input
          required
          placeholder="Enter new Password"
          type="text"
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
        ></input>
        <label htmlFor="userEmail">Confirm New Password</label>
        <input
          required
          placeholder="Confirm new Password"
          type="password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        ></input>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            changePassword();
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default reset;
