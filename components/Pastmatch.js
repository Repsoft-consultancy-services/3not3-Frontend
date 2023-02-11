import React from 'react';
import styles from '../styles/Teams.module.css';

export const Pastmatch = () => {
  return (
      <div className={styles.pastresult}>
          <p className={styles.mdate}>
            12 April 2020
          </p>
          <p className={styles.mteamName}>
            Team XO
          </p>
          <p className={styles.mGame}>
            Valvorant
          </p>
          <p className={styles.mPrize}>
            $1400
          </p>
          <p className={styles.mScore}>
            <span>13</span>
            :
            <span>11</span>
          </p>
          <p className={styles.mResult}>
            W
          </p>
      </div>
  );
};
