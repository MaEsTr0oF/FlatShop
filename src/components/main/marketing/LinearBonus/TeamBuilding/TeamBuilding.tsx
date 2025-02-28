import styles from './TeamBuilding.module.css'
import BonusCard from '../card/BonusCard'
import { Link } from 'react-router-dom'

export default function TeamBuilding() {
  return (
	<>
	<div className={styles.header}>
	<h1 className={styles.title}>
	  <span className={styles.redText}>ЗАРАБАТЫВАЙ С КОМАНДОЙ - </span>
	  <span className={styles.blackText}>ПОЛУЧАЙ ЛИНЕЙНЫЙ БОНУС!</span>
	</h1>
	<p className={styles.subtitle}>Доход от продаж партнёров до 7 линий в глубину</p>
 </div>

 <div className={styles.content}>
	<div className={styles.inviteCard}>
	  <div className={styles.inviteText}>
		 <h2 className={styles.inviteTitle}>
			<span style={{color: '#E20338'}}>Ты строишь сеть</span> - 
			<span> мы платим тебе за это!</span>
		 </h2>
		 <img src="/img/marketing/arrow.png" alt="arrow" className={styles.arrow} />
	  </div>
	  <Link to="/invite" className={styles.inviteButton}>
		 Пригласить друга
	  </Link>
	</div>

	<BonusCard
	  image="/img/marketing/team.png"
	  title="Чем больше команда – тем выше твой доход"
	  description="Развивай свою команду и получай больше бонусов"
	/>

	<BonusCard
	  image="/img/marketing/pig.png"
	  title="Получай % с каждой сделки партнёров"
	  description="Зарабатывай на успехе своей команды"
	/>

	<BonusCard
	  image="/img/marketing/growth.png"
	  title="Активируй уровни и увеличивай выплаты"
	  description="Развивайся и получай больше возможностей"
	/>
 </div>
 </>
  );
}
