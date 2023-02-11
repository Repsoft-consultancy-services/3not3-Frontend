import React, { useEffect, useState } from "react";
import Image from "next/image";
import gameImage from "../../../assets/img/img1.jpg";
import styles from "../../../styles/TournamentDetails.module.css";
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
import PlayFort from "../../../assets/img/fort.png";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabPanel from "@material-ui/lab/TabPanel";
import About from "../../../components/Tournament/About";
import PlayerTable from "../../../components/Tournament/PlayerTable";
import Schedule from "../../../components/Tournament/Schedule";
import Rules from "../../../components/Tournament/Rules";
import Prize from "../../../components/Tournament/Prize";
import { Tabs, tabsClasses } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import axiosinstance from "../../../util/axiosInstance";
import {
  GET_TEAM,
  GET_TOURNAMENT_BY_ID,
  REGISTER_TEAM,
  UNREGISTER_TEAM,
} from "../../../constants/routes";
import { useStateValue } from "../../../Context/StateProvider";
import { toast } from "react-toastify";
import { Footer } from "../../../components/Footer";
import axios from "axios";
import { useRouter } from "next/router";
import Tc1 from "../../../components/Tournament/Tc1";
import Tc2 from "../../../components/Tournament/Tc2";

const eachTournament = () => {
  const router = useRouter();
  const paramURL = router.query;
  // console.log(paramURL.id);
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("authUser");
    // If there is no access token we redirect to "/" page.
    if (!accessToken) {
      setLogged(false);
    } else {
      setLogged(true);
    }

    axios.get(`${GET_TOURNAMENT_BY_ID}/${paramURL.id}`).then((res) => {
      // console.log(res.data);
      setData(res.data);
      setLoading(false);
    });
  }, []);

  // if (isLoading) return <p>Loading...</p>;

  return <>{isLoading ? <p>Loading</p> : logged ? <Tc1 /> : <Tc2 />}</>;
};

export const getServerSideProps = async (context) => {
  const res = await fetch(`${GET_TOURNAMENT_BY_ID}/${context.params.id}`);
  // console.log(res);

  const tournament = await res.json();
  if (!tournament.data) {
    return {
      // <-----------------does the trick here!!
      notFound: true,
    };
  }

  return {
    props: {
      tournament,
    },
  };
};

export default eachTournament;
