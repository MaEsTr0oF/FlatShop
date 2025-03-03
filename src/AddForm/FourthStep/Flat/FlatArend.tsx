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
			<h2 className={styles.title}>О ДОМЕ</h2>

			<div className={styles.formGroup}>
				<label>Готовность</label>
				<select
					name="readiness"
					value={formData.readiness}
					onChange={handleChange}
					className={styles.select}
				>
					<option value="">Выберите готовность</option>
					<option value="Готово к проживанию">Готово к проживанию</option>
					<option value="Требует ремонта">Требует ремонта</option>
				</select>
			</div>

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
						Наземная
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="parking.multilevel"
							checked={formData.parking?.multilevel ?? false}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Многоуровневая
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="parking.barrier"
							checked={formData.parking?.barrier ?? false}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Шлагбаум
					</label>
				</div>
			</div>

			<div className={styles.formGroup}>
				<label>Безопасность</label>
				<div className={styles.checkboxGroup}>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="security"
							checked={formData.security}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Охрана
					</label>
				</div>
			</div>

			<div className={styles.formGroup}>
				<label>Вентиляция</label>
				<div className={styles.checkboxGroup}>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="ventilation"
							checked={formData.ventilation}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Приточная
					</label>
				</div>
			</div>

			<div className={styles.formGroup}>
				<label>Кондиционирование</label>
				<div className={styles.checkboxGroup}>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="conditioning"
							checked={formData.conditioning}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Центральное
					</label>
				</div>
			</div>

			<div className={styles.formGroup}>
				<label>Отопление</label>
				<select
					name="heating"
					value={formData.heating}
					onChange={handleChange}
					className={styles.select}
				>
					<option value="">Выберите тип отопления</option>
					<option value="Центральное">Центральное</option>
					<option value="Автономное">Автономное</option>
				</select>
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