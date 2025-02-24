import styles from './Comments.module.css'

interface Partner {
  id: number
  name: string
  location: string
  avatar: string
  phone: string
  type: 'inviting' | 'active'
}

interface CommentsCardProps {
  partner: Partner
  title: string
}

const CommentsCard = ({ partner, title }: CommentsCardProps) => {
  return (
    <div className={styles.partnerCard}>
      <h3>{title}</h3>
      <div className={styles.partner}>
        <div className={styles.partnerInfo}>
          <img src={partner.avatar} alt={partner.name} className={styles.avatar} />
          <div className={styles.details}>
            <h4>{partner.name}</h4>
            <span>{partner.location}</span>
          </div>
        </div>
        <div className={styles.contacts}>
          <div className={styles.buttons}>
            <button className={styles.chatButton}>
              <img src="/img/general/chat.png" alt="chat" />
              Чат
            </button>
            <button className={styles.telegramButton}>
              <img src="/img/general/telegram.png" alt="telegram" />
            </button>
            <button className={styles.vkButton}>
              <img src="/img/general/vk.png" alt="vk" />
            </button>
          </div>
          <div className={styles.phone}>
            <span>Номер телефона:</span>
            <a href={`tel:${partner.phone}`}>{partner.phone}</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentsCard 