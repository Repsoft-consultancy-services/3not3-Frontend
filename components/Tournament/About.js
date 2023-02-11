import React from "react";
import styles from "../../styles/TournamentDetails.module.css";
import { FcCheckmark } from "react-icons/fc";
import draftToHtml from "draftjs-to-html";
const About = ({ description }) => {
  return (
    <div className={styles.aboutTournament}>
      <h6>About Tournament</h6>
      <div>
        <div
          dangerouslySetInnerHTML={{
            __html: draftToHtml(JSON.parse(description)),
          }}
        ></div>
        {/* <p>
          In order to participate in a CheckMate Gaming tournament you must be a
          registered participant. Tournament registration is open until all
          tournament spots are filled – the number of spots per each individual
          tournament is stated on the tournament page within the website. <br />
          For a tournament entry to be considered valid, participants must
          provide all necessary/requested information. Incomplete or more than
          one entries will see the participant as disqualified - one entry per
          person per tournament. All entries become the property of CheckMate
          Gaming and will not be acknowledged or returned. Please note that
          CheckMate Gaming is not responsible for any lost, late, incomplete, or
          misdirected entries. <br />
        </p> */}
      </div>
      {/* <h6>FAQ</h6>
      <div>
        <p>
          <span className={styles.faqs}>
            <i>
              <FcCheckmark />
            </i>
            Reach out to Steve#2873 on Our Discord with any questions. <br />
          </span>
          <span className={styles.faqs}>
            <i>
              <FcCheckmark />
            </i>{" "}
            Follow us on Twitter @CommunityGaming to stay up to date with our
            latest tournaments. <br />
          </span>
          <span className={styles.faqs}>
            <i>
              <FcCheckmark />
            </i>{" "}
            The brackets will be viewable on this page soon.
          </span>
        </p>
      </div> */}
    </div>
  );
};

export default About;
