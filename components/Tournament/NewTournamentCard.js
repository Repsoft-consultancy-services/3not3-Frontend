import {
  Box,
  Button,
  Card,
  CardMedia,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const getTotalPrizePool = (tournament) => {
  const arr = JSON.parse(tournament.prizes);
  const total = arr.reduce(
    (sum, current) => (sum += parseInt(current.prize)),
    0
  );
  return total;
};

function TournamentTimeCard({ children }) {
  return (
    <Card
      sx={{ bgcolor: "#5533A1", padding: 2, width: { xs: "100%", sm: "auto" } }}
    >
      <Typography
        variant="h6"
        color="white"
        fontFamily={"Oxanium"}
        align="center"
      >
        {children}
      </Typography>
    </Card>
  );
}

function TournamentDetailCard({ heading, data }) {
  return (
    <Card
      sx={{
        bgcolor: "transparent",
        border: "1px solid #5533A1",
        p: { xs: 2, md: 1, lg: 2 },
      }}
    >
      <Typography
        color="white"
        align="center"
        variant="body2"
        fontFamily={"Oxanium"}
        gutterBottom
      >
        {heading}
      </Typography>
      <Typography
        color="white"
        align="center"
        fontFamily={"Oxanium"}
        variant="h6"
      >
        {data}
      </Typography>
    </Card>
  );
}

export default function NewTournamentCard({ tournament }) {
  return (
    <Card sx={{ bgcolor: "#0B0F20", border: "1px solid #5533A1" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 4, sm: 0, md: 4 }}
        padding={{ xs: 2, sm: 4 }}
        flexWrap={{ sm: "wrap", md: "nowrap" }}
      >
        {/* image */}
        <CardMedia sx={{ width: { xs: "100%", sm: "25%" } }}>
          <img
            src={tournament.thumbnail}
            alt={tournament.name}
            style={{
              objectFit: "cover",
              height: "20rem",
              width: "100%",
              borderRadius: 3,
            }}
          />
        </CardMedia>
        {/* data */}
        <Stack
          justifyContent="space-between"
          width={{ xs: "100%", sm: "75%", md: "50%" }}
          padding={{ xs: 0, sm: 2 }}
          spacing={{ xs: 4, sm: 0 }}
        >
          <Box>
            <Typography
              variant="h3"
              fontWeight={500}
              color="white"
              fontFamily={"Oxanium"}
              gutterBottom
            >
              {tournament.name}
            </Typography>
            <Stack direction="row" spacing={4}>
              <TournamentTimeCard>
                {new Date(tournament.startDate).toDateString()}
              </TournamentTimeCard>
            </Stack>
          </Box>
          <Divider sx={{ border: "1px solid #5533A1" }} />
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TournamentDetailCard
              heading={"ENTRY/PLAYER"}
              data={tournament.entryFee ? tournament.entryFee : "FREE"}
            />
            <TournamentDetailCard
              heading={"TEAM SIZE"}
              data={
                tournament.membersPerTeam +
                " " +
                "VS" +
                " " +
                tournament.membersPerTeam
              }
            />
            <TournamentDetailCard
              heading={"MAX TEAMS"}
              data={tournament.maximumTeams}
            />
            <TournamentDetailCard
              heading={"ENROLLED"}
              data={tournament.teams.length}
            />
          </Stack>
        </Stack>
        {/* actions */}
        <Box
          width={{ xs: "100%", sm: "100%", md: "25%" }}
          border="1px solid #5533A1"
          paddingX={4}
          paddingY={8}
        >
          <Typography
            color="yellow"
            variant="h6"
            align="center"
            fontFamily={"Oxanium"}
          >
            Prize
          </Typography>
          <Typography
            color="white"
            align="center"
            variant="h4"
            fontFamily={"Oxanium"}
            gutterBottom
          >
            {getTotalPrizePool(tournament)}
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{ display: "block", margin: "0 auto", mb: 3 }}
          >
            View Tournament
          </Button>
          <Typography align="center" color="white" fontFamily={"Oxanium"}>
            Top 3 Players Win a Cash Prize
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}
