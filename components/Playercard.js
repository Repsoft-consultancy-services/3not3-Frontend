import React from "react";
import styles from "../styles/Teams.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useStateValue } from "../Context/StateProvider";
import axiosinstance from "../util/axiosInstance";
import { REMOVE_PLAYER } from "../constants/routes";
import { toast } from "react-toastify";
import DialogBox from "./DialogBox";
import Link from "next/link";
import Image from "next/image";

export const Playercard = ({ getAllData, members, leader, teamID, userId }) => {
  // console.log(members);
  const [{ user }, dispatch] = useStateValue();
  const checkLeader = () => {
    if (userId === leader) {
      return true;
    }
    return false;
  };
  const removePlayer = async () => {
    const res = await axiosinstance
      .post(`${REMOVE_PLAYER}${teamID}/${members.member._id}`)
      .then((res) => {
        getAllData();
        toast.success("Player Removed!");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className={styles.playerCard}>
        <DialogBox
          executeFunction={removePlayer}
          open={open}
          button={"Remove Player"}
          setOpen={setOpen}
          handleClose={handleClose}
        />
        <div className={styles.playerImage}>
          <Image
            className={styles.playerImageNew}
            src={members.member.profileImage}
            layout="fill"
          />
        </div>

        {checkLeader() ? (
          <i onClick={handleClickOpen}>
            <AiOutlineCloseCircle />
          </i>
        ) : (
          ""
        )}
 
        <section className={styles.playerCardInfo}>
          <h5>IGN: {members.inGameName}</h5>
          <p>ID: {members.inGameId}</p>
          <Link
            passHref
            href={`/profile/${encodeURIComponent(members.member.username)}`}
          >
            <button className={styles.viewVutton}>View Profile</button>
          </Link>
        </section>
      </div>
    </>
  );
};
