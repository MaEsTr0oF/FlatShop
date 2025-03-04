import styles from './LinerBonusPartner.module.css'
import Analytics from '../../analytics/Analytics'
import Operations from '../../operations/Operations'

export default function LinerBonusPartner() {
  const analyticsItems = [
    { id: 1, text: 'Квартиры', percentage: 38, color: '#E31235' },
    { id: 2, text: 'Комнаты', percentage: 24, color: '#FF1F40' },
    { id: 3, text: 'Дома', percentage: 19, color: '#8B0D25' },
    { id: 4, text: 'Нежилая', percentage: 19, color: '#1C1C1C' }
  ]

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <div className={styles.salesSection}>
          <h2 className={styles.sectionTitle}>Заработано на личных продажах</h2>
          <div className={styles.card}>
            <div className={styles.header}>
              <span>ЗАРАБОТАНО ЗА МЕСЯЦ</span>
              <div className={styles.amount}>20 560 ₽</div>
            </div>
            <div className={styles.totalAmount}>
              <span>ЗАРАБОТАНО ЗА ВСЕ ВРЕМЯ</span>
              <div className={styles.amount1}>205 600 ₽</div>
            </div>
            <div className={styles.label}>ПРОДАЖИ</div>
          </div>
        </div>

        <div className={styles.analyticsSection}>
          <div className={styles.analyticsCard}>
            
            <Analytics items={analyticsItems} totalPercentage={15} />
          </div>
        </div>
      </div>

      <Operations />
    </div>
  )
} 
