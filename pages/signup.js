import React, { useState, useEffect } from "react";
import styles from "../styles/Signup.module.css";
import Meta from "../components/Meta";
import Link from "next/link";
import { BsPinMap, BsGenderAmbiguous, BsTelephone } from "react-icons/bs";
import { RiUser3Line, RiMailCheckLine, RiShieldUserLine } from "react-icons/ri";
import {
  AiOutlineCalendar,
  AiFillEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import axios from "axios";
import Router from "next/router";
import { useStateValue } from "../Context/StateProvider";
import { toast } from "react-toastify";
import { SIGNUP } from "../constants/routes";
import { Phone } from "@mui/icons-material";
import format from "date-fns/format";

const signup = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [{ user }, dispatch] = useStateValue();
  const [passVisible, setPassVisible] = useState(true);
  const [passConfirmVisible, setPassConfirmVisible] = useState(true);
  const updateVisibility = () => {
    passVisible === false ? setPassVisible(true) : setPassVisible(false);
  };
  const updateConfirmVisibility = () => {
    passConfirmVisible === false
      ? setPassConfirmVisible(true)
      : setPassConfirmVisible(false);
  };
  const title = "signup | 3NOT3";

  axios.defaults.withCredentials = false;
  const userSignup = async () => {
    if (gender === "Gender") {
      toast.error("Please select Gender");
      return;
    }
    if (username.includes(" ")) {
      toast.error("username should not contain spaces");
      return;
    }
    if (mobile.length !== 10) {
      toast.error("Please enter a valid mobile number");
      return;
    }
    if (pincode.length > 0 && pincode.length !== 6) {
      toast.error("Please enter a valid pincode");
      return;
    }
    if (password !== confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (email.includes(" ")) {
      toast.error("email should not contain spaces");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Please enter a valid email");
      return;
    }
    if (password.length < 8) {
      toast.error("Password should be atleast 8 characters long");
      return;
    }

    // if (
    //   !password.match(/[a-z]/g) ||
    //   !password.match(/[A-Z]/g) ||
    //   !password.match(/[0-9]/g)
    // ) {
    //   toast.error("Password should contain atleast one number one uppercase and one lowercase");
    //   return;
    // }

    try {
      await axios
        .post(SIGNUP, {
          username: username,
          email: email,
          password: password,
          userType: 101,
          fullName: name,
          gender: gender,
          mobileNumber: mobile,
          dob: DOB,
          pincode: pincode.length === 6 ? pincode : 0,
        })
        .then((res) => {
          console.log(res);

          if (res.data.success === true) {
            toast.success("Successfully registered!");
            toast.success(
              "Verification Mail Sent Please Verify, please check your spam and promotion tab",
              {
                onClose: () => Router.push("/login"),
              }
            );
            localStorage.setItem("authToken", res.data.token);
            console.log("Auth token Saved");
            dispatch({
              type: "SET_USER",
              user: res.data.user,
            });
            // Router.push("/login");
          } else {
            dispatch({
              type: "SET_USER",
              user: null,
            });
          }
        });
    } catch (err) {
      toast.error(JSON.stringify(err.response.data.message));
      throw err.response;
    }
  };

  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [confirmpassword, setconfirmpassword] = useState([]);
  const [username, setusername] = useState([]);
  const [gender, setgender] = useState("Gender");
  const [mobile, setmobile] = useState([]);
  const [DOB, setDOB] = useState([]);
  const [DOBtodisplay, setDOBtodisplay] = useState([]);
  const [pincode, setpincode] = useState([]);
  useEffect(() => {
    if (window.innerWidth < 600) {
      setIsMobile(true);
    }
    const media = window.matchMedia(`(min-width: 800px)`);
    media.addEventListener("change", (e) => {
      if (e.matches) {
        setIsMobile(false);
        console.log(isMobile);
      } else {
        setIsMobile(true);
        console.log(isMobile);
      }
    });
    return () => media.removeEventListener("change", (e) => updateTarget(e));
  }, []);
  return (
    <div className={styles.signUp_container}>
      <Meta title={title}></Meta>
      <div className={styles.loginsignupBox + " " + "container"}>
        <div className={styles.loginFormSidetext}>
          <h2>Evolve your gaming experience</h2>
          <p>With ultimate gaming experience.</p>
        </div>
        <div className={styles.loginForm}>
          <h1>Create Account</h1>
          {/* user input */}
          <form action="">
            {/* <section>
              <i>
                <BsGoogle />
              </i>
              <i>
                <FaFacebookF />
              </i>
            </section>
            <span>- OR -</span> */}
            <label htmlFor="userFullname">
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                value={name}
                className={styles.iconName}
                placeholder="Full Name"
                required
              />
              <RiUser3Line />
            </label>
            <label htmlFor="userName">
              <input
                onChange={(e) => {
                  setusername(e.target.value);
                }}
                type="text"
                value={username}
                className={styles.iconName}
                placeholder="User Name"
                required
              />
              <RiShieldUserLine />
            </label>
            <label htmlFor="userGender">
              <select
                type="gender"
                onChange={(e) => {
                  setgender(e.target.value);
                }}
                value={gender}
                className={styles.icon}
                placeholder="Male / Female"
                required
              >
                <option>Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Others</option>
              </select>
              <BsGenderAmbiguous />
            </label>
            <label htmlFor="userPhone">
              <input
                type="number"
                onChange={(e) => {
                  setmobile(e.target.value);
                }}
                value={mobile}
                className={styles.icon}
                placeholder="Mobile Number"
                onWheel={(e) => e.target.blur()}
                required
              />
              <BsTelephone />
            </label>

            {isMobile && (
              <center>
                <p>Enter DOB</p>
              </center>
            )}
            <label htmlFor="userDOB">
              <input
                type={isMobile ? "date" : "text"}
                onFocus={(e) => {
                  e.target.type = "date";
                }}
                onBlur={(e) => {
                  e.target.type = "text";
                  //check if date is valid
                  if (e.target.value.length === 10) {
                    setDOBtodisplay(
                      format(new Date(DOBtodisplay), "dd-MM-yyyy")
                    );
                    if (new Date(DOB) > new Date()) {
                      toast.error("Please enter a valid date");
                      setDOB("");
                      setDOBtodisplay("");
                      return;
                    }
                  } else {
                    setDOB("");
                    setDOBtodisplay("");
                  }
                }}
                onChange={(e) => {
                  setDOB(e.target.value);
                  setDOBtodisplay(e.target.value);
                }}
                value={DOBtodisplay}
                className={styles.icon}
                placeholder="DOB - DD/MM/YYYY"
                style={{ textTransform: "uppercase" }}
                required
              />
              <AiOutlineCalendar />
            </label>
            <label htmlFor="userPincode">
              <input
                type="number"
                onChange={(e) => {
                  setpincode(e.target.value);
                }}
                onWheel={(e) => e.target.blur()}
                value={pincode}
                className={styles.icon}
                placeholder="PIN - CODE"
                required
              />
              <BsPinMap />
            </label>
            <label htmlFor="userEmail">
              <input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                className={styles.icon}
                placeholder="Email Address"
                required
              />
              <RiMailCheckLine />
            </label>
            <label htmlFor="userPassword">
              <input
                type={passVisible === true ? "password" : "text"}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
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
            <label htmlFor="userConfirmPassword">
              <input
                type={passConfirmVisible === true ? "password" : "text"}
                onChange={(e) => {
                  setconfirmpassword(e.target.value);
                }}
                value={confirmpassword}
                className={styles.iconPass}
                placeholder="Confirm Password"
                required
              />
              {passConfirmVisible === true ? (
                <i
                  style={{ cursor: "pointer" }}
                  onClick={() => updateConfirmVisibility()}
                >
                  <AiOutlineEyeInvisible />
                </i>
              ) : (
                <i
                  style={{ cursor: "pointer" }}
                  onClick={() => updateConfirmVisibility()}
                >
                  <AiFillEye />
                </i>
              )}
            </label>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                if (
                  name?.length !== 0 &&
                  email?.length !== 0 &&
                  password?.length !== 0 &&
                  username?.length !== 0
                ) {
                  userSignup();
                } else {
                  toast.error("Please fill all the details!");
                }
              }}
            >
              Create Account
            </button>
          </form>
          <p>
            Already have an account?{" "}
            <Link href="/login">
              <span style={{ cursor: "pointer", color: "#1b86ed" }}>Login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default signup;
