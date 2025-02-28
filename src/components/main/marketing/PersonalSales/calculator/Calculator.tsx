import { useState, useEffect, useRef } from 'react'
import styles from './Calculator.module.css'

export default function Calculator() {
  const [selectedType, setSelectedType] = useState('Дом')
  const [price, setPrice] = useState('')
  const [dealsCount, setDealsCount] = useState(1)
  const sliderRef = useRef<HTMLInputElement>(null)
  const valueRef = useRef<HTMLDivElement>(null)

  // Функция для форматирования числа в формат с разделителями и знаком рубля
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  // Расчет итоговой суммы
  const calculateIncome = (): string => {
    if (!price) return '??? ₽'
    const priceValue = parseInt(price)
    if (isNaN(priceValue)) return '??? ₽'
    return formatCurrency(priceValue * dealsCount)
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '')
    setPrice(value)
  }

  const handlePriceBlur = () => {
    if (price) {
      const numericValue = parseInt(price)
      if (!isNaN(numericValue)) {
        setPrice(numericValue.toString())
      }
    }
  }

  const updateSliderValuePosition = () => {
    if (sliderRef.current && valueRef.current) {
      const range = sliderRef.current
      const value = parseInt(range.value)
      const max = parseInt(range.max)
      const min = parseInt(range.min)
      
      // Вычисляем процент с учетом ширины ползунка
      const thumbWidth = 120 // ширина ползунка
      const rangeWidth = range.clientWidth
      const availableWidth = rangeWidth - thumbWidth
      const percentage = ((value - min) / (max - min)) * availableWidth + (thumbWidth / 2)
      const position = (percentage / rangeWidth) * 100
      
      valueRef.current.style.setProperty('--value-position', `${position}%`)
    }
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDealsCount(parseInt(e.target.value))
    updateSliderValuePosition()
  }

  useEffect(() => {
    updateSliderValuePosition()
  }, [dealsCount])

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
                <img src={selectedType === 'Комната' ? "/img/marketing/roomActive.png" : "/img/marketing/room.png"} alt="Комната" />
                <span>Комната</span>
              </button>
              <button 
                className={`${styles.typeButton} ${selectedType === 'Квартира' ? styles.active : ''}`}
                onClick={() => setSelectedType('Квартира')}
              >
                <img src={selectedType === 'Квартира' ? "/img/marketing/apartmentActive.png" : "/img/marketing/apartment.png"} alt="Квартира" />
                <span>Квартира</span>
              </button>
              <button 
                className={`${styles.typeButton} ${selectedType === 'Дом' ? styles.active : ''}`}
                onClick={() => setSelectedType('Дом')}
              >
                <img src={selectedType === 'Дом' ? "/img/marketing/houseActive.png" : "/img/marketing/house.png"} alt="Дом" />
                <span>Дом</span>
              </button>
              <button 
                className={`${styles.typeButton} ${selectedType === 'Коммерческая' ? styles.active : ''}`}
                onClick={() => setSelectedType('Коммерческая')}
              >
                <img src={selectedType === 'Коммерческая' ? "/img/marketing/commercialActive.png" : "/img/marketing/commercial.png"} alt="Коммерческая" />
                <span>Коммерческая</span>
              </button>
				  <button 
                className={`${styles.typeButton} ${selectedType === 'Земельный участок' ? styles.active : ''}`}
                onClick={() => setSelectedType('Земельный участок')}
              >
                <img src={selectedType === 'Земельный участок' ? "/img/marketing/groundActive.png" : "/img/marketing/ground.png"} alt="Коммерческая" />
                <span>Земельный участок</span>
              </button>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Стоимость сделки</label>
            <input
              type="text"
              value={price}
              onChange={handlePriceChange}
              onBlur={handlePriceBlur}
              placeholder="Введите стоимость сделки"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Количество сделок в месяц</label>
            <div className={styles.sliderContainer}>
              <input
                ref={sliderRef}
                type="range"
                min="1"
                max="20"
                value={dealsCount}
                onChange={handleSliderChange}
                className={styles.slider}
              />
              <div ref={valueRef} className={styles.sliderValue}>{dealsCount}</div>
            </div>
          </div>
        </div>

        <div className={styles.result}>
          <div className={styles.resultContent}>
            <h3>ТВОЙ ДОХОД</h3>
            <div className={styles.income}>{calculateIncome()}</div>
          </div>
        </div>
      </div>
    </div>
  )
} 