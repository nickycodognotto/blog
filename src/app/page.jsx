import Link from "next/link";
import styles from "./homepage.module.css";
import HomeBody from "./components/homeBody/HomeBody";

export default function Home() {
  return (
    <div className={styles.container}>
      <HomeBody/>
    </div> 
  ); 
}
