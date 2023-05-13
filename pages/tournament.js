import React, { useEffect, useState } from "react";
import styles from "../styles/Tournament.module.css";
import Image from "next/image";
import img from "../assets/img/img1.jpg";
import Carousel from "react-multi-carousel";
import TournamentCard from "../components/TournamentCard";
import "react-multi-carousel/lib/styles.css";
import Apex from "../assets/img/apex.png";
import Dota from "../assets/img/Dota2.png";
import Fortnite from "../assets/img/fortnite.png";
import Valo from "../assets/img/valo.png";
import Overwatch from "../assets/img/overwatch.png";
import PlayFort from "../assets/img/fort.png";
import ValLogo from "../assets/img/valoLogo.png";
import OverwatchLogo from "../assets/img/overwatchlogo.png";
import ApexLogo from "../assets/img/apexLogo.png";
import DotaLogo from "../assets/img/dota2logo.png";
import axios from "axios";
import { Footer } from "../components/Footer";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabPanel from "@material-ui/lab/TabPanel";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tabs,
  Typography,
} from "@mui/material";
import { GET_TOURNAMNETS } from "../constants/routes";
import NewTournamentCard from "../components/Tournament/NewTournamentCard";
import { Box } from "@mui/system";
const tournament = () => {
  const topPlayers = [
    {
      id: "1",
      icon: PlayFort,
      name: "Matin Bot 2.0",
      level: "52",
    },
    { id: "2", icon: PlayFort, name: "Sasuke Uchiha", level: "55" },
    { id: "3", icon: PlayFort, name: "Apurv Gupta", level: "56" },
    { id: "4", icon: PlayFort, name: "nakul prasad", level: "50" },
    { id: "5", icon: PlayFort, name: "manish matin", level: "58" },
  ];
  const gameData = [
    {
      id: "1",
      image: Overwatch,
      icon: OverwatchLogo,
      name: "OverWatch",
      players: "12,100",
    },
    {
      id: "2",
      image: Fortnite,
      icon: PlayFort,
      name: "Fortnite",
      players: "22,100",
    },
    {
      id: "3",
      image: Dota,
      icon: DotaLogo,
      name: "Dota 2",
      players: "10,100",
    },
    {
      id: "4",
      image: Valo,
      icon: ValLogo,
      name: "Valorant",
      players: "30,100",
    },
    {
      id: "5",
      image: Apex,
      icon: ApexLogo,
      name: "Apex Legends",
      players: "12,100",
    },
  ];
  const responsiveRecommend = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1025 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1024, min: 769 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 768, min: 427 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 426, min: 0 },
      items: 2,
    },
    smallmobile: {
      breakpoint: { max: 350, min: 0 },
      items: 1,
    },
  };
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1025 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1024, min: 769 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 425 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 424, min: 0 },
      items: 1,
    },
  };

  const featured = [
    {
      id: "1",
      gameTitle: "Fall strom battle",
      prizepool: "$2100",
      gameMode: "6 v 6",
      entryFee: "$500",
      organiser: "XYZ esport",
      maxteam: "25",
      joined: "89/140",
      game: "Fortnite",
      skill: "All skills",
      platform: "cross-platform",
    },
    {
      id: "2",
      gameTitle: "Fall strom battle 2",
      prizepool: "$1000",
      gameMode: "solo",
      entryFee: "$150",
      organiser: "XYZ esport",
      maxteam: "25",
      joined: "89/140",
      game: "Fortnite",
      skill: "All skills",
      platform: "cross-platform",
    },
    {
      id: "3",
      gameTitle: "Season 3 envasion",
      prizepool: "$1500",
      gameMode: "Team",
      entryFee: "$250",
      organiser: "XYZ esport",
      maxteam: "25",
      joined: "89/140",
      game: "Fortnite",
      skill: "All skills",
      platform: "cross-platform",
    },
    {
      id: "4",
      gameTitle: "Save the World",
      prizepool: "$10000",
      gameMode: "50 v 50",
      entryFee: "$450",
      organiser: "XZ esport",
      maxteam: "25",
      joined: "89/140",
      game: "Fortnite",
      skill: "All skills",
      platform: "cross-platform",
    },
    {
      id: "5",
      gameTitle: "Fall strom battle",
      prizepool: "$2100",
      gameMode: "6 v 6",
      entryFee: "$50",
      organiser: "XZ esport",
      maxteam: "25",
      joined: "89/140",
      game: "Fortnite",
      skill: "All skills",
      platform: "cross-platform",
    },
    {
      id: "6",
      gameTitle: "Fall strom battle 2",
      prizepool: "$1000",
      gameMode: "solo",
      entryFee: "$520",
      organiser: "XYZ esport",
      maxteam: "25",
      joined: "89/140",
      game: "Fortnite",
      skill: "All skills",
      platform: "cross-platform",
    },
    {
      id: "7",
      gameTitle: "Season 3 envasion",
      prizepool: "$1500",
      gameMode: "Team",
      entryFee: "$60",
      organiser: "YZ esport",
      maxteam: "25",
      joined: "89/140",
      game: "Fortnite",
      skill: "All skills",
      platform: "cross-platform",
    },
    {
      id: "8",
      gameTitle: "Save the World",
      prizepool: "$10000",
      gameMode: "50 v 50",
      entryFee: "$20",
      organiser: "XZ esport",
      maxteam: "25",
      joined: "89/140",
      game: "Fortnite",
      skill: "All skills",
      platform: "cross-platform",
    },
  ];
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("1");
  const [isMobile, setisMobile] = useState(false);
  const [selectedTournaments, setSelectedTournaments] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSelectedTournament = (option) => {
    switch (option) {
      case "completedTournament":
        setSelectedTournaments(completedTournament);
        break;
      case "featuredTournament":
        setSelectedTournaments(featuredTournament);
        break;
      case "startedTournament":
        setSelectedTournaments(startedTournament);
        break;
      case "upcomingTournament":
        setSelectedTournaments(upcomingTournament);
        break;

      default:
        break;
    }
  };
  useEffect(() => {
    if (window.innerWidth < 500) {
      setisMobile(true);
    }
    const media = window.matchMedia(`(max-width: 500px)`);
    media.addEventListener("change", (e) => {
      if (e.matches) {
        setisMobile(true);
      } else {
        setisMobile(false);
      }
    });
    return () => media.removeEventListener("change", (e) => updateTarget(e));
  }, []);
  const url = `${GET_TOURNAMNETS}`;
  axios.defaults.baseURL = `${GET_TOURNAMNETS}`;

  axios.defaults.withCredentials = false;
  const getTournaments = async (url) => {
    try {
      await axios.get(`${GET_TOURNAMNETS}`).then((res) => {
        setTournaments(
          res.data.data.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          })
        );
        setSelectedTournaments(
          res.data.data.filter((tournament) => {
            return (
              tournament.featured === true && tournament.status !== "completed"
            );
          })
        );
        setLoading(false);
      });
    } catch (err) {
      throw err.response;
    }
  };
  useEffect(() => {
    getTournaments();
  }, []);

  var featuredTournament = tournaments.filter((tournament) => {
    return tournament.featured === true && tournament.status !== "completed";
  });
  var upcomingTournament = tournaments.filter((game) => {
    return game.upcoming === true && game.status !== "started";
  });

  var startedTournament = tournaments.filter((game) => {
    return game.status === "started";
  });

  var completedTournament = tournaments.filter((game) => {
    return game.status === "completed";
  });
  return (
    <>
      <div className={"container"}>
        <div className={styles.tourneyPage}>
          {/* <div>
            <p className={styles.sectionTitle}>Recommended Games</p>
            <div className={styles.recommendedGames}>
              <Carousel responsive={responsiveRecommend}>
                {gameData.map((game) => (
                  <div key={game.id}>
                    <div className={styles.imageParent}>
                      <div className={styles.mainImage}>
                        <Image alt="game" src={game.image} layout="fill" />
                        <div className={styles.imageIcon}>
                          <Image alt="game" src={game.icon} />
                        </div>
                        <div className={styles.imageText}>
                          <p className={styles.gamename}>{game.name}</p>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </div> */}
          {/* {isMobile && (
            <div className={styles.tabswrapper}>
              <TabContext value={value}>
                <Tabs
                  textColor="inherit"
                  indicatorColor="primary"
                  centered
                  value={value}
                  onChange={handleChange}
                  aria-label="tabs"
                >
                  <Tab label="Featured" value="1" />
                  <Tab label="Started" value="2" />
                  <Tab label="Upcoming" value="3" />
                  <Tab label="Completed" value="4" />
                </Tabs>
              </TabContext>
            </div>
          )} */}
          {/* featured */}
          {/* {!isMobile && (
            <div className={styles.featuredDiv}>
              <p className={styles.sectionTitle}>Featured</p>
            </div>
          )}
          {isMobile ? (
            value === "1" &&
            featuredTournament.map((game) => (
              <TournamentCard
                key={game._id}
                id={game._id}
                img={game.banner}
                title={game.name}
                prize={game.prizes}
                membersPerTeam={game.membersPerTeam}
                maximumTeams={game.maximumTeams}
                mode={game.gameMode}
                fee={game.entryFee}
                organiser={game.organiser}
                gameName={game.gameName}
                teams={game.teams}
                startDate={game.startDate}
              />
            ))
          ) : (
            <>
              <Carousel responsive={responsive}>
                {featuredTournament.map((game) => (
                  <TournamentCard
                    key={game._id}
                    id={game._id}
                    img={game.banner}
                    title={game.name}
                    prize={game.prizes}
                    membersPerTeam={game.membersPerTeam}
                    maximumTeams={game.maximumTeams}
                    mode={game.gameMode}
                    fee={game.entryFee}
                    organiser={game.organiser}
                    gameName={game.gameName}
                    teams={game.teams}
                    startDate={game.startDate}
                  />
                ))}
              </Carousel>
              <br />
              <br />
            </>
          )}
          {((!isMobile && featuredTournament.length === 0) ||
            (isMobile && value === "1" && featuredTournament.length === 0)) && (
            <center>
              <h2 className={styles.notournament}>No Tournament to Show</h2>
            </center>
          )} */}
          {/* Started */}
          {/* {!isMobile && <p className={styles.sectionTitle}>Started</p>}
          {isMobile ? (
            value === "2" &&
            startedTournament.map((game) => (
              <TournamentCard
                key={game._id}
                id={game._id}
                img={game.banner}
                title={game.name}
                prize={game.prizes}
                membersPerTeam={game.membersPerTeam}
                maximumTeams={game.maximumTeams}
                mode={game.gameMode}
                fee={game.entryFee}
                organiser={game.organiser}
                gameName={game.gameName}
                teams={game.teams}
                startDate={game.startDate}
              />
            ))
          ) : (
            <>
              <Carousel responsive={responsive}>
                {startedTournament.map((game) => (
                  <TournamentCard
                    key={game._id}
                    id={game._id}
                    img={game.banner}
                    title={game.name}
                    prize={game.prizes}
                    membersPerTeam={game.membersPerTeam}
                    maximumTeams={game.maximumTeams}
                    mode={game.gameMode}
                    fee={game.entryFee}
                    organiser={game.organiser}
                    gameName={game.gameName}
                    teams={game.teams}
                    startDate={game.startDate}
                  />
                ))}
              </Carousel>
              <br />
              <br />
            </>
          )}
          {((!isMobile && startedTournament.length === 0) ||
            (isMobile && value === "2" && startedTournament.length === 0)) && (
            <center>
              <h2 className={styles.notournament}>No Tournament to Show</h2>
            </center>
          )} */}
          {/* upcoming */}
          {/* {!isMobile && <p className={styles.sectionTitle}>Upcoming</p>}
          {isMobile ? (
            value === "3" &&
            upcomingTournament.map((game) => (
              <TournamentCard
                key={game._id}
                id={game._id}
                img={game.banner}
                title={game.name}
                prize={game.prizes}
                membersPerTeam={game.membersPerTeam}
                maximumTeams={game.maximumTeams}
                mode={game.gameMode}
                fee={game.entryFee}
                organiser={game.organiser}
                gameName={game.gameName}
                teams={game.teams}
                startDate={game.startDate}
              />
            ))
          ) : (
            <>
              <Carousel responsive={responsive}>
                {upcomingTournament.map((game) => (
                  <TournamentCard
                    key={game._id}
                    id={game._id}
                    img={game.banner}
                    title={game.name}
                    prize={game.prizes}
                    membersPerTeam={game.membersPerTeam}
                    maximumTeams={game.maximumTeams}
                    mode={game.gameMode}
                    fee={game.entryFee}
                    organiser={game.organiser}
                    gameName={game.gameName}
                    teams={game.teams}
                    startDate={game.startDate}
                  />
                ))}
              </Carousel>
              <br />
              <br />
            </>
          )}
          {((!isMobile && upcomingTournament.length === 0) ||
            (isMobile && value === "3" && upcomingTournament.length === 0)) && (
            <center>
              <h2 className={styles.notournament}>No Tournament to Show</h2>
            </center>
          )} */}
          <Box paddingY={4}>
            <select
              style={{
                padding: "1rem",
                background: "#5533A1",
                color: "white",
                border: "none",
                outline: "none",
                marginBottom: "1rem",
                marginTop: "2rem",
                fontSize: "1rem",
                fontFamily: "Oxanium",
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={(event) => handleSelectedTournament(event.target.value)}
            >
              <option value="featuredTournament">Featured</option>
              <option value="completedTournament">Completed</option>
              <option value="startedTournament">Started</option>
              <option value="upcomingTournament">Upcoming</option>
            </select>
            <Stack spacing={2}>
              {selectedTournaments.map((tournament) => (
                <NewTournamentCard tournament={tournament} />
              ))}
              {!selectedTournaments.length ? (
                <Typography variant="h4" fontFamily={"Oxanium"} align="center">
                  No Tournament to Show
                </Typography>
              ) : null}
            </Stack>
          </Box>

          {/* {!isMobile && <p className={styles.sectionTitle}>Completed</p>}
          {isMobile ? (
            value === "4" &&
            completedTournament.map((game) => (
              <TournamentCard
                key={game._id}
                id={game._id}
                img={game.banner}
                title={game.name}
                prize={game.prizes}
                membersPerTeam={game.membersPerTeam}
                maximumTeams={game.maximumTeams}
                mode={game.gameMode}
                fee={game.entryFee}
                organiser={game.organiser}
                gameName={game.gameName}
                teams={game.teams}
                startDate={game.startDate}
              />
            ))
          ) : (
            <>
              <Carousel responsive={responsive}>
                {completedTournament.map((game) => (
                  <TournamentCard
                    key={game._id}
                    id={game._id}
                    img={game.banner}
                    title={game.name}
                    prize={game.prizes}
                    membersPerTeam={game.membersPerTeam}
                    maximumTeams={game.maximumTeams}
                    mode={game.gameMode}
                    fee={game.entryFee}
                    organiser={game.organiser}
                    gameName={game.gameName}
                    teams={game.teams}
                    startDate={game.startDate}
                  />
                ))}
              </Carousel>
              <br />
              <br />
            </>
          )}
          {((!isMobile && completedTournament.length === 0) ||
            (isMobile &&
              value === "4" &&
              completedTournament.length === 0)) && (
            <center>
              <h2 className={styles.notournament}>No Tournament to Show</h2>
            </center>
          )} */}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default tournament;
