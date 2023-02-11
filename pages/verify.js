import { Button } from "@material-ui/core";
import React from "react";
import { Router, useRouter } from "next/router";
import axios from "axios";
import { VERIFY_EMAIL } from "../constants/routes";
import { toast } from "react-toastify";
import styles from "../styles/Reset.module.css";

const verify = () => {
  const router = useRouter();
  const paramURL = router.query;
  console.log(paramURL);

  const handleVerify = () => {
    axios
      .post(`${VERIFY_EMAIL}/${paramURL.token}`)
      .then((res) => {
        console.log(res);
        if (res.data.success === true) {
          toast.success("Email Verification done.");
          // Router.push("/login");
        }
        if (res.data.success === false) {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  return (
    <div className={styles.verify + " " + "container"}>
      <center>
        <h1>Verify your Email!</h1>
      </center>
      <center>
        <h3>Click the button below to verify</h3>
      </center>
      <center>
        <Button onClick={handleVerify} variant="contained" color="primary">
          Verify
        </Button>
      </center>
    </div>
  );
};

export default verify;
