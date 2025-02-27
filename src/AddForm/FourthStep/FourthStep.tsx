import styles from './FourthStep.module.css'
import FlatSale from './Flat/FlatSale'
import HouseSale from './Home/HouseSale'
import CommercialSale from './CommercialSale'
import FlatArend from './Flat/FlatArend'
import RoomArend from './Room/RoomArend'
import RoomSale from './Room/RoomSale'

interface FourthStepProps {
  onNext: () => void;
  onBack: () => void;
  onSave: () => void;
  listingType: string;
  rentType: string;
  propertyType: string;
  onDataUpdate?: (data: FourthStepData) => void;
  initialData?: FourthStepData | null;
}

export interface PhotoData {
  id: number;
  url: string;
  main: boolean;
}

export interface FourthStepData {
  salePhotos: File[];
  rentPhotos: File[];
  videoUrl: string;
  description: string;
}

export default function FourthStep({ 
  onNext, 
  onBack, 
  onSave, 
  listingType, 
  rentType, 
  propertyType,
  onDataUpdate,
  initialData
}: FourthStepProps) {
  return (
    <div className={styles.container}>
		<div className={styles.header}>
				<h3 className={styles.step}>04/<span>05</span></h3>
				<h2 className={styles.title}>{propertyType}</h2>
			</div>
      {propertyType === "Квартира" && listingType === "Продажа" && 
        <FlatSale onNext={onNext} onBack={onBack} onSave={onSave} onDataUpdate={onDataUpdate} initialData={initialData} />}
      {propertyType === "Квартира" && listingType === "Аренда" && 
        <FlatArend onNext={onNext} onBack={onBack} onSave={onSave} rentType={rentType}  />}
      {propertyType === "Комната" && listingType === "Продажа" && 
        <RoomSale onNext={onNext} onBack={onBack} onSave={onSave}   />}
      {propertyType === "Комната" && listingType === "Аренда" && 
        <RoomArend onNext={onNext} onBack={onBack} onSave={onSave}  />}
      {propertyType === "Дом" && listingType==="Продажа" &&
        <HouseSale onNext={onNext} onBack={onBack} onSave={onSave} />}
      {propertyType === "Дом" && listingType==="Аренда" &&
        <FlatArend onNext={onNext} onBack={onBack} onSave={onSave} rentType={rentType}  />}
      {propertyType === "Коммерческая недвижимость" && 
        <CommercialSale onNext={onNext} onBack={onBack} onSave={onSave}  />}

      <div className={styles.progressBar}>
        <div className={styles.progressLine} style={{ '--progress-width': '80%' } as React.CSSProperties} />
        <div className={styles.progressStep}>
          <div className={`${styles.stepNumber} ${styles.completed}`}>01</div>
          <div className={styles.stepTitle}>Новое объявление</div>
        </div>
        <div className={styles.progressStep}>
          <div className={`${styles.stepNumber} ${styles.completed}`}>02</div>
          <div className={styles.stepTitle}>О помещении</div>
        </div>
        <div className={styles.progressStep}>
          <div className={`${styles.stepNumber} ${styles.completed}`}>03</div>
          <div className={styles.stepTitle}>О доме</div>
        </div>
        <div className={styles.progressStep}>
          <div className={`${styles.stepNumber} ${styles.active}`}>04</div>
          <div className={styles.stepTitle}>Фото и описание</div>
        </div>
        <div className={styles.progressStep}>
          <div className={styles.stepNumber}>05</div>
          <div className={styles.stepTitle}>Условия сделки</div>
        </div>
      </div>
    </div>
  )
} 