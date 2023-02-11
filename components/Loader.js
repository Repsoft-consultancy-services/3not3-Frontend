import styles from "../styles/Loader.module.css";

export const Loader = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className={styles.content}
    >
      <div className={styles.loading}>
        <p>loading</p>
        <span></span>
      </div>
    </div>
  );
};
