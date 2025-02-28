import { useState } from 'react'
import styles from './Calculator.module.css'

export default function Calculator() {
  const [selectedType, setSelectedType] = useState('Дом')
  const [price, setPrice] = useState('')
  const [dealsCount, setDealsCount] = useState(1)

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>КАЛЬКУЛЯТОР ДОХОДА</h2>
      <p className={styles.subtitle}>рассчитай свою прибыль</p>

      <div className={styles.content}>
        <div className={styles.form}>
          <div className={styles.formGroup}>
            <label>Выбери тип недвижимости</label>
            <div className={styles.propertyTypes}>
              <button 
                className={`${styles.typeButton} ${selectedType === 'Комната' ? styles.active : ''}`}
                onClick={() => setSelectedType('Комната')}
              >
                <img src="/img/marketing/room.png" alt="Комната" />
                <span>Комната</span>
              </button>
              <button 
                className={`${styles.typeButton} ${selectedType === 'Квартира' ? styles.active : ''}`}
                onClick={() => setSelectedType('Квартира')}
              >
                <img src="/img/marketing/apartment.png" alt="Квартира" />
                <span>Квартира</span>
              </button>
              <button 
                className={`${styles.typeButton} ${selectedType === 'Дом' ? styles.active : ''}`}
                onClick={() => setSelectedType('Дом')}
              >
                <img src="/img/marketing/house.png" alt="Дом" />
                <span>Дом</span>
              </button>
              <button 
                className={`${styles.typeButton} ${selectedType === 'Коммерческая' ? styles.active : ''}`}
                onClick={() => setSelectedType('Коммерческая')}
              >
                <img src="/img/marketing/commercial.png" alt="Коммерческая" />
                <span>Коммерческая</span>
              </button>
				  <button 
                className={`${styles.typeButton} ${selectedType === 'Коммерческая' ? styles.active : ''}`}
                onClick={() => setSelectedType('Коммерческая')}
              >
                <img src="/img/marketing/ground.png" alt="Коммерческая" />
                <span>Земельный участок</span>
              </button>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Стоимость сделки</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Введите стоимость сделки"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Количество сделок в месяц</label>
            <div className={styles.dealsCounter}>
              <button 
                className={styles.counterButton}
                onClick={() => setDealsCount(prev => Math.max(1, prev - 1))}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <div className={styles.counterValue}>{dealsCount}</div>
              <button 
                className={styles.counterButton}
                onClick={() => setDealsCount(prev => prev + 1)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.result}>
          <div className={styles.resultContent}>
            <h3>ТВОЙ ДОХОД</h3>
            <div className={styles.income}>??? РУБ</div>
          </div>
        </div>
      </div>
    </div>
  )
} 