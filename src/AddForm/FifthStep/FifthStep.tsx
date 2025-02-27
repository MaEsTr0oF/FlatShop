import { useState } from 'react'
import styles from './FifthStep.module.css'

interface FifthStepProps {
	onNext: () => void;
	onBack: () => void;
	onSave: () => void;
	listingType: string;
}

interface SaleFormData {
	auction: boolean;
	shareSale: boolean;
	price: string;
	vatIncluded: string;
	onlineShow: boolean;
}

interface RentFormData {
	rentType: string;
	minRentPeriod: string;
	price: string;
	paymentPeriod: string;
	utilities: boolean;
	operationalCosts: boolean;
	vatIncluded: string;
	deposit: string;
	onlineShow: boolean;
}

export default function FifthStep({ onNext, onBack, onSave, listingType }: FifthStepProps) {
	const [formData, setFormData] = useState<SaleFormData | RentFormData>(() => {
		if (listingType === 'Продажа') {
			return {
				auction: false,
				shareSale: false,
				price: '',
				vatIncluded: 'Да',
				onlineShow: false
			}
		} else {
			return {
				rentType: 'Субаренда',
				minRentPeriod: '',
				price: '',
				paymentPeriod: 'В месяц',
				utilities: false,
				operationalCosts: false,
				vatIncluded: 'Да',
				deposit: '',
				onlineShow: false
			}
		}
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target
		setFormData(prev => ({
			...prev,
			[name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
		}))
	}

	const renderSaleForm = () => (
		<form className={styles.form}>
			<div className={styles.header}>
				<h3 className={styles.step}>05/<span>05</span></h3>
				<h2 className={styles.title}>УСЛОВИЯ СДЕЛКИ</h2>
			</div>

			<div className={styles.formGroup}>
				<label>Тип сделки</label>
				<select
					name="saleType"
					value="Продажа"
					onChange={handleChange}
					className={styles.select}
				>
					<option value="Продажа">Продажа</option>
				</select>
			</div>

			<div className={styles.checkboxGroup}>
				<label className={styles.checkbox}>
					<input
						type="checkbox"
						name="auction"
						checked={(formData as SaleFormData).auction}
						onChange={handleChange}
					/>
					<span className={styles.checkmark}></span>
					Аукцион
				</label>
				<label className={styles.checkbox}>
					<input
						type="checkbox"
						name="shareSale"
						checked={(formData as SaleFormData).shareSale}
						onChange={handleChange}
					/>
					<span className={styles.checkmark}></span>
					Продажа доли
				</label>
			</div>

			<div className={styles.formGroup}>
				<label>Цена</label>
				<input
					type="text"
					name="price"
					value={(formData as SaleFormData).price}
					onChange={handleChange}
					placeholder="Введите цену объекта"
					className={styles.input}
				/>
			</div>

			<div className={styles.formGroup}>
				<label>НДС включён</label>
				<select
					name="vatIncluded"
					value={(formData as SaleFormData).vatIncluded}
					onChange={handleChange}
					className={styles.select}
				>
					<option value="Да">Да</option>
					<option value="Нет">Нет</option>
				</select>
			</div>

			<div className={styles.checkboxGroup}>
				<label className={styles.checkbox}>
					<input
						type="checkbox"
						name="onlineShow"
						checked={(formData as SaleFormData).onlineShow}
						onChange={handleChange}
					/>
					<span className={styles.checkmark}></span>
					Онлайн-показ
				</label>
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
	)

	const renderRentForm = () => (
		<form className={styles.form}>
			<div className={styles.header}>
				<h3 className={styles.step}>05/<span>05</span></h3>
				<h2 className={styles.title}>УСЛОВИЯ АРЕНДЫ</h2>
			</div>

			<div className={styles.formGroup}>
				<label>Тип аренды</label>
				<select
					name="rentType"
					value={(formData as RentFormData).rentType}
					onChange={handleChange}
					className={styles.select}
				>
					<option value="Субаренда">Субаренда</option>
				</select>
			</div>

			<div className={styles.formGroup}>
				<label>Минимальный срок аренды</label>
				<input
					type="text"
					name="minRentPeriod"
					value={(formData as RentFormData).minRentPeriod}
					onChange={handleChange}
					placeholder="Мес."
					className={styles.input}
				/>
			</div>

			<div className={styles.formGroup}>
				<label>Арендная плата</label>
				<div className={styles.priceGroup}>
					<input
						type="text"
						name="price"
						value={(formData as RentFormData).price}
						onChange={handleChange}
						placeholder="Стоимость"
						className={styles.input}
					/>
					<select
						name="paymentPeriod"
						value={(formData as RentFormData).paymentPeriod}
						onChange={handleChange}
						className={styles.select}
					>
						<option value="В месяц">В месяц</option>
						<option value="В год">В год</option>
					</select>
				</div>
			</div>

			<div className={styles.checkboxGroup}>
				<label className={styles.checkbox}>
					<input
						type="checkbox"
						name="utilities"
						checked={(formData as RentFormData).utilities}
						onChange={handleChange}
					/>
					<span className={styles.checkmark}></span>
					Коммунальные услуги включены
				</label>
				<label className={styles.checkbox}>
					<input
						type="checkbox"
						name="operationalCosts"
						checked={(formData as RentFormData).operationalCosts}
						onChange={handleChange}
					/>
					<span className={styles.checkmark}></span>
					Эксплуатационные расходы услуги включены
				</label>
			</div>

			<div className={styles.formGroup}>
				<label>НДС включён</label>
				<select
					name="vatIncluded"
					value={(formData as RentFormData).vatIncluded}
					onChange={handleChange}
					className={styles.select}
				>
					<option value="Да">Да</option>
					<option value="Нет">Нет</option>
				</select>
			</div>

			<div className={styles.formGroup}>
				<label>Залог</label>
				<input
					type="text"
					name="deposit"
					value={(formData as RentFormData).deposit}
					onChange={handleChange}
					placeholder="Размер залога"
					className={styles.input}
				/>
			</div>

			<div className={styles.checkboxGroup}>
				<label className={styles.checkbox}>
					<input
						type="checkbox"
						name="onlineShow"
						checked={(formData as RentFormData).onlineShow}
						onChange={handleChange}
					/>
					<span className={styles.checkmark}></span>
					Онлайн-показ
				</label>
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
	)

	return (
		<div className={styles.container}>
			{listingType === 'Продажа' && renderSaleForm()}
			{listingType === 'Аренда' && renderRentForm()}

			<div className={styles.progressBar}>
				<div className={styles.progressLine} style={{ '--progress-width': '80%' } as React.CSSProperties} />
				<div className={styles.progressStep}>
					<div className={`${styles.stepNumber} ${styles.completed}`}>01</div>
					<div className={styles.stepTitle}>Новое объявление</div>
				</div>
				<div className={styles.progressStep}>
					<div className={`${styles.stepNumber} ${styles.completed}`}>02</div>
					<div className={styles.stepTitle}>О помещении</div>
				</div>
				<div className={styles.progressStep}>
					<div className={`${styles.stepNumber} ${styles.completed}`}>03</div>
					<div className={styles.stepTitle}>О здании</div>
				</div>
				<div className={styles.progressStep}>
					<div className={`${styles.stepNumber} ${styles.completed}`}>04</div>
					<div className={styles.stepTitle}>Фото и описание</div>
				</div>
				<div className={styles.progressStep}>
					<div className={`${styles.stepNumber} ${styles.active}`}>05</div>
					<div className={styles.stepTitle}>
						{listingType === 'Продажа' ? 'Условия сделки' : 'Условия аренды'}
					</div>
				</div>
			</div>
		</div>
	)
} 