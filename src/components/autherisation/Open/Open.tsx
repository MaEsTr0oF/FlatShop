import { Link, useNavigate } from 'react-router-dom'
import styles from './Open.module.css'
import { useState } from 'react'
import Captch from '../Captch/Captch'

export default function Open() {
	const [phone, setPhone] = useState('')
	const [password, setPassword] = useState('')
	const [isVerified, setIsVerified] = useState(false)
	const [showModal, setShowModal] = useState(false)
	const [modalMessage, setModalMessage] = useState('')
	const navigate = useNavigate()
	
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		
		if (!phone && !password && !isVerified) {
			setModalMessage('Пожалуйста, заполните номер телефона, пароль и пройдите капчу')
			setShowModal(true)
			return
		}
		
		if (!phone) {
			setModalMessage('Пожалуйста, введите номер телефона')
			setShowModal(true)
			return
		}
		
		if (!password) {
			setModalMessage('Пожалуйста, введите пароль')
			setShowModal(true)
			return
		}
		
		if (!isVerified) {
			setModalMessage('Пожалуйста, пройдите проверку капчи')
			setShowModal(true)
			return
		}

		if (phone && password && isVerified) {
			navigate('/main')
		}
	}

	const handleVerify = (verified: boolean) => {
		setIsVerified(verified)
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
				<button 
					type="submit" 
					className={styles.submitButton}
				>
					Продолжить
				</button>

				<div className={styles.registerLink}>
					<Link to="/register">Зарегистрироваться</Link>
				</div>
			</form>

			{showModal && (
				<div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
					<div className={styles.modal} onClick={e => e.stopPropagation()}>
						<h3>Внимание</h3>
						<p>{modalMessage}</p>
						<button onClick={() => setShowModal(false)}>Закрыть</button>
					</div>
				</div>
			)}
		</div>
	)
}
