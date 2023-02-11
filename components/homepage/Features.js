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
} from "react-icons/fa";

const iconStyles = {
  fill: "white",
  height: "5rem",
  display: "block",
  margin: "0 auto",
};

const placeholderFeaturesData = [
  {
    icon: <FaHandPointUp style={iconStyles} size={30} />,
    text: "One Click Install Demo",
    subtext: "Get a headstart with our one click install demo importer.",
  },
  {
    icon: <FaObjectUngroup style={iconStyles} size={80} />,
    text: "Create Pages with Elementor",
    subtext:
      "Easily create amazing pages with Elementor, the best Page Builder for WordPress.",
  },
  {
    icon: <FaTeamspeak style={iconStyles} size={80} />,
    text: "Custom Team Pages",
    subtext:
      "Promote and showcase what's going on in your team in their beautifully designed profile!",
  },
  {
    icon: <FaUserAstronaut style={iconStyles} size={80} />,
    text: "Custom User Pages",
    subtext:
      "Better looking than ever, users have custom designed pages, no more WordPress default!",
  },
  {
    icon: <FaMagic style={iconStyles} size={80} />,
    text: "Fully Customizable",
    subtext:
      "From fonts to background images, Arcane gives you the power to create a completely unique looking website.",
  },
  {
    icon: <FaTrophy style={iconStyles} size={100} />,
    text: "Create Tournaments",
    subtext:
      "With more than 4 tournaments types to choose from, Arcane gives you and your users the ability to create tournaments and get paid for it!",
  },
  {
    icon: <FaChartLine style={iconStyles} size={80} />,
    text: "Optimized for SEO",
    subtext:
      "With the new Arcane rework ranking in Google has never been easier.",
  },
  {
    icon: <FaLanguage style={iconStyles} size={200} />,
    text: "Translation Ready",
    subtext:
      "Arcane is not only compatible with the WPML plugin for creating multilingual websites and ready for RTL languages, but also comes prepared for easy translation into any language.",
  },
  {
    icon: <FaQuran style={iconStyles} size={50} />,
    text: "RTL Supported",
    subtext:
      "Your website is on a RTL language? No problem, we got you covered.",
  },
  {
    icon: <FaShoppingBag style={iconStyles} size={50} />,
    text: "Woocommerce Ready",
    subtext:
      "Got Merch to sell? Easily set up shops with Arcane Woocommerce plugin.",
  },
];

export default function Features() {
  return (
    <Container>
      <Typography fontFamily="Oxanium" variant="h3" color="white" align="center" gutterBottom>
        Fantastic Features
      </Typography>
      <Divider
        sx={{
          border: "2px solid orange",
          width: "10%",
          margin: "0 auto",
          marginBottom: 4,
        }}
      />
      <Grid container spacing={4}>
        {placeholderFeaturesData.map((featuresData) => (
          <Grid item xs={12} sm={6}>
            <FeatureCard data={featuresData} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
