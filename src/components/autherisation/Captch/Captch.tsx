import styles from './Captch.module.css'
import { useState } from 'react'
export default function Captch() {
	const [isChecked, setIsChecked] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const handleCaptchaClick = () => {
		if (!isChecked) {
			setIsLoading(true)
			setTimeout(() => {
				setIsChecked(true)
				setIsLoading(false)
			}, 1000)
		} else {
			setIsChecked(false)
		}
	}
    return (
		<div className={styles.recaptchaContainer}>
		<div 
			className={`${styles.recaptchaCheckbox} ${isChecked ? styles.checked : ''} ${isLoading ? styles.loading : ''}`}
			onClick={handleCaptchaClick}
		>
			<span>Я не робот</span>
		</div>
		<div className={styles.recaptchaLogo}>reCAPTCHA</div>
	</div>
    )
}
