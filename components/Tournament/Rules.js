import React from "react";
import styles from "../../styles/TournamentDetails.module.css";
import { FcCheckmark } from "react-icons/fc";
import draftToHtml from "draftjs-to-html";
export const Rules = ({ rules }) => {
  return (
    <div className={styles.aboutTournament}>
      <h6>Rules</h6>
      <div>
        <div
          dangerouslySetInnerHTML={{
            __html: draftToHtml(JSON.parse(rules)),
          }}
        ></div>
        {/* <p>
          <FcCheckmark /> All players must comply with the rules set by the
          tournament organizers. Failure to do so can result in disqualification
          and/or ban from future tournaments.
          <br />
          <FcCheckmark /> Every match of this competition must be played
          according to the rules until all games are completed and the results
          of these games will be published by the organizer.
          <br />
          <FcCheckmark /> Any attempt to deceive tournament organizers or other
          players with false, incomplete or incorrect information can result in
          disqualification and/or ban from future tournaments.
          <br />
          <FcCheckmark /> All forms of cheating are prohibited and will be
          penalized.
          <br />
          <FcCheckmark /> Players can use the Ticket Functionality to report any
          cheating
          <br />
        </p> */}
      </div>
    </div>
  );
};

export default Rules;
