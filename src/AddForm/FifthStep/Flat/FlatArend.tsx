import { useState, useEffect } from 'react'
import styles from '../../AddForm.module.css'
import { PriceData } from '../FifthStep'

interface FlatArendProps {
	onBack: () => void;
	onNext: () => void;
	onSave: () => void;
	rentType: string;
	onDataUpdate: (data: PriceData) => void;
	initialData?: PriceData;
}

export default function FlatArend({ onNext, onBack, onSave, rentType, onDataUpdate, initialData }: FlatArendProps) {
	const [formData, setFormData] = useState<PriceData>({
		price: '0',
		priceType: 'fixed',
		mortgage: false,
		commission: 0,
		rentType: initialData?.rentType || '',
		minRentPeriod: initialData?.minRentPeriod || '',
		utilities: {
			included: false,
			electricity: false,
			gas: false,
			water: false,
			internet: false
		},
		maintenance: false,
		vat: initialData?.vat || '',
		onlineShow: false,
		deposit: '0',
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
	});

	useEffect(() => {
		if (initialData) {
			setFormData(initialData);
		}
	}, [initialData]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target;
		const checked = (e.target as HTMLInputElement).checked;

		setFormData((prev: PriceData) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value
		}));
	};

	const handleSubmit = () => {
		onDataUpdate(formData);
		if (onSave) {
			onSave();
		}
		onNext();
	};

	return (
		<form className={styles.form}>
			<div className={styles.stepIndicator}>
				<span className={styles.currentStep}>05</span>
				<span className={styles.totalSteps}>/05</span>
			</div>

			<h2 className={styles.title}>ПРАВИЛА ЗАСЕЛЕНИЯ</h2>

			<div className={styles.formGroup}>
				<label>Максимум гостей</label>
				<input
					type="text"
					name="maxGuests"
					value={formData.maxGuests}
					onChange={handleChange}
					placeholder="Введите максимальное количество гостей"
					className={styles.input}
				/>
			</div>

			<div className={styles.rulesGroup}>
				<label className={styles.checkbox}>
					<input
						type="checkbox"
						name="rules.children"
						checked={formData.rules?.children ?? false}
						onChange={handleChange}
					/>
					<span className={styles.checkmark}></span>
					Можно с детьми
				</label>

				<label className={styles.checkbox}>
					<input
						type="checkbox"
						name="rules.pets"
						checked={formData.rules?.pets ?? false}
						onChange={handleChange}
					/>
					<span className={styles.checkmark}></span>
					Можно с животными
				</label>

				<label className={styles.checkbox}>
					<input
						type="checkbox"
						name="rules.smoking"
						checked={formData.rules?.smoking ?? false}
						onChange={handleChange}
					/>
					<span className={styles.checkmark}></span>
					Можно курить
				</label>
				{rentType === 'Посуточная аренда' && <>
				<label className={styles.checkbox}>
					<input
						type="checkbox"
						name="rules.party"
						checked={formData.rules?.party ?? false}
						onChange={handleChange}
					/>
					<span className={styles.checkmark}></span>
					Разрешены вечеринки
				</label>
				<label className={styles.checkbox}>
					<input
						type="checkbox"
						name="rules.docs"
						checked={formData.rules?.docs ?? false}
						onChange={handleChange}
					/>
					<span className={styles.checkmark}></span>
					Есть отчётные документы
				</label>
				<label className={styles.checkbox}>
					<input
						type="checkbox"
						name="rules.month"
						checked={formData.rules?.month ?? false}
						onChange={handleChange}
					/>
					<span className={styles.checkmark}></span>
					Возможна помесячная аренда
				</label>
				</>
				}
			</div>

			<div className={styles.buttonGroup}>
			<button type="button" onClick={onBack} className={styles.backButton}>
					Назад
				</button>
				<button type="button" onClick={handleSubmit} className={styles.nextButton}>
					Выставить объявление
				</button>
				<button type="button" onClick={onSave} className={styles.saveButton}>
					Сохранить и выйти
				</button>
			</div>
		</form>
	)
} 