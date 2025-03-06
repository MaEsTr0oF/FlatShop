import { useState, useEffect } from 'react'
import styles from '../../AddForm.module.css'
import { PriceData } from '../../../types/form'

interface CommercialArendProps {
	onNext: () => void;
	onBack: () => void;
	onSave: () => void;
	onDataUpdate: (data: PriceData) => void;
	initialData: PriceData | null;
}

export default function CommercialArend({ onNext, onBack, onSave, onDataUpdate, initialData }: CommercialArendProps) {
	const [formData, setFormData] = useState<PriceData>({
		rules: {
			children: false,
			pets: false,
			smoking: false,
			party: false,
			docs: false,
			month: false
		},
		price: 0,
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
		deposit: 0,
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
		
		if (name.startsWith('utilities.')) {
			const utilityField = name.split('.')[1];
			setFormData(prev => ({
				...prev,
				utilities: {
					...prev.utilities!,
					[utilityField]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
				}
			}));
		} else {
			setFormData(prev => ({
				...prev,
				[name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
					name === 'price' || name === 'deposit' ? 
					parseFloat(value) || 0 : value
			}));
		}
	};

	return (
		<form className={styles.form}>
			<h2 className={styles.title}>УСЛОВИЯ СДЕЛКИ</h2>

			<div className={styles.formGroup}>
				<label>Цена</label>
				<div className={styles.priceInputGroup}>
					<input
						type="text"
						name="price"
						value={formData.price}
						onChange={handleChange}
						placeholder="Введите цену"
						className={styles.input}
					/>
				</div>
			</div>

			<div className={styles.formGroup}>
				<label>Коммунальные платежи</label>
				<div className={styles.checkboxGroup}>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="utilities.included"
							checked={formData.utilities?.included}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Включены в стоимость
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="utilities.electricity"
							checked={formData.utilities?.electricity}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Электричество
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="utilities.water"
							checked={formData.utilities?.water}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Вода
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="utilities.gas"
							checked={formData.utilities?.gas}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Газ
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="utilities.internet"
							checked={formData.utilities?.internet}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Интернет
					</label>
				</div>
			</div>

		</form>
	);
}


