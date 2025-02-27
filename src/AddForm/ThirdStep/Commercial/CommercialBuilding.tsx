import { useState } from 'react'
import styles from '../../AddForm.module.css'

interface CommercialBuildingProps {
	onNext: () => void;
	onBack: () => void;
	onSave: () => void;
}

interface FormData {
	readiness: string;
	buildingType: string;
	passengerElevator: string;
	freightElevator: string;
	parking: {
		underground: boolean;
		ground: boolean;
		multilevel: boolean;
		barrier: boolean;
	};
}

export default function CommercialBuilding({ onNext, onBack, onSave }: CommercialBuildingProps) {
	const [formData, setFormData] = useState<FormData>({
		readiness: 'В эксплуатации',
		buildingType: 'Торговый центр',
		passengerElevator: '1',
		freightElevator: 'нет',
		parking: {
			underground: false,
			ground: false,
			multilevel: false,
			barrier: false
		}
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target
		const [category, field] = name.split('.')

		if (field && category === 'parking') {
			setFormData(prev => ({
				...prev,
				parking: {
					...prev.parking,
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
		<div className={styles.stepContainer}>
			<div className={styles.header}>
				<h3 className={styles.step}>03/<span>05</span></h3>
				<h2 className={styles.title}>О ЗДАНИИ</h2>
			</div>

			<form className={styles.form}>
				<div className={styles.formGroup}>
					<label>Готовность</label>
					<select
						name="readiness"
						value={formData.readiness}
						onChange={handleChange}
						className={styles.select}
					>
						<option value="В эксплуатации">В эксплуатации</option>
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
					</select>
				</div>

				<div className={styles.formRow}>
					<div className={styles.formGroup} style={{ flex: 1 }}>
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
							<option value="4">4</option>
						</select>
					</div>
					<div className={styles.formGroup} style={{ flex: 1 }}>
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
							Открытая во дворе
						</label>
						<label className={styles.checkbox}>
							<input
								type="checkbox"
								name="parking.multilevel"
								checked={formData.parking.multilevel}
								onChange={handleChange}
							/>
							<span className={styles.checkmark}></span>
							Надземная многоуровневая
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

				<div className={styles.buttons}>
					<button
						type="button"
						onClick={onBack}
						className={styles.backButton}
					>
						Назад
					</button>
					<button
						type="button"
						onClick={onNext}
						className={styles.nextButton}
					>
						Продолжить
					</button>
					<button
						type="button"
						onClick={onSave}
						className={styles.saveButton}
					>
						Сохранить и выйти
					</button>
				</div>
			</form>

			<div className={styles.progressBar}>
				<div className={styles.progressLine} style={{ '--progress-width': '40%' } as React.CSSProperties} />
				<div className={styles.progressStep}>
					<div className={`${styles.stepNumber} ${styles.completed}`}>01</div>
					<div className={styles.stepTitle}>Новое объявление</div>
				</div>
				<div className={styles.progressStep}>
					<div className={`${styles.stepNumber} ${styles.completed}`}>02</div>
					<div className={styles.stepTitle}>О помещении</div>
				</div>
				<div className={styles.progressStep}>
					<div className={`${styles.stepNumber} ${styles.active}`}>03</div>
					<div className={styles.stepTitle}>О здании</div>
				</div>
				<div className={styles.progressStep}>
					<div className={styles.stepNumber}>04</div>
					<div className={styles.stepTitle}>Фото и описание</div>
				</div>
				<div className={styles.progressStep}>
					<div className={styles.stepNumber}>05</div>
					<div className={styles.stepTitle}>Условия сделки</div>
				</div>
			</div>
		</div>
	)
} 