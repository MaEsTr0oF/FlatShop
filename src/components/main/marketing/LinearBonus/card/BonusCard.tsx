import styles from './BonusCard.module.css'

interface BonusCardProps {
  image: string;
  title: string;
  description: string;
}

export default function BonusCard({ image, title, description }: BonusCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
} 