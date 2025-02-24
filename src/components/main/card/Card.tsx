import styles from './Card.module.css'

interface CardProps {
  type: 'partners' | 'sales'
  balance: string
  accountNumber: string
  owner: string
}

export default function Card({ type, balance, accountNumber, owner }: CardProps) {
  return (
    <div className={`${styles.card} ${styles[type]}`}>
      <div className={styles.cardContent}>
        <div className={styles.balanceSection}>
          <span className={styles.label}>Баланс</span>
          <h2 className={styles.balance}>{balance} ₽</h2>
        </div>
        
        <div className={styles.accountSection}>
          <span className={styles.label}>Номер счета</span>
          <div className={styles.accountNumber}>
            {accountNumber.split(' ').map((group, index) => (
              <span key={index}>{group}</span>
            ))}
            <button className={styles.copyButton}>
              <img src="/img/general/copy.svg" alt="copy" />
            </button>
          </div>
        </div>
        
        <div className={styles.ownerSection}>
          <span className={styles.label}>Владелец</span>
          <p className={styles.owner}>{owner}</p>
        </div>
      </div>
      
      <div className={styles.cardType}>
        <span>{type === 'partners' ? 'ПАРТНЕРЫ' : 'ПРОДАЖИ'}</span>
      </div>
    </div>
  )
} 