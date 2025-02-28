import styles from './HowItWorks.module.css'
import StepCard from './StepCard/StepCard'

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Как работает линейный бонус</h2>
      <p className={styles.subtitle}>
        Получайте бонусы за каждого приглашенного партнера в вашей структуре до третьей линии
      </p>
      
      <div className={styles.stepsContainer}>
        <StepCard 
          image="/img/marketing/step1.png"
          description={
            <>
              Партнёры <strong>1-й линии</strong> (твои личные приглашённые) продают недвижимость – ты получаешь с их продаж
            </>
          }
        />
        
        <img src="/img/marketing/arrow-right.png" alt="стрелка" className={styles.arrow} />
        
        <StepCard
          image="/img/marketing/step2.png"
          description={
            <>
              Партнёры <strong>2-й линии</strong> (приглашённые твоих партнёров) тоже продают – ты снова получаешь %!
            </>
          }
        />
        
        <img src="/img/marketing/arrow-right.png" alt="стрелка" className={styles.arrow} />
        
        <StepCard
          image="/img/marketing/step3.png"
          description={
            <>
              И так <strong>до 7-й линии</strong> в глубину!
            </>
          }
        />
      </div>
    </section>
  )
} 