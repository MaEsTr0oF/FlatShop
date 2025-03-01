import PersonalSales from './PersonalSales/PersonalSales'
import styles from './Marketing.module.css'
import Card from './PersonalSales/card/Card'
import personalSalesActive from '/img/marketing/personalSalesActive.png'
import personalSales from '/img/marketing/personalSales.png'
import linearBonus from '/img/marketing/linearBonus.png'
import levelActivation from '/img/marketing/levelActivation.png'
import careerBonus from '/img/marketing/careerBonus.png'
import leaderBonus from '/img/marketing/leaderBonus.png'
import linearBonusActive from '/img/marketing/linearBonusActive.png'
import levelActivationActive from '/img/marketing/levelActivationActive.png'
import careerBonusActive from '/img/marketing/careerBonusActive.png'
import leaderBonusActive from '/img/marketing/leaderBonusActive.png'
import { useState } from 'react';
import LinearBonus from './LinearBonus/LinearBonus'
import LevelActivation from './LevelActivation/LevelActivation'
import NotWork from './NotWork/NotWork'
export default function Marketing() {
	const [activeCard, setActiveCard] = useState(0);
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
		<>
			<div className={styles.container}>
				<h2 className={styles.title}>Маркетинг</h2>
				<div className={styles.cardsContainer}>
				<button className={`${styles.navButton} ${styles.prevButton}`} onClick={scrollLeft}>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
				</button>
				
				<div className={styles.cards}>
					<Card 
						image={activeCard === 0 ? personalSalesActive : personalSales} 
						firstLine="ЛИЧНЫЕ" 
						secondLine="ПРОДАЖИ" 
						active={activeCard === 0}
						onClick={() => setActiveCard(0)}
					/>
					<Card 
						image={activeCard === 1 ? linearBonusActive : linearBonus} 
						firstLine="ЛИНЕЙНЫЙ" 
						secondLine="БОНУС"
						active={activeCard === 1}
						onClick={() => setActiveCard(1)}
					/>
					<Card 
						image={activeCard === 2 ? levelActivationActive : levelActivation} 
						firstLine="УРОВНЕВАЯ" 
						secondLine="АКТИВАЦИЯ"
						active={activeCard === 2}
						onClick={() => setActiveCard(2)}
					/>
					<Card 
						image={activeCard === 3 ? careerBonusActive : careerBonus} 
						firstLine="КАРЬЕРНЫЙ" 
						secondLine="БОНУС"
						active={activeCard === 3}
						onClick={() => setActiveCard(3)}
					/>
					<Card 
						image={activeCard === 4 ? leaderBonusActive : leaderBonus} 
						firstLine="ЛИДЕРСКИЙ" 
						secondLine="БОНУС"
						active={activeCard === 4}
						onClick={() => setActiveCard(4)}
					/>
				</div>

				<button className={`${styles.navButton} ${styles.nextButton}`} onClick={scrollRight}>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
				</button>
			</div>
			{activeCard === 0 && <PersonalSales />}
			{activeCard === 1 && <LinearBonus />}
			{activeCard === 2 && <LevelActivation />}
			{activeCard === 3 && <NotWork />}
			{activeCard === 4 && <NotWork />}
			</div>
		</>
	)
}
