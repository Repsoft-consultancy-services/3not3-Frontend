import React, { useEffect, useState } from "react";
import styles from "../styles/Signup.module.css";
import Meta from "../components/Meta";
import Link from "next/link";
import { useStateValue } from "../Context/StateProvider";
import axios from "axios";
import Router from "next/router";
import { toast } from "react-toastify";
import {
  FACEBOOK_AUTH,
  FORGOT_PASSWORD,
  GOOGLE_AUTH,
  LOGIN,
  VERIFY_EMAIL_AGAIN_WITHOUT_AUTH
} from "../constants/routes";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { BsGoogle } from "react-icons/bs";
import { RiMailCheckLine, RiKey2Fill } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";

const login = () => {
  const [{ user }, dispatch] = useStateValue();
  const [passVisible, setPassVisible] = useState(true);
  const updateVisibility = () => {
    passVisible === false ? setPassVisible(true) : setPassVisible(false);
  };

  useEffect(() => {
    const UserData = JSON.parse(localStorage.getItem("authUser"));
    if (UserData) {
      Router.replace("/");
    }
  }, []);

  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);

  const userLogin = async (url) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios
        .post(
          LOGIN,
          {
            email: email,
            password: password,
          },
          config
        )
        .then((res) => {
          console.log(res);
          if (res.data.success === true) {
            localStorage.setItem("authUser", JSON.stringify(res.data));
            console.log("Auth token Saved");
            toast.success("Woah!!! you are successfully logged in.");
            dispatch({
              type: "SET_USER",
              user: res.data,
            });
            Router.push("/tournament");

            console.log(user);
          } else {
            dispatch({
              type: "SET_USER",
              user: null,
            });
          }
        });
    } catch (err) {
      toast.error(err.response.data.message);
      if (err.response.data.message === "Please verify your email") {
        axios.post(`${VERIFY_EMAIL_AGAIN_WITHOUT_AUTH}`, { email: err.response.data.email }).then((res) => {
          toast.success(res.data.message);

        }).catch((err2) => {
          toast.error(err2.response.data.message);
        })
      }
      throw err.response;
    }
  };
  const title = "login | 3NOT3";

  const [open, setOpen] = useState(false);
  const [fMail, setFMail] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const forgotPasswordHandler = () => {
    axios
      .post(FORGOT_PASSWORD, {
        email: fMail,
      })
      .then((res) => {
        toast.success("Mail Sent");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });

    handleClose();
  };

  const handleGoogleAuth = () => {
    axios
      .get(GOOGLE_AUTH)
      .then((res) => {
        console.log(res);
        toast.success("success");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const handleFbAuth = () => {
    axios
      .get(FACEBOOK_AUTH)
      .then((res) => {
        console.log(res);
        toast.success("success");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <>
      <Meta title={title} />
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Forgot Password</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter your E-mail to receive a link for changing your
              password.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setFMail(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={forgotPasswordHandler}>Send Mail</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className={styles.logIn_container}>
        <div className={styles.loginsignupBox + " " + "container"}>
          <div className={styles.loginFormSidetext}>
            <h2>
              A step closer towards <br />
              Wining !
            </h2>
            <p>Real gaming takes the stage. </p>
          </div>
          <div className={styles.loginForm}>
            <h1>Login</h1>
            {/* user input */}
            <form action="">
              {/* <section>
                <i>
                  <BsGoogle />
                </i>
                <i>
                  <FaFacebookF/>
                </i>
              </section>
              <span>- OR -</span> */}
              <label htmlFor="userEmail">
                <input
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                  className={styles.icon}
                  placeholder="E-mail address / username"
                  required
                />
                <RiMailCheckLine />
              </label>
              <label htmlFor="userPassword">
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                  type={passVisible === true ? "password" : "text"}
                  className={styles.iconPass}
                  placeholder="Password"
                  required
                />
                {passVisible === true ? (
                  <i
                    style={{ cursor: "pointer" }}
                    onClick={() => updateVisibility()}
                  >
                    <AiOutlineEyeInvisible />
                  </i>
                ) : (
                  <i
                    style={{ cursor: "pointer" }}
                    onClick={() => updateVisibility()}
                  >
                    <AiFillEye />
                  </i>
                )}
              </label>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (email?.length !== 0 && password?.length !== 0) {
                    userLogin();
                  } else {
                    toast.error("Please fill all the fields");
                  }
                }}
                type="submit"
              >
                Log In
              </button>
            </form>
            <p>
              Dont have account ?{" "}
              <Link href="/signup">
                <span style={{ cursor: "pointer", color: "#1b86ed" }}>
                  Sign Up
                </span>
              </Link>
              <br />
              <span
                onClick={handleClickOpen}
                style={{ color: "#1b86ed", cursor: "pointer" }}
              >
                Forgot Password
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default login;
