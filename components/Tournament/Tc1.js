import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import {
  GET_TEAM,
  GET_TOURNAMENT_BY_ID,
  GET_USER_DATA,
  IS_REGISTERED,
  REGISTER_TEAM,
  UNREGISTER_TEAM,
} from "../../constants/routes";
import { useStateValue } from "../../Context/StateProvider";
import axiosinstance from "../../util/axiosInstance";
import { Footer } from "../Footer";

import Image from "next/image";
import gameImage from "../../assets/img/img1.jpg";
import styles from "../../styles/TournamentDetails.module.css";
import Link from "next/link";
import { Loader } from "../Loader";
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
import { Typography } from "@material-ui/core";

import { toast } from "react-toastify";
import Moment from "react-moment";
import Chatter from "./Chatter";
import Bracket from "./Bracket";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Tc1 = () => {
  const [{ user }, dispatch] = useStateValue();
  const router = useRouter();
  const paramURL = router.query;
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [getTeamData, setGetTeamData] = useState(null);
  const [tData, setTData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(true);
  const [registeredTeam, setRegisteredTeam] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedteam, setSelectedteam] = useState("");
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [num, setNum] = useState();
  const [value, setValue] = useState("1");
  // console.log(user);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClickOpen = () => {
    checkTeam();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedteam("");
  };

  const getData = () => {
    getTournamentData();
    axios.get(`${GET_USER_DATA}${user.user.username}`).then((res) => {
      // console.log(res.data);
      setUserData(res.data.user);
      // const result = res.data.user.tournaments.find(
      //   (tournament) => tournament === data.data._id
      // );
      // console.log(result);
      // if (result === undefined) {
      //   setRegistered(false);
      // } else {
      //   setRegistered(true);
      // }
      // for (let i = 0; i < res.data.user.teams.length; i++) {
      //   for (let j = 0; j < data.data.teams.length; j++) {
      //     if (res.data.user.teams[i]._id === data.data.teams[j]._id) {
      //       console.log("yes match");
      //       setRegisteredTeam(res.data.user.teams[i]._id);
      //     }
      //   }
      // }
    });
  };
  const getTeam = () => {
    axiosinstance.get(`${GET_TEAM}${user.user._id}`).then((res) => {
      // console.log("hello teams log", res.data);
      setGetTeamData(res.data.teams);
    });
  };
  // team.gameName === data.data.gameName
  const checkTeam = () => {
    getTeamData.forEach((element) => {
      if (
        element.createdBy === user.user._id &&
        element.gameName === data.data.gameName
      ) {
        setNum(num++);
      }
      console.log(num);
    });
    if (num > 0) {
      setShow(true);
    }
  };

  const getTournamentData = () => {
    axios.get(`${GET_TOURNAMENT_BY_ID}/${paramURL.id}`).then((res) => {
      res.data.data.prizes = JSON.parse(res.data.data.prizes);
      setData(res.data);
    });
  };

  const registerTeam = () => {
    // const { user } = JSON.parse(localStorage.getItem("authUser"));
    if (!selectedteam) {
      toast.error("Please Select a Team");
      return;
    }
    axiosinstance
      .post(`${REGISTER_TEAM}${data.data._id}`, {
        teamId: selectedteam,
      })
      .then((res) => {
        // console.log(res);
        getData();
        getTournamentData();
        isRegistered();
        if (res.data.success) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        // console.log(err);
        //
        toast.error(err.message);
      });

    handleClose();
  };

  const unregisterTeam = () => {
    // const { user } = JSON.parse(localStorage.getItem("authUser"));
    axiosinstance
      .post(`${UNREGISTER_TEAM}${data.data._id}`, {
        teamId: registeredTeam,
      })
      .then((res) => {
        // console.log(res);
        getData();
        getTournamentData();
        isRegistered();
        toast.success(res.data.message);
      })
      .catch((err) => {
        // console.log(err);
        toast.error(err.response.data.message);
      });

    handleClose();
  };

  const isRegistered = () => {
    axiosinstance
      .get(`${IS_REGISTERED}/${paramURL.id}/isRegistered`)
      .then((res) => {
        setRegistered(res.data.success);
        setRegisteredTeam(res.data.teamId);
      });
  };

  useEffect(() => {
    if (window.innerWidth < 600) {
      setIsMobile(true);
    }
    const media = window.matchMedia(`(min-width: 800px)`);
    media.addEventListener("change", (e) => {
      if (e.matches) {
        setIsMobile(false);
        console.log(isMobile);
      } else {
        setIsMobile(true);
        console.log(isMobile);
      }
    });
    return () => media.removeEventListener("change", (e) => updateTarget(e));
  }, []);

  useEffect(() => {
    setLoading(true);
    axios.get(`${GET_TOURNAMENT_BY_ID}/${paramURL.id}`).then((res) => {
      // console.log(res.data);
      res.data.data.prizes = JSON.parse(res.data.data.prizes);
      setData(res.data);
      getData();
      getTeam();
      getTournamentData();
      isRegistered();
      setNum(0);
      setLoading(false);
      //   checkRegistered();
    });
  }, []);
  if (isLoading) return <Loader />;
  if (!user) return <Loader />;

  if (!data) return <Loader />;
  if (!getTeamData) return <Loader />;
  return (
    <div>
      <>
        {registered ? (
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle style={{ backgroundColor: "#1B1F34", color: "white" }}>
              {"Seems like you are Already Registered"}
            </DialogTitle>
            <DialogContent
              style={{ backgroundColor: "#1B1F34", color: "white" }}
            >
              <DialogContentText
                style={{
                  backgroundColor: "#1B1F34",
                  color: "white",
                }}
                id="alert-dialog-slide-description"
              >
                {getTeamData.length !== 0 ? (
                  <>
                    <p>Are you sure you want to unregister?</p>

                    {/* {getTeamData?.map(
                      (team, index) =>
                        team.createdBy === user?.user?._id &&
                        team.gameName === data.data.gameName && (
                          <div key={index}>
                            <button
                              className={
                                selectedteam === team._id
                                  ? styles.selectedTeamButton +
                                    " " +
                                    styles.selectedTeamButtonPrimary
                                  : styles.selectedTeamButton
                              }
                              onClick={() => {
                                setSelectedteam(team?._id);
                              }}
                            >
                              {team?.name}
                            </button>
                          </div>
                        )
                    )} */}
                    <DialogActions>
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "#1B86ED",
                          color: "white",
                          padding: "5px",
                          borderRadius: "3px",
                        }}
                        onClick={unregisterTeam}
                      >
                        Unregister
                      </Button>
                      <Button
                        variant="outlined"
                        style={{
                          color: "white",
                          padding: "5px",
                          borderRadius: "3px",
                          border: "0.5px solid #FFFFFF60",
                        }}
                        onClick={handleClose}
                      >
                        Cancel
                      </Button>
                    </DialogActions>
                  </>
                ) : (
                  <div>
                    <p>Seems like you Dont have a team !</p>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Link href="/teams">
                        <Button>Create</Button>
                      </Link>
                    </DialogActions>
                  </div>
                )}
              </DialogContentText>
            </DialogContent>
          </Dialog>
        ) : (
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle style={{ backgroundColor: "#1B1F34", color: "white" }}>
              {"Are you Sure you want to join the team"}
            </DialogTitle>
            <DialogContent
              style={{ backgroundColor: "#1B1F34", color: "white" }}
            >
              <DialogContentText
                style={{
                  backgroundColor: "#1B1F34",
                  color: "white",
                }}
                id="alert-dialog-slide-description"
              >
                {getTeamData?.length !== 0 ? (
                  <>
                    {num !== 0 && <p> Select a Team to continue</p>}

                    {getTeamData.map(
                      (team, index) =>
                        team.createdBy === user.user._id &&
                        team.gameName === data.data.gameName && (
                          <div key={index}>
                            <>
                              <button
                                className={
                                  selectedteam === team._id
                                    ? styles.selectedTeamButton +
                                    " " +
                                    styles.selectedTeamButtonPrimary
                                    : styles.selectedTeamButton
                                }
                                onClick={() => {
                                  setSelectedteam(team._id);
                                }}
                              >
                                {team.name}
                              </button>
                            </>
                          </div>
                        )
                    )}
                    {show ? (
                      <DialogActions>
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "#1B86ED",
                            color: "white",
                            padding: "5px",
                            borderRadius: "3px",
                          }}
                          onClick={registerTeam}
                        >
                          Join
                        </Button>
                        <Button
                          variant="outlined"
                          style={{
                            color: "white",
                            padding: "5px",
                            borderRadius: "3px",
                            border: "0.5px solid #FFFFFF60",
                          }}
                          onClick={handleClose}
                        >
                          Cancel
                        </Button>
                      </DialogActions>
                    ) : (
                      <div>
                        <p>Seems like you Dont have a team !</p>
                        <DialogActions>
                          <Button onClick={handleClose}>Cancel</Button>
                          <Link href="/teams">
                            <Button>Create</Button>
                          </Link>
                        </DialogActions>
                      </div>
                    )}
                  </>
                ) : (
                  <div>
                    <p>Seems like you Dont have a team !</p>
                    <Typography component={"span"}>
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Link href="/teams">
                          <Button>Create</Button>
                        </Link>
                      </DialogActions>
                    </Typography>
                  </div>
                )}
              </DialogContentText>
            </DialogContent>
          </Dialog>
        )}

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
                      {data.data.status === "started" ||
                        data.data.status === "waiting" ||
                        data.data.status === "completed" ? (
                        <button disabled>
                          <i>
                            <BsPersonFill />
                          </i>
                          {data.data.status}
                        </button>
                      ) : registered ? (
                        <button onClick={unregisterTeam}>
                          <i>
                            <BsPersonFill />
                          </i>
                          Unregister
                        </button>
                      ) : (
                        <button
                          disabled={
                            data.data.maximumTeams <= data.data.teams.length
                          }
                          onClick={handleClickOpen}
                        >
                          <i>
                            <BsPersonFill />
                          </i>
                          Join
                        </button>
                      )}
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
                  {isMobile &&
                    (data.data.status === "started" ||
                      data.data.status === "waiting" ||
                      data.data.status === "completed" ? (
                      <button className={styles.mobilejoin} disabled>
                        <i>
                          <BsPersonFill />
                        </i>
                        {data.data.status}
                      </button>
                    ) : registered ? (
                      <button
                        className={styles.mobilejoin}
                        onClick={unregisterTeam}
                      >
                        <i>
                          <BsPersonFill />
                        </i>
                        Unregister
                      </button>
                    ) : (
                      <button
                        className={styles.mobilejoin}
                        disabled={
                          data.data.maximumTeams <= data.data.teams.length
                        }
                        onClick={handleClickOpen}
                      >
                        <i>
                          <BsPersonFill />
                        </i>
                        Join
                      </button>
                    ))}
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
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                aria-label="scrollable force tabs example"
                textColor="inherit"
                indicatorColor="primary"
              >
                <Tab label="Overview" value="1" />
                <Tab label="Teams" value="2" />
                {data.data.gameMode == "Multiplayer" && (
                  <Tab label="Brackets" value="3" />
                )}
                {registered && <Tab label="Schedule" value="4" />}
                <Tab label="Rules" value="5" />
                <Tab label="Prizes" value="6" />
              </Tabs>

              <TabPanel value="1">
                <About description={data.data.description} />
              </TabPanel>
              <TabPanel value="2">
                <PlayerTable teams={data.data.teams} />
              </TabPanel>
              {data.data.gameMode == "Multiplayer" && (
                <TabPanel value="3">
                  {data.data.bracket ? (
                    <Bracket bracketId={data.data.bracket} />
                  ) : (
                    <center>
                      <h2>No Bracket</h2>
                    </center>
                  )}
                </TabPanel>
              )}
              <TabPanel value="4">
                {data.data.status === "started" ||
                  data.data.status === "completed" ? (
                  data.data.gameMode == "Battle Royale" ||
                    data.data.gameMode == "BattleRoyale" ? (
                    <Schedule
                      tid={paramURL.id}
                      registered={registered}
                      registeredTeam={registeredTeam}
                      status={data.data.status}
                    // getData={getData}
                    />
                  ) : (
                    <Chatter
                      teamid={registeredTeam}
                      bracket={data.data.bracket}
                      cuser={user}
                      registeredTeam={registeredTeam}
                      leader={""}
                    />
                  )
                ) : (
                  <center>
                    <h2>Tournament Not Started</h2>
                  </center>
                )}
              </TabPanel>
              <TabPanel value="5">
                <Rules rules={data.data.rules} />
              </TabPanel>
              <TabPanel value="6">
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

export default Tc1;
