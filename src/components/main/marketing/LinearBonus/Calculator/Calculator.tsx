import { useState, useEffect, useRef } from 'react'
import styles from './Calculator.module.css'
import SubFooterButton from '../../PersonalSales/subfooter/SubFooterButton';

export default function Calculator() {
  const [partnersCount, setPartnersCount] = useState({
    line1: 0,
    line2: 0,
    line3: 0
  });
  const [averageDealAmount, setAverageDealAmount] = useState('');
  const sliderRefs = {
    line1: useRef<HTMLInputElement>(null),
    line2: useRef<HTMLInputElement>(null),
    line3: useRef<HTMLInputElement>(null)
  };
  const valueRefs = {
    line1: useRef<HTMLDivElement>(null),
    line2: useRef<HTMLDivElement>(null),
    line3: useRef<HTMLDivElement>(null)
  };

  // Расчет дохода без активации
  const calculateIncomeWithoutActivation = () => {
    if (!averageDealAmount) return 0;
    const amount = parseFloat(averageDealAmount.replace(/[^\d]/g, ''));
    return (
      amount * partnersCount.line1 * 0.03 +
      amount * partnersCount.line2 * 0.02 +
      amount * partnersCount.line3 * 0.01
    );
  };

  // Расчет дохода с активацией
  const calculateIncomeWithActivation = () => {
    if (!averageDealAmount) return 0;
    const amount = parseFloat(averageDealAmount.replace(/[^\d]/g, ''));
    return (
      amount * partnersCount.line1 * 0.07 +
      amount * partnersCount.line2 * 0.06 +
      amount * partnersCount.line3 * 0.05
    );
  };

  // Форматирование числа в рубли
  const formatCurrency = (value: number) => {
    return Math.round(value).toLocaleString('ru-RU') + ' РУБ';
  };

  const handleDealAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    setAverageDealAmount(value);
  };

  const updateSliderValuePosition = (line: keyof typeof partnersCount) => {
    const range = sliderRefs[line].current;
    const value = valueRefs[line].current;
    
    if (range && value) {
      const rangeValue = parseInt(range.value);
      const max = parseInt(range.max);
      const min = parseInt(range.min);
      
      // Вычисляем процент с учетом ширины ползунка
      const thumbWidth = 120; // ширина ползунка
      const rangeWidth = range.clientWidth;
      const availableWidth = rangeWidth - thumbWidth;
      const percentage = ((rangeValue - min) / (max - min)) * availableWidth + (thumbWidth / 2);
      const position = (percentage / rangeWidth) * 100;
      
      value.style.setProperty('--value-position', `${position}%`);
    }
  };

  const handlePartnerCountChange = (line: keyof typeof partnersCount, value: string) => {
    setPartnersCount(prev => ({
      ...prev,
      [line]: parseInt(value) || 0
    }));
    updateSliderValuePosition(line);
  };

  useEffect(() => {
    // Инициализация позиций значений
    Object.keys(partnersCount).forEach(line => {
      updateSliderValuePosition(line as keyof typeof partnersCount);
    });

    // Обработчик изменения размера окна
    const handleResize = () => {
      Object.keys(partnersCount).forEach(line => {
        updateSliderValuePosition(line as keyof typeof partnersCount);
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>КАЛЬКУЛЯТОР ПАССИВНОГО ДОХОДА</h2>
        <p className={styles.subtitle}>рассчитай свою прибыль</p>

        <div className={styles.calculator}>
          <div className={styles.inputs}>
            <div className={styles.partnersInputs}>
              <h3 className={styles.inputTitle}>Количество партнеров в каждой линии</h3>
              
              <div className={styles.sliderGroup}>
                <label>Количество партнеров 1 линии</label>
                <div className={styles.sliderWrapper}>
                  <input
                    ref={sliderRefs.line1}
                    type="range"
                    min="0"
                    max="5"
                    value={partnersCount.line1}
                    onChange={(e) => handlePartnerCountChange('line1', e.target.value)}
                    className={styles.slider}
                  />
                  <div ref={valueRefs.line1} className={styles.sliderValue}>{partnersCount.line1}</div>
                </div>
              </div>

              <div className={styles.sliderGroup}>
                <label>Количество партнеров 2 линии</label>
                <div className={styles.sliderWrapper}>
                  <input
                    ref={sliderRefs.line2}
                    type="range"
                    min="0"
                    max="10"
                    value={partnersCount.line2}
                    onChange={(e) => handlePartnerCountChange('line2', e.target.value)}
                    className={styles.slider}
                  />
                  <div ref={valueRefs.line2} className={styles.sliderValue}>{partnersCount.line2}</div>
                </div>
              </div>

              <div className={styles.sliderGroup}>
                <label>Количество партнеров 3 линии</label>
                <div className={styles.sliderWrapper}>
                  <input
                    ref={sliderRefs.line3}
                    type="range"
                    min="0"
                    max="20"
                    value={partnersCount.line3}
                    onChange={(e) => handlePartnerCountChange('line3', e.target.value)}
                    className={styles.slider}
                  />
                  <div ref={valueRefs.line3} className={styles.sliderValue}>{partnersCount.line3}</div>
                </div>
              </div>
            </div>

            <div className={styles.dealAmount}>
              <label>Средний объём продаж на партнёра (в месяц)</label>
              <input
                type="text"
                value={averageDealAmount}
                onChange={handleDealAmountChange}
                placeholder="Введите стоимость сделки"
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.results}>
            <div className={styles.resultCard}>
              <h3>БЕЗ АКТИВАЦИИ УРОВНЯ</h3>
              <div className={styles.amount}>
                {formatCurrency(calculateIncomeWithoutActivation())}
              </div>
            </div>

            <div className={`${styles.resultCard} ${styles.active}`}>
              <h3>С АКТИВАЦИЕЙ УРОВНЯ</h3>
              <div className={styles.amount}>
                {formatCurrency(calculateIncomeWithActivation())}
              </div>
            </div>
          </div>
			 
        </div>
		  <SubFooterButton 
        label="Начни зарабатывать уже сегодня!"
        buttonText="Пригласить партнера"
        subtitle=""
        to=""
      />
      </div>
    </section>
  );
} 