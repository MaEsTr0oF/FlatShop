import { useState, useCallback } from 'react'
import styles from '../../AddForm.module.css'
import { PriceData } from '../../../types/form'

interface RoomArendProps {
	onDataUpdate: (data: PriceData) => void;
	initialData: PriceData | null;
}

export default function RoomArend({ onDataUpdate, initialData }: RoomArendProps) {
	const [formData, setFormData] = useState<PriceData>(() => ({
		price: initialData?.price || 0,
		priceType: initialData?.priceType || 'fixed',
		rentType: initialData?.rentType || 'long',
		minRentPeriod: initialData?.minRentPeriod || '1',
		maxGuests: initialData?.maxGuests || 1,
		deposit: initialData?.deposit || 0,
		commission: initialData?.commission || 0,
		utilities: initialData?.utilities || {
			included: false,
			electricity: false,
			gas: false,
			water: false,
			internet: false
		},
		rules: initialData?.rules || {
			children: false,
			pets: false,
			smoking: false,
			party: false,
			docs: false,
			month: false
		},
		showingTime: initialData?.showingTime || {
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
	}));

	const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target;
		const isCheckbox = type === 'checkbox';
		const checked = isCheckbox ? (e.target as HTMLInputElement).checked : undefined;
		
		setFormData(prev => {
			let newData = { ...prev };
			
			if (name.includes('.')) {
				const [category, field] = name.split('.');
				if (category === 'utilities' && newData.utilities) {
					newData = {
						...newData,
						utilities: {
							...newData.utilities,
							[field]: isCheckbox ? checked : value
						}
					};
				} else if (category === 'rules' && newData.rules) {
					newData = {
						...newData,
						rules: {
							...newData.rules,
							[field]: isCheckbox ? checked : value
						}
					};
				}
			} else {
				newData = {
					...newData,
					[name]: isCheckbox ? checked : 
						(name === 'price' || name === 'commission' || name === 'maxGuests' || name === 'minRentPeriod') ? 
							parseInt(value) || 0 : value
				};
			}
			
			onDataUpdate(newData);
			return newData;
		});
	}, [onDataUpdate]);

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
			
			</div>
			
		</form>
	);
} 