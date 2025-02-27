import { useState } from 'react'
import styles from './FourthStep.module.css'

interface FourthStepProps {
	onNext: () => void;
	onBack: () => void;
	onSave: () => void;
	listingType: string;
}

interface FormData {
	salePhotos: File[];
	rentPhotos: File[];
	videoUrl: string;
	description: string;
}

export default function FourthStep({ onNext, onBack, onSave, listingType }: FourthStepProps) {
	const [formData, setFormData] = useState<FormData>({
		salePhotos: [],
		rentPhotos: [],
		videoUrl: '',
		description: ''
	})

	const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'sale' | 'rent') => {
		if (e.target.files) {
			const files = Array.from(e.target.files)
			setFormData(prev => ({
				...prev,
				[type === 'sale' ? 'salePhotos' : 'rentPhotos']: [...prev[type === 'sale' ? 'salePhotos' : 'rentPhotos'], ...files]
			}))
		}
	}

	const handleRemovePhoto = (index: number, type: 'sale' | 'rent') => {
		setFormData(prev => ({
			...prev,
			[type === 'sale' ? 'salePhotos' : 'rentPhotos']: prev[type === 'sale' ? 'salePhotos' : 'rentPhotos'].filter((_, i) => i !== index)
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
				<h3 className={styles.step}>04/<span>05</span></h3>
				<h2 className={styles.title}>ФОТО И ОПИСАНИЕ</h2>
			</div>

			<form className={styles.form}>
				{listingType === 'Продажа' && (
					<div className={styles.formGroup}>
						<label>Фото для продажи</label>
						<div className={styles.photoInfo}>
							<img src="/img/camera.png" alt="camera" />
							<div>
								<p>Размер не должен превышать более 4 МБ.</p>
								<p>Загружайте фотографии помещения, фото должны быть четкими, не размазанными. Не больше 40 штук.</p>
							</div>
						</div>
						<div className={styles.photoUpload}>
							<input
								type="file"
								accept="image/*"
								multiple
								onChange={(e) => handlePhotoChange(e, 'sale')}
								id="salePhotos"
								className={styles.fileInput}
							/>
							<label htmlFor="salePhotos" className={styles.uploadButton}>
								<span>+</span>
								Добавить фото
							</label>
						</div>
						<div className={styles.photoGrid}>
							{formData.salePhotos.map((photo, index) => (
								<div key={index} className={styles.photoItem}>
									<img src={URL.createObjectURL(photo)} alt={`Фото ${index + 1}`} />
									<button
										type="button"
										onClick={() => handleRemovePhoto(index, 'sale')}
										className={styles.removePhoto}
									>
										×
									</button>
								</div>
							))}
						</div>
					</div>
				)}

				{listingType === 'Аренда' && (
					<div className={styles.formGroup}>
						<label>Фото для аренды</label>
						<div className={styles.photoInfo}>
							<img src="/img/camera.png" alt="camera" />
							<div>
								<p>Размер не должен превышать более 4 МБ.</p>
								<p>Загружайте фотографии помещения, фото должны быть четкими, не размазанными. Не больше 40 штук.</p>
							</div>
						</div>
						<div className={styles.photoUpload}>
							<input
								type="file"
								accept="image/*"
								multiple
								onChange={(e) => handlePhotoChange(e, 'rent')}
								id="rentPhotos"
								className={styles.fileInput}
							/>
							<label htmlFor="rentPhotos" className={styles.uploadButton}>
								<span>+</span>
								Добавить фото
							</label>
						</div>
						<div className={styles.photoGrid}>
							{formData.rentPhotos.map((photo, index) => (
								<div key={index} className={styles.photoItem}>
									<img src={URL.createObjectURL(photo)} alt={`Фото ${index + 1}`} />
									<button
										type="button"
										onClick={() => handleRemovePhoto(index, 'rent')}
										className={styles.removePhoto}
									>
										×
									</button>
								</div>
							))}
						</div>
					</div>
				)}

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
					<label>Описание объекта</label>
					<textarea
						name="description"
						value={formData.description}
						onChange={handleChange}
						placeholder="Опишите ваш объект"
						className={styles.textarea}
						rows={5}
					/>
				</div>

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

			<div className={styles.progressBar}>
				<div className={styles.progressLine} style={{ '--progress-width': '60%' } as React.CSSProperties} />
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
					<div className={`${styles.stepNumber} ${styles.active}`}>04</div>
					<div className={styles.stepTitle}>Фото и описание</div>
				</div>
				<div className={styles.progressStep}>
					<div className={styles.stepNumber}>05</div>
					<div className={styles.stepTitle}>
						{listingType === 'Продажа' ? 'Условия сделки' : 'Условия аренды'}
					</div>
				</div>
			</div>
		</div>
	)
} 