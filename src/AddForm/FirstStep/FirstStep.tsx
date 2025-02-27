import styles from './FirstStep.module.css'

interface FormData {
	title: string;
	propertyType: string;
	listingType: string;
	address: string;
	rentType: string;
}

interface FirstStepProps {
	onNext: () => void;
	onSave: () => void;
	formData: FormData;
	updateFormData: (data: Partial<FormData>) => void;
}

export default function FirstStep({ onNext, onSave, formData, updateFormData }: FirstStepProps) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		updateFormData({ [name]: value })
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3 className={styles.step}>01/<span>05</span></h3>
				<h2 className={styles.title}>НОВОЕ ОБЪЯВЛЕНИЕ</h2>
			</div>

			<form className={styles.form}>
				<div className={styles.formGroup}>
					<label>Название объявления</label>
					<input
						type="text"
						name="title"
						value={formData.title}
						onChange={handleChange}
						placeholder="Введите название"
						className={styles.input}
					/>
				</div>

				<div className={styles.formGroup}>
					<label>Тип объекта недвижимости</label>
					<select
						name="propertyType"
						value={formData.propertyType}
						onChange={handleChange}
						className={styles.select}
					>
						<option value="Квартирa">Квартира</option>
						<option value="Комната">Комната</option>
						<option value="Дом">Дом</option>
						<option value="Коммерческая недвижимость">Коммерческая недвижимость</option>
					</select>
				</div>

				<div className={styles.formGroup}>
					<label>Тип объявления</label>
					<select
						name="listingType"
						value={formData.listingType}
						onChange={handleChange}
						className={styles.select}
					>
						<option value="Продажа">Продажа</option>
						<option value="Аренда">Аренда</option>
					</select>
				</div>

				{formData.listingType === 'Аренда' && formData.propertyType !== 'Коммерческая недвижимость' && (
					<div className={styles.formGroup}>
						<label>Тип аренды</label>
						<select
							name="rentType"
							value={formData.rentType}
							onChange={handleChange}
							className={styles.select}
						>
							<option value="Долгосрочная аренда">Долгосрочная аренда</option>
							<option value="Посуточная аренда">Посуточная аренда</option>
						</select>
					</div>
				)}

				<div className={styles.formGroup}>
					<label>Расположение</label>
					<input
						type="text"
						name="address"
						value={formData.address}
						onChange={handleChange}
						placeholder="Адрес"
						className={styles.input}
					/>
					<div className={styles.map}>
						{/* Здесь будет компонент карты */}
					</div>
				</div>

				<div className={styles.buttons}>
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
				<div className={styles.progressLine} style={{ '--progress-width': '0%' } as React.CSSProperties} />
				<div className={styles.progressStep}>
					<div className={`${styles.stepNumber} ${styles.active}`}>01</div>
					<div className={styles.stepTitle}>Новое объявление</div>
				</div>
				<div className={styles.progressStep}>
					<div className={styles.stepNumber}>02</div>
					<div className={styles.stepTitle}>О квартире</div>
				</div>
				<div className={styles.progressStep}>
					<div className={styles.stepNumber}>03</div>
					<div className={styles.stepTitle}>О доме</div>
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
