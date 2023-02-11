import { Box, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

export default function FeatureCard({ data: { icon, text, subtext } }) {
  const [elevation, setElevation] = useState(0);

  return (
    <Paper
      elevation={elevation}
      sx={{
        background: "transparent",
        height: "100%",
        ":hover": { bgcolor: "#14161A" },
        transition: ".3s",
      }}
      onMouseEnter={() => setElevation(10)}
      onMouseLeave={() => setElevation(0)}
    >
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="center" spacing={4} padding={6}>
        {icon}
        <Box minWidth="80%">
          <Typography fontFamily="Oxanium" variant="h5" fontWeight="bold" color="white" gutterBottom>
            {text}
          </Typography>
          <Typography fontFamily="Oxanium" color="gray">{subtext}</Typography>
        </Box>
      </Stack>
    </Paper>
  );
}
