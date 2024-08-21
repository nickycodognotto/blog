import Link from "next/link";
import styles from "./homepage.module.css";
import HomeBody from "./components/homeBody/HomeBody";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.boxDivider}>
        <div className={styles.divider}></div>
      </div>
      <HomeBody/>
    </div> 
  ); 
}
