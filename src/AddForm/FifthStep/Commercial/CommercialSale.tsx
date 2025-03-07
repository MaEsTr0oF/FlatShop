import { useState, useEffect } from 'react'
import styles from '../../AddForm.module.css'
import { PriceData } from '../../../types/form'

interface CommercialSaleProps {
	onDataUpdate: (data: PriceData) => void;
	initialData: PriceData | null;
}

export default function CommercialSale({  onDataUpdate, initialData }: CommercialSaleProps) {
	const [formData, setFormData] = useState<PriceData>(initialData || {
		price: 0,
		priceType: 'fixed',
		mortgage: false,
		shareSale: false,
		auction: false,
		commission: 0,
		vat: 'included',
		hasCurrentTenant: false,
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
	});

	useEffect(() => {
		if (onDataUpdate) {
			onDataUpdate(formData);
		}
	}, [formData, onDataUpdate]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target;
		
		if (name.includes('.')) {
			const [category, field] = name.split('.');
			if (category === 'showingTime') {
				if (field === 'everyday') {
					const isChecked = (e.target as HTMLInputElement).checked;
					setFormData(prev => ({
						...prev,
						showingTime: {
							...prev.showingTime,
							everyday: isChecked,
							customDays: {
								monday: isChecked,
								tuesday: isChecked,
								wednesday: isChecked,
								thursday: isChecked,
								friday: isChecked,
								saturday: isChecked,
								sunday: isChecked
							}
						}
					}));
				} else {
					setFormData(prev => ({
						...prev,
						showingTime: {
							...prev.showingTime,
							[field]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
						}
					}));
				}
			} else if (category === 'customDays') {
				setFormData(prev => ({
					...prev,
					showingTime: {
						...prev.showingTime,
						everyday: false,
						customDays: {
							...prev.showingTime.customDays,
							[field]: (e.target as HTMLInputElement).checked
						}
					}
				}));
			}
		} else {
			setFormData(prev => ({
				...prev,
				[name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
					name === 'price' || name === 'commission' ? 
					parseFloat(value) || 0 : value
			}));
		}
	};

	return (
		<form className={styles.form}>
			<h2 className={styles.title}>УСЛОВИЯ СДЕЛКИ</h2>

			<div className={styles.formGroup}>
				<div className={styles.priceType}>
					<label className={styles.checkbox}>
						Тип сделки
					</label>
					<select name="priceType" value={formData.priceType} onChange={handleChange} className={styles.select}>
						<option value="fixed">Продажа</option>
						<option value="negotiated">Переуступка права аренды</option>
					</select>
				</div>
				<div className={styles.formGroup}>
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
				<label>Арендаторы</label>
				<label className={styles.checkbox}>
					<input
						type="checkbox"
						name="hasCurrentTenant"
						checked={formData.hasCurrentTenant}
						onChange={handleChange}
					/>
					<span className={styles.checkmark}></span>
					Помещение сдано
				</label>
			</div>

			<div className={styles.formGroup}>
				<label>НДС</label>
				<select name="vat" value={formData.vat} onChange={handleChange} className={styles.select}>
					<option value="included">НДС включён</option>
					<option value="not_included">НДС не включён</option>
					<option value="none">Без НДС</option>
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

			
		</form>
	);
}

