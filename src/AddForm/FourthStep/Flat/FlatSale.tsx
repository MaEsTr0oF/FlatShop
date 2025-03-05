import { useState, useEffect } from 'react'
import styles from '../FourthStep.module.css'
import { FourthStepData } from '../../../types/form'

interface FlatSaleProps {
	onNext: () => void;
	onBack: () => void;
	onSave: () => void;
	onDataUpdate?: (data: FourthStepData) => void;
	initialData?: FourthStepData | null;
}

export default function FlatSale({ onNext, onBack, onSave, onDataUpdate, initialData }: FlatSaleProps) {
	const [formData, setFormData] = useState<FourthStepData>(initialData || {
		readiness: '',
		buildingType: '',
		yearOfConstruction: new Date().getFullYear(),
		floorCount: 1,
		passengerElevator: '',
		freightElevator: '',
		houseFeatures: {
			concierge: false,
			garbage: false,
			gas: false,
		},
		yardFeatures: {
			playground: false,
			sportsGround: false,
			closedTerritory: false,
		},
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
						...prev.parking!,
						[field]: type === 'checkbox' ? checked : value
					}
				}));
			} else if (category === 'houseFeatures' && formData.houseFeatures) {
				setFormData(prev => ({
					...prev,
					houseFeatures: {
						...prev.houseFeatures!,
						[field]: type === 'checkbox' ? checked : value
					}
				}));
			} else if (category === 'yardFeatures' && formData.yardFeatures) {
				setFormData(prev => ({
					...prev,
					yardFeatures: {
						...prev.yardFeatures!,
						[field]: type === 'checkbox' ? checked : value
					}
				}));
			}
		} else {
			setFormData(prev => ({
				...prev,
				[name]: type === 'checkbox' ? checked : 
					(name === 'yearOfConstruction' || name === 'floorCount') ? 
					parseInt(value) || value : value
			}));
		}
	};

	return (
		<form className={styles.form}>
			<h2 className={styles.title}>О ДОМЕ</h2>

			<div className={styles.formGroup}>
				<label>Тип дома</label>
				<select
					name="buildingType"
					value={formData.buildingType}
					onChange={handleChange}
					className={styles.select}
				>
					<option value="">Выберите тип дома</option>
					<option value="Кирпичный">Кирпичный</option>
					<option value="Панельный">Панельный</option>
					<option value="Монолитный">Монолитный</option>
					<option value="Блочный">Блочный</option>
				</select>
			</div>

			<div className={styles.formGroup}>
				<label>Особенности дома</label>
				<div className={styles.checkboxGroup}>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="houseFeatures.concierge"
							checked={formData.houseFeatures?.concierge ?? false}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Консьерж
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="houseFeatures.garbage"
							checked={formData.houseFeatures?.garbage ?? false}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Мусоропровод
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="houseFeatures.gas"
							checked={formData.houseFeatures?.gas ?? false}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Газ
					</label>
				</div>
			</div>

			<div className={styles.formGroup}>
				<label>Год постройки</label>
				<input
					type="number"
					name="yearOfConstruction"
					value={formData.yearOfConstruction}
					onChange={handleChange}
					min="1900"
					step="1"
					className={styles.input}
				/>
			</div>

			<div className={styles.formGroup}>
				<label>Количество этажей</label>
				<input
					type="number"
					name="floorCount"
					value={formData.floorCount}
					onChange={handleChange}
					min="1"
					step="1"
					className={styles.input}
				/>
			</div>

			<div className={styles.formGroup}>
				<label>Пассажирский лифт</label>
				<select
					name="passengerElevator"
					value={formData.passengerElevator}
					onChange={handleChange}
					className={styles.select}
				>
					<option value="">Выберите количество</option>
					<option value="0">Нет</option>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4+">4+</option>
				</select>
			</div>

			<div className={styles.formGroup}>
				<label>Грузовой лифт</label>
				<select
					name="freightElevator"
					value={formData.freightElevator}
					onChange={handleChange}
					className={styles.select}
				>
					<option value="">Выберите количество</option>
					<option value="0">Нет</option>
					<option value="1">1</option>
					<option value="2">2</option>
				</select>
			</div>

			<div className={styles.formGroup}>
				<label>Двор</label>
				<div className={styles.checkboxGroup}>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="yardFeatures.playground"
							checked={formData.yardFeatures?.playground ?? false}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Детская площадка
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="yardFeatures.sportsGround"
							checked={formData.yardFeatures?.sportsGround ?? false}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Спортивная площадка
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="yardFeatures.closedTerritory"
							checked={formData.yardFeatures?.closedTerritory ?? false}
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
							checked={formData.parking?.underground ?? false}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Подземная
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="parking.ground"
							checked={formData.parking?.ground ?? false}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Надземная многоуровневая
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="parking.multilevel"
							checked={formData.parking?.multilevel ?? false}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Открытая во дворе
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="parking.barrier"
							checked={formData.parking?.barrier ?? false}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						За шлагбаумом во дворе
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