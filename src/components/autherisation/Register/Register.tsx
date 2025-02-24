import { useState } from 'react'
import { Link } from 'react-router-dom'
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Введите пароль"
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

        <div className={styles.agreements}>
          <label className={styles.checkbox}>
            <input type="checkbox" />
            <span>Я ознакомился и принимаю Пользовательского Соглашения</span>
          </label>
          <label className={styles.checkbox}>
            <input type="checkbox" />
            <span>Я ознакомился и принимаю Политику Конфиденциальности</span>
          </label>
          <label className={styles.checkbox}>
            <input type="checkbox" />
            <span>Я ознакомился и принимаю Политика Использования файлов Cookie</span>
          </label>
        </div>

        <Captch />

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
            <span className={styles.active}>Кода из SMS</span>
          </div>
          <div className={`${styles.line} ${styles.progress}`} />
          <div className={styles.stepContent}>
            <span className={styles.active}>Контакты</span>
          </div>
          <div className={`${styles.line} ${styles.grey}`} />
          <div className={styles.stepContent}>
            <span className={styles.active}>Регистрация</span>
          </div>
        </div>
      </div>
    </div>
  )
} 