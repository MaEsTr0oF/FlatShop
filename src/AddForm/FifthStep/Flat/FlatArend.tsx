import { useState } from 'react'
import styles from '../FifthStep.module.css'

interface FlatArendProps {
	onBack:() =>void
	onNext: () => void;
	onSave: () => void;
}

interface FormData {
	maxGuests: string;
	rules: {
		children: boolean;
		pets: boolean;
		smoking: boolean;
	}
}

type FormFields = keyof FormData;
type RuleFields = keyof FormData['rules'];

export default function FlatArend({onBack, onNext, onSave }: FlatArendProps) {
	const [formData, setFormData] = useState<FormData>({
		maxGuests: '',
		rules: {
			children: false,
			pets: false,
			smoking: false
		}
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target
		
		if (name.includes('.')) {
			const [category, field] = name.split('.') as [FormFields, RuleFields]
			if (category === 'rules') {
				setFormData(prev => ({
					...prev,
					rules: {
						...prev.rules,
						[field]: checked
					}
				}))
			}
		} else {
			setFormData(prev => ({
				...prev,
				[name as FormFields]: type === 'checkbox' ? checked : value
			}))
		}
	}

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

			<div className={styles.buttonGroup}>
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
} 