import React, { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import styles from "../styles/leaderboard.module.css";
const axios = require("axios");
const { GET_LEADERBOARD } = require("../constants/routes");
import { Loader } from "../components/Loader";
const leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState(null);
  const getdata = () => {
    axios.get(`${GET_LEADERBOARD}`).then(res => {
      setLeaderboard(res.data.data);
    }).catch(err => {
      console.log(err);
    })
  }
  useEffect(() => {
    getdata();
  }, [])
  if (leaderboard === null) {
    return <Loader />;
  }
  // return (
  //   <div className={"container"}>
  //     <div className={styles.leaderboard} >
  //       <div className={styles.rank}>Rank</div>
  //       <div className={styles.name}>Team Name</div>
  //       <div className={styles.score}>Wins</div>
  //     </div>
  //     {leaderboard.map((item, index) => {
  //       return (
  //         <div className={styles.leaderboard} key={index}>
  //           <div className={styles.rank}>{index + 1}</div>
  //           <div className={styles.name}>{item.name}</div>
  //           <div className={styles.score}>{item.wins}</div>
  //         </div>
  //       );
  //     })}
  //     <Footer />
  //   </div>
  // );
  return (
    <div className={"container"}>
      <div
        className={styles.section1}
        style={{
          height: "90vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Lederboard will be updated after Beta tournaments
      </div>
      <Footer />
    </div>
  );
};

export default leaderboard;
