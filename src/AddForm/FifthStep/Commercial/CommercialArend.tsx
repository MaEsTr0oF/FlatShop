import { useState, useEffect } from 'react'
import styles from '../../AddForm.module.css'
import { PriceData } from '../../../types/form'

interface CommercialArendProps {
	onNext: () => void;
	onBack: () => void;
	onSave: () => void;
	onDataUpdate: (data: PriceData) => void;
	initialData?: PriceData | null;
}

export default function CommercialArend({ onNext, onBack, onSave, onDataUpdate, initialData }: CommercialArendProps) {
	const [formData, setFormData] = useState<PriceData>({
		price: initialData?.price ?? 0,
		priceType: initialData?.priceType ?? '',
		mortgage: initialData?.mortgage ?? false,
		commission: initialData?.commission ?? 0,
		utilities: {
			included: initialData?.utilities?.included ?? false,
			electricity: initialData?.utilities?.electricity ?? false,
			gas: initialData?.utilities?.gas ?? false,
			water: initialData?.utilities?.water ?? false,
			internet: initialData?.utilities?.internet ?? false
		},
		maintenance: initialData?.maintenance ?? false,
		vat: initialData?.vat ?? '',
		deposit: initialData?.deposit ?? 0,
		rentType: initialData?.rentType ?? '',
		minRentPeriod: initialData?.minRentPeriod ?? '',
		onlineShow: initialData?.onlineShow ?? false,
		maxGuests: initialData?.maxGuests ?? 0,
		rules: {
			children: initialData?.rules?.children ?? false,
			pets: initialData?.rules?.pets ?? false,
			smoking: initialData?.rules?.smoking ?? false,
			party: initialData?.rules?.party ?? false,
			docs: initialData?.rules?.docs ?? false,
			month: initialData?.rules?.month ?? false
		},
		showingTime: {
			everyday: initialData?.showingTime?.everyday ?? true,
			startTime: initialData?.showingTime?.startTime ?? '09:00',
			endTime: initialData?.showingTime?.endTime ?? '21:00',
			online: initialData?.showingTime?.online ?? false,
			customDays: {
				monday: initialData?.showingTime?.customDays?.monday ?? true,
				tuesday: initialData?.showingTime?.customDays?.tuesday ?? true,
				wednesday: initialData?.showingTime?.customDays?.wednesday ?? true,
				thursday: initialData?.showingTime?.customDays?.thursday ?? true,
				friday: initialData?.showingTime?.customDays?.friday ?? true,
				saturday: initialData?.showingTime?.customDays?.saturday ?? true,
				sunday: initialData?.showingTime?.customDays?.sunday ?? true
			}
		}
	});

	useEffect(() => {
		onDataUpdate(formData);
	}, [formData, onDataUpdate]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target;
		const isCheckbox = type === 'checkbox';
		
		if (name.startsWith('utilities.')) {
			const field = name.split('.')[1];
			setFormData(prev => ({
				...prev,
				utilities: {
					...prev.utilities,
					[field]: isCheckbox ? (e.target as HTMLInputElement).checked : value
				}
			}));
		} else if (name.startsWith('rules.')) {
			const field = name.split('.')[1];
			setFormData(prev => ({
				...prev,
				rules: {
					...prev.rules,
					[field]: isCheckbox ? (e.target as HTMLInputElement).checked : value
				}
			}));
		} else if (name.startsWith('showingTime.customDays.')) {
			const field = name.split('.')[2];
			setFormData(prev => ({
				...prev,
				showingTime: {
					...prev.showingTime,
					customDays: {
						...prev.showingTime.customDays,
						[field]: isCheckbox ? (e.target as HTMLInputElement).checked : value
					}
				}
			}));
		} else if (name.startsWith('showingTime.')) {
			const field = name.split('.')[1];
			setFormData(prev => ({
				...prev,
				showingTime: {
					...prev.showingTime,
					[field]: isCheckbox ? (e.target as HTMLInputElement).checked : value
				}
			}));
		} else {
			setFormData(prev => ({
				...prev,
				[name]: isCheckbox ? (e.target as HTMLInputElement).checked : 
					(name === 'price' || name === 'deposit' || name === 'commission') ? 
					parseFloat(value) || 0 : value
			}));
		}
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
		<div className={styles.formGroup}>
		  <label>Тип аренды</label>
		  <select
			 name="rentType"
			 value={formData.rentType}
			 onChange={handleChange}
			 className={styles.select}
		  >
			 <option value="">Субъект</option>
		  </select>
		</div>

		<div className={styles.formGroup}>
		  <label>Минимальный срок аренды</label>
		  <input
			 type="text"
			 name="minRentPeriod"
			 value={formData.minRentPeriod}
			 onChange={handleChange}
			 className={styles.input}
			 placeholder="Мес."
		  />
		</div>

		<div className={styles.formGroup}>
		  <label>Арендная плата</label>
		  <select
			 name="price"
			 value={formData.price}
			 onChange={handleChange}
			 className={styles.select}
		  >
			 <option value="">₽ (429) + 17 ₽/м²</option>
		  </select>
		</div>

		<div className={styles.formGroup}>
		  <label className={styles.checkbox}>
			 <input
				type="checkbox"
				checked={formData.utilities.included}
				onChange={handleChange}
				name="utilities.included"
			 />
			 <span className={styles.checkmark}></span>
			 Коммунальные услуги включены
		  </label>
		</div>

		<div className={styles.formGroup}>
		  <label className={styles.checkbox}>
			 <input
				type="checkbox"
				checked={formData.maintenance}
				onChange={handleChange}
				name="maintenance"
			 />
			 <span className={styles.checkmark}></span>
			 Эксплуатационные расходы услуги включены
		  </label>
		</div>

		<div className={styles.formGroup}>
		  <label>НДС включен</label>
		  <select
			 name="vat"
			 value={formData.vat}
			 onChange={handleChange}
			 className={styles.select}
		  >
			 <option value="Да">Да</option>
			 <option value="Нет">Нет</option>
		  </select>
		</div>

		<div className={styles.formGroup}>
		  <label className={styles.checkbox}>
			 <input
				type="checkbox"
				checked={formData.onlineShow}
				onChange={handleChange}
				name="onlineShow"
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
			 className={styles.input}
			 placeholder="Размер залога"
		  />
		</div>

		<div className={styles.buttons}>
		  <button
			 type="button"
			 onClick={onBack}
			 className={styles.saveButton}
		  >
			 Сохранить и выйти
		  </button>
		  <button
			 type="button"
			 onClick={handleSubmit}
			 className={styles.nextButton}
		  >
			 Выставить объявление
		  </button>
		</div>
	 </form>
	)
}
