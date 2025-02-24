import styles from './News.module.css'

interface NewsItem {
  id: number
  date: string
  category: string
  title: string
  description: string
  image: string
}

const News = () => {
  const newsItems: NewsItem[] = [
    {
      id: 1,
      date: '21.07.2024',
      category: 'Наша компания',
      title: 'Большая конференция',
      description: 'Все программы и мероприятия нашей компании соответствуют...',
      image: '/img/general/new1.png'
    },
    {
      id: 2,
      date: '21.07.2024',
      category: 'Наша компания',
      title: 'Дома будущего от застройщика',
      description: 'Современные технологии достигли такого уровня, что повышение...',
      image: '/img/general/new2.png'
    },
    {
      id: 3,
      date: '21.07.2024',
      category: 'Наша компания',
      title: 'Дом вашей мечты',
      description: 'Вольтанье, но неопровержимые выводы, а также ключевые...',
      image: '/img/general/new3.png'
    },
    {
      id: 4,
      date: '21.07.2024',
      category: 'Наша компания',
      title: 'Продается дом недорого',
      description: 'Продолжительные выводы неутешительно сложились...',
      image: '/img/general/new4.png'
    }
  ]

  return (
    <div className={styles.news}>
      <h2>НАШИ НОВОСТИ</h2>
      <div className={styles.newsGrid}>
        {newsItems.map(item => (
          <div key={item.id} className={styles.newsCard}>
            <div className={styles.imageWrapper}>
              <img src={item.image} alt={item.title} />
            </div>
            <div className={styles.newsContent}>
              <div className={styles.newsHeader}>
                <span className={styles.date}>{item.date}</span>
                <span className={styles.category}>{item.category}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <button className={styles.readMore}>
                Читать полностью
                <img src="/img/general/arrow.png" alt="arrow" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default News 