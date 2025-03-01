import styles from './ActivationModal.module.css'
import { useEffect, useState } from 'react'

interface ActivationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ActivationModal({ isOpen, onClose }: ActivationModalProps) {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const levels = [
    { level: 1, percent: '8%', price: '250 000', activation: '8% с активацией' },
    { level: 2, percent: '8%', price: '120 000', activation: '8% с активацией' },
    { level: 3, percent: '8%', price: '70 000', activation: '8% с активацией' },
    { level: 4, percent: '8%', price: '50 000', activation: '8% с активацией' },
    { level: 5, percent: '8%', price: '40 000', activation: '8% с активацией' },
    { level: 6, percent: '8%', price: '30 000', activation: '8% с активацией' },
    { level: 7, percent: '8%', price: '20 000', activation: '8% с активацией' },
  ];

  const handleLevelClick = (level: number) => {
    setSelectedLevel(level);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div className={styles.content}>
          <div className={styles.levelsContainer}>
            {levels.map((item) => (
              <div 
                key={item.level} 
                className={`${styles.levelCard} ${selectedLevel === item.level ? styles.selected : ''}`}
                onClick={() => handleLevelClick(item.level)}
              >
                <div className={styles.levelInfo}>
                  <h3 className={styles.levelNumber}>Уровень {item.level}</h3>
                  <div className={styles.levelDetails}>
                    <div className={styles.activation}>{item.activation}</div>
                    <div className={styles.price}>Стоимость: {item.price}₽</div>
                  </div>
                </div>
                <img 
                  src={`/img/marketing/level${item.level}.png`} 
                  alt={`Уровень ${item.level}`} 
                  className={styles.levelImage}
                />
                {selectedLevel === item.level && (
                  <button className={styles.payButton}>
                    Перейти к оплате
                  </button>
                )}
              </div>
            ))}
          </div>
            <div className={styles.footer}>
              <div className={styles.allLevelsInfo}>
                <p>
                  Активируй все уровни сразу за 400 000 ₽
                  <span className={styles.discount}>(вместо 580 000 ₽)!</span>
                </p>
              </div>
              <button className={styles.activateAllButton}>
                Активировать все уровни
              </button>
            </div>
        </div>
      </div>
    </div>
  );
} 