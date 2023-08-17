import Image from "next/image";
import logo from "../assets/img/webLogo.png";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import {
  AiFillYoutube,
  AiFillTwitterCircle,
  AiFillInstagram,
} from "react-icons/ai";
import { FaFacebook, FaDiscord, FaTelegram } from "react-icons/fa";
export const HomepageFooter = () => {
  return (
    <footer className={styles.webfooter}>
      <div className={styles.footerlogowrapper}>
        <div className={styles.webfooterlogo}>
          <Image src={logo} layout="fill" />
        </div>
      </div>
      <div className={styles.fs}>
        <div className={styles.fs1}>
          {/* <p>
            303 is the India’s first smart contract and blockchain technology
            base tournament platform
          </p>
          <p>We have smart contract base and blockchain Transparent system.</p> */}
          <h4>Social Channels</h4>
          <div className={styles.socialIconsF}>
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
          <div className={styles.footerlinks}>
            <p>About</p>
            <p>Terms & Conditions</p>
            <p>Privacy Policy</p>
          </div>
          <span>Copyright ® 2022 Oscorp Gaming All rights Reserved</span>
          {/* <Link href="https://repsoft.in/" passHref={true}>
            <center>Designed & Developed by Repsoft</center>
          </Link> */}
        </div>
        <div className={styles.fs2}>
          {/* <hr />
          <div>
            <p>Home</p>
            <p>Tournament</p>
            <p>Terms and Condition</p>
            <p>Privacy policy</p>
            <p>Contact Us</p>
          </div> */}
        </div>
      </div>
    </footer>
  );
};
