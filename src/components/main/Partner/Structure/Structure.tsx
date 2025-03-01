import styles from './Structure.module.css'

export default function Structure() {
	return (
		<>
			<h2 className={styles.title}>ВАША СТРУКТУРА</h2>
			
			<div className={styles.statsContainer}>
				{/* Блок личных партнеров */}
				<div className={styles.statsBlock}>
					<div className={styles.personalPartners}>
						<div className={styles.mainStat}>
							<div className={styles.statHeader}>
								<h3>Количество<br />личных партнеров</h3>
								<span className={styles.number}>10</span>
							</div>
							<div className={styles.statGroup}>
								<div className={styles.stat}>
									<span className={styles.label}>Привлечено<br />за неделю</span>
									<div className={styles.value}>
										<span className={styles.number3}>170</span>
										<span className={styles.growth}>+7%</span>
									</div>
								</div>
								<div className={styles.stat}>
									<span className={styles.label}>Привлечено<br />за месяц</span>
									<div className={styles.value}>
										<span className={styles.number3}>170</span>
										<span className={styles.growth}>+1%</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Блок сетевых партнеров */}
				<div className={styles.statsBlock}>
					<div className={styles.networkPartners}>
						<div className={styles.mainStat}>
							<div className={styles.statHeader}>
								<h3>Партнеров<br />в вашей сети</h3>
								<span className={`${styles.number} ${styles.number2}`}>180</span>
							</div>
							<div className={styles.statGroup}>
								<div className={styles.stat}>
									<span className={styles.label}>Привлечено<br />за неделю</span>
									<div className={styles.value}>
										<span className={styles.number4}>80</span>
										<span className={styles.growth}>+7%</span>
									</div>
								</div>
								<div className={styles.stat}>
									<span className={styles.label}>Привлечено<br />за месяц</span>
									<div className={styles.value}>
										<span className={styles.number4}>93</span>
										<span className={styles.growth}>+4%</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			</>
	)
}