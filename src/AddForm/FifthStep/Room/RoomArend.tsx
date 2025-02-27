import { useState, useEffect } from 'react'
import styles from '../../AddForm.module.css'
import { PriceData } from '../../../types/form'

interface RoomArendProps {
	onNext: () => void;
	onBack: () => void;
	onSave: () => void;
	onDataUpdate?: (data: PriceData) => void;
	initialData?: PriceData | null;
}

export default function RoomArend({ onNext, onBack, onSave, onDataUpdate, initialData }: RoomArendProps) {
	const [formData, setFormData] = useState<PriceData>({
		price: 0,
		priceType: 'fixed',
		mortgage: false,
		commission: 0,
		rentType: initialData?.rentType || '',
		minRentPeriod: initialData?.minRentPeriod || '',
		utilities: {
			included: false,
			electricity: false,
			gas: false,
			water: false,
			internet: false
		},
		maintenance: false,
		vat: initialData?.vat || '',
		onlineShow: false,
		deposit: 0,
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
	});

	useEffect(() => {
		if (onDataUpdate) {
			onDataUpdate(formData);
		}
	}, [formData, onDataUpdate]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target;
		
		if (name.startsWith('utilities.')) {
			const utilityField = name.split('.')[1];
			setFormData(prev => ({
				...prev,
				utilities: {
					...prev.utilities!,
					[utilityField]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
				}
			}));
		} else {
			setFormData(prev => ({
				...prev,
				[name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
					name === 'price' || name === 'deposit' ? 
					parseFloat(value) || 0 : value
			}));
		}
	};

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