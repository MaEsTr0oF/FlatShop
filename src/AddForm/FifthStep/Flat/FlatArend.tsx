import { useState, useEffect } from 'react'
import styles from '../../AddForm.module.css'
import { PriceData } from '../../../types/form'

interface FlatArendProps {
	onNext: () => void;
	onBack: () => void;
	onSave: () => void;
	onDataUpdate: (data: PriceData) => void;
	initialData: PriceData | null;
	rentType: string;
}

export default function FlatArend({ onNext, onBack, onSave, rentType, onDataUpdate, initialData }: FlatArendProps) {
	const [formData, setFormData] = useState<PriceData>({
		price: initialData?.price || 0,
		mortgage: initialData?.mortgage || false,
		commission: initialData?.commission || 0,
		rentType: initialData?.rentType || rentType,
		minRentPeriod: initialData?.minRentPeriod || '',
		maintenance: initialData?.maintenance || false,
		vat: initialData?.vat || '',
		onlineShow: initialData?.onlineShow || false,
		deposit: initialData?.deposit || 0,
		utilities: {
			included: initialData?.utilities?.included || false,
			electricity: initialData?.utilities?.electricity || false,
			gas: initialData?.utilities?.gas || false,
			water: initialData?.utilities?.water || false,
			internet: initialData?.utilities?.internet || false
		},
		rules: {
			children: initialData?.rules?.children || false,
			pets: initialData?.rules?.pets || false,
			smoking: initialData?.rules?.smoking || false,
			party: initialData?.rules?.party || false,
			docs: initialData?.rules?.docs || false,
			month: initialData?.rules?.month || false
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
	});

	useEffect(() => {
		if (onDataUpdate) {
			onDataUpdate(formData);
		}
	}, [formData, onDataUpdate]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target;
		const checked = (e.target as HTMLInputElement).checked;

		setFormData((prev: PriceData) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value
		}));
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
				{rentType === 'Посуточная аренда' && (
					<>
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
				)}
			</div>
			<div className={styles.buttons}>
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
		</form>
	);
} 