import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Charts from "../components/Chart";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Charts />
    </div>
  );
};

export default Home;
