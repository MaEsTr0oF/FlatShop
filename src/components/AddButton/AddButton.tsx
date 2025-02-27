import { useState } from 'react'
import styles from './AddButton.module.css'
import AddForm from '../../AddForm/AddForm'

export default function AddButton() {
	const [showForm, setShowForm] = useState(false)

	return (
		<>
			<button className={styles.addButton} onClick={() => setShowForm(true)}>
				<span>+</span>
				Создать объявление
			</button>
			{showForm && <AddForm />}
		</>
	)
}
