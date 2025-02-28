import styles from './Card.module.css'

interface CardProps {
	image: string;
	firstLine: string;
	secondLine: string;
	active?: boolean;
}

export default function Card({ image, firstLine, secondLine, active = false }: CardProps) {
	return (
		<div className={`${styles.card} ${active ? styles.active : ''}`}>
			<div className={styles.content}>
				<h2 className={styles.title}>
					{firstLine}<br />{secondLine}
				</h2>
				<div className={styles.imageWrapper}>
					<img src={image} alt={`${firstLine} ${secondLine}`} className={styles.image} />
				</div>
			</div>
		</div>
	)
}
