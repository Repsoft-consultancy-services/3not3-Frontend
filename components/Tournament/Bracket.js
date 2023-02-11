import React, { useEffect, useState } from "react";

import "./brackets-viewer.min.js";

const Bracket = ({ bracketId }) => {
  const [data, setdata] = useState(null);
  async function render() {
    const data = await fetch(
      `https://cm.3not3.com/api/tournaments/brackets/${bracketId}`
    ).then((res) => res.json());
    data = data.data;
    setdata(data);
    if (data) {
      window.bracketsViewer.render({
        stages: data.stage,
        matches: data.match,
        matchGames: data.match_game,
        participants: data.participant,
      });
    }
  }
  useEffect(() => {
    render();
  }, []);
  if (!data)
    return (
      <center>
        <h2>Brackets Not Generated</h2>
      </center>
    );
  return <div className="brackets-viewer"></div>;
};

export default Bracket;
