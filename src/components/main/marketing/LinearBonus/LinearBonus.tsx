import HowItWorks from './HowItWorks/HowItWorks'
import WhyProfitable from './WhyProfitable/WhyProfitable'
import Calculator from './Calculator/Calculator'
import styles from './LinearBonus.module.css'
import TeamBuilding from './TeamBuilding/TeamBuilding'

export default function LinearBonus() {
  return (
    <div className={styles.container}>
      <TeamBuilding />
      <HowItWorks />
      <WhyProfitable />
      <Calculator />
		
    </div>
  )
} 