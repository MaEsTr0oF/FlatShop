import { useState } from 'react'
import styles from '../FifthStep.module.css'
import { PriceData } from '../FifthStep'

interface RoomArendProps {
	onNext: () => void;
	onBack: () => void;
	onSave: () => void;
	rentType: string;
}

export default function RoomArend({ onNext, onBack, onSave, rentType }: RoomArendProps) {
	const [formData, setFormData] = useState<PriceData>({
		price: '',
		priceType: 'fixed',
		mortgage: false,
		commission: '',
		deposit: '',
		prepayment: '',
		utilities: {
			included: false,
			electricity: false,
			gas: false,
			water: false,
			internet: false
		},
		minRentalPeriod: '',
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
			setFormData(prev => ({
				...prev,
				[category]: {
					...prev[category as keyof PriceData],
					[field]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
				}
			}))
		} else {
			setFormData(prev => ({
				...prev,
				[name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
			}))
		}
	}

	const handleCustomDaysChange = (day: string) => {
		setFormData(prev => ({
			...prev,
			showingTime: {
				...prev.showingTime!,
				customDays: {
					...prev.showingTime?.customDays,
					[day]: !(prev.showingTime?.customDays?.[day as keyof typeof prev.showingTime.customDays])
				}
			}
		}))
	}

	return (
		<form className={styles.form}>
			<h2 className={styles.title}>ЦЕНА И УСЛОВИЯ</h2>

			<div className={styles.formGroup}>
				<label>Цена за {rentType === 'Посуточная аренда' ? 'сутки' : 'месяц'}</label>
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
				<label>Депозит</label>
				<input
					type="text"
					name="deposit"
					value={formData.deposit}
					onChange={handleChange}
					placeholder="Введите размер депозита"
					className={styles.input}
				/>
			</div>

			<div className={styles.formGroup}>
				<label>Предоплата</label>
				<input
					type="text"
					name="prepayment"
					value={formData.prepayment}
					onChange={handleChange}
					placeholder="Введите размер предоплаты"
					className={styles.input}
				/>
			</div>

			{rentType === 'Долгосрочная аренда' && (
				<div className={styles.formGroup}>
					<label>Минимальный срок аренды, мес.</label>
					<input
						type="text"
						name="minRentalPeriod"
						value={formData.minRentalPeriod}
						onChange={handleChange}
						placeholder="Введите минимальный срок"
						className={styles.input}
					/>
				</div>
			)}

			<div className={styles.formGroup}>
				<label>Коммунальные платежи</label>
				<label className={styles.checkbox}>
					<input
						type="checkbox"
						name="utilities.included"
						checked={formData.utilities?.included}
						onChange={handleChange}
					/>
					<span className={styles.checkmark}></span>
					Включены в стоимость
				</label>

				{!formData.utilities?.included && (
					<div className={styles.checkboxGroup}>
						<label className={styles.checkbox}>
							<input
								type="checkbox"
								name="utilities.electricity"
								checked={formData.utilities?.electricity}
								onChange={handleChange}
							/>
							<span className={styles.checkmark}></span>
							Электричество
						</label>
						<label className={styles.checkbox}>
							<input
								type="checkbox"
								name="utilities.gas"
								checked={formData.utilities?.gas}
								onChange={handleChange}
							/>
							<span className={styles.checkmark}></span>
							Газ
						</label>
						<label className={styles.checkbox}>
							<input
								type="checkbox"
								name="utilities.water"
								checked={formData.utilities?.water}
								onChange={handleChange}
							/>
							<span className={styles.checkmark}></span>
							Вода
						</label>
						<label className={styles.checkbox}>
							<input
								type="checkbox"
								name="utilities.internet"
								checked={formData.utilities?.internet}
								onChange={handleChange}
							/>
							<span className={styles.checkmark}></span>
							Интернет
						</label>
					</div>
				)}
			</div>

			<div className={styles.formGroup}>
				<label>Время показа</label>
				<label className={styles.checkbox}>
					<input
						type="checkbox"
						name="showingTime.everyday"
						checked={formData.showingTime?.everyday}
						onChange={handleChange}
					/>
					<span className={styles.checkmark}></span>
					Ежедневно
				</label>

				{formData.showingTime?.everyday ? (
					<div className={styles.timeGroup}>
						<div className={styles.formGroup}>
							<label>С</label>
							<input
								type="time"
								name="showingTime.startTime"
								value={formData.showingTime?.startTime}
								onChange={handleChange}
								className={styles.input}
							/>
						</div>
						<div className={styles.formGroup}>
							<label>До</label>
							<input
								type="time"
								name="showingTime.endTime"
								value={formData.showingTime?.endTime}
								onChange={handleChange}
								className={styles.input}
							/>
						</div>
					</div>
				) : (
					<div className={styles.daysGroup}>
						{Object.entries(formData.showingTime?.customDays || {}).map(([day, checked]) => (
							<label key={day} className={styles.checkbox}>
								<input
									type="checkbox"
									checked={checked}
									onChange={() => handleCustomDaysChange(day)}
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