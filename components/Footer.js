import React from "react";
import Image from "next/image";
import logo from "../assets/img/webLogo.png";
import styles from "../styles/Innerfooter.module.css";
import {
  AiFillYoutube,
  AiFillTwitterCircle,
  AiFillInstagram,
} from "react-icons/ai";
import { FaFacebook, FaDiscord, FaTelegram } from "react-icons/fa";
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
            Oscorp Gaming is new generations gaming platform. We are supporting
            new level of competition for our users and surpass end user
            experiences. lets, feel the competitiveness.
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
            <Link
              exact
              href={
                "https://discord.com/channels/1113350985918726144/1116975398698360833"
              }
            >
              <a target="_blank">
                <FaDiscord />
              </a>
            </Link>
            <Link exact href={"https://t.me/oscorpgaming"}>
              <a target="_blank">
                <FaTelegram />
              </a>
            </Link>
            <Link
              exact
              href={"https://instagram.com/oscorp.gaming?igshid=ZDdkNTZiNTM="}
            >
              <a target="_blank">
                <AiFillInstagram />
              </a>
            </Link>
          </div>
          <span>Copyright ® 2022 Oscorp Gaming All rights Reserved</span>
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
            <FaTelegram />
          </div>
        </div>
      </div>
    </footer>
  );
};
