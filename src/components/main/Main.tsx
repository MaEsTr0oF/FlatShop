import Header from "./header/header";
import General from "./general/general";
import Footer from "./footer/footer";
import styles from './Main.module.css'

export default function Main() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.grid}>
        <div className={styles.headerArea}>
          <Header />
        </div>
        <div className={styles.contentArea}>
          <General />
        </div>
        <div className={styles.sidebarArea}>
          <Footer />
        </div>
      </div>
    </div>
  )
}
