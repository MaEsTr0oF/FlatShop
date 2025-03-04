import { useNavigate } from 'react-router-dom'
import styles from './Finish.module.css'

export default function Finish() {
  const navigate = useNavigate()

  const handleCabinetClick = () => {
    navigate('/main')
  }

  return (
    <div className={styles.finishContainer}>
		<img className={styles.logo} src="/img/logo.png" alt="Движение" />
      <div className={styles.finishContent}>
		
        <h2>Регистрация завершена</h2>
        <p className={styles.subtitle}>Смотреть видео о работе сервиса</p>
        
        <div className={styles.videoContainer}>
          <img src="/img/autherisation/video-preview.svg" alt="Video preview" />
          {/* <button className={styles.playButton}>
            <img src="/img/autherisation/play.svg" alt="Play" />
          </button> */}
        </div>

        <button 
          className={styles.cabinetButton}
          onClick={handleCabinetClick}
        >
          Перейти в личный кабинет
          <img src="/img/autherisation/play.svg" alt="Arrow" />
        </button>
      </div>

      <div className={styles.progressBar}>
        <div className={styles.step}>
          <div className={styles.line} />
          <div className={styles.stepContent}>
            <img src="/img/autherisation/Point.png" alt="Complete" />
            <span>Регистрация</span>
          </div>
          <div className={`${styles.line} ${styles.finish}`} />
          <div className={styles.stepContent}>
            <img src="/img/autherisation/Point.png" alt="Complete" />
            <span>Код из SMS</span>
          </div>
          <div className={`${styles.line} ${styles.finish}`} />
          <div className={styles.stepContent}>
            <img src="/img/autherisation/Point.png" alt="Complete" />
            <span>Контакты</span>
          </div>
          <div className={`${styles.line} ${styles.complete}`} />
          <div className={`${styles.stepContent} ${styles.active}`}>
            <h3>04</h3>
            <span>Регистрация</span>
          </div>
        </div>
      </div>
    </div>
  )
} 