import Header from "./header/header";
import General from "./general/general";
import Footer from "./footer/footer";
import styles from './Main.module.css'
import { Routes, Route } from 'react-router-dom'
import Partners from "./partners/Partners";
import Sales from "./sales/Sales";
import DailyRent from "./daily-rent/DailyRent";
import LongTerm from "./LongTerm/LongTerm";
import Marketing from "./marketing/Marketing";
import Partner from "./Partner/Partner";
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
            <Route path="balance" element={<Partners />} />
            <Route path="sales" element={<Sales />} />
            <Route path="daily-rent" element={<DailyRent />} />
            <Route path="long-term" element={<LongTerm />} />
				<Route path="marketing" element={<Marketing />} />
				<Route path="partner" element={<Partner />} />
          </Routes>
        </div>
        <div className={styles.sidebarArea}>
		  <img className={styles.logo} src="/img/logo.png" alt="Движение" />
          <Footer />
        </div>
      </div>
    </div>
  )
}
