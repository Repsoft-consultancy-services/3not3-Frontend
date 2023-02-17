import React from "react";
import styles from "./highlights.module.css";

export default function Highlights() {
  return (
    <div>
      <section className={styles.highlight}>
        {/* image */}
        <div className={styles.highlightBg}>
          <img
            data-aos="fade-down-left"
            src="/characters/highlight-char-1.png"
            alt=""
          />
        </div>
        {/* text absolutely positioned */}
        <div className={styles.highlightText}>
          <h3>
            About <span>Us</span>
          </h3>
          <p>
            Here, in 3not3 we are as pleased as punch for a new era gaming under
            automation mechanics that help both the upright of e-sport
            infrastructure for players and organizer. Introducing striation for
            player monitor and asset service throw which team or service
            provider can easily communicate and arrange new feature and service
            by exploring web-technology of 3not3.
          </p>
          <button className={styles.highlightButton}>KNOW MORE</button>
        </div>
      </section>
      <section className={styles.highlightRev}>
        <div
          className={styles.highlightBg}
          style={{
            backgroundImage: "url(/characters/highlight-char-2-bg.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <img
            data-aos="fade-right"
            src="/characters/highlight-char-2.png"
            alt=""
          />
        </div>
        <div className={styles.highlightText}>
          <h3>
            Compete In <span>Tournaments</span>
          </h3>
          <p>
            Compete in exciting tournaments and get rewarded accordingly, get to
            meet new players & EARN in the form of crypto
          </p>
          <button className={styles.highlightButton}>COMPETE NOW</button>
        </div>
      </section>
      <section className={styles.highlight}>
        {/* image */}
        <div className={styles.highlightBg}>
          <img
            data-aos="fade-left"
            src="/characters/highlight-char-3.png"
            alt=""
          />
        </div>
        {/* text absolutely positioned */}
        <div className={styles.highlightText}>
          <h3>
            Organize
            <br />
            <span>Tournaments</span>
          </h3>
          <p>
            Create a oragniser profile to arrange events for other players and
            many more Organize your circuit with seasons, regions and tiers
          </p>
          <button className={styles.highlightButton}>CREATE NOW</button>
        </div>
      </section>
      <section className={styles.highlightRev}>
        <div
          className={styles.highlightBg}
          style={{
            backgroundImage: "url(/characters/highlight-char-4-bg.png)",

            backgroundSize: "contain",
          }}
        >
          <img src="/characters/highlight-char-4.png" alt="" />
        </div>
        <div className={styles.highlightText}>
          <h3>
            <span>Future</span> of Gaming
          </h3>
          <p>
            with VR,Metaverse & cloud gaming Next level Graphics and sounds no
            matter where you are with our VR and cloud gaming compatibility
          </p>
          <button className={styles.highlightButton}>CHECKOUT</button>
        </div>
      </section>
      <section className={styles.highlight}>
        {/* image */}
        <div className={styles.highlightBg}>
          <img data-aos="fade" src="/characters/highlight-char-5.png" alt="" />
        </div>
        {/* text absolutely positioned */}
        <div className={styles.highlightText}>
          <h3>
            Join the
            <br />
            Esports <span>community</span>
          </h3>
          <p>
            Connect with new people all around the world make new friends, new
            teams and compete in tournaments or just hangout with your buddies
          </p>
          <button className={styles.highlightButton}>JOIN NOW</button>
        </div>
      </section>
      <section className={styles.highlightRev}>
        <div
          className={styles.highlightBg}
          style={{
            backgroundImage: "url(/characters/highlight-char-6-bg.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <img src="/characters/highlight-char-6.png" alt="" />
        </div>
        <div className={styles.highlightText}>
          <h3>
            Visit Our <span>Shop</span>
          </h3>
          <p>
            Visit our shop to buy game items and our new merchandise and enter
            giveaways!
          </p>
        <button className={styles.highlightButton}>CHECKOUT</button>
        </div>
      </section>
      <section className={styles.highlight}>
        {/* image */}
        <div className={styles.highlightBg}>
          <img src="/characters/highlight-char-7.png" alt="" />
        </div>
        {/* text absolutely positioned */}
        <div className={styles.highlightText}>
          <h3>
            Availaible on all <span>devices</span>
          </h3>
          <p>
            Our product will be available soon in play store and app store soon
          </p>
          <button className={styles.highlightButton}>CHECKOUT</button>
        </div>
      </section>
      <section className={styles.highlightRev}>
        <div
          className={styles.highlightBg}
          style={{
            backgroundImage: "url(/characters/highlight-char-8-bg.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <img src="/characters/highlight-char-8.png" alt="" />
        </div>
        <div className={styles.highlightText}>
          <h3>
            Visit Our <span>Shop</span>
          </h3>
          <p>
            Visit our shop to buy game items and our new merchandise and enter
            giveaways!
          </p>
          <button className={styles.highlightButton}>COMPETE NOW</button>
        </div>
      </section>
    </div>
  );
}
