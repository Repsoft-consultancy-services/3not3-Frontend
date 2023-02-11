import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import styles from "../styles/Payment.module.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export const PytAcc = ({ date, status, type, amount, details }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [rowcolor, setRowcolor] = React.useState("#0B0F20 !important");
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    setRowcolor(
      rowcolor === "#0B0F20 !important"
        ? "#060814 !important"
        : "#0B0F20 !important"
    );
  };
  return (
    <>
      <Accordion
        sx={{ bgcolor: rowcolor }}
        className={styles.paymentsAccordianMUIcomponent}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          className={styles.paymentsAccordianSummaryMUIcomponent}
        >
          <div className={styles.paymentsAccordianRow}>
            <p>{date}</p>
            {status === "Pending" ? (
              <p style={{ backgroundColor: "#F1C40FB5" }}>Pending</p>
            ) : status === "Failed" ? (
              <p style={{ backgroundColor: "#D82B2B" }}>Failed</p>
            ) : status === "Success" ? (
              <p style={{ backgroundColor: "#07BC0C" }}>Success</p>
            ) : (
              <p style={{ backgroundColor: "#1B1F34" }}>Not Available</p>
            )}
            <p>{type}</p>
            <p>{amount}</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              nam, temporibus est obcaecati minus tenetur. Tenetur illo
              asperiores obcaecati tempore beatae fugiat voluptatibus officiis,
              voluptas eum, ipsa cumque. Totam, nostrum?
            </p>
            <p>{expanded ? <IoIosArrowUp /> : <IoIosArrowDown />}</p>
          </div>
        </AccordionSummary>
        <AccordionDetails>Transaction Id</AccordionDetails>
      </Accordion>
      <div className={styles.mobPytAcc}>
        {status === "Pending" ? (
          <p style={{ backgroundColor: "#F1C40FB5" }}>Pending</p>
        ) : status === "Failed" ? (
          <p style={{ backgroundColor: "#D82B2B" }}>Failed</p>
        ) : status === "Success" ? (
          <p style={{ backgroundColor: "#07BC0C" }}>Success</p>
        ) : (
          <p style={{ backgroundColor: "#1B1F34" }}>Not Available</p>
        )}
        <p className={styles.mobPytAccP2}>
          <p>
            Lorem ipsum dolor sit amet, conse element Lorem ipsum dolor sit
            amet, conse element Lorem ipsum dolor sit amet, conse element{" "}
          </p>
          <p>{date}</p>
          <p>{type}</p>
        </p>
        <p>{amount}</p>
      </div>
    </>
  );
};
