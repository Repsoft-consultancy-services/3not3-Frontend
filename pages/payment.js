import React, { useState, useEffect } from "react";
import { PytAcc } from "../components/PytAcc";
import styles from "../styles/Payment.module.css";
import { Footer } from "../components/Footer";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ImCross } from "react-icons/im";
import { BsSliders } from "react-icons/bs";
const payment = () => {
  const [open, setOpen] = useState(false);
  const [opne2, setOpen2] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleopen2 = () => {
    setOpen2(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleclose2 = () => {
    setOpen2(false);
  };
  useEffect(() => {
    const media = window.matchMedia(`(min-width: 500px)`);
    media.addEventListener("change", (e) => {
      if (e.matches) {
        setOpen2(false);
      }
    });
    return () => media.removeEventListener("change", (e) => updateTarget(e));
  }, []);
  return (
    <div className={"container"}>
      <div className={styles.payments}>
        <h2>Wallet</h2>
        <span className={styles.paymentsAmount}>
          {/* ballance */}
          <span>
            <h5>Wallet Balance</h5>
            <p>$0</p>
          </span>
          {/* Total Winning */}
          <span>
            <h5>Total Winning</h5>
            <p>$0</p>
          </span>
          {/* Buttons */}
          <span>
            <button onClick={handleClickOpen}>+ Deposit</button>
            <button onClick={handleClickOpen}>Withdraw</button>
          </span>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <div className={styles.withdrawPopup}>
              <i onClick={handleClose}>
                <ImCross />
              </i>
              {/* <p>
                <span className={styles.colorBlue}>Wallet Balance</span>
                <span className={styles.Amount}>$0</span>
              </p>
              <p>Add Money To Wallet</p>
              <p>
                <span className={styles.AmountInput}>
                  $<input type="text" placeholder="Enter Amount" />
                </span>
                <button>Add Money</button>
              </p>
              <p className={styles.colorBlue}>Have a promocode ?</p> */}
              <center>
                <h3>Wallet System Coming Soon</h3>
              </center>
            </div>
          </Dialog>
          <Dialog
            open={opne2}
            onClose={handleclose2}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <div className={styles.filterpopup}>
              <div className={styles.filterpopupwrapper}>
                <div className={styles.popupflex}>
                  <h3>Filter</h3>
                  <i onClick={handleclose2}>
                    <ImCross />
                  </i>
                </div>
                <h4>Dates</h4>
                <div className={styles.popupflex}>
                  <div>
                    <h5>From</h5>
                    <button className={styles.datebutton}>6th February</button>
                  </div>
                  <div>
                    <h5>To</h5>
                    <button className={styles.datebutton}>16th February</button>
                  </div>
                </div>
                <h4>Status By</h4>
                <div className={styles.popupflex}>
                  <button>Success</button>
                  <button>Pending</button>
                  <button>Failed</button>
                </div>
                <h4>Filter Payouts</h4>
              </div>
            </div>
          </Dialog>
        </span>
        {/* Payment History */}
        <header className={styles.paymentHistory}>
          <h1>Payment History</h1>
          <BsSliders onClick={handleopen2} />
          <button>Filter Payouts</button>
          <button>Status By</button>
          <button>From</button>
          <button>To</button>
        </header>
        {/* accordian */}
        <section className={styles.paymentsAccordian}>
          <header className={styles.paymentsAccordianHeader}>
            <p>Date</p>
            <p>Status</p>
            <p>Type</p>
            <p>Amount</p>
            <p>Details</p>
          </header>
          <center>
            <h2 style={{ color: "#ffffffb8" }}>No transaction to show.</h2>
          </center>
          {/* <PytAcc 
                date={"April 1, 2022"} 
                status={"Pending"} 
                type={"Withdraw"} 
                amount={"$21.00.40"} 
                details={""}
            /> */}
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default payment;
