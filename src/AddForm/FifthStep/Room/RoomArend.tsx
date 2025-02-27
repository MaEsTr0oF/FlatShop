import { useState, useEffect } from 'react'
import styles from '../FifthStep.module.css'
import { PriceData } from '../FifthStep'

interface RoomArendProps {
	onNext: () => void;
	onBack: () => void;
	onSave: () => void;
	onDataUpdate?: (data: PriceData) => void;
	initialData?: PriceData | null;
}

export default function RoomArend({ onNext, onBack, onSave, onDataUpdate, initialData }: RoomArendProps) {
	const [formData, setFormData] = useState<PriceData>(initialData || {
		price: 0,
		priceType: 'fixed',
		mortgage: false,
		commission: 0,
		deposit: 0,
		prepayment: '',
		utilities: {
			included: false,
			electricity: false,
			gas: false,
			water: false,
			internet: false,
		},
		minRentalPeriod: '',
		maxGuests: '',
		rules: {
			children: false,
			pets: false,
			smoking: false,
			party: false,
			docs: false,
			month: false,
		},
		showingTime: {
			everyday: true,
			startTime: '09:00',
			endTime: '21:00',
			online: false,
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

	useEffect(() => {
		if (onDataUpdate) {
			onDataUpdate(formData);
		}
	}, [formData, onDataUpdate]);

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
			} else if (category === 'utilities' && formData.utilities) {
				setFormData(prev => ({
					...prev,
					utilities: {
						...prev.utilities!,
						[field]: (e.target as HTMLInputElement).checked
					}
				}))
			} else if (category === 'rules' && formData.rules) {
				setFormData(prev => ({
					...prev,
					rules: {
						...prev.rules!,
						[field]: (e.target as HTMLInputElement).checked
					}
				}))
			}
		} else {
			setFormData(prev => ({
				...prev,
				[name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
					name === 'price' || name === 'commission' || name === 'deposit' ? 
					parseFloat(value) || 0 : value
			}))
		}
	}

	return (
		<form className={styles.form}>
			<h2 className={styles.title}>УСЛОВИЯ СДЕЛКИ</h2>

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
				</div>
			</div>

			<div className={styles.formGroup}>
				<label>Комиссия</label>
				<input
					type="text"
					name="commission"
					value={formData.commission}
					onChange={handleChange}
					placeholder="Введите комиссию"
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
					placeholder="Введите депозит"
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
					placeholder="Введите предоплату"
					className={styles.input}
				/>
			</div>

			<div className={styles.formGroup}>
				<label>Коммунальные платежи</label>
				<div className={styles.checkboxGroup}>
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
			</div>

			<div className={styles.formGroup}>
				<label>Минимальный срок аренды</label>
				<input
					type="text"
					name="minRentalPeriod"
					value={formData.minRentalPeriod}
					onChange={handleChange}
					placeholder="Введите минимальный срок"
					className={styles.input}
				/>
			</div>

			<div className={styles.formGroup}>
				<label>Максимальное количество гостей</label>
				<input
					type="text"
					name="maxGuests"
					value={formData.maxGuests}
					onChange={handleChange}
					placeholder="Введите максимальное количество гостей"
					className={styles.input}
				/>
			</div>

			<div className={styles.formGroup}>
				<label>Правила</label>
				<div className={styles.checkboxGroup}>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="rules.children"
							checked={formData.rules?.children}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Можно с детьми
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="rules.pets"
							checked={formData.rules?.pets}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Можно с животными
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="rules.smoking"
							checked={formData.rules?.smoking}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Можно курить
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="rules.party"
							checked={formData.rules?.party}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Можно устраивать вечеринки
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="rules.docs"
							checked={formData.rules?.docs}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Нужны документы
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="rules.month"
							checked={formData.rules?.month}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Помесячная оплата
					</label>
				</div>
			</div>

			<div className={styles.formGroup}>
				<label>Время показа</label>
				<div className={styles.checkboxGroup}>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="showingTime.everyday"
							checked={formData.showingTime.everyday}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Каждый день
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="showingTime.online"
							checked={formData.showingTime.online}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Онлайн-показ
					</label>
				</div>
				<div className={styles.timeInputs}>
					<input
						type="time"
						name="showingTime.startTime"
						value={formData.showingTime.startTime}
						onChange={handleChange}
						className={styles.input}
					/>
					<span>до</span>
					<input
						type="time"
						name="showingTime.endTime"
						value={formData.showingTime.endTime}
						onChange={handleChange}
						className={styles.input}
					/>
				</div>
			</div>

			<div className={styles.buttonGroup}>
				<button type="button" onClick={onBack} className={styles.backButton}>
					Назад
				</button>
				<button type="button" onClick={onNext} className={styles.nextButton}>
					Выставить объявление
				</button>
				<button type="button" onClick={onSave} className={styles.saveButton}>
					Сохранить и выйти
				</button>
			</div>
		</form>
	)
} 