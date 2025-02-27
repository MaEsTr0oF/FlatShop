import Header from "./header/header";
import General from "./general/general";
import Footer from "./footer/footer";
import styles from './Main.module.css'
import { Routes, Route } from 'react-router-dom'
import Partners from "./partners/Partners";
import Sales from "./sales/Sales";
import DailyRent from "./daily-rent/DailyRent";
import LongTerm from "./LongTerm/LongTerm";
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
            <Route path="sales" element={<Sales />} />
            <Route path="daily-rent" element={<DailyRent />} />
            <Route path="long-term" element={<LongTerm />} />
          </Routes>
        </div>
        <div className={styles.sidebarArea}>
          <Footer />
        </div>
      </div>
    </div>
  )
}
