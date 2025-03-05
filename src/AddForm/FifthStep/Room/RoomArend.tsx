import { useState, useCallback } from 'react'
import styles from '../../AddForm.module.css'
import { PriceData } from '../../../types/form'
import ButtonGroup from '../../components/ButtonGroup'

interface RoomArendProps {
	onNext: () => void;
	onBack: () => void;
	onSave: () => void;
	onDataUpdate: (data: PriceData) => void;
	initialData: PriceData | null;
}

export default function RoomArend({ onNext, onBack, onSave, onDataUpdate, initialData }: RoomArendProps) {
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
			<h2 className={styles.title}>УСЛОВИЯ АРЕНДЫ</h2>

			<div className={styles.formGroup}>
				<div className={styles.priceType}>
					<label className={styles.checkbox}>
						Тип аренды
					</label>
					<select name="rentType" value={formData.rentType} onChange={handleChange} className={styles.select}>
						<option value="long">Длительная</option>
						<option value="short">Посуточная</option>
					</select>
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

				<div className={styles.formGroup}>
					<label>
						Минимальный срок аренды (месяцев)
						<input
							type="number"
							name="minRentPeriod"
							value={formData.minRentPeriod}
							onChange={handleChange}
							min="1"
							className={styles.input}
						/>
					</label>
				</div>

				<div className={styles.formGroup}>
					<label>
						Максимальное количество гостей
						<input
							type="number"
							name="maxGuests"
							value={formData.maxGuests}
							onChange={handleChange}
							min="1"
							className={styles.input}
						/>
					</label>
				</div>
			</div>

			<div className={styles.formGroup}>
				<h3>Коммунальные услуги</h3>
				<label className={styles.checkbox}>
					<input
						type="checkbox"
						name="utilities.included"
						checked={formData.utilities.included}
						onChange={handleChange}
					/>
					<span className={styles.checkmark}></span>
					Включены в стоимость
				</label>
				<label className={styles.checkbox}>
					<input
						type="checkbox"
						name="utilities.electricity"
						checked={formData.utilities.electricity}
						onChange={handleChange}
					/>
					<span className={styles.checkmark}></span>
					Электричество
				</label>
				<label className={styles.checkbox}>
					<input
						type="checkbox"
						name="utilities.gas"
						checked={formData.utilities.gas}
						onChange={handleChange}
					/>
					<span className={styles.checkmark}></span>
					Газ
				</label>
				<label className={styles.checkbox}>
					<input
						type="checkbox"
						name="utilities.water"
						checked={formData.utilities.water}
						onChange={handleChange}
					/>
					<span className={styles.checkmark}></span>
					Вода
				</label>
				<label className={styles.checkbox}>
					<input
						type="checkbox"
						name="utilities.internet"
						checked={formData.utilities.internet}
						onChange={handleChange}
					/>
					<span className={styles.checkmark}></span>
					Интернет
				</label>
			</div>

			<div className={styles.formGroup}>
				<h3>Правила проживания</h3>
				<label className={styles.checkbox}>
					<input
						type="checkbox"
						name="rules.children"
						checked={formData.rules.children}
						onChange={handleChange}
					/>
					<span className={styles.checkmark}></span>
					Можно с детьми
				</label>
				<label className={styles.checkbox}>
					<input
						type="checkbox"
						name="rules.pets"
						checked={formData.rules.pets}
						onChange={handleChange}
					/>
					<span className={styles.checkmark}></span>
					Можно с животными
				</label>
				<label className={styles.checkbox}>
					<input
						type="checkbox"
						name="rules.smoking"
						checked={formData.rules.smoking}
						onChange={handleChange}
					/>
					<span className={styles.checkmark}></span>
					Можно курить
				</label>
			</div>

			<ButtonGroup onNext={onNext} onBack={onBack} onSave={onSave} />
		</form>
	);
} 