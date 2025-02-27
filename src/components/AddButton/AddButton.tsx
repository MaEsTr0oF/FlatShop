import { useState } from 'react'
import styles from './AddButton.module.css'
import AddForm from '../../AddForm/AddForm'
import { FormData, Advertisement } from '../../types/form'

export default function AddButton() {
	const [showForm, setShowForm] = useState(false)

	const handleSubmit = (formData: FormData) => {
		// Здесь можно добавить логику отправки данных на сервер
		console.log('Объявление создано:', formData)
		
		// Добавляем объявление в localStorage
		const existingAds = JSON.parse(localStorage.getItem('salesAds') || '[]') as Advertisement[]
		const newAd: Advertisement = {
			id: Date.now(),
			...formData,
			createdAt: new Date().toISOString()
		}
		localStorage.setItem('salesAds', JSON.stringify([...existingAds, newAd]))
		
		// Генерируем событие для обновления списка объявлений
		window.dispatchEvent(new Event('storage'))
		
		// Закрываем модальное окно
		setShowForm(false)
	}

	const handleClose = () => {
		setShowForm(false)
	}

	return (
		<>
			<button className={styles.addButton} onClick={() => setShowForm(true)}>
				<span>+</span>
				Создать объявление
			</button>
			{showForm && <AddForm onClose={handleClose} onSubmit={handleSubmit} />}
		</>
	)
}
