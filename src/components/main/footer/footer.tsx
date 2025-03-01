import styles from './footer.module.css'
import { Link } from 'react-router-dom'
export default function Footer() {
  return (
    <div className={styles.footer}>
      <nav className={styles.navigation}>
        <ul className={styles.mainMenu}>
          <li>
			 <Link to="/main"><a href="#" className={styles.homeLink}>
              <span className={styles.icon}><img src="/img/footer/home.png" alt="home" /></span>
              На главную
            </a></Link>
          </li>
          <li>
            <a href="#">
              <span className={styles.icon}><img src="/img/footer/profile.png" alt="home" /></span>
              Личный кабинет пользователя
            </a>
          </li>
          <li>
			 <Link to="/main/balance"> <a href="#">
              <span className={styles.icon}><img src="/img/footer/balance.png" alt="home" /></span>
              Баланс
            </a></Link>
          </li>
          <li>
           <Link to="/main/marketing"><a href="#">
              <span className={styles.icon}><img src="/img/footer/marketing.png" alt="home" /></span>
              Маркетинг
            </a></Link>
          </li>
          <li>
			 <Link to="/main/Partner"><a href="#">
              <span className={styles.icon}><img src="/img/footer/partners.png" alt="home" /></span>
              Партнёры
            </a></Link>
          </li>
          <li>
			 		<Link to="/main/ads"><a href="#">
              <span className={styles.icon}><img src="/img/footer/advertisements.png" alt="home" /></span>
				  Объявления
            </a></Link>
          </li>
        </ul>

        <div className={styles.bottomMenu}>
          <ul>
            <li>
              <a href="#">
                <span className={styles.icon}></span>
                Профиль
              </a>
            </li>
            <li>
              <a href="#">
                <span className={styles.icon}></span>
                Поддержка
              </a>
            </li>
            <li>
              <a href="#">
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
