import styles from './HowItWorks.module.css'
import arrow from '/img/marketing/arrow-right.png'

export default function HowItWorks() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>КАК РАБОТАЕТ БОНУС?</h2>
      <p className={styles.subtitle}>Всё просто – продавай и получай 50%!</p>

      <div className={styles.steps}>
        <div className={styles.step}>
          <div className={styles.imageWrapper}>
            <img src="/img/marketing/find-client.png" alt="Найди клиента" className={styles.stepImage} />
          </div>
          <h3 className={styles.stepTitle}>Найди клиента</h3>
        </div>

        <div className={styles.arrow}>
          <img src={arrow} alt="стрелка" />
        </div>

        <div className={styles.step}>
          <div className={styles.imageWrapper}>
            <img src="/img/marketing/make-deal.png" alt="Заключи сделку" className={styles.stepImage} />
          </div>
          <h3 className={styles.stepTitle}>Заключи сделку</h3>
        </div>

        <div className={styles.arrow}>
          <img src={arrow} alt="стрелка" />
        </div>

        <div className={styles.step}>
          <div className={styles.imageWrapper}>
            <img src="/img/marketing/get-bonus.png" alt="Получи бонус" className={styles.stepImage} />
          </div>
          <h3 className={styles.stepTitle}>
            Моментально получи
            <span className={styles.highlight}>50% от бонуса!</span>
          </h3>
        </div>
      </div>
    </div>
  )
} 