import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import {
  GET_TEAM,
  GET_TOURNAMENT_BY_ID,
  REGISTER_TEAM,
  UNREGISTER_TEAM,
} from "../../constants/routes";

import axiosinstance from "../../util/axiosInstance";
import { Footer } from "../Footer";

import Image from "next/image";
import gameImage from "../../assets/img/img1.jpg";
import styles from "../../styles/TournamentDetails.module.css";
import Link from "next/link";

import {
  BsShareFill,
  BsPersonFill,
  BsTrophyFill,
  BsSuitSpadeFill,
  BsPeopleFill,
  BsCheck2Circle,
  BsFillBarChartFill,
} from "react-icons/bs";
import { RiCoinsFill, RiGamepadLine } from "react-icons/ri";
import PlayFort from "../../assets/img/fort.png";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabPanel from "@material-ui/lab/TabPanel";
import About from "./About";
import PlayerTable from "./PlayerTable";
import Schedule from "./Schedule";
import Rules from "./Rules";
import Prize from "./Prize";
import { Tabs } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import { toast } from "react-toastify";
import Moment from "react-moment";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Tc2 = () => {
  const router = useRouter();
  const paramURL = router.query;
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [getTeamData, setGetTeamData] = useState(null);
  const [tData, setTData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(true);
  const [registeredTeam, setRegisteredTeam] = useState([]);
  const [isMobile, setisMobile] = useState(false);
  const [selectedteam, setSelectedteam] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClickOpen = () => {
    toast.error("Please login to register");
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedteam("");
  };

  const getTournamentData = () => {
    axios.get(`${GET_TOURNAMENT_BY_ID}/${paramURL.id}`).then((res) => {
      // console.log(res.data);
      res.data.data.prizes = JSON.parse(res.data.data.prizes);
      setData(res.data);
    });
  };

  useEffect(() => {
    if (window.innerWidth < 600) {
      setisMobile(true);
    }
    const media = window.matchMedia(`(max-width: 600px)`);
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
    setLoading(true);
    axios.get(`${GET_TOURNAMENT_BY_ID}/${paramURL.id}`).then((res) => {
      res.data.data.prizes = JSON.parse(res.data.data.prizes);
      setData(res.data);
      getTournamentData();
      setLoading(false);
      //   checkRegistered();
    });
  }, []);
  // console.log(tData);

  if (isLoading) return <p>Loading...</p>;

  if (!data) return <p>No tournament data</p>;
  return (
    <div>
      <>
        <div className={styles.backgroundImage}>
          <img
            className={styles.backImage}
            alt="backgroundImage"
            layout="fill"
            // objectFit="cover"
            src={data.data.banner}
          />
        </div>
        <div className={styles.upperSection + " " + "container"}>
          <div className={styles.tourneyCard}>
            {isMobile ? (
              <div className={styles.tourneyImageflex}>
                <div className={styles.tourneyImage}>
                  <Image
                    alt="gameImage"
                    layout="fill"
                    src={data.data.thumbnail}
                    objectFit="cover"
                  />
                </div>
                <div className={styles.tourneyTitleAndInfo}>
                  {/* <p>SEP 02 Starting at 06:00 pm</p> */}
                  <span className={styles.tourneydetailpafeTitle}>
                    <h4>
                      <Image
                        alt="gameIcon"
                        src={
                          "https://res.cloudinary.com/nakul-londhe/image/upload/v1650805269/kixhnkx2fudffanpt0le.png"
                        }
                        width={30}
                        height={20}
                      />
                      {data.data.name}
                    </h4>
                    <section
                      style={{ display: "flex", justifyItems: "center" }}
                    >
                      <div className={styles.timing} style={{ borderRight: 0 }}>
                        <p>To start</p>
                        <Moment format="DD MMMM">{data.data.startDate}</Moment>
                      </div>
                      <div>
                        <i
                          onClick={() => {
                            const el = document.createElement("input");
                            el.value = window.location.href;
                            document.body.appendChild(el);
                            el.select();
                            document.execCommand("copy");
                            document.body.removeChild(el);
                            toast.success("Link Copied");
                          }}
                        >
                          <BsShareFill />
                        </i>
                      </div>
                    </section>
                  </span>
                </div>
              </div>
            ) : (
              <div className={styles.tourneyImage}>
                <Image
                  alt="gameImage"
                  layout="fill"
                  src={data.data.thumbnail}
                  objectFit="cover"
                />
              </div>
            )}
            <div className={styles.tourneyDetails}>
              {!isMobile && (
                <div className={styles.tourneyTitleAndInfo}>
                  {/* <p>SEP 02 Starting at 06:00 pm</p> */}
                  <span className={styles.tourneydetailpafeTitle}>
                    <h4>
                      <Image
                        alt="gameIcon"
                        src={
                          "https://res.cloudinary.com/nakul-londhe/image/upload/v1650805269/kixhnkx2fudffanpt0le.png"
                        }
                        width={30}
                        height={20}
                      />
                      {data.data.name}
                      <i
                        onClick={() => {
                          const el = document.createElement("input");
                          el.value = window.location.href;
                          document.body.appendChild(el);
                          el.select();
                          document.execCommand("copy");
                          document.body.removeChild(el);
                          toast.success("Link Copied");
                        }}
                      >
                        <BsShareFill />
                      </i>
                    </h4>
                    <section style={{ display: "flex", alignItems: "center" }}>
                      <div className={styles.timing}>
                        <p>To start</p>
                        <h6>
                          {" "}
                          <Moment format="DD MMMM YYYY">
                            {data.data.startDate}
                          </Moment>
                        </h6>
                      </div>
                      {
                        <Link href="/login">
                          <button>
                            <i>
                              <BsPersonFill />
                            </i>
                            Login to Join
                          </button>
                        </Link>
                      }
                    </section>
                  </span>
                </div>
              )}
              <div className={styles.tourneyPrizeAndDetails}>
                <div>
                  <p>Prize pool</p>
                  <span>
                    <i className={styles.itrophy}>
                      <BsTrophyFill />
                    </i>
                    {data.data.prizes.map((prize) => prize.prize).reduce((a, b) => parseInt(a) + parseInt(b))}
                  </span>
                </div>
                <div>
                  <p>Team size</p>
                  <span>
                    <i className={styles.iSpade}>
                      <BsSuitSpadeFill />
                    </i>
                    {/* {featured[tournament.id - 1]?.gameMode} */}
                    {data.data.membersPerTeam}
                  </span>
                </div>
                <div>
                  <p>Max teams</p>
                  <span>
                    <i className={styles.iPeople}>
                      <BsPeopleFill />
                    </i>
                    {/* {featured[data.id - 1]?.maxteam} */}
                    {data.data.maximumTeams}
                  </span>
                </div>
                <div>
                  <p>Joined</p>
                  <span>
                    <i className={styles.iCheck}>
                      <BsCheck2Circle />
                    </i>
                    {data.data.teams.length}
                  </span>
                </div>
                {data.data.entryFee && (
                  <div>
                    <p>
                      <i>
                        <RiCoinsFill />
                      </i>
                      Entry Fees
                    </p>
                    <span>{data.data.entryFee}</span>
                  </div>
                )}
                <div>
                  <p>
                    <i>
                      <RiGamepadLine />
                    </i>
                    Game
                  </p>
                  <span>{data.data.gameName}</span>
                </div>
                <div>
                  {/* <p>
                  <i>
                    <BsFillBarChartFill />
                  </i>
                  Skill level
                </p>
                <span>{featured[data.id - 1]?.skill}</span> */}
                </div>
                <div>
                  {/* <p>
                  <i>
                    <RiGamepadLine />
                  </i>
                  Platform
                </p>
                <span>{featured[tournament.id - 1]?.platform}</span> */}
                  {isMobile && (
                    <button
                      onClick={handleClickOpen}
                      className={styles.mobilejoin}
                    >
                      <i>
                        <BsPersonFill />
                      </i>
                      Login to Join
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <>
          <br></br>
          <div className={styles.bottomSection + " " + "container"}>
            <TabContext value={value}>
              <Tabs
                textColor="inherit"
                variant={isMobile && "scrollable"}
                indicatorColor="primary"
                centered={!isMobile}
                value={value}
                onChange={handleChange}
                aria-label="tabs"
              >
                <Tab label="Overview" value="1" />
                <Tab label="Teams" value="2" />

                <Tab label="Rules" value="4" />
                <Tab label="Prizes" value="5" />
              </Tabs>

              <TabPanel value="1">
                <About description={data.data.description} />
              </TabPanel>
              <TabPanel value="2">
                <PlayerTable teams={data.data.teams} />
              </TabPanel>
              <TabPanel value="4">
                <Rules rules={data.data.rules} />
              </TabPanel>
              <TabPanel value="5">
                <Prize prizes={data.data.prizes} />
              </TabPanel>
            </TabContext>
          </div>{" "}
        </>
        <div className={"container"}>
          <Footer />
        </div>
      </>
    </div>
  );
};

export default Tc2;
