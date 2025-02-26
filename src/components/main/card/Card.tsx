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
      <div className={styles.balance}>
        <span className={styles.label}>Баланс</span>
        <span className={styles.amount}>{balance} ₽</span>
      </div>
      <div className={styles.accountInfo}>
			<h2>Номер счета</h2>
        <span className={styles.accountNumber}>{accountNumber}</span>
        <span className={styles.copy}></span>
      </div>
		<h2>Владелец</h2>
      <div className={styles.owner}>{owner}</div>
      <div className={styles.type}><span>{type === 'partners' ? 'ПАРТНЕРЫ' : 'ПРОДАЖИ'}</span></div>
    </div>
  )
} 