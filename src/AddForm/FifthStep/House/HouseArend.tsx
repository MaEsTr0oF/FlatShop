import { useState, useEffect } from 'react'
import styles from '../FifthStep.module.css'
import { PriceData } from '../../../types/form'

interface HouseArendProps {
	onNext: () => void;
	onBack: () => void;
	onSave: () => void;
	onDataUpdate?: (data: PriceData) => void;
	initialData?: PriceData | null;
}

export default function HouseArend({ onNext, onBack, onSave, onDataUpdate, initialData }: HouseArendProps) {
	const defaultData: PriceData = {
		price: 0,
		mortgage: false,
		commission: 0,
		rentType: '',
		minRentPeriod: '',
		maintenance: false,
		vat: '',
		onlineShow: false,
		deposit: 0,
		maxGuests: 0,
		utilities: {
			included: false,
			electricity: false,
			gas: false,
			water: false,
			internet: false
		},
		rules: {
			children: false,
			pets: false,
			smoking: false,
			party: false,
			docs: false,
			month: false
		},
		showingTime: {
			everyday: true,
			startTime: '09:00',
			endTime: '21:00',
			online: false,
			customDays: {
				monday: true,
				tuesday: true,
				wednesday: true,
				thursday: true,
				friday: true,
				saturday: true,
				sunday: true
			}
		}
	};

	const [formData, setFormData] = useState<PriceData>(initialData || defaultData);

	useEffect(() => {
		if (onDataUpdate) {
			onDataUpdate(formData);
		}
	}, [formData, onDataUpdate]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target;
		setFormData((prev: PriceData) => ({
			...prev,
			[name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
		}));
	};

	return (
		<form className={styles.form}>
			<h2 className={styles.title}>УСЛОВИЯ СДЕЛКИ</h2>

			<div className={styles.formGroup}>
				<label>Максимальное количество гостей</label>
				<input
					type="text"
					name="maxGuests"
					value={formData.maxGuests}
					onChange={handleChange}
					placeholder="Введите максимальное количество гостей"
					className={styles.input}
				/>
			</div>

			<div className={styles.formGroup}>
				<label>Правила</label>
				<div className={styles.checkboxGroup}>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="rules.children"
							checked={formData.rules?.children}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Можно с детьми
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="rules.pets"
							checked={formData.rules?.pets}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Можно с животными
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="rules.smoking"
							checked={formData.rules?.smoking}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Можно курить
					</label>
				</div>
			</div>

			<div className={styles.buttonGroup}>
				<button type="button" onClick={onBack} className={styles.backButton}>
					Назад
				</button>
				<button type="button" onClick={onNext} className={styles.nextButton}>
					Выставить объявление
				</button>
				<button type="button" onClick={onSave} className={styles.saveButton}>
					Сохранить и выйти
				</button>
			</div>

			<div className={styles.progressBar}>
				<div className={styles.progressLine} style={{ '--progress-width': '100%' } as React.CSSProperties} />
				<div className={styles.progressStep}>
					<div className={`${styles.stepNumber} ${styles.completed}`}>01</div>
					<div className={styles.stepTitle}>Новое объявление</div>
				</div>
				<div className={styles.progressStep}>
					<div className={`${styles.stepNumber} ${styles.completed}`}>02</div>
					<div className={styles.stepTitle}>О доме</div>
				</div>
				<div className={styles.progressStep}>
					<div className={`${styles.stepNumber} ${styles.completed}`}>03</div>
					<div className={styles.stepTitle}>Фото и описание</div>
				</div>
				<div className={styles.progressStep}>
					<div className={`${styles.stepNumber} ${styles.completed}`}>04</div>
					<div className={styles.stepTitle}>О здании</div>
				</div>
				<div className={styles.progressStep}>
					<div className={`${styles.stepNumber} ${styles.active}`}>05</div>
					<div className={styles.stepTitle}>Условия сделки</div>
				</div>
			</div>
		</form>
	)
} 