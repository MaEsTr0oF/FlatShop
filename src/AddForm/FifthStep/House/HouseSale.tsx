import { useState } from 'react'
import styles from '../FifthStep.module.css'
import { PriceData } from '../FifthStep'

interface HouseSaleProps {
	onNext: () => void;
	onBack: () => void;
	onSave: () => void;
}

export default function HouseSale({ onNext, onBack, onSave }: HouseSaleProps) {
	const [formData, setFormData] = useState<PriceData>({
		price: '',
		priceType: 'fixed',
		mortgage: false,
		commission: '',
		showingTime: {
			everyday: true,
			startTime: '09:00',
			endTime: '21:00',
			customDays: {
				monday: true,
				tuesday: true,
				wednesday: true,
				thursday: true,
				friday: true,
				saturday: true,
				sunday: true
			}
		}
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target
		
		if (name.includes('.')) {
			const [category, field] = name.split('.')
			if (category === 'showingTime') {
				setFormData(prev => ({
					...prev,
					showingTime: {
						...prev.showingTime,
						[field]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
					}
				}))
			}
		} else {
			setFormData(prev => ({
				...prev,
				[name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
			}))
		}
	}

	const handleCustomDaysChange = (day: keyof PriceData['showingTime']['customDays']) => {
		setFormData(prev => ({
			...prev,
			showingTime: {
				...prev.showingTime,
				customDays: {
					...prev.showingTime.customDays,
					[day]: !prev.showingTime.customDays[day]
				}
			}
		}))
	}

	return (
		<form className={styles.form}>
			<h2 className={styles.title}>ЦЕНА И УСЛОВИЯ</h2>

			<div className={styles.formGroup}>
				<label>Цена</label>
				<div className={styles.priceInputGroup}>
					<input
						type="text"
						name="price"
						value={formData.price}
						onChange={handleChange}
						placeholder="Введите цену"
						className={styles.input}
					/>
					<div className={styles.priceType}>
						<label className={styles.checkbox}>
							<input
								type="radio"
								name="priceType"
								value="fixed"
								checked={formData.priceType === 'fixed'}
								onChange={handleChange}
							/>
							<span className={styles.checkmark}></span>
							Фиксированная
						</label>
						<label className={styles.checkbox}>
							<input
								type="radio"
								name="priceType"
								value="negotiated"
								checked={formData.priceType === 'negotiated'}
								onChange={handleChange}
							/>
							<span className={styles.checkmark}></span>
							Договорная
						</label>
					</div>
				</div>
			</div>

			<div className={styles.formGroup}>
				<label className={styles.checkbox}>
					<input
						type="checkbox"
						name="mortgage"
						checked={formData.mortgage}
						onChange={handleChange}
					/>
					<span className={styles.checkmark}></span>
					Ипотека
				</label>
			</div>

			<div className={styles.formGroup}>
				<label>Комиссия, %</label>
				<input
					type="text"
					name="commission"
					value={formData.commission}
					onChange={handleChange}
					placeholder="Введите размер комиссии"
					className={styles.input}
				/>
			</div>

			<div className={styles.formGroup}>
				<label>Время показа</label>
				<label className={styles.checkbox}>
					<input
						type="checkbox"
						name="showingTime.everyday"
						checked={formData.showingTime.everyday}
						onChange={handleChange}
					/>
					<span className={styles.checkmark}></span>
					Ежедневно
				</label>

				{formData.showingTime.everyday ? (
					<div className={styles.timeGroup}>
						<div className={styles.formGroup}>
							<label>С</label>
							<input
								type="time"
								name="showingTime.startTime"
								value={formData.showingTime.startTime}
								onChange={handleChange}
								className={styles.input}
							/>
						</div>
						<div className={styles.formGroup}>
							<label>До</label>
							<input
								type="time"
								name="showingTime.endTime"
								value={formData.showingTime.endTime}
								onChange={handleChange}
								className={styles.input}
							/>
						</div>
					</div>
				) : (
					<div className={styles.daysGroup}>
						{Object.entries(formData.showingTime.customDays).map(([day, checked]) => (
							<label key={day} className={styles.checkbox}>
								<input
									type="checkbox"
									checked={checked}
									onChange={() => handleCustomDaysChange(day as keyof PriceData['showingTime']['customDays'])}
								/>
								<span className={styles.checkmark}></span>
								{day.charAt(0).toUpperCase() + day.slice(1)}
							</label>
						))}
					</div>
				)}
			</div>

			<div className={styles.buttonGroup}>
				<button type="button" onClick={onBack} className={styles.backButton}>
					Назад
				</button>
				<button type="button" onClick={onNext} className={styles.nextButton}>
					Продолжить
				</button>
				<button type="button" onClick={onSave} className={styles.saveButton}>
					Сохранить и выйти
				</button>
			</div>
		</form>
	)
} 