import { useState } from 'react';
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
import BurgerMenu from "./BurgerMenu/BurgerMenu";

export default function Main() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={`${styles.grid} ${isSidebarOpen ? styles.sidebarVisible : ''}`}>
        <div className={styles.headerArea}>
          <Header />
          <div className={styles.burgerMenuContainer}>
            <BurgerMenu isOpen={isSidebarOpen} toggleMenu={toggleSidebar} />
          </div>
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
        <div className={`${styles.sidebarArea} ${isSidebarOpen ? styles.open : ''}`}>
          <div className={styles.sidebarOverlay} onClick={toggleSidebar}></div>
          <div className={styles.sidebarContent}>
            <img className={styles.logo} src="/img/logo.png" alt="Движение" />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}
