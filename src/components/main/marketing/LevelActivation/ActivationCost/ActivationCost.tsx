import styles from './ActivationCost.module.css'

export default function ActivationCost() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <div className={styles.titleWrapper}>
            <h2 className={styles.title}>СКОЛЬКО СТОИТ АКТИВАЦИЯ УРОВНЕЙ?</h2>
            <p className={styles.subtitle}>Выбирай свой уровень!</p>
          </div>
          <div className={styles.imageWrapper}>
            <img src="/img/marketing/team-group.png" alt="Команда профессионалов" className={styles.image} />
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <span>Уровень</span>
              <span>Цена активации</span>
              <span>% от активаций партнёров</span>
            </div>
            
            <div className={styles.tableRow}>
              <span>1</span>
              <span>250 000 ₽</span>
              <span>20%</span>
            </div>
            <div className={`${styles.tableRow} ${styles.evenRow}`}>
              <span>2</span>
              <span>120 000 ₽</span>
              <span>10%</span>
            </div>
            <div className={styles.tableRow}>
              <span>3</span>
              <span>70 000 ₽</span>
              <span>8%</span>
            </div>
            <div className={`${styles.tableRow} ${styles.evenRow}`}>
              <span>4</span>
              <span>50 000 ₽</span>
              <span>6%</span>
            </div>
            <div className={styles.tableRow}>
              <span>5</span>
              <span>40 000 ₽</span>
              <span>3%</span>
            </div>
            <div className={`${styles.tableRow} ${styles.evenRow}`}>
              <span>6</span>
              <span>30 000 ₽</span>
              <span>2%</span>
            </div>
            <div className={styles.tableRow}>
              <span>7</span>
              <span>20 000 ₽</span>
              <span>1%</span>
            </div>
          </div>

          <div className={styles.activationInfo}>
            <p>
              Активируй все уровни сразу за 400 000 ₽
              <span className={styles.discount}>(вместо 580 000 ₽)!</span>
            </p>
            <button className={styles.activateButton}>
              Активировать уровень
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 