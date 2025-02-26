import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Register.module.css'
import Captch from '../Captch/Captch'
import Point from '/img/autherisation/Point.png'

export default function Register() {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [language, setLanguage] = useState('Русский')
  const [inviteCode, setInviteCode] = useState('')

  const [userAgreement, setUserAgreement] = useState(false)
  const [privacyPolicy, setPrivacyPolicy] = useState(false)
  const [cookiePolicy, setCookiePolicy] = useState(false)
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false)

  const [errors, setErrors] = useState<string[]>([])

  const navigate = useNavigate()

  const validateForm = (): boolean => {
    const newErrors: string[] = []

    if (password !== confirmPassword) {
      newErrors.push('Пароли не совпадают')
    }

    if (!userAgreement) {
      newErrors.push('Необходимо принять Пользовательское Соглашение')
    }
    if (!privacyPolicy) {
      newErrors.push('Необходимо принять Политику Конфиденциальности')
    }
    if (!cookiePolicy) {
      newErrors.push('Необходимо принять Политику использования файлов Cookie')
    }

    if (!isCaptchaVerified) {
      newErrors.push('Пожалуйста, подтвердите, что вы не робот')
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      navigate('/sms-code')
    }
  }

  const handleCaptchaVerify = (verified: boolean) => {
    setIsCaptchaVerified(verified)
  }

  return (
    <div className={styles.registerContainer}>
      <form onSubmit={handleSubmit} className={styles.registerForm}>
        <div className={styles.stepIndicator}>
          <span>01</span>/04
        </div>
        <h2>Регистрация</h2>

        <div className={styles.formGroup}>
          <label>Выберите язык</label>
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={styles.select}
          >
            <option value="Русский">Русский</option>
            <option value="Английский">Английский</option>
            <option value="Украинский">Украинский</option>
            <option value="Белорусский">Белорусский</option>
            <option value="Казахский">Казахский</option>
            <option value="Татарский">Татарский</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Email *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите почту"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Введите номер телефона *</label>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Номер телефона"
          />
        </div>

        <div className={styles.passwordGroup}>
          <div className={styles.formGroup}>
            <label>Пароль *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Повторите пароль *</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Введите пароль"
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Вас пригласил ID</label>
          <input
            type="text"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            placeholder="Кулагин Валерий Петрович"
          />
        </div>
        {errors.length > 0 && (
          <div className={styles.errors}>
            {errors.map((error, index) => (
              <p key={index} className={styles.error}>{error}</p>
            ))}
          </div>
        )}

        <div className={styles.agreements}>
          <label className={styles.checkbox}>
            <input 
              type="checkbox" 
              checked={userAgreement}
              onChange={(e) => setUserAgreement(e.target.checked)}
            />
            <span>Я ознакомился и принимаю Пользовательского Соглашения</span>
          </label>
          <label className={styles.checkbox}>
            <input 
              type="checkbox" 
              checked={privacyPolicy}
              onChange={(e) => setPrivacyPolicy(e.target.checked)}
            />
            <span>Я ознакомился и принимаю Политику Конфиденциальности</span>
          </label>
          <label className={styles.checkbox}>
            <input 
              type="checkbox" 
              checked={cookiePolicy}
              onChange={(e) => setCookiePolicy(e.target.checked)}
            />
            <span>Я ознакомился и принимаю Политика Использования файлов Cookie</span>
          </label>
        </div>

        <Captch onVerify={handleCaptchaVerify} />

        <button type="submit" className={styles.submitButton}>
          Продолжить
        </button>

        <div className={styles.loginLink}>
          У меня уже есть аккаунт. <Link to="/">Войти</Link>
        </div>
      </form>

      <div className={styles.progressBar}>
        <div className={styles.step}>
          <div className={styles.line} />
          <div className={styles.stepContent}>
            <img src={Point} alt="Complete" />
            <span className={styles.active}>Регистрация</span>
          </div>
          <div className={`${styles.line} ${styles.complete}`} />
          <div className={styles.stepContent}>
				<h3>02</h3>
            <span className={styles.active}>Кода из SMS</span>
          </div>
          <div className={`${styles.line} ${styles.progress}`} />
          <div className={`${styles.stepContent} ${styles.whiteBg}`}>
				<h3>03</h3>
            <span className={styles.active}>Контакты</span>
          </div>
          <div className={`${styles.line} ${styles.grey}`} />
          <div className={`${styles.stepContent} ${styles.whiteBg}`}>
				<h3>04</h3>
            <span className={styles.active}>Регистрация</span>
          </div>
        </div>
      </div>
    </div>
  )
} 