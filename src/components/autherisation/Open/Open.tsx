import { Link, useNavigate } from 'react-router-dom'
import styles from './Open.module.css'
import { useState } from 'react'
import Captch from '../Captch/Captch'

export default function Open() {
	const [phone, setPhone] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()
	
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (phone && password) {
			navigate('/main')
		}
	}

	const handleVerify = (verified: boolean) => {
		console.log('Verified:', verified)
	}

	return (
		<div className={styles.loginContainer}>
			<form onSubmit={handleSubmit} className={styles.loginForm}>
				<h2>Вход</h2>
				
				<div className={styles.formGroup}>
					<label>Номер телефона</label>
					<input
						type="tel"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						placeholder="+7 (900) 999-99-99"
					/>
				</div>

				<div className={styles.formGroup}>
					<label>Пароль</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Введите пароль"
					/>
					<a href="#" className={styles.forgotPassword}>Забыли пароль?</a>
				</div>
				<Captch onVerify={handleVerify} />
				<button type="submit" className={styles.submitButton}>
					<Link to="/main">Продолжить</Link>
				</button>

				<div className={styles.registerLink}>
					<Link to="/register">Зарегистрироваться</Link>
				</div>
			</form>

			<div className={styles.progressBar}>
				<div className={styles.progressLine} style={{ '--progress-width': '0%' } as React.CSSProperties} />
				<div className={styles.progressStep}>
					<div className={styles.stepNumber}>01</div>
					<div className={styles.stepTitle}>Начало</div>
				</div>
				<div className={styles.progressStep}>
					<div className={styles.stepNumber}>02</div>
					<div className={styles.stepTitle}>Регистрация</div>
				</div>
				<div className={styles.progressStep}>
					<div className={styles.stepNumber}>03</div>
					<div className={styles.stepTitle}>SMS-код</div>
				</div>
				<div className={styles.progressStep}>
					<div className={styles.stepNumber}>04</div>
					<div className={styles.stepTitle}>Контакты</div>
				</div>
				<div className={styles.progressStep}>
					<div className={styles.stepNumber}>05</div>
					<div className={styles.stepTitle}>Завершение</div>
				</div>
			</div>
		</div>
	)
}
