import React, { useState } from "react";
import styles from "../styles/Tournament.module.css";
import PlayersAvatar from "./PlayersAvatar";
import Image from "next/image";
import Link from "next/link";
import PlayFort from "../assets/img/fort.png";
import { BsFillTrophyFill, BsFillSuitSpadeFill } from "react-icons/bs";
import { RiCoinsFill } from "react-icons/ri";
import Moment from "react-moment";

const TournamentCard = ({
  membersPerTeam,
  maximumTeams,
  id,
  title,
  prize,
  mode,
  img,
  fee,
  organiser,
  startDate,
  gameName,
  teams,
}) => {
  prize = JSON.parse(prize);
  return (
    <div key={id} style={{ listStyle: "none" }} className={styles.gameCard}>
      <Link passHref href={`/tournament/${encodeURIComponent(id)}`}>
        <div>
          <div className={styles.upperGameCard}>
            <Image
              alt="game"
              className={styles.gameImage}
              src={img}
              height={500}
              width={1000}
            />
            {/* <img src={img} className={styles.gameImage} /> */}
            <br />
            <div className={styles.gameCardInfo}>
              <span id={styles.gamedateNtime}>
                {" "}
                <Moment format="DD MMMM YYYY">{startDate}</Moment>
              </span>
              <h4>
                <span
                  style={{
                    marginRight: ".3rem",
                    display: "grid",
                    placeItems: "center",
                    width: "20%",
                  }}
                >
                  <Image
                    alt="gameIcon"
                    src={
                      "https://res.cloudinary.com/nakul-londhe/image/upload/v1650805269/kixhnkx2fudffanpt0le.png"
                    }
                    width={30}
                    height={20}
                  />
                </span>
                {title}
              </h4>
              <section className={styles.gameInfo}>
                {/* prizepool */}
                <div>
                  <span className={styles.gameInfoTitle}>Prize pool</span>
                  <br />
                  <span className={styles.gameInfoTitleChild}>
                    <i className={styles.trophyIcon}>
                      <BsFillTrophyFill />
                    </i>{" "}
                    {/* add all prize amount */}
                    {prize.map((prize) => prize.prize).reduce((a, b) => parseInt(a) + parseInt(b))}
                  </span>
                </div>
                {/* game mode */}
                <div>
                  <span className={styles.gameInfoTitle}>Game mode</span>
                  <br />
                  <span className={styles.gameInfoTitleChild}>
                    <i className={styles.spadeIcon}>
                      <BsFillSuitSpadeFill />
                    </i>{" "}
                    {mode}
                  </span>
                </div>
                {/* Entry Fee */}
                {fee && (
                  <div>
                    <span className={styles.gameInfoTitle}>Entry Fees</span>
                    <br />
                    <span className={styles.gameInfoTitleChild}>
                      <i className={styles.coinIcon}>
                        <RiCoinsFill />
                      </i>{" "}
                      {fee}
                    </span>
                  </div>
                )}
                {/* Organised By */}
                <div>
                  <span className={styles.gameInfoTitle}>Organised By</span>
                  <br />
                  <span className={styles.gameInfoTitleChild}>
                    <i>{/* mode icon */}</i> {organiser}
                  </span>
                </div>
              </section>
            </div>
          </div>
          {/* slots */}
          <div className={styles.freeSlots}>
            <div>{gameName ? <h3>{gameName}</h3> : <h3>Game</h3>}</div>
            <div className={styles.freeSlotsText}>
              {teams.length} / {maximumTeams} Teams
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TournamentCard;
