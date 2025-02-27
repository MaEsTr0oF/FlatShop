import styles from './FifthStep.module.css'
import FlatSale from './Flat/FlatSale'
import HouseSale from './House/HouseSale'
import FlatArend from './Flat/FlatArend.tsx'
import RoomArend from './Room/RoomArend.tsx'
import RoomSale from './Room/RoomSale'
import HouseArend from './House/HouseArend'
import CommercialSale from './Commercial/CommercialSale.tsx'
import CommercialArend from './Commercial/CommercialArend.tsx'

interface FifthStepProps {
  onNext: () => void;
  onBack: () => void;
  onSave: () => void;
  listingType: string;
  rentType: string;
  propertyType: string;
  onDataUpdate?: (data: PriceData) => void;
  initialData?: PriceData | null;
}

export interface PriceData {
  price: number;
  priceType: 'fixed' | 'negotiated';
  mortgage: boolean;
  commission: number;
  deposit?: number;
  prepayment?: string;
  utilities?: {
    included: boolean;
    electricity: boolean;
    gas: boolean;
    water: boolean;
    internet: boolean;
  };
  minRentalPeriod?: string;
  maxGuests?: string;
  rules?: {
    children: boolean;
    pets: boolean;
    smoking: boolean;
    party: boolean;
    docs: boolean;
    month: boolean;
  };
  showingTime: {
    everyday: boolean;
    startTime: string;
    endTime: string;
    online: boolean;
    customDays: {
      monday: boolean;
      tuesday: boolean;
      wednesday: boolean;
      thursday: boolean;
      friday: boolean;
      saturday: boolean;
      sunday: boolean;
    };
  };
}

export default function FifthStep({ onNext, onBack, onSave, listingType, rentType, propertyType, onDataUpdate, initialData }: FifthStepProps) {
  console.log('FifthStep props:', { propertyType, listingType, rentType });
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {propertyType === "Квартира" && listingType === "Продажа" && 
          <FlatSale onNext={onNext} onBack={onBack} onSave={onSave} onDataUpdate={onDataUpdate} initialData={initialData} />}
        {propertyType === "Квартира" && listingType === "Аренда" && 
          <FlatArend onNext={onNext} onBack={onBack} onSave={onSave} rentType={rentType} onDataUpdate={onDataUpdate} initialData={initialData} />}
        {propertyType === "Комната" && listingType === "Продажа" && 
          <RoomSale onNext={onNext} onBack={onBack} onSave={onSave} onDataUpdate={onDataUpdate} initialData={initialData} />}
        {propertyType === "Комната" && listingType === "Аренда" && 
          <RoomArend onNext={onNext} onBack={onBack} onSave={onSave} onDataUpdate={onDataUpdate} initialData={initialData} />}
        {propertyType === "Дом" && listingType === "Продажа" &&
          <HouseSale onNext={onNext} onBack={onBack} onSave={onSave} onDataUpdate={onDataUpdate} initialData={initialData} />}
        {propertyType === "Дом" && listingType === "Аренда" &&
          <HouseArend onNext={onNext} onBack={onBack} onSave={onSave} onDataUpdate={onDataUpdate} initialData={initialData} />}
        {propertyType === "Коммерческая недвижимость" && listingType === "Продажа" &&
          <CommercialSale onNext={onNext} onBack={onBack} onSave={onSave} onDataUpdate={onDataUpdate} initialData={initialData} />}
        {propertyType === "Коммерческая недвижимость" && listingType === "Аренда" &&
          <CommercialArend onNext={onNext} onBack={onBack} onSave={onSave} onDataUpdate={onDataUpdate} initialData={initialData} />}
      </div>

      <div className={styles.progressBarContainer}>
        <div className={styles.progressBar}>
          <div className={styles.progressLine} style={{ '--progress-width': '80%' } as React.CSSProperties} />
          <div className={styles.progressStep}>
            <div className={styles.stepNumber}>01</div>
            <div className={styles.stepTitle}>Новое объявление</div>
          </div>
          <div className={styles.progressStep}>
            <div className={styles.stepNumber}>02</div>
            <div className={styles.stepTitle}>О квартире</div>
          </div>
          <div className={styles.progressStep}>
            <div className={styles.stepNumber}>03</div>
            <div className={styles.stepTitle}>О доме</div>
          </div>
          <div className={styles.progressStep}>
            <div className={styles.stepTitle}>Фото и описание</div>
          </div>
          <div className={styles.progressStep}>
            <div className={`${styles.stepNumber} ${styles.active}`}>05</div>
            <div className={styles.stepTitle}>Условия сделки</div>
          </div>
        </div>
      </div>
    </div>
  )
} 