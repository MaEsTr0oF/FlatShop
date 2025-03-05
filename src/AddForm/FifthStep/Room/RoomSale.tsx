import { useState, useCallback } from 'react'
import styles from '../../AddForm.module.css'
import { PriceData } from '../../../types/form'
import ButtonGroup from '../../components/ButtonGroup'

interface RoomSaleProps {
	onNext: () => void;
	onBack: () => void;
	onSave: () => void;
	onDataUpdate: (data: PriceData) => void;
	initialData: PriceData | null;
}

export default function RoomSale({ onNext, onBack, onSave, onDataUpdate, initialData }: RoomSaleProps) {
	const [formData, setFormData] = useState<PriceData>(() => ({
		price: initialData?.price || 0,
		priceType: initialData?.priceType || 'fixed',
		mortgage: initialData?.mortgage || false,
		shareSale: initialData?.shareSale || false,
		auction: initialData?.auction || false,
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
				if (category === 'showingTime' && newData.showingTime) {
					newData = {
						...newData,
						showingTime: {
							...newData.showingTime,
							[field]: isCheckbox ? checked : value
						}
					};
				}
			} else {
				newData = {
					...newData,
					[name]: isCheckbox ? checked : 
						(name === 'price' || name === 'commission') ? 
							parseFloat(value) || 0 : value
				};
			}
			
			onDataUpdate(newData);
			return newData;
		});
	}, [onDataUpdate]);

	return (
		<form className={styles.form}>
			<h2 className={styles.title}>УСЛОВИЯ СДЕЛКИ</h2>

			<div className={styles.formGroup}>
				<div className={styles.priceType}>
					<label className={styles.checkbox}>
						Способ продажи
					</label>
					<select name="priceType" value={formData.priceType} onChange={handleChange} className={styles.select}>
						<option value="fixed">Фиксированная</option>
						<option value="negotiated">Свободная</option>
					</select>
				</div>
				<div className={styles.formGroup}>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="mortgage"
							checked={formData.mortgage}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Ипотека
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="shareSale"
							checked={formData.shareSale}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Продажа доли
					</label>
					<label className={styles.checkbox}>
						<input
							type="checkbox"
							name="auction"
							checked={formData.auction}
							onChange={handleChange}
						/>
						<span className={styles.checkmark}></span>
						Аукцион
					</label>
				</div>
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

			<ButtonGroup onNext={onNext} onBack={onBack} onSave={onSave} />
		</form>
	);
} 