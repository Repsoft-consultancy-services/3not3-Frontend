import { Box, Container, Divider, Typography, Grid } from "@mui/material";
import React from "react";
import FeatureCard from "./FeatureCard";
import {
  FaTeamspeak,
  FaHandPointUp,
  FaObjectUngroup,
  FaUserAstronaut,
  FaMagic,
  FaTrophy,
  FaChartLine,
  FaLanguage,
  FaQuran,
  FaShoppingBag,
  FaFingerprint,
} from "react-icons/fa";

const iconStyles = {
  fill: "white",
  height: "5rem",
  display: "block",
  margin: "0 auto",
};

const featuresData = [
  {
    icon: <FaUserAstronaut style={iconStyles} size={60} />,
    text: "Play tournaments",
    subtext: "Compete in Free and Paid entry Tournaments in just a few clicks.",
  },
  {
    icon: <FaTeamspeak style={iconStyles} size={100} />,
    text: "Host tournaments",
    subtext:
      "Manage your e-sports competition and league event with right backend-Automations technology tools.",
  },
  {
    icon: <FaMagic style={iconStyles} size={80} />,
    text: "Post content",
    subtext:
      "User can post,share and comment on the posts which are given on daily feed.",
  },
  {
    icon: <FaTrophy style={iconStyles} size={60} />,
    text: "Earn coins",
    subtext: "Daily login rewards and earn coins on every match you won.",
  },
  {
    icon: <FaShoppingBag style={iconStyles} size={60} />,
    text: "Redeem rewards",
    subtext: "You can redeem your earned rewards by visiting the marketplace.",
  },
  {
    icon: <FaObjectUngroup style={iconStyles} size={100} />,
    text: "Chat with friends",
    subtext:
      "User can communicate with other players and also with the organisers regarding the events",
  },
];

const upcomingFeaturesData = [
  {
    icon: <FaHandPointUp style={iconStyles} size={80} />,
    text: "Hiring Platform",
    subtext:
      "Our hiring platform helps your organisation or a individual to recruit, interview, research, and hire Esports realted employees.",
  },
  {
    icon: <FaChartLine style={iconStyles} size={80} />,
    text: "Cloud Gaming",
    subtext:
      "Cloud Gaming allows you to play hundreds of console games on the devices you already have.",
  },
  {
    icon: <FaUserAstronaut style={iconStyles} size={100} />,
    text: "VR Gaming",
    subtext:
      "VR gaming systems generate realistic sensations that simulate users' physical presence in a computer-generated environment.",
  },
  {
    icon: <FaTeamspeak style={iconStyles} size={100} />,
    text: "Lan tournaments",
    subtext:
      "By our platform organisers can host end to end lan tournaments without any hassle",
  },
];

export default function Features() {
  return (
    <Container sx={{ mt: 8 }}>
      <Typography
        fontFamily="Oxanium"
        variant="h3"
        fontSize="3rem"
        fontWeight="bold"
        color="white"
        align="center"
        gutterBottom
      >
        Coming soon on playstore and App store with fantastic features.
      </Typography>
      <Divider
        sx={{
          border: "2px solid orange",
          width: "10%",
          margin: "0 auto",
          marginBottom: 4,
        }}
      />
      <Grid container spacing={4} marginBottom={4}>
        {featuresData.map((featuresData, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <FeatureCard data={featuresData} />
          </Grid>
        ))}
      </Grid>
      <Typography
        fontFamily="Oxanium"
        variant="h3"
        fontSize="3rem"
        fontWeight="bold"
        color="white"
        align="center"
        gutterBottom
      >
        Upcoming additions
      </Typography>
      <Divider
        sx={{
          border: "2px solid orange",
          width: "10%",
          margin: "0 auto",
          marginBottom: 4,
        }}
      />
      <Grid container spacing={4} marginBottom={4}>
        {upcomingFeaturesData.map((featuresData) => (
          <Grid item xs={12} sm={6}>
            <FeatureCard data={featuresData} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
