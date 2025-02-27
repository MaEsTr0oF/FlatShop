import { useState } from 'react'
import styles from './FourthStep.module.css'

interface CommercialSaleProps {
	onNext: () => void;
	onBack: () => void;
	onSave: () => void;
}

interface FormData {
	readiness: string;
	buildingType: string;
	passengerElevator: string;
	freightElevator: string;
	parking: Record<string, boolean>;
	photos: Array<{
		id: number;
		url: string;
		main: boolean;
	}>;
}

export default function CommercialSale({ onNext, onBack, onSave }: CommercialSaleProps) {
	const [formData, setFormData] = useState<FormData>({
		readiness: 'В эксплуатации',
		buildingType: 'Торговый центр',
		passengerElevator: '1',
		freightElevator: 'нет',
		parking: {
			underground: false,
			ground: false,
			openYard: false,
			barrier: false
		},
		photos: []
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

	const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (files) {
			const newPhotos = Array.from(files).map((file, index) => ({
				id: Date.now() + index,
				url: URL.createObjectURL(file),
				main: formData.photos.length === 0 // первое фото будет главным
			}))
			setFormData(prev => ({
				...prev,
				photos: [...prev.photos, ...newPhotos]
			}))
		}
	}

	const handleSetMainPhoto = (id: number) => {
		setFormData(prev => ({
			...prev,
			photos: prev.photos.map(photo => ({
				...photo,
				main: photo.id === id
			}))
		}))
	}

	const handleRemovePhoto = (id: number) => {
		setFormData(prev => ({
			...prev,
			photos: prev.photos.filter(photo => photo.id !== id)
		}))
	}

	return (
		<form className={styles.form}>
			<h2 className={styles.title}>О ЗДАНИИ</h2>

			<div className={styles.formGroup}>
				<label>Готовность</label>
				<select
					name="readiness"
					value={formData.readiness}
					onChange={handleChange}
					className={styles.select}
				>
					<option value="В эксплуатации">В эксплуатации</option>
					<option value="Строится">Строится</option>
					<option value="План">План</option>
				</select>
			</div>

			<div className={styles.formGroup}>
				<label>Тип здания</label>
				<select
					name="buildingType"
					value={formData.buildingType}
					onChange={handleChange}
					className={styles.select}
				>
					<option value="Торговый центр">Торговый центр</option>
					<option value="Бизнес-центр">Бизнес-центр</option>
					<option value="Складское помещение">Складское помещение</option>
					<option value="Производственное помещение">Производственное помещение</option>
					<option value="Офисное помещение">Офисное помещение</option>
				</select>
			</div>

			<div className={styles.elevatorGroup}>
				<div className={styles.formGroup}>
					<label>Лифт пассажирский</label>
					<select
						name="passengerElevator"
						value={formData.passengerElevator}
						onChange={handleChange}
						className={styles.select}
					>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="нет">нет</option>
					</select>
				</div>

				<div className={styles.formGroup}>
					<label>Лифт грузовой</label>
					<select
						name="freightElevator"
						value={formData.freightElevator}
						onChange={handleChange}
						className={styles.select}
					>
						<option value="нет">нет</option>
						<option value="1">1</option>
						<option value="2">2</option>
					</select>
				</div>
			</div>

			<div className={styles.formGroup}>
				<label>Парковка</label>
				<div className={styles.checkboxGroup}>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="parking.underground"
							checked={formData.parking.underground}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Подземная
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="parking.ground"
							checked={formData.parking.ground}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Надземная многоуровневая
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="parking.openYard"
							checked={formData.parking.openYard}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Открытая во дворе
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="parking.barrier"
							checked={formData.parking.barrier}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						За шлагбаумом во дворе
					</label>
				</div>
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