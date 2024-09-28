import Image from "next/image";
import styles from "./page.module.css";
import { Balance } from './balance'; // Adjust the path based on your folder structure

export default function Home({ balance }) {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Balance balance={15.00} /> {/* Use the Balance component */}
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}