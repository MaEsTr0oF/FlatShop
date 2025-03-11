import styles from './BurgerMenu.module.css';
import { Link } from 'react-router-dom';

interface BurgerMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export default function BurgerMenu({ isOpen, toggleMenu }: BurgerMenuProps) {
  return (
    <>
      <button 
        className={`${styles.burgerMenu} ${isOpen ? styles.open : ''}`} 
        onClick={toggleMenu}
        aria-label="Меню"
        aria-expanded={isOpen}
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </button>
      
      {isOpen && (
        <div className={styles.menuContent}>
          <div className={styles.menuButtons}>
            <Link to="/main/sales" className={styles.menuButton} onClick={toggleMenu}>
              <span className={styles.buttonIcon}></span>
              <h2>Создать объявление</h2>
            </Link>
            <button className={styles.menuButton} onClick={toggleMenu}>
              <span className={styles.buttonIcon}></span>
              <h2>Пригласить партнера</h2>
            </button>
          </div>
        </div>
      )}
    </>
  );
} 