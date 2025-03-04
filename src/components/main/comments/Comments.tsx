import styles from './Comments.module.css'
import CommentsCard from './CommentsCard'

interface Partner {
  id: number
  name: string
  location: string
  avatar: string
  phone: string
  type: 'inviting' | 'active'
}

const Comments = () => {
  const partners: Partner[] = [
    {
      id: 1,
      name: 'Мелания Трамп',
      location: 'г. Вашингтон',
      avatar: '/img/partners/melania.png',
      phone: '+7 (900) 839 23 32',
      type: 'inviting'
    },
    {
      id: 2,
      name: 'Дональд Трамп',
      location: 'г. Вашингтон',
      avatar: '/img/partners/donald.png',
      phone: '+7 (900) 839 23 32',
      type: 'active'
    }
  ]

  return (
    <div className={styles.comments}>
      <CommentsCard 
        partner={partners[0]} 
        title="ПРИГЛАСИВШИЙ ПАРТНЕР" 
      />
      <CommentsCard 
        partner={partners[1]} 
        title="САМЫЙ АКТИВНЫЙ ПАРТНЕР" 
      />
		<button className={styles.analytics_button}>Смотреть всех</button>
    </div>
  )
}

export default Comments 