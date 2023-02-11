import React from "react";
import styles from "../styles/ComingSoon.module.css";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiOutlineTwitter,
  AiFillLinkedin,
} from "react-icons/ai";

const ComingSoon = () => {
  return (
    <div className={styles.ComingSoonPage}>
      <section className={styles.comingSoonMsg}>
        <h1 className={styles.text}>Coming Soon</h1>
        <p>
          From mobile gaming to hosting huge gamesports we do it all and we can
          do it for you.
        </p>
        <div className={styles.enterEmail}>
          <input
            type="email"
            placeholder="Please enter your email address"
            required
          />
          <button>Notify Me</button>
        </div>
        <span>-_Notify me when app is launched_-</span>
      </section>
      <footer>
        <h5>Privacy Policy</h5>
        <div>
          <i className={styles.icons}>
            <AiFillFacebook />
          </i>
          <i className={styles.icons}>
            <AiFillInstagram />
          </i>
          <i className={styles.icons}>
            <AiOutlineTwitter />
          </i>
          <i className={styles.icons}>
            <AiFillLinkedin />
          </i>
        </div>
      </footer>
    </div>
  );
};

export default ComingSoon;
