import Image from "next/image";
import styles from "../styles/Profile.module.css"
import Link from "next/link";
export const Profileteamcard = ({teams}) => {
  return (
    <>
    {teams.map(
          (team, index) =>
            team.teamDeleted === false && (
                <div key={index} className={styles.bottomTeamsBox}>
                    <div className={styles.profileteamcard}>
                        <Image 
                            src={team.teamLogo} 
                            layout="fill"
                            alt="game"
                        />
                        <Link passHref href={`/teams/${encodeURIComponent(team._id)}`}>
                            <div className={styles.profileteamcardInfo}>
                                <p><strong>{team.name}</strong></p>
                                <p style={{textAlign : "right"}}><strong>{team.gameName}</strong></p>
                                <p className={styles.profileteamcardInfoM}>Matches won - {team.wins}</p>
                                <button className={styles.profileteamcardInfoM}>More</button>
                            </div>
                        </Link>
                    </div>
                </div>
            )
        )}
    </>
  );
};
