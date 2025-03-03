import { useState, Dispatch, SetStateAction } from 'react'
import styles from './SecondStep.module.css'
import { SecondStepData, BedInfo } from '../../types/form'

interface FlatRoomProps {
	formData: SecondStepData;
	setFormData: Dispatch<SetStateAction<SecondStepData>>;
	propertyType: string;
	listingType: string;
	onNext: () => void;
	onBack: () => void;
	onSave: () => void;
}

export default function FlatRoom({ 
	formData, 
	setFormData, 
	propertyType, 
	listingType,
	onNext,
	onBack,
	onSave
}: FlatRoomProps) {
	const [newBed, setNewBed] = useState<BedInfo>({
		type: 'полуторная',
		count: 1
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target
		const checked = (e.target as HTMLInputElement).checked

		if (name.includes('.')) {
			const [category, subcategory] = name.split('.')
			
			setFormData(prev => {
				const categoryData = prev[category as keyof typeof prev]
				if (typeof categoryData === 'object' && categoryData !== null) {
					return {
						...prev,
						[category]: {
							...categoryData,
							[subcategory]: type === 'checkbox' ? checked : value
						}
					}
				}
				return prev
			})
		} else {
			setFormData(prev => ({
				...prev,
				[name]: type === 'checkbox' ? checked : 
						type === 'number' ? parseFloat(value) || 0 : value
			}))
		}
	}

	const handleAddBed = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setFormData(prev => ({
			...prev,
			beds: [...(prev.beds || []), { ...newBed }]
		}))
		setNewBed({
			type: 'полуторная',
			count: 1
		})
	}

	const handleRemoveBed = (index: number) => {
		setFormData(prev => ({
			...prev,
			beds: prev.beds?.filter((_, i) => i !== index) || []
		}))
	}

	const handleBedChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		setNewBed(prev => ({
			...prev,
			[name]: name === 'count' ? parseInt(value) || 0 : value
		}))
	}

	return (
		<div className={`${styles.container} ${styles.flatRoom}`}>
			<form className={styles.form}>
				{listingType==="Аренда" && propertyType==="Комната"&&<>
					<div className={styles.formGroup}>
						<label>Тип жилья</label>
						<select 
							name="type" 
							value={formData.type}
							onChange={handleChange}
							className={styles.select}
						>
							<option value="комната">Комната</option>
						</select>
					</div>
				</>}
				{propertyType==="Квартира" && <>
					<div className={styles.formGroup}>
						<label>Тип жилья</label>
						<select 
							name="type" 
							value={formData.type}
							onChange={handleChange}
							className={styles.select}
						>
							<option value="квартира">Квартира</option>
							<option value="апартаменты">Апартаменты</option>
						</select>
					</div>
				</>}
				{formData.type!="апартаменты" || !(propertyType==="Комната" && listingType==="Аренда") && <>
				<div className={styles.formGroup}>
					<label>Количество комнат</label>
					<input
						type="number"
						name="roomCount"
						value={formData.roomCount}
						onChange={handleChange}
						min="1"
						className={styles.input}
					/>
				</div>
				
				<div className={styles.formGroup}>
					<label>Тип комнат</label>
					<div className={styles.checkboxGroup}>
						<label className={styles.checkbox}>
							<input
								type="checkbox"
								name="roomType.isolated"
								checked={formData.roomType?.isolated || false}
								onChange={handleChange}
							/>
							<span className={styles.checkmark}></span>
							Изолированные
						</label>
						<label className={styles.checkbox}>
							<input
								type="checkbox"
								name="roomType.adjacent"
								checked={formData.roomType?.adjacent || false}
								onChange={handleChange}
							/>
							<span className={styles.checkmark}></span>
							Смежные
						</label>
					</div>
				</div>
				</>}
				<div className={styles.formGroup}>
					<label>Этаж</label>
					<input
						type="number"
						name="floor"
						value={formData.floor}
						onChange={handleChange}
						min="1"
						className={styles.input}
					/>
				</div>
				{formData.type!="апартаменты" && <>
				<div className={styles.formGroup}>
					<label>Общая площадь, м²</label>
					<input
						type="number"
						name="totalArea"
						value={formData.totalArea}
						onChange={handleChange}
						min="0"
						step="0.1"
						className={styles.input}
					/>
				</div>
				</>}
				{listingType==="Продажа" && <>
				<div className={styles.formGroup}>
					<label>Площадь кухни, м²</label>
					<input
						type="number"
						name="kitchenArea"
						value={formData.kitchenArea || 0}
						onChange={handleChange}
						min="0"
						step="0.1"
						className={styles.input}
					/>
				</div>

				<div className={styles.formGroup}>
					<label>Жилая площадь, м²</label>
					<input
						type="number"
						name="livingArea"
						value={formData.livingArea || 0}
						onChange={handleChange}
						min="0"
						step="0.1"
						className={styles.input}
					/>
				</div>

				<div className={styles.formGroup}>
					<label>Высота потолков, м</label>
					<input
						type="number"
						name="ceilingHeight"
						value={formData.ceilingHeight}
						onChange={handleChange}
						min="0"
						step="0.1"
						className={styles.input}
					/>
				</div>
				</>}
				{(formData.type==="апартаменты" ||(propertyType==="Комната" && listingType==="Аренда")) && <>
				<div className={styles.formGroup}>
					<label>Спальные места</label>
					{formData.beds?.map((bed, index) => (
						<div key={index} className={styles.bedRow}>
							<span>{bed.type} - {bed.count} мест(а)</span>
							<button 
								onClick={() => handleRemoveBed(index)}
								className={styles.removeButton}
							>
								Удалить
							</button>
						</div>
					))}
					<div className={styles.addBedForm}>
						<select
							name="type"
							value={newBed.type}
							onChange={handleBedChange}
							className={styles.select}
						>
							<option value="односпальная">Односпальная (70-110)</option>
							<option value="полуторная">Полуторная (120-140)</option>
							<option value="двуспальная">Двуспальная (150-180)</option>
							<option value="двухъярусная">Двухъярусная</option>
						</select>
						<input
							type="number"
							name="count"
							value={newBed.count}
							onChange={handleBedChange}
							min="1"
							className={styles.input}
						/>
						<button 
							onClick={handleAddBed}
							className={styles.addButton}
						>
							Добавить
						</button>
					</div>
				</div>
				</>}

				<div className={styles.formGroup}>
					<label>Санузел</label>
					<select
						name="bathroom"
						value={formData.bathroom}
						onChange={handleChange}
						className={styles.select}
					>
						<option value="Совмещенный">Совмещенный</option>
						<option value="Раздельный">Раздельный</option>
					</select>
				</div>

				<div className={styles.formGroup}>
					<label>Окна</label>
					<div className={styles.checkboxGroup}>
						<label className={styles.checkbox}>
							<input
								type="checkbox"
								name="windows.courtyard"
								checked={formData.windows.courtyard}
								onChange={handleChange}
							/>
							<span className={styles.checkmark}></span>
							Во двор
						</label>
						<label className={styles.checkbox}>
							<input
								type="checkbox"
								name="windows.street"
								checked={formData.windows.street}
								onChange={handleChange}
							/>
							<span className={styles.checkmark}></span>
							На улицу
						</label>
						<label className={styles.checkbox}>
							<input
								type="checkbox"
								name="windows.sunny"
								checked={formData.windows.sunny}
								onChange={handleChange}
							/>
							<span className={styles.checkmark}></span>
							На солнечную сторону
						</label>
					</div>
				</div>

				<div className={styles.formGroup}>
					<label>Особенности</label>
					<div className={styles.checkboxGroup}>
						<label className={styles.checkbox}>
							<input
								type="checkbox"
								name="features.balcony"
								checked={formData.features?.balcony || false}
								onChange={handleChange}
							/>
							<span className={styles.checkmark}></span>
							Балкон
						</label>
						<label className={styles.checkbox}>
							<input
								type="checkbox"
								name="features.loggia"
								checked={formData.features?.loggia || false}
								onChange={handleChange}
							/>
							<span className={styles.checkmark}></span>
							Лоджия
						</label>
						<label className={styles.checkbox}>
							<input
								type="checkbox"
								name="features.wardrobe"
								checked={formData.features?.wardrobe || false}
								onChange={handleChange}
							/>
							<span className={styles.checkmark}></span>
							Гардеробная
						</label>
						<label className={styles.checkbox}>
							<input
								type="checkbox"
								name="features.panoramicWindows"
								checked={formData.features?.panoramicWindows || false}
								onChange={handleChange}
							/>
							<span className={styles.checkmark}></span>
							Панорамные окна
						</label>
						<label className={styles.checkbox}>
							<input
								type="checkbox"
								name="features.warmFloor"
								checked={formData.features?.warmFloor || false}
								onChange={handleChange}
							/>
							<span className={styles.checkmark}></span>
							Теплый пол
						</label>
					</div>
				</div>

				<div className={styles.formGroup}>
					<label>Ремонт</label>
					<select
						name="renovation"
						value={formData.renovation}
						onChange={handleChange}
						className={styles.select}
					>
						<option value="Евро">Евро</option>
						<option value="Косметический">Косметический</option>
						<option value="Требуется ремонт">Требуется ремонт</option>
						<option value="Без ремонта">Без ремонта</option>
					</select>
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
		</div>
	)
}
