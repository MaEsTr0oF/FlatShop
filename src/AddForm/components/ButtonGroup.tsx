import styles from '../AddForm.module.css'

interface ButtonGroupProps {
	onBack: () => void;
	onNext: () => void;
	onSave?: () => void;
}

export default function ButtonGroup({ onBack, onNext, onSave }: ButtonGroupProps) {
	return (
		<div className={styles.buttonGroup}>
			<button type="button" onClick={onBack} className={styles.backButton}>
				Назад
			</button>
			<button type="button" onClick={onNext} className={styles.nextButton}>
				Выставить объявление
			</button>
			{onSave && (
				<button type="button" onClick={onSave} className={styles.saveButton}>
					Сохранить и выйти
				</button>
			)}
		</div>
	)
} 