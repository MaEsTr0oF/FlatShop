import styles from './Partners.module.css'
import Analytics from '../analytics/Analytics'
import News from '../news/News'
import Card from '../card/Card'
import Operations from '../operations/Operations'
import { useState } from 'react'

export default function Partners() {
	const [isSwapped, setIsSwapped] = useState(false)
	const [showTooltip, setShowTooltip] = useState(false)
	
	const analyticsData = [
		{ id: 1, text: 'Продажа квартир', percentage: 38, color: '#E31235' },
		{ id: 2, text: 'Продажа домов', percentage: 19, color: '#FF4B6A' },
		{ id: 3, text: 'Продажа комнаты', percentage: 24, color: '#FF8095' },
		{ id: 4, text: 'Посуточная аренда', percentage: 19, color: '#333333' },
		{ id: 5, text: 'Продажа участков', percentage: 0, color: '#FFFFFF' },
		{ id: 6, text: 'Долгострочная аренда', percentage: 0, color: '#FFFFFF' },
	]

	const handleCardClick = () => {
		setIsSwapped(prev => !prev)
	}

	const handleAdviceClick = () => {
		setShowTooltip(prev => !prev)
	}

	return (
		<div className={styles.partnersContainer}>
			<div className={styles.analytics}>
				<div className={styles.cardsSection}>
					<div className={styles.cardsHeader}>
						<h2>Информация о счёте</h2>
						<img 
							src="/img/partners/advice.svg" 
							alt="advice" 
							className={styles.adviceIcon}
							onClick={handleAdviceClick}
						/>
						<div className={`${styles.tooltip} ${showTooltip ? styles.tooltipVisible : ''}`}>
							Нажмите на любую карту, чтобы поменять их местами
						</div>
					</div>
		
					<div 
						className={styles.cards1} 
						style={{ top: isSwapped ? '50px' : '150px', zIndex: isSwapped ? 1 : 2 }}
						onClick={handleCardClick}
					>
						<Card 
							type="partners"
							balance="12 000"
							accountNumber="PRF 398 390 403"
							owner="Konstantin Konstantinopol'skij"
						/>
					</div>
					<div 
						className={styles.cards2}
						style={{ top: isSwapped ? '150px' : '50px', zIndex: isSwapped ? 2 : 1 }}
						onClick={handleCardClick}
					>
						<Card 
							type="sales"
							balance="20 560"
							accountNumber="PFX 398 390 403"
							owner="Konstantin Konstantinopol'skij"
						/>
					</div>
				</div>
				<Analytics items={analyticsData} totalPercentage={15} />
			</div>
			
			<Operations />
			<News />
		</div>
	)
}
