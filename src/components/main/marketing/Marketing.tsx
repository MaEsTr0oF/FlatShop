import Card from './card/Card'
import styles from './Marketing.module.css'
import personalSales from '/img/marketing/personalSales.png'
import linearBonus from '/img/marketing/linearBonus.png'
import levelActivation from '/img/marketing/levelActivation.png'
import careerBonus from '/img/marketing/careerBonus.png'
import leaderBonus from '/img/marketing/leaderBonus.png'
import Benefits from './benefits/Benefits'
import Calculator from './calculator/Calculator'
import HowItWorks from './howitworks/HowItWorks'
import WhyProfitable from './whyprofitable/WhyProfitable'

export default function Marketing() {
	const scrollLeft = () => {
		const container = document.querySelector(`.${styles.cards}`);
		if (container) {
			container.scrollBy({ left: -290, behavior: 'smooth' });
		}
	};

	const scrollRight = () => {
		const container = document.querySelector(`.${styles.cards}`);
		if (container) {
			container.scrollBy({ left: 290, behavior: 'smooth' });
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.cardsContainer}>
				<button className={`${styles.navButton} ${styles.prevButton}`} onClick={scrollLeft}>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
				</button>
				
				<div className={styles.cards}>
					<Card 
						image={personalSales} 
						firstLine="ЛИЧНЫЕ" 
						secondLine="ПРОДАЖИ" 
						active
					/>
					<Card 
						image={linearBonus} 
						firstLine="ЛИНЕЙНЫЙ" 
						secondLine="БОНУС"
					/>
					<Card 
						image={levelActivation} 
						firstLine="УРОВНЕВАЯ" 
						secondLine="АКТИВАЦИЯ"
					/>
					<Card 
						image={careerBonus} 
						firstLine="КАРЬЕРНЫЙ" 
						secondLine="БОНУС"
					/>
					<Card 
						image={leaderBonus} 
						firstLine="ЛИДЕРСКИЙ" 
						secondLine="БОНУС"
					/>
				</div>

				<button className={`${styles.navButton} ${styles.nextButton}`} onClick={scrollRight}>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
				</button>
			</div>
			<Benefits />
			<HowItWorks />
			<WhyProfitable />
			<Calculator />
		</div>
	)
}
