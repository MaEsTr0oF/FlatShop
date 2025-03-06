import { useState } from 'react'
import styles from '../FourthStep.module.css'

interface RoomSaleProps {
	onNext: () => void;
	onBack: () => void;
	onSave: () => void;
}

interface FormData {
	buildingType: string;
	buildYear: string;
	floorCount: string;
	passengerElevator: string;
	freightElevator: string;
	yard: Record<string, boolean>;
	parking: Record<string, boolean>;
	features: Record<string, boolean>;
}

export default function RoomSale({ onNext, onBack, onSave }: RoomSaleProps) {
	const [formData, setFormData] = useState<FormData>({
		buildingType: 'Блочный',
		buildYear: '',
		floorCount: '',
		passengerElevator: '1',
		freightElevator: 'нет',
		yard: {
			playground: false,
			sportsGround: false,
			closedTerritory: false
		},
		parking: {
			underground: false,
			ground: false,
			barrier: false,
			openYard: false
		},
		features: {
			concierge: false,
			garbage: false,
			gas: false
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
			<h2 className={styles.title}>О ДОМЕ</h2>
			<div className={styles.formGroup}>
				<label>Тип дома <span className={styles.info}>?</span></label>
				<select
					name="buildingType"
					value={formData.buildingType}
					onChange={handleChange}
					className={styles.select}
				>
					<option value="Блочный">Блочный</option>
					<option value="Кирпичный">Кирпичный</option>
					<option value="Монолитный">Монолитный</option>
					<option value="Панельный">Панельный</option>
				</select>
			</div>

			<div className={styles.formGroup}>
				<label>Год постройки</label>
				<input
					type="text"
					name="buildYear"
					value={formData.buildYear}
					onChange={handleChange}
					placeholder="Введите год постройки"
					className={styles.input}
				/>
			</div>

			<div className={styles.formGroup}>
				<label>Количество этажей</label>
				<input
					type="text"
					name="floorCount"
					value={formData.floorCount}
					onChange={handleChange}
					placeholder="Введите количество этажей в доме"
					className={styles.input}
				/>
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
				<label>Двор</label>
				<div className={styles.checkboxGroup}>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="yard.playground"
							checked={formData.yard.playground}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Dетская площадка
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="yard.sportsGround"
							checked={formData.yard.sportsGround}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Cпортивная площадка
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="yard.closedTerritory"
							checked={formData.yard.closedTerritory}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Закрытая территория
					</label>
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

			<div className={styles.formGroup}>
				<div className={styles.checkboxGroup}>
					<label>Больше особенностей</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="features.concierge"
							checked={formData.features.concierge}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Консьерж
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="features.garbage"
							checked={formData.features.garbage}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Мусоропровод
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="features.gas"
							checked={formData.features.gas}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Газ
					</label>
				</div>
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