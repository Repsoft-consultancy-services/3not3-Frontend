import React from "react";
import Image from "next/image";
import logo from "../assets/img/webLogo.png";
import styles from "../styles/Innerfooter.module.css";
import {
  AiFillYoutube,
  AiFillTwitterCircle,
  AiFillInstagram,
} from "react-icons/ai";
import { FaFacebook, FaDiscord } from "react-icons/fa";
import innerfooterbg from "../assets/img/innnerfooterbg.png";
import Link from "next/link";
export const Footer = () => {
  return (
    <footer className={styles.innerfooter + " " + "container"}>
      {/* <Image src={innerfooterbg} layout="fill" className={styles.innerfooterimg}/> */}
      <span className={styles.subscribeHere}>
        <input type="email" placeholder="Enter email id ..." />
        <button>Subscribe</button>
      </span>
      <div className={styles.innerfooterlogo}>
        <Image src={logo} layout="fill" />
      </div>
      <div className={styles.ifs}>
        <div className={styles.ifs1}>
          <hr />
          <p>
            3not3 is new generations gaming platform. We are supporting new
            level of competition for our users and surpass end user experiences.
            lets, feel the competitiveness.
          </p>
          <div className={styles.isocialIconsF1}>
            <Link exact href={"https://www.facebook.com/3not3esportsofficial"}>
              <a target="_blank">
                <FaFacebook />
              </a>
            </Link>
            <Link
              exact
              href={"https://www.youtube.com/channel/UC0tgVQqB3W3d805EdYoArUw"}
            >
              <a target="_blank">
                <AiFillYoutube />
              </a>
            </Link>
            <Link exact href={"https://discord.gg/7Ae2C4n9tN"}>
              <a target="_blank">
                <FaDiscord />
              </a>
            </Link>
            <Link exact href={"https://twitter.com/3not3esports"}>
              <a target="_blank">
                <AiFillTwitterCircle />
              </a>
            </Link>
            <Link
              exact
              href={"https://www.instagram.com/3not3esportsofficial/"}
            >
              <a target="_blank">
                <AiFillInstagram />
              </a>
            </Link>
          </div>
          <span>Copyright ® 2022 3NOT3 All rights Reserved</span>
        </div>
        <div className={styles.ifs2}>
          {/* <hr />
          <div>
            <p>About Us</p>
            <p>Zeux</p>
            <p>Portfolio</p>
            <p>Careers</p>
            <p>Contact Us</p>
          </div> */}
          <div className={styles.isocialIconsF2}>
            <FaFacebook />
            <AiFillYoutube />
            <FaDiscord />
            <AiFillTwitterCircle />
          </div>
        </div>
      </div>
    </footer>
  );
};
