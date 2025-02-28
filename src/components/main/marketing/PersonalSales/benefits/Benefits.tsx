import styles from './Benefits.module.css'

export default function Benefits() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        ПРОДАВАЙ НЕДВИЖИМОСТЬ – <span className={styles.highlight}>ПОЛУЧАЙ 50% БОНУСА!</span>
      </h1>
      <p className={styles.subtitle}>Закрыл сделку – половина бонуса твоя!</p>

      <div className={styles.ready}>
        <h2 className={styles.readyTitle}>Готов к высоким заработкам?</h2>
        <div className={styles.arrow}>
         <img src="/img/marketing/arrow.png" alt="arrow" />
        </div>
        <h3 className={styles.startNow}>Начни прямо сейчас!</h3>
        <button className={styles.button}>Разместить объявление</button>
      </div>

      <div className={styles.cards}>
        <div className={styles.card}>
          <img src="/img/marketing/building.png" alt="Недвижимость" className={styles.cardImage} />
          <p className={styles.cardText}>
            Квартиры, дома, земельные участки, апартаменты – продавай и зарабатывай больше!
          </p>
        </div>

        <div className={styles.card}>
          <img src="/img/marketing/coins.png" alt="Система выплат" className={styles.cardImage} />
          <p className={styles.cardText}>
            Простая и прозрачная система выплат.
          </p>
        </div>

        <div className={styles.card}>
          <img src="/img/marketing/agent.png" alt="Доход" className={styles.cardImage} />
          <p className={styles.cardText}>
            Твой доход зависит только от тебя!
          </p>
        </div>
      </div>
    </div>
  )
} 