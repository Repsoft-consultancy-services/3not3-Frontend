import React from "react";
import Link from "next/link";
import styles from "../styles/Copyright.module.css";
const Copyright = () => {
  return (
    <div className={styles.sticky}>
      <Link href="https://repsoft.in/" passHref={true}>
      <center>Designed & Developed by Repsoft</center>
      </Link>
    </div>
  );
};

export default Copyright;
