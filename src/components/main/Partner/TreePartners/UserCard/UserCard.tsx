import { useState } from 'react';
import styles from './UserCard.module.css';
import { PartnerModal } from '../PartnerModal/PartnerModal';
import { ChatModal } from '../ChatModal/ChatModal';

interface UserCardProps {
  name: string;
  role: string;
  userId: string;
  partnersCount: number;
  avatar?: string;
  isActive?: boolean;
}

export default function UserCard({ name, role, userId, partnersCount, avatar, isActive }: UserCardProps) {
  const [imgError, setImgError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const defaultAvatar = '/img/avatar.png'; 

  const handleImageError = () => {
    setImgError(true);
  };

  const mockPartnerData = {
    name,
    city: 'г. Вашингтон',
    userId,
    phone: '+7 (900) 839 23 32',
    registrationDate: '24.01.2025',
    totalProfit: 636000,
    monthlyProfit: 20000,
    contracts: [
      {
        operation: 'Продажа квартиры',
        amount: 5000000,
        percentage: 8,
        profit: 20000,
        date: '13.02.2025'
      },
      {
        operation: 'Продажа дома',
        amount: 10000000,
        percentage: 8,
        profit: 40000,
        date: '23.01.2025'
      },
      {
        operation: 'Продажа офиса',
        amount: 12000000,
        percentage: 8,
        profit: 48000,
        date: '23.01.2025'
      },
      {
        operation: 'Продажа квартиры',
        amount: 7000000,
        percentage: 8,
        profit: 28000,
        date: '23.01.2025'
      },
      {
        operation: 'Продажа дома',
        amount: 125000000,
        percentage: 8,
        profit: 500000,
        date: '23.01.2025'
      }
    ]
  };

  return (
    <>
      <div className={`${styles.card} ${isActive ? styles.active : ''}`}>
        <div className={styles.avatar}>
          <img 
            src={imgError ? defaultAvatar : (avatar || defaultAvatar)} 
            alt={name} 
            onError={handleImageError}
          />
        </div>
        <div className={styles.info}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.role}>{role}</p>
          <p className={styles.id}>ID: {userId}</p>
        </div>
        <div className={styles.stats}>
          <div className={styles.partnersCount}>
            <span>Сеть партнеров</span>
            <p>{partnersCount} человек</p>
          </div>
          <div className={styles.actions}>
            <button className={styles.chatButton} onClick={() => setIsChatOpen(true)}>
              Чат
            </button>
            <button className={styles.detailsButton} onClick={() => setIsModalOpen(true)}>
              Подробнее
            </button>
            <button className={styles.openButton}>
              Открыть древо
            </button>
          </div>
        </div>
      </div>

      <PartnerModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        partner={mockPartnerData}
      />

      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        partner={{
          name,
          role,
          userId,
          avatar
        }}
      />
    </>
  );
} 