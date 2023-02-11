import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { makeStyles } from "@mui/styles";
import { styles } from "../styles/Tournament.module.css";
const useStyles = makeStyles({
  avatar: {
    height: "50px",
    border: 0,
  },
  avatarImg: {
    height: "20px",
    widht: "20px",
  },
});

export default function PlayersAvatar() {
  const classes = useStyles();

  return (
    <div>
      <AvatarGroup variant="circular" total={52}>
        <Avatar
          alt="Remy Sharp"
          src="https://english.cdn.zeenews.com/sites/default/files/2020/09/01/882923-shinchan.jpg"
        />
        <Avatar
          alt="Travis Howard"
          src="https://english.cdn.zeenews.com/sites/default/files/2020/09/01/882923-shinchan.jpg"
        />
        <Avatar
          alt="Agnes Walker"
          src="https://english.cdn.zeenews.com/sites/default/files/2020/09/01/882923-shinchan.jpg"
        />
        <Avatar
          alt="Trevor Henderson"
          src="https://english.cdn.zeenews.com/sites/default/files/2020/09/01/882923-shinchan.jpg"
        />
      </AvatarGroup>
    </div>
  );
}
