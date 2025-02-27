import { useState } from 'react'
import styles from '../FourthStep.module.css'

interface FlatArendProps {
	onNext: () => void;
	onBack: () => void;
	onSave: () => void;
	rentType:string;
}

interface FormData {
	rentPrice: string;
	paymentBy: 'Арендатор' | 'Собственник';
	utilities: 'Арендатор' | 'Собственник';
	commission: string;
	deposit: string;
	price:string;
}

export default function FlatArend({ onNext, onBack, onSave,rentType }: FlatArendProps) {
	const [formData, setFormData] = useState<FormData>({
		rentPrice: '',
		paymentBy: 'Арендатор',
		utilities: 'Собственник',
		commission: '',
		deposit: '',
		price:'4 500'
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value
		}))
	}

	return (
		<form className={styles.form}>
			<h2 className={styles.title}>УСЛОВИЯ АРЕНДЫ</h2>
			{rentType==="Долгосрочная аренда" ? <>
			<div className={styles.formGroup}>
				<label>Арендная плата</label>
				<input
					type="text"
					name="rentPrice"
					value={formData.rentPrice}
					onChange={handleChange}
					placeholder="₽ в месяц"
					className={styles.input}
				/>
			</div>

			<div className={styles.formGroup}>
				<label>Оплата по счётчикам</label>
				<select
					name="paymentBy"
					value={formData.paymentBy}
					onChange={handleChange}
					className={styles.select}
				>
					<option value="Арендатор">Арендатор</option>
					<option value="Собственник">Собственник</option>
				</select>
			</div>

			<div className={styles.formGroup}>
				<label>Другие ЖКУ</label>
				<select
					name="utilities"
					value={formData.utilities}
					onChange={handleChange}
					className={styles.select}
				>
					<option value="Собственник">Собственник</option>
					<option value="Арендатор">Арендатор</option>
				</select>
			</div>

			<div className={styles.formGroup}>
				<label>Комиссия</label>
				<input
					type="text"
					name="commission"
					value={formData.commission}
					onChange={handleChange}
					placeholder="%"
					className={styles.input}
				/>
			</div>

			<div className={styles.formGroup}>
				<label>Залог</label>
				<input
					type="text"
					name="deposit"
					value={formData.deposit}
					onChange={handleChange}
					placeholder="Введите размер залога за весь период"
					className={styles.input}
				/>
			</div>
			</>:<>
			<div className={styles.formGroup}>
				<label>Арендная плата</label>
				<select
					name="price"
					value={formData.price}
					onChange={handleChange}
					className={styles.select}
				>
					<option value="4 500">Минимум 4 500₽ за сутки</option>
					<option value="5 000">Минимум 5 000₽ за сутки</option>
				</select>
			</div>
			<div className={styles.formGroup}>
				<label>Залог</label>
				<input
					type="text"
					name="deposit"
					value={formData.deposit}
					onChange={handleChange}
					placeholder="Введите размер залога за весь период"
					className={styles.input}
				/>
			</div>
			</>}

			<div className={styles.buttons}>
				<button type="button" onClick={onBack} className={styles.backButton}>
					Назад
				</button>
				<button type="button" onClick={onNext} className={styles.nextButton}>
					Продолжить
				</button>
				<button type="button" onClick={onSave} className={styles.saveButton}>
					Сохранить и выйти
				</button>
			</div>
		</form>
	)
}