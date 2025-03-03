import styles from './footer.module.css'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className={styles.footer}>
      <nav className={styles.navigation}>
        <ul className={styles.mainMenu}>
          <li>
            <Link to="/main" className={styles.homeLink}>
              <span className={styles.icon}><img src="/img/footer/home.png" alt="home" /></span>
              На главную
            </Link>
          </li>
          <li>
            <a href="#" className={styles.link}>
              <span className={styles.icon}><img src="/img/footer/profile.png" alt="profile" /></span>
              Личный кабинет пользователя
            </a>
          </li>
          <li>
            <Link to="/main/balance" className={styles.link}>
              <span className={styles.icon}><img src="/img/footer/balance.png" alt="balance" /></span>
              Баланс
            </Link>
          </li>
          <li>
            <Link to="/main/marketing" className={styles.link}>
              <span className={styles.icon}><img src="/img/footer/marketing.png" alt="marketing" /></span>
              Маркетинг
            </Link>
          </li>
          <li>
            <Link to="/main/Partner" className={styles.link}>
              <span className={styles.icon}><img src="/img/footer/partners.png" alt="partners" /></span>
              Партнёры
            </Link>
          </li>
          <li>
            <Link to="/main/sales" className={styles.link}>
              <span className={styles.icon}><img src="/img/footer/advertisements.png" alt="ads" /></span>
              Объявления
            </Link>
          </li>
        </ul>

        <div className={styles.bottomMenu}>
          <ul>
            <li>
              <a href="#" className={styles.link}>
                <span className={styles.icon}></span>
                Профиль
              </a>
            </li>
            <li>
              <a href="#" className={styles.link}>
                <span className={styles.icon}></span>
                Поддержка
              </a>
            </li>
            <li>
              <a href="#" className={styles.link}>
                <span className={styles.icon}></span>
                Русский
              </a>
            </li>
          </ul>
          
          <div className={styles.social}>
            <a href="#" className={styles.vk}><img src="/img/footer/vk.png" alt="vk" /></a>
            <a href="#" className={styles.youtube}><img src="/img/footer/youtube.png" alt="youtube" /></a>
          </div>
          
          <div className={styles.copyright}>
            © 2025. Все права защищены.
          </div>
        </div>
      </nav>
    </div>
  )
}
