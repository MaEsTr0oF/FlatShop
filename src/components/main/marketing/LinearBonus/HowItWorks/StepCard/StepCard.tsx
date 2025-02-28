import styles from './StepCard.module.css'
import { ReactNode } from 'react'

interface StepCardProps {
  image: string;
  description: ReactNode;
}

export default function StepCard({ image, description }: StepCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt="Шаг" />
      </div>
      <p className={styles.description}>{description}</p>
    </div>
  )
} 