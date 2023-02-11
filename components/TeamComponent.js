import React from "react";
import Link from "next/link";
import styles from "../styles/Teams.module.css";
import Image from "next/image";

const TeamComponent = ({ data }) => {
  return (
    <div className={styles.teamsListSection}>
      <div className={styles.tableHeader}>
        <span></span>
        <div></div>
        <p>
          <strong>Team</strong>
        </p>
        <p>
          <strong>Game</strong>
        </p>
        <p>
          <strong>Leader</strong>
        </p>
        <p>
          <strong>Matches Played</strong>
        </p>
      </div>
      {data?.map(
        (team, index) =>
          team.teamDeleted === false && (
            <Link
              key={index}
              passHref
              href={`/teams/${encodeURIComponent(team._id)}`}>
              <div className={styles.teamRow}>
                <span>{index + 1}</span>
                <div className={styles.teamLogo}>
                <Image src={team.teamLogo} layout="fill"/>
                </div>
                <p>{team.name}</p>
                <p>{team.gameName}</p>
                <p>{team.members[0].inGameName}</p>
                <p>N/A</p>
              </div>
            </Link>
          )
      )}
    </div>
  );
};

export default TeamComponent;
