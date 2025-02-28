import styles from './HowWork.module.css'

export default function HowWork() {
	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<div className={styles.content}>
					<h2 className={styles.title}>КАК ЭТО РАБОТАЕТ?</h2>
					<p className={styles.subtitle}>Чем выше уровень – тем выше доход</p>
					
					<div className={styles.table}>
						<div className={styles.tableHeader}>
							<span>Уровень</span>
							<span>Без активации</span>
							<span>С активацией</span>
						</div>
						
						<div className={styles.tableRow}>
							<span>1 линия (личные партнёры)</span>
							<span>3%</span>
							<span>8%</span>
						</div>
						<div className={`${styles.tableRow} ${styles.evenRow}`}>
							<span>2 линия</span>
							<span>0%</span>
							<span>5%</span>
						</div>
						<div className={styles.tableRow}>
							<span>3 линия</span>
							<span>0%</span>
							<span>3%</span>
						</div>
						<div className={`${styles.tableRow} ${styles.evenRow}`}>
							<span>4 линия</span>
							<span>0%</span>
							<span>2%</span>
						</div>
						<div className={styles.tableRow}>
							<span>5 линия</span>
							<span>0%</span>
							<span>1%</span>
						</div>
						<div className={`${styles.tableRow} ${styles.evenRow}`}>
							<span>6 линия</span>
							<span>0%</span>
							<span>0.5%</span>
						</div>
						<div className={styles.tableRow}>
							<span>7 линия</span>
							<span>0%</span>
							<span>0.5%</span>
						</div>
					</div>

					<div className={styles.bonus}>
						<p>
							<span className={styles.bonusText}>Бонус от активаций партнёров</span>
							<span className={styles.bonusHighlight}> – получай до 20%</span>
						</p>
						<p className={styles.bonusDescription}>за каждую их покупку уровней!</p>
					</div>
				</div>

				<div className={styles.imageWrapper}>
					<img src="/img/marketing/personThink.png" alt="Успешный партнер" className={styles.image} />
				</div>
			</div>
		</section>
	)
}
