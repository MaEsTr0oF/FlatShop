import styles from './NotWork.module.css'
import { Link } from 'react-router-dom'

export default function NotWork() {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<img src="/img/marketing/crane.png" alt="В разработке" className={styles.image} />
				<Link to="/main" className={styles.button}>
					На главную
				</Link>
			</div>
		</div>
	)
}
