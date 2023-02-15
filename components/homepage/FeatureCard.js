import { Box, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

export default function FeatureCard({ data: { icon, text, subtext } }) {
  const [elevation, setElevation] = useState(0);
  const [cardHovering, setCardHovering] = useState(false);

  return (
    <Paper
      elevation={elevation}
      sx={{
        background: "transparent",
        height: "100%",
        ":hover": { bgcolor: "#5533A1" },
        transition: ".3s",
      }}
      onMouseEnter={() => {
        setElevation(10);
        setCardHovering(true);
      }}
      onMouseLeave={() => {
        setElevation(0);
        setCardHovering(false);
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        spacing={4}
        padding={6}
      >
        {icon}
        <Box>
          <Typography
            fontFamily="Oxanium"
            variant="h5"
            fontWeight="bold"
            color="white"
            sx={{ textAlign: { xs: "center", sm: "left" } }}
            gutterBottom
          >
            {text}
          </Typography>
          <Typography
            fontFamily="Oxanium"
            color={cardHovering ? "white" : "gray"}
          >
            {subtext}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}
