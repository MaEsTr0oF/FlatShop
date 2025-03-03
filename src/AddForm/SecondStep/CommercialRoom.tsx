import { Dispatch, SetStateAction } from 'react'
import styles from './SecondStep.module.css'
import { SecondStepData } from '../../types/form'

interface CommercialRoomProps {
	formData: SecondStepData;
	setFormData: Dispatch<SetStateAction<SecondStepData>>;
	onNext: () => void;
	onBack: () => void;
	onSave: () => void;
}

export default function CommercialRoom({
	formData,
	setFormData,
	onNext,
	onBack,
	onSave
}: CommercialRoomProps) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		const [category, field] = name.split('.')

		if (field) {
			setFormData(prev => {
				const categoryValue = prev[category as keyof SecondStepData];
				if (typeof categoryValue === 'object' && categoryValue !== null) {
					return {
						...prev,
						[category]: {
							...categoryValue,
							[field]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
						}
					};
				}
				return prev;
			})
		} else {
			setFormData(prev => ({
				...prev,
				[name]: value
			}))
		}
	}

	return (
		<form className={styles.form}>
			<div className={styles.formGroup}>
				<label>Тип помещения</label>
				<select
					name="type"
					value={formData.type}
					onChange={handleChange}
					className={styles.select}
				>
					<option value="Офис">Офис</option>
					<option value="Коворкинг">Коворкинг</option>
				</select>
			</div>

			<div className={styles.formGroup}>
				<label>Этаж</label>
				<input
					type="number"
					name="floor"
					value={formData.floor}
					onChange={handleChange}
					placeholder="Введите этаж"
					className={styles.input}
				/>
				<div className={styles.checkboxGroup}>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="hasMultipleFloors"
							checked={formData.hasMultipleFloors || false}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Несколько этажей
					</label>
				</div>
			</div>

			<div className={styles.formGroup}>
				<label>Планировка</label>
				<div className={styles.checkboxGroup}>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="layout.open"
							checked={formData.layout?.open || false}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Открытая
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="layout.cabinet"
							checked={formData.layout?.cabinet || false}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Кабинетная
					</label>
				</div>
			</div>

			<div className={styles.formGroup}>
				<label>Общая площадь</label>
				<input
					type="number"
					name="totalArea"
					value={formData.totalArea}
					onChange={handleChange}
					placeholder="Введите общую площадь помещения"
					className={styles.input}
				/>
			</div>

			<div className={styles.formGroup}>
				<label>Высота потолков</label>
				<input
					type="number"
					name="ceilingHeight"
					value={formData.ceilingHeight}
					onChange={handleChange}
					placeholder="Введите высоту потолков"
					className={styles.input}
				/>
			</div>

			<div className={styles.formGroup}>
				<label>Отделка</label>
				<select
					name="renovation"
					value={formData.renovation}
					onChange={handleChange}
					className={styles.select}
				>
					<option value="Офисная">Офисная</option>
				</select>
			</div>

			<div className={styles.formGroup}>
				<label>Мощность сети</label>
				<input
					type="number"
					name="powerCapacity"
					value={formData.powerCapacity || 0}
					onChange={handleChange}
					placeholder="0 кВТ"
					className={styles.input}
				/>
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
	)
} 