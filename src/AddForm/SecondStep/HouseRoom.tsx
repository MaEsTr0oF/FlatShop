import { Dispatch, SetStateAction } from 'react'
import styles from './SecondStep.module.css'
import { FormData } from './SecondStep'

interface HouseRoomProps {
	formData: FormData;
	setFormData: Dispatch<SetStateAction<FormData>>;
	propertyType: string;
	listingType: string;
	onNext: () => void;
	onBack: () => void;
	onSave: () => void;
}

export default function HouseRoom({
	formData,
	setFormData,
	propertyType,
	listingType,
	onNext,
	onBack,
	onSave
}: HouseRoomProps) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target

		if (type === 'checkbox') {
			const checkbox = e.target as HTMLInputElement
			const [category, field] = name.split('.')

			setFormData(prev => {
				const categoryData = prev[category as keyof FormData]
				if (typeof categoryData === 'object' && categoryData !== null) {
					return {
						...prev,
						[category]: {
							...categoryData,
							[field]: checkbox.checked
						}
					}
				}
				return prev
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
				<label>Тип объекта</label>
				<select
					name="type"
					value={formData.type}
					onChange={handleChange}
					className={styles.select}
				>
					<option value="Дом">Дом</option>
				</select>
			</div>

			{listingType != "Аренда" && <>
				<div className={styles.formGroup}>
					<label>Категория земель</label>
					<select
						name="landCategory"
						value={formData.landCategory}
						onChange={handleChange}
						className={styles.select}
				>
					<option value="ИЖС">ИЖС</option>
				</select>
			</div>
			

			<div className={styles.formGroup}>
				<label>Год постройки</label>
				<input
					type="number"
					name="buildYear"
					value={formData.buildYear}
					onChange={handleChange}
					placeholder="Введите год постройки"
					className={styles.input}
					min="1900"
					max={new Date().getFullYear()}
				/>
			</div>
			</>}
			<div className={styles.formGroup}>
				<label>Количество этажей в доме</label>
				<input
					type="number"
					name="floorCount"
					value={formData.floorCount}
					onChange={handleChange}
					placeholder="Введите количество этажей"
					className={styles.input}
					min="1"
				/>
			</div>

			<div className={styles.formGroup}>
				<label>Количество комнат</label>
				<input
					type="number"
					name="roomCount"
					value={formData.roomCount}
					onChange={handleChange}
					placeholder="Введите количество комнат"
					className={styles.input}
					min="1"
				/>
			</div>
			{listingType != "Аренда" && <>
			<div className={styles.formGroup}>
				<label>Площадь дома</label>
				<input
					type="number"
					name="totalArea"
					value={formData.totalArea}
					onChange={handleChange}
					placeholder="Введите общую площадь"
					className={styles.input}
					min="0"
					step="0.1"
				/>
			</div>

			<div className={styles.formGroup}>
				<label>Площадь участка</label>
				<input
					type="number"
					name="landArea"
					value={formData.landArea}
					onChange={handleChange}
					placeholder="Введите площадь участка"
					className={styles.input}
					min="0"
					step="0.1"
				/>
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
					<option value="В доме">В доме</option>
					<option value="На улице">На улице</option>
				</select>
			</div>
			{listingType != "Аренда" && <>
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
			</>}

			<div className={styles.formGroup}>
				<label>Интернет и ТВ</label>
				<div className={styles.checkboxGroup}>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="additionalFeatures.wifi"
							checked={formData.additionalFeatures.wifi}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Wi-Fi
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="additionalFeatures.tv"
							checked={formData.additionalFeatures.tv}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Телевидение
					</label>
				</div>
			</div>

			<div className={styles.formGroup}>
				<label>Комфорт</label>
				<div className={styles.checkboxGroup}>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="additionalFeatures.towels"
							checked={formData.additionalFeatures.towels}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Полотенца
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="additionalFeatures.hygiene"
							checked={formData.additionalFeatures.hygiene}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Средства гигиены
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="additionalFeatures.bedLinen"
							checked={formData.additionalFeatures.bedLinen}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Постельное белье
					</label>
				</div>
			</div>

			<div className={styles.formGroup}>
				<label>Удобства</label>
				<div className={styles.checkboxGroup}>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="features.bathhouse"
							checked={formData.features.bathhouse}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Баня или сауна
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="features.pool"
							checked={formData.features.pool}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Бассейн
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="features.terrace"
							checked={formData.features.terrace}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Терасса или веранда
					</label>
				</div>
			</div>
			{listingType != "Аренда" && <>
			<div className={styles.formGroup}>
				<label>Материал стен</label>
				<select
					name="wallMaterial"
					value={formData.wallMaterial}
					onChange={handleChange}
					className={styles.select}
				>
					<option value="Брус">Брус</option>
					<option value="Кирпич">Кирпич</option>
					<option value="Бетон">Бетон</option>
				</select>
			</div>
			</>}
			<div className={styles.formGroup}>
				<label>Санузел</label>
				<div className={styles.checkboxGroup}>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="bathroomLocation.inHouse"
							checked={formData.bathroomLocation?.inHouse}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						В доме
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="bathroomLocation.outside"
							checked={formData.bathroomLocation?.outside}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						На улице
					</label>
				</div>
			</div>

			<div className={styles.formGroup}>
				<label>Парковка</label>
				<select
					name="parking"
					value={formData.parking}
					onChange={handleChange}
					className={styles.select}
				>
					<option value="Гараж">Гараж</option>
					<option value="Парковка">Парковка</option>
					<option value="Нет">Нет</option>
				</select>
			</div>

			<div className={styles.formGroup}>
				<label>Транспортная доступность</label>
				<div className={styles.checkboxGroup}>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="transport.asphaltRoad"
							checked={formData.transport?.asphaltRoad}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Асфальтированная дорога
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="transport.publicTransport"
							checked={formData.transport?.publicTransport}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Остановка общественного транспорта
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="transport.railwayStation"
							checked={formData.transport?.railwayStation}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Железнодорожная станция
					</label>
				</div>
			</div>

			<div className={styles.formGroup}>
				<label>Инфраструктура</label>
				<div className={styles.checkboxGroup}>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="infrastructure.shop"
							checked={formData.infrastructure?.shop}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Магазин
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="infrastructure.kindergarten"
							checked={formData.infrastructure?.kindergarten}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Детский сад
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="infrastructure.pharmacy"
							checked={formData.infrastructure?.pharmacy}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Аптека
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="infrastructure.school"
							checked={formData.infrastructure?.school}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Школа
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
	)
} 