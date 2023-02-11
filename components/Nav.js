import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/Nav.module.css";
import Image from "next/image";
import { useStateValue } from "../Context/StateProvider";
import Router from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import webLogo from "../assets/img/webLogo.png";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { GiHamburgerMenu } from "react-icons/gi";

const Nav = () => {
  const [{ user }, dispatch] = useStateValue();
  const [logged, setLogged] = useState(false);
  const [haveteam, sethaveteam] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const UserData = JSON.parse(localStorage.getItem("authUser"));
      dispatch({
        type: "SET_USER",
        user: UserData,
      });
    }
  }, []);

  const [isMobile, setisMobile] = useState(false);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  useEffect(() => {
    if (window.innerWidth < 600) {
      setisMobile(true);
    }
    const media = window.matchMedia(`(max-width: 500px)`);
    media.addEventListener("change", (e) => {
      if (e.matches) {
        setisMobile(true);
      } else {
        setisMobile(false);
      }
    });
    return () => media.removeEventListener("change", (e) => updateTarget(e));
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("authUser");
    if (!accessToken) {
      setLogged(false);
    } else {
      setLogged(true);
      // if (JSON.parse(accessToken).user.teams.length == 0) {
      //   sethaveteam(false);
      // }
    }
  }, [])

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <nav className={styles.navbar}>
        <Link href="/">
          <div className={styles.navbarLogo}>
            <Image src={webLogo} layout="fill" />
          </div>
        </Link>
        <ul className={styles.navbarmainmenu}>
          <li>
            <Link exact href="/">
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link exact href={logged ? haveteam ? "/tournament" : "/teams" : "/signup"}>
              <span>Tournaments</span>
            </Link>
          </li>
          {user?.user.username ? (
            <>
              <li>
                {/* <Link exact href={"/profile/" + `${user?.user.username}`}> */}
                <Link exact href={"/payment"}>
                  <span>Wallet</span>
                </Link>
              </li>
              {/* <li>
                <Link exact href="/teams">
                  <span>Teams</span>
                </Link>
              </li> */}
            </>
          ) : (
            ""
          )}
          <li>
            <Link exact href="/futureInventory">
              <span>Future Inventory</span>
            </Link>
          </li>
          <li>
            <Link exact href="/leaderboard">
              <span>Leaderboard</span>
            </Link>
          </li>
        </ul>
        <span className={styles.navbarButton}>
          {user === null ? (
            <div className={styles.loginLogoutButton}>
              <Link href="/login">
                <button style={{ borderRadius: "5px" }}>Login</button>
              </Link>
              <Link href="/signup">
                <button style={{ borderRadius: "5px" }}>Sign up</button>
              </Link>
            </div>
          ) : (
            ""
          )}
          <div>
            <button
              ref={anchorRef}
              id="composition-button"
              aria-controls={open ? "composition-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              className={styles.logoutNav}
            >
              {user !== null ? (
                <Image
                  src={user ? user.user.profileImage : webLogo}
                  layout="fill"
                />
              ) : isMobile ? (
                <GiHamburgerMenu />
              ) : (
                ""
              )}
            </button>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
              className={styles.menuPopper}
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom-start" ? "left top" : "left bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                        sx={{ padding: ".5rem 1rem" }}
                      >
                        {user !== null ? (
                          <>
                            <div className={styles.navMinPdata}>
                              <strong>
                                {user?.user.username}
                                <br />
                              </strong>
                              {user?.user.email}
                              <hr style={{ backgroundColor: "white" }} />
                            </div>
                            <MenuItem
                              onClick={handleClose}
                              sx={{
                                display: "block !important",
                                padding: "0 !important",
                              }}
                            >
                              <Link
                                exact
                                href={"/profile/" + `${user?.user.username}`}
                              >
                                Profile
                              </Link>
                            </MenuItem>
                          </>
                        ) : (
                          ""
                        )}
                        <MenuItem className={styles.vs} onClick={handleClose}>
                          <Link exact href={"/"}>
                            Home
                          </Link>
                        </MenuItem>
                        <MenuItem className={styles.vs} onClick={handleClose}>
                          <Link exact href={"/futureInventory"}>
                            FutureInventory
                          </Link>
                        </MenuItem>
                        <MenuItem className={styles.vs} onClick={handleClose}>
                          <Link exact href={logged ? haveteam ? "/tournament" : "/teams" : "/signup"}>
                            Tournaments
                          </Link>
                        </MenuItem>
                        {user !== null ? (
                          <MenuItem className={styles.vs} onClick={handleClose}>
                            <Link exact href={"/payment"}>
                              Wallet
                            </Link>
                          </MenuItem>
                        ) : (
                          ""
                        )}
                        <MenuItem className={styles.vs} onClick={handleClose}>
                          <Link exact href={"/teams"}>
                            Teams
                          </Link>
                        </MenuItem>
                        <MenuItem className={styles.vs} onClick={handleClose}>
                          <Link exact href={"/leaderboard"}>
                            Leaderboard
                          </Link>
                        </MenuItem>
                        {user !== null ? (
                          <MenuItem
                            sx={{
                              display: "block !important",
                              padding: "0 !important",
                            }}
                            onClick={() => {
                              localStorage.removeItem("authUser");
                              dispatch({
                                type: "SET_USER",
                                user: null,
                              });
                              Router.push("/login");
                              handleClose;
                            }}
                          >
                            Logout
                          </MenuItem>
                        ) : (
                          ""
                        )}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </span>
      </nav>
    </>
  );
};

export default Nav;
