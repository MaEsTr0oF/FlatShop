import styles from './WhyProfitable.module.css'

export default function WhyProfitable() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.info}>
          <h2 className={styles.title}>ПОЧЕМУ ЭТО ВЫГОДНО?</h2>
          <p className={styles.subtitle}>Максимум прибыли с каждой сделки!</p>

          <div className={styles.advantages}>
            <div className={styles.advantageItem}>
              <div className={styles.icon}>
                <img src="/img/marketing/icon-settings.png" alt="Система" />
              </div>
              <div className={styles.text}>
                <h3>Простая и понятная система</h3>
                <p>– работай, зарабатывай, без подводных камней</p>
              </div>
            </div>

            <div className={styles.advantageItem}>
              <div className={styles.icon}>
                <img src="/img/marketing/icon-wallet.png" alt="Выплаты" />
              </div>
              <div className={styles.text}>
                <h3>Прозрачные и быстрые выплаты</h3>
                <p>– моментальный перевод на счёт</p>
              </div>
            </div>

            <div className={styles.advantageItem}>
              <div className={styles.icon}>
                <img src="/img/marketing/icon-unlimited.png" alt="Без ограничений" />
              </div>
              <div className={styles.text}>
                <h3>Без ограничений</h3>
                <p>– хочешь больше дохода? Всё в твоих руках!</p>
              </div>
            </div>

            <div className={styles.advantageItem}>
              <div className={styles.icon}>
                <img src="/img/marketing/icon-chart.png" alt="Комиссии" />
              </div>
              <div className={styles.text}>
                <h3>Высокие комиссии</h3>
                <p>– ты получаешь больше, чем в классическом агентстве</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.imageWrapper}>
          <img src="/img/marketing/agent-thumbs-up.png" alt="Агент" className={styles.image} />
        </div>
      </div>
    </div>
  )
} 