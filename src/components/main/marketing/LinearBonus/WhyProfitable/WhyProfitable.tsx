import styles from './WhyProfitable.module.css'

export default function WhyProfitable() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>ПОЧЕМУ ЭТО ВЫГОДНО?</h2>
          <p className={styles.subtitle}>Пассивный доход на полном автомате!</p>
          
          <div className={styles.grid}>
			 <div className={styles.teamImage}>
            <img src="/img/marketing/teamAgents.png" alt="Команда профессионалов" />
          </div>
			 <div className={styles.benefits}>
            <div className={styles.benefit}>
              <div className={styles.iconWrapper}>
                <img src="/img/marketing/team-icon.png" alt="Команда" />
              </div>
              <p className={styles.benefitText}>
                <span>Команда работает –</span>
                <span>ты зарабатываешь</span>
              </p>
            </div>

            <div className={styles.benefit}>
              <div className={styles.iconWrapper}>
                <img src="/img/marketing/growth-icon.png" alt="Уровни" />
              </div>
              <p className={styles.benefitText}>
                <span>Доход с каждой сделки</span>
                <span>в 7 уровнях</span>
              </p>
            </div>

            <div className={styles.benefit}>
              <div className={styles.iconWrapper}>
                <img src="/img/marketing/levels-icon.png" alt="Рост" />
              </div>
              <p className={styles.benefitText}>
                <span>Чем выше твой уровень –</span>
                <span>тем больше бонусы</span>
              </p>
            </div>

            <div className={styles.benefit}>
              <div className={styles.iconWrapper}>
                <img src="/img/marketing/stability-icon.png" alt="Стабильность" />
              </div>
              <p className={styles.benefitText}>
                <span>Стабильность</span>
                <span>и прозрачность выплат</span>
              </p>
            </div>
				</div>
          </div>
        </div>

        

        <div className={styles.bonusSystem}>
          <h3 className={styles.bonusTitle}>БОНУСНАЯ СИСТЕМА</h3>
          <p className={styles.bonusSubtitle}>рассчитай свою прибыль</p>
          
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
            <div className={styles.tableRow}>
              <span>2 линия</span>
              <span>0%</span>
              <span>5%</span>
            </div>
            <div className={styles.tableRow}>
              <span>3 линия</span>
              <span>0%</span>
              <span>3%</span>
            </div>
            <div className={styles.tableRow}>
              <span>4 линия</span>
              <span>0%</span>
              <span>2%</span>
            </div>
            <div className={styles.tableRow}>
              <span>5 линия</span>
              <span>0%</span>
              <span>1%</span>
            </div>
            <div className={styles.tableRow}>
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
						 
        </div>
		  <div className={styles.imageBlock}>
          <div className={styles.personImage}>
            <img src="/img/marketing/person.png" alt="Успешный партнер" />
          </div>
        </div>
      </div>
    </section>
  )
} 