import { useState, useEffect } from 'react'
import styles from '../../AddForm.module.css'
import { PriceData } from '../../../types/form'

interface RoomSaleProps {
	onNext: () => void;
	onBack: () => void;
	onSave: () => void;
	onDataUpdate?: (data: PriceData) => void;
	initialData?: PriceData | null;
}

export default function RoomSale({ onNext, onBack, onSave, onDataUpdate, initialData }: RoomSaleProps) {
	const [formData, setFormData] = useState<PriceData>(initialData || {
		price: 0,
		utilities: {
			included: false,
			electricity: false,
			gas: false,
			water: false,
			internet: false
		},
		priceType: 'fixed',
		mortgage: false,
		commission: 0,
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
		},
		rules: {
			children: false,
			pets: false,
			smoking: false,
			party: false,
			docs: false,
			month: false
		}
	})

	useEffect(() => {
		if (onDataUpdate) {
			onDataUpdate(formData);
		}
	}, [formData, onDataUpdate]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target;
		
		if (name.startsWith('showingTime.')) {
			const [, field] = name.split('.');
			setFormData(prev => ({
				...prev,
				showingTime: {
					...prev.showingTime,
					[field]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
				}
			}));
		} else {
			setFormData(prev => ({
				...prev,
				[name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
					name === 'price' || name === 'commission' ? 
					parseFloat(value) || 0 : value
			}));
		}
	}

	return (
		<form className={styles.form}>
			<h2 className={styles.title}>УСЛОВИЯ СДЕЛКИ</h2>

			<div className={styles.formGroup}>
				<div className={styles.priceType}>
					<label className={styles.checkbox}>
						Способ продажи
					</label>
					<select name="priceType" value={formData.priceType} onChange={handleChange} className={styles.select}>
						<option value="fixed">Фиксированная</option>
						<option value="negotiated">Свободная</option>
					</select>
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