import { useState, useEffect } from 'react'
import styles from './ThirdStep.module.css'

interface ThirdStepProps {
	onNext: () => void;
	onBack: () => void;
	onSave: () => void;
	onDataUpdate?: (data: ThirdStepData) => void;
	initialData?: ThirdStepData | null;
}

export interface ThirdStepData {
	photos: File[];
	videoUrl: string;
	description: string;
}

export default function ThirdStep({ onNext, onBack, onSave, onDataUpdate, initialData }: ThirdStepProps) {
	const [formData, setFormData] = useState<ThirdStepData>(initialData || {
		photos: [],
		videoUrl: '',
		description: ''
	})

	useEffect(() => {
		if (onDataUpdate) {
			onDataUpdate(formData);
		}
	}, [formData, onDataUpdate]);

	const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const newPhotos = Array.from(e.target.files)
			if (formData.photos.length + newPhotos.length <= 40) {
				setFormData(prev => ({
					...prev,
					photos: [...prev.photos, ...newPhotos]
				}))
			}
		}
	}

	const handleRemovePhoto = (index: number) => {
		setFormData(prev => ({
			...prev,
			photos: prev.photos.filter((_, i) => i !== index)
		}))
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value
		}))
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3 className={styles.step}>03/<span>05</span></h3>
				<h2 className={styles.title}>ФОТО И ОПИСАНИЕ КВАРТИРЫ</h2>
			</div>

			<form className={styles.form}>
				<div className={styles.formGroup}>
					<label>Фото и планировка</label>
					<div className={styles.photoInfo}>
						<img src="/img/camera.png" alt="camera" />
						<div>
							<p>Размер не должен превышать более 4 МБ.</p>
							<p>Загружайте фотографии квартиры, фото должны быть четкими, не размазанными. Не больше 40 штук.</p>
						</div>
					</div>
					<div className={styles.photoUpload}>
						<input
							type="file"
							accept="image/*"
							multiple
							onChange={handlePhotoChange}
							id="photos"
							className={styles.fileInput}
						/>
						<label htmlFor="photos" className={styles.uploadButton}>
							<span>+</span>
							Добавить фото
						</label>
					</div>
					<div className={styles.photoGrid}>
						{formData.photos.map((photo, index) => (
							<div key={index} className={styles.photoItem}>
								<img src={URL.createObjectURL(photo)} alt={`Фото ${index + 1}`} />
								<button
									type="button"
									onClick={() => handleRemovePhoto(index)}
									className={styles.removePhoto}
								>
									×
								</button>
							</div>
						))}
					</div>
				</div>

				<div className={styles.formGroup}>
					<label>Видео с YouTube или Rutube</label>
					<input
						type="text"
						name="videoUrl"
						value={formData.videoUrl}
						onChange={handleChange}
						placeholder="Ссылка на видео"
						className={styles.input}
					/>
				</div>

				<div className={styles.formGroup}>
					<label>Описание</label>
					<textarea
						name="description"
						value={formData.description}
						onChange={handleChange}
						placeholder="Заполните описание. Не менее 300 символов"
						className={styles.textarea}
						rows={6}
					/>
				</div>

				<div className={styles.buttons}>
					<button
						type="button"
						onClick={onBack}
						className={styles.backButton}
					>
						Назад
					</button>
					<button
						type="button"
						onClick={onNext}
						className={styles.nextButton}
						
					>
						Продолжить
					</button>
					<button
						type="button"
						onClick={onSave}
						className={styles.saveButton}
					>
						Сохранить и выйти
					</button>
				</div>
			</form>

			<div className={styles.progressBar}>
				<div className={styles.progressLine} style={{ '--progress-width': '40%' } as React.CSSProperties} />
				<div className={styles.progressStep}>
					<div className={`${styles.stepNumber} ${styles.completed}`}>01</div>
					<div className={styles.stepTitle}>Новое объявление</div>
				</div>
				<div className={styles.progressStep}>
					<div className={`${styles.stepNumber} ${styles.completed}`}>02</div>
					<div className={styles.stepTitle}>О квартире</div>
				</div>
				<div className={styles.progressStep}>
					<div className={`${styles.stepNumber} ${styles.active}`}>03</div>
					<div className={styles.stepTitle}>Фото и описание</div>
				</div>
				<div className={styles.progressStep}>
					<div className={styles.stepNumber}>04</div>
					<div className={styles.stepTitle}>О доме</div>
				</div>
				<div className={styles.progressStep}>
					<div className={styles.stepNumber}>05</div>
					<div className={styles.stepTitle}>Условия сделки</div>
				</div>
			</div>
		</div>
	)
} 