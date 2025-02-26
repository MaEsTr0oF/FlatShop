import Header from "./header/header";
import General from "./general/general";
import Footer from "./footer/footer";
import styles from './Main.module.css'
import { Routes, Route } from 'react-router-dom'
import Partners from "./partners/Partners";

export default function Main() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.grid}>
        <div className={styles.headerArea}>
          <Header />
        </div>
        <div className={styles.contentArea}>
          <Routes>
            <Route index element={<General />} />
            <Route path="partners" element={<Partners />} />
          </Routes>
        </div>
        <div className={styles.sidebarArea}>
          <Footer />
        </div>
      </div>
    </div>
  )
}
