import { useState } from 'react'
import styles from '../FourthStep.module.css'

interface HouseSaleProps {
	onNext: () => void;
	onBack: () => void;
	onSave: () => void;
}

interface FormData {
	electricity: string;
	heating: string;
	gas: string;
	waterSupply: string;
	sewerage: string;
	buildingType: string;
	buildYear: string;
	totalArea: string;
	livingArea: string;
	plotArea: string;
	floors: string;
	bedrooms: string;
	bathrooms: string;
	features: Record<string, boolean>;
	plotFeatures: Record<string, boolean>;
}

export default function HouseSale({ onNext, onBack, onSave }: HouseSaleProps) {
	const [formData, setFormData] = useState<FormData>({
		electricity: 'Есть',
		heating: 'Есть',
		gas: 'По границе участка',
		waterSupply: 'Центральное',
		sewerage: 'Септик',
		buildingType: 'Кирпичный',
		buildYear: '',
		totalArea: '',
		livingArea: '',
		plotArea: '',
		floors: '1',
		bedrooms: '',
		bathrooms: '',
		features: {
			garage: false,
			pool: false,
			sauna: false,
			fireplace: false,
			terrace: false,
			balcony: false,
			garden: false
		},
		plotFeatures: {
			fenced: false,
			electricity: false,
			gas: false,
			water: false,
			sewerage: false
		}
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target
		
		if (name.includes('.')) {
			const [category, field] = name.split('.')
			setFormData(prev => ({
				...prev,
				[category]: {
					...(prev[category as keyof FormData] as Record<string, boolean>),
					[field]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
				}
			}))
		} else {
			setFormData(prev => ({
				...prev,
				[name]: value
			}))
		}
	}

	return (
		<form className={styles.form}>
			<h2 className={styles.title}>КОММУНИКАЦИИ</h2>
			
			<div className={styles.formGroup}>
				<label>Электричество</label>
				<select
					name="electricity"
					value={formData.electricity}
					onChange={handleChange}
					className={styles.select}
				>
					<option value="Есть">Есть</option>
					<option value="Нет">Нет</option>
					<option value="По границе участка">По границе участка</option>
				</select>
			</div>

			<div className={styles.formGroup}>
				<label>Отопление</label>
				<select
					name="heating"
					value={formData.heating}
					onChange={handleChange}
					className={styles.select}
				>
					<option value="Есть">Есть</option>
					<option value="Нет">Нет</option>
					<option value="Автономное">Автономное</option>
					<option value="Центральное">Центральное</option>
				</select>
			</div>

			<div className={styles.formGroup}>
				<label>Газ</label>
				<select
					name="gas"
					value={formData.gas}
					onChange={handleChange}
					className={styles.select}
				>
					<option value="Есть">Есть</option>
					<option value="Нет">Нет</option>
					<option value="По границе участка">По границе участка</option>
				</select>
			</div>

			<div className={styles.formGroup}>
				<label>Водоснабжение</label>
				<select
					name="waterSupply"
					value={formData.waterSupply}
					onChange={handleChange}
					className={styles.select}
				>
					<option value="Центральное">Центральное</option>
					<option value="Скважина">Скважина</option>
					<option value="Колодец">Колодец</option>
					<option value="Нет">Нет</option>
				</select>
			</div>

			<div className={styles.formGroup}>
				<label>Канализация</label>
				<select
					name="sewerage"
					value={formData.sewerage}
					onChange={handleChange}
					className={styles.select}
				>
					<option value="Центральная">Центральная</option>
					<option value="Септик">Септик</option>
					<option value="Нет">Нет</option>
				</select>
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