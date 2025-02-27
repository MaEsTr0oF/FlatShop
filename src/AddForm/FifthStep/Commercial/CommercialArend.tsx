import { useState, useEffect } from 'react'
import styles from '../../AddForm.module.css'
import { PriceData } from '../FifthStep'

interface CommercialArendProps {
	onNext: () => void;
	onBack: () => void;
	onSave: () => void;
	onDataUpdate: (data: PriceData) => void;
	initialData?: PriceData;
}

export default function CommercialArend({ onNext, onBack, onSave, onDataUpdate, initialData }: CommercialArendProps) {
	const [formData, setFormData] = useState<PriceData>(initialData || {
		rentType: '',
		minRentPeriod: '',
		price: '0',
		utilities: false,
		maintenance: false,
		vat: 'Да',
		onlineShow: false,
		deposit: '0',
		mortgage: false,
		showingTime: {
			everyday: false,
			startTime: '',
			endTime: '',
			online: false,
			customDays: {
				monday: false,
				tuesday: false,
				wednesday: false,
				thursday: false,
				friday: false,
				saturday: false,
				sunday: false,
			},
		},
		maxGuests: 0,
		rules: {
			children: false,
			pets: false,
			smoking: false,
			party: false,
			docs: false,
			month: false,
		}
	});

	useEffect(() => {
		if (initialData) {
			setFormData(initialData);
		}
	}, [initialData]);

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
			 onChange={(e) => setFormData({...formData, rentType: e.target.value})}
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
			 onChange={(e) => setFormData({...formData, minRentPeriod: e.target.value})}
			 className={styles.input}
			 placeholder="Мес."
		  />
		</div>

		<div className={styles.formGroup}>
		  <label>Арендная плата</label>
		  <select
			 name="price"
			 value={formData.price}
			 onChange={(e) => setFormData({...formData, price: e.target.value})}
			 className={styles.select}
		  >
			 <option value="">₽ (429) + 17 ₽/м²</option>
		  </select>
		</div>

		<div className={styles.formGroup}>
		  <label className={styles.checkbox}>
			 <input
				type="checkbox"
				checked={formData.utilities}
				onChange={(e) => setFormData({...formData, utilities: e.target.checked})}
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
				onChange={(e) => setFormData({...formData, maintenance: e.target.checked})}
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
			 onChange={(e) => setFormData({...formData, vat: e.target.value})}
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
				onChange={(e) => setFormData({...formData, onlineShow: e.target.checked})}
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
			 onChange={(e) => setFormData({...formData, deposit: e.target.value})}
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
