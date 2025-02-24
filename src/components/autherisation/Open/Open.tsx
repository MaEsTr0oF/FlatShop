
import { Link } from 'react-router-dom'
import styles from './Open.module.css'
import { useState } from 'react'
import Captch from '../Captch/Captch'
export default function Open() {
	const [phone, setPhone] = useState('')
	const [password, setPassword] = useState('')
	

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
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
				<Captch />
				<button type="submit" className={styles.submitButton}>
					Продолжить
				</button>

				<div className={styles.registerLink}>
					<Link to="/register">Зарегистрироваться</Link>
				</div>
			</form>
		</div>
	)
}
