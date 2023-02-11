import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../styles/Profile.module.css";

const ProfileTeams = ({ teams }) => {
  console.log(teams);
  return (
    <div>
      <>
        <h2>Teams</h2>
        {teams.map(
          (team, index) =>
            team.teamDeleted === false && (
              //   <div key={index}>
              //     <h1>teams</h1>
              //   </div>

              <div key={index} className={styles.bottomTeamsBox}>
                <Link passHref href={`/teams/${encodeURIComponent(team._id)}`}>
                  <div className={styles.bottomTeamsRow}>
                    <Image
                      alt="game"
                      className={styles.gameImage}
                      src={team.teamLogo}
                      height={60}
                      width={60}
                    />
                    <p>{team.name}</p>
                  </div>
                </Link>
              </div>
            )
        )}
      </>
    </div>
  );
};

export default ProfileTeams;
