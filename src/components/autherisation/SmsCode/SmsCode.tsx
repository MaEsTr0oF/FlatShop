import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './SmsCode.module.css'

export default function SmsCode() {
  const [smsCode, setSmsCode] = useState('')
  const [timer, setTimer] = useState(2) // 1:59 в секундах
  const navigate = useNavigate()
  const location = useLocation()
  const phone = location.state?.phone || ''

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(interval)
          return 0
        }
        return prevTimer - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleBack = () => {
    navigate(-1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('SMS код:', smsCode)
	//  if(smsCode == '123456'){
		navigate('/contacts')
	//  }
  }
  const handleResend = () => {
    console.log('Отправить код повторно')
	 setTimer(119)
  }

  return (
    <div className={styles.smsContainer}>
      <form onSubmit={handleSubmit} className={styles.smsForm}>
        <button type="button" onClick={handleBack} className={styles.backButton}>
          Вернуться назад
        </button>

        <div className={styles.stepIndicator}>
          <span>02</span>/04
        </div>

        <h2>Код из СМС</h2>

        <p className={styles.phoneInfo}>
          На номер <span>+{phone}</span> отправлено SMS. Введите код чтобы продолжить регистрацию.
        </p>

        <div className={styles.formGroup}>
          <label>Введите код из смс</label>
          <input
            type="text"
            value={smsCode}
            onChange={(e) => setSmsCode(e.target.value)}
            maxLength={6}
            placeholder="Введите код"
          />
        </div>

        <div className={styles.timer}>
          {timer ? formatTime(timer) : <button type="button" onClick={handleResend} className={styles.resendButton}>Отправить код повторно</button>}
        </div>

        <button type="submit" className={styles.submitButton}>
          Продолжить
        </button>
      </form>

      <div className={styles.progressBar}>
        <div className={styles.step}>
          <div className={styles.line} />
          <div className={styles.stepContent}>
            <img src="/img/autherisation/Point.png" alt="Complete" />
            <span>Регистрация</span>
          </div>
          <div className={`${styles.line} ${styles.finish}`} />
          <div className={`${styles.stepContent} ${styles.active}`}>
			 <img src="/img/autherisation/Point.png" alt="Complete" />
            <span>Кода из SMS</span>
          </div>
          <div className={`${styles.line} ${styles.complete}`} />
          <div className={styles.stepContent}>
            <h3>03</h3>
            <span>Контакты</span>
          </div>
          <div className={`${styles.line} ${styles.progress}`} />
          <div className={styles.stepContent}>
            <h3>04</h3>
            <span>Регистрация</span>
          </div>
        </div>
      </div>
    </div>
  )
} 