import styles from './Partners.module.css'
import Analytics from '../analytics/Analytics'
import News from '../news/News'
import Card from '../card/Card'

export default function Partners() {
	const analyticsData = [
		{ id: 1, text: 'Продажа квартир', percentage: 38, color: '#E31235' },
      { id: 2, text: 'Продажа домов', percentage: 19, color: '#FF4B6A' },
      { id: 3, text: 'Продажа комнаты', percentage: 24, color: '#FF8095' },
      { id: 4, text: 'Посуточная аренда', percentage: 19, color: '#333333' },
      { id: 5, text: 'Продажа участков', percentage: 0, color: '#FFFFFF' },
      { id: 6, text: 'Долгострочная аренда', percentage: 0, color: '#FFFFFF' },

	]

	return (
		<div className={styles.partnersContainer}>
			<div className={styles.analytics}>
				<div className={styles.cardsSection}>
					<Card 
						type="partners"
						balance="12 000"
						accountNumber="PRF 398 390 403"
						owner="Konstantin Konstantinopol'skij"
					/>
					<Card 
						type="sales"
						balance="20 560"
						accountNumber="PFX 398 390 403"
						owner="Konstantin Konstantinopol'skij"
					/>
				</div>
				<Analytics items={analyticsData} totalPercentage={15} />
			</div>
			
			<News />
		</div>
	)
}
