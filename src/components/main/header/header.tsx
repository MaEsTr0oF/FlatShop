import { useState, useEffect } from 'react'
import styles from './header.module.css'
import { Link } from 'react-router-dom'

export default function Header() {
  const [profilePhoto, setProfilePhoto] = useState<string>('/img/header/profile.png')
  const [userName, setUserName] = useState('Константин Константинопольский')

  useEffect(() => {
    const savedPhoto = localStorage.getItem('profilePhoto')
    if (savedPhoto) {
      setProfilePhoto(savedPhoto)
    }

    const savedName = localStorage.getItem('userName')
    if (savedName) {
      setUserName(savedName)
    }
  }, [])

  return (
	<header className={styles.header}>
	<div className={styles.header_container}>
		<div className={styles.header_profile}>
			<select name="profile" id="profile">
				<option value="ru">{userName}</option>
			</select>
			<img 
				src={profilePhoto} 
				alt="profile" 
				className={styles.profilePhoto}
			/>
		</div>
		<div className={styles.header_menu}>
			<div className={styles.header_menu_message}><span><img src="/img/header/message.png" alt="message" /></span></div>
			<div className={styles.header_menu_notification}><span><img src="/img/header/notification.png" alt="notification" /></span></div>
		</div>
		<div className={styles.header_buttons}>
			<Link to="/main/sales" className={`${styles.header_buttons_button} ${styles.desktop_only}`}>
				<span></span>
				<h2>Создать объявление</h2>
			</Link>
			<button className={`${styles.header_buttons_button} ${styles.desktop_only}`}>
				<span></span>
				<h2>Пригласить партнера</h2>
			</button>
		</div>
	</div>
</header>
  )
}
