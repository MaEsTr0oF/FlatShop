import { FC } from 'react';
import { createPortal } from 'react-dom';
import styles from './PartnerModal.module.css';

interface Contract {
  operation: string;
  amount: number;
  percentage: number;
  profit: number;
  date: string;
}

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  partner: {
    name: string;
    city: string;
    userId: string;
    phone: string;
    registrationDate: string;
    totalProfit: number;
    monthlyProfit: number;
    contracts: Contract[];
  };
}

export const PartnerModal: FC<PartnerModalProps> = ({ isOpen, onClose, partner }) => {
  if (!isOpen) return null;

  const modalContent = (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        
        <div className={styles.header}>
          <div className={styles.avatar}>
            <img src="/img/avatar.png" alt={partner.name} />
          </div>
          <div className={styles.info}>
            <h2 className={styles.name}>{partner.name}</h2>
            <p className={styles.city}>{partner.city}</p>
          </div>
          <button className={styles.chatButton}>
            Связаться в чате
          </button>
        </div>

        <div className={styles.details}>
          <div className={styles.field}>
            <span className={styles.label}>ID пользователя</span>
            <span className={styles.value}>{partner.userId}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Номер телефона</span>
            <span className={styles.value}>{partner.phone}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Дата регистрации</span>
            <span className={styles.value}>{partner.registrationDate}</span>
          </div>
        </div>

        <div className={styles.profits}>
          <div className={styles.profitCard}>
            <span className={styles.profitLabel}>Прибыль за все время</span>
            <span className={styles.profitValue}>{partner.totalProfit.toLocaleString()} ₽</span>
          </div>
          <div className={styles.profitCard}>
            <span className={styles.profitLabel}>Прибыль за месяц</span>
            <span className={styles.profitValue}>{partner.monthlyProfit.toLocaleString()} ₽</span>
          </div>
        </div>

        <div className={styles.contracts}>
          <h3>Договоры</h3>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <div>Операция</div>
              <div>Стоимость</div>
              <div>Ваш %</div>
              <div>Ваша прибыль</div>
              <div>Дата</div>
            </div>
            {partner.contracts.map((contract, index) => (
              <div key={index} className={styles.tableRow}>
                <div>{contract.operation}</div>
                <div>{contract.amount.toLocaleString()}</div>
                <div>{contract.percentage}%</div>
                <div>{contract.profit.toLocaleString()}</div>
                <div>{contract.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}; 