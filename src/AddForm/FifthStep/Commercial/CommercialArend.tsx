import { useState, useEffect } from 'react'
import styles from '../../AddForm.module.css'
import { PriceData } from '../../../types/form'

interface CommercialArendProps {
	onDataUpdate: (data: PriceData) => void;
	initialData: PriceData | null;
}

export default function CommercialArend({  onDataUpdate, initialData }: CommercialArendProps) {
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
		rentType: initialData?.rentType || 'subarend',
		minRentPeriod: initialData?.minRentPeriod || '',
		utilities: {
			included: false,
			electricity: false,
			gas: false,
			water: false,
			internet: false
		},
		maintenance: false,
		vat: initialData?.vat || 'included',
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
			<h2 className={styles.title}>УСЛОВИЯ АРЕНДЫ</h2>

			<div className={styles.formGroup}>
				<label>Тип аренды</label>
				<select 
					name="rentType" 
					value={formData.rentType} 
					onChange={handleChange} 
					className={styles.select}
				>
					<option value="subarend">Субаренда</option>
					<option value="direct">Прямая</option>
				</select>
			</div>

			<div className={styles.formGroup}>
				<label>Минимальный срок аренды</label>
				<input
					type="text"
					name="minRentPeriod"
					value={formData.minRentPeriod}
					onChange={handleChange}
					placeholder="Мес"
					className={styles.input}
				/>
			</div>

			<div className={styles.formGroup}>
				<label>Арендная плата</label>
				<div className={styles.priceInputGroup}>
					<input
						type="text"
						name="price"
						value={formData.price}
						onChange={handleChange}
						placeholder="Стоимость"
						className={styles.input}
					/>
					<select 
						name="priceType" 
						value={formData.priceType} 
						onChange={handleChange} 
						className={styles.select}
						style={{ width: '150px' }}
					>
						<option value="month">В месяц</option>
						<option value="year">В год</option>
					</select>
				</div>
			</div>

			<div className={styles.formGroup}>
				<label className={styles.checkbox}>
					<input
						type="checkbox"
						name="utilities.included"
						checked={formData.utilities.included}
						onChange={handleChange}
					/>
					<span className={styles.checkmark}></span>
					Коммунальные услуги включены
				</label>
			</div>

			<div className={styles.formGroup}>
				<label className={styles.checkbox}>
					<input
						type="checkbox"
						name="maintenance"
						checked={formData.maintenance}
						onChange={handleChange}
					/>
					<span className={styles.checkmark}></span>
					Эксплуатационные расходы/услуги включены
				</label>
			</div>

			<div className={styles.formGroup}>
				<label>НДС</label>
				<select name="vat" value={formData.vat} onChange={handleChange} className={styles.select}>
					<option value="">Да</option>
					<option value="not_included">Нет</option>
				</select>
			</div>

			<div className={styles.formGroup}>
				<label className={styles.checkbox}>
					<input
						type="checkbox"
						name="showingTime.online"
						checked={formData.showingTime.online}
						onChange={handleChange}
					/>
					<span className={styles.checkmark}></span>
					Онлайн-показ
				</label>
			</div>

			<div className={styles.formGroup}>
				<label>Залог</label>
				<input
					type="text"
					name="deposit"
					value={formData.deposit}
					onChange={handleChange}
					placeholder="Размер залога"
					className={styles.input}
				/>
			</div>

			
		</form>
	);
}


