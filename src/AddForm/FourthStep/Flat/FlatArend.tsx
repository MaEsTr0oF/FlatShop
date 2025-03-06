import { useState, useEffect } from 'react'
import styles from '../FourthStep.module.css'
import { FourthStepData } from '../../../types/form'

interface FlatArendProps {
	onNext: () => void;
	onBack: () => void;
	onSave: () => void;
	onDataUpdate?: (data: FourthStepData) => void;
	initialData?: FourthStepData | null;
}

export default function FlatArend({ onNext, onBack, onSave, onDataUpdate, initialData }: FlatArendProps) {
	const [formData, setFormData] = useState<FourthStepData>(initialData || {
		readiness: '',
		buildingType: '',
		passengerElevator: '',
		freightElevator: '',
		parking: {
			underground: false,
			ground: false,
			multilevel: false,
			barrier: false,
		},
		security: false,
		ventilation: false,
		conditioning: false,
		heating: '',
		salePhotos: [],
		rentPhotos: [],
		videoUrl: '',
		description: '',
		price: '',
		utilities: '',
		otherUtilities: '',
		commission: '',
		deposit: ''
	});

	useEffect(() => {
		if (onDataUpdate) {
			onDataUpdate(formData);
		}
	}, [formData, onDataUpdate]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target;
		const checked = (e.target as HTMLInputElement).checked;

		if (name.includes('.')) {
			const [category, field] = name.split('.');
			if (category === 'parking' && formData.parking) {
				setFormData(prev => ({
					...prev,
					parking: {
						...prev.parking,
						[field]: type === 'checkbox' ? checked : value
					}
				}));
			}
		} else {
			setFormData(prev => ({
				...prev,
				[name]: type === 'checkbox' ? checked : value
			}));
		}
	};

	return (
		<form className={styles.form}>
			<h2 className={styles.title}>Условия аренды</h2>

			<div className={styles.formGroup}>
				<label>Арендная плата</label>
				<input
					type="text"
					name="price"
					value={formData.price}
					onChange={handleChange}
					placeholder="₽ в месяц"
					className={styles.input}
				/>
			</div>

			<div className={styles.formGroup}>
				<label>Оплата по счётчикам</label>
				<select 
					name="utilities" 
					value={formData.utilities} 
					onChange={handleChange} 
					className={styles.select}
				>
					<option value="">Выберите плательщика</option>
					<option value="tenant">Арендатор</option>
					<option value="owner">Собственник</option>
				</select>
			</div>

			<div className={styles.formGroup}>
				<label>Другие ЖКУ</label>
				<select 
					name="otherUtilities" 
					value={formData.otherUtilities} 
					onChange={handleChange} 
					className={styles.select}
				>
					<option value="">Выберите плательщика</option>
					<option value="tenant">Арендатор</option>
					<option value="owner">Собственник</option>
				</select>
			</div>

			<div className={styles.formGroup}>
				<label>Комиссия</label>
				<input
					type="text"
					name="commission"
					value={formData.commission}
					onChange={handleChange}
					placeholder="₽"
					className={styles.input}
				/>
			</div>

			<div className={styles.formGroup}>
				<label>Залог</label>
				<input
					type="text"
					name="deposit"
					value={formData.deposit}
					onChange={handleChange}
					placeholder="₽"
					className={styles.input}
				/>
			</div>

			<div className={styles.buttons}>
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