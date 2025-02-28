import { Link } from 'react-router-dom'
import styles from './SubFooterButton.module.css'

interface SubFooterButtonProps {
  label: string;
  buttonText: string;
  subtitle: string;
  to: string;
}

export default function SubFooterButton({ 
  label = "Начни зарабатывать уже сегодня!", 
  buttonText = "Разместить объявление",
  subtitle = "Выбери свой уровень или активируй сразу все за 400 000 ₽!",
  to = "/main/ads"
}: SubFooterButtonProps) {
  return (
    <div className={styles.ctaSection}>
      <h2 className={styles.ctaTitle}>{label}</h2>
      <Link to={to} className={styles.ctaButton}>
        {buttonText}
      </Link>
      <h3 className={styles.ctaSubtitle}>
        {subtitle}
      </h3>
    </div>
  );
} 