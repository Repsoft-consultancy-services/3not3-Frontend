import React from 'react';
import styles from "../styles/Home.module.css";
import Image from 'next/image';


export const Partner = ({logo}) => {
  return(
      <div className={styles.partnerCard}>
          <Image src={logo} width={260} height={200} />
      </div>
  );
};
