import styles from './FourthStep.module.css'
import FlatSale from './Flat/FlatSale'
import HouseSale from './Home/HouseSale'
import CommercialSale from './CommercialSale'
import FlatArend from './Flat/FlatArend'
import RoomArend from './Room/RoomArend'
import RoomSale from './Room/RoomSale'
import HouseArend from './Home/HouseSale'
interface FourthStepProps {
  onNext: () => void;
  onBack: () => void;
  onSave: () => void;
  listingType: string;
  rentType: string;
  propertyType: string;
}

export interface PhotoData {
  id: number;
  url: string;
  main: boolean;
}

export interface FormData {
  photos: PhotoData[];
  description: string;
  title: string;
  price: number;
  priceType: 'fixed' | 'negotiated';
  mortgage: boolean;
  commission: number;
  deposit: number;
  prepayment: number;
  utilities: {
    included: boolean;
    electricity: boolean;
    gas: boolean;
    water: boolean;
    internet: boolean;
  };
  minRentalPeriod?: number;
  showingTime?: {
    everyday: boolean;
    startTime: string;
    endTime: string;
  };
}

export default function FourthStep({ onNext, onBack, onSave, listingType, rentType, propertyType }: FourthStepProps) {
  console.log('FourthStep props:', { propertyType, listingType, rentType });
  return (
    <div className={styles.container}>
      {propertyType === "Квартира" && listingType === "Продажа" && 
        <FlatSale onNext={onNext} onBack={onBack} onSave={onSave} />}
      {propertyType === "Квартира" && listingType === "Аренда" && 
        <FlatArend onNext={onNext} onBack={onBack} onSave={onSave} rentType={rentType} />}
      {propertyType === "Комната" && listingType === "Продажа" && 
        <RoomSale onNext={onNext} onBack={onBack} onSave={onSave} />}
      {propertyType === "Комната" && listingType === "Аренда" && 
        <RoomArend onNext={onNext} onBack={onBack} onSave={onSave} />}
      {propertyType === "Дом" && listingType==="Продажа" &&
        <HouseSale onNext={onNext} onBack={onBack} onSave={onSave} />}
		{propertyType === "Дом" && listingType==="Аренда" &&
        <FlatArend onNext={onNext} onBack={onBack} onSave={onSave} rentType={rentType} />}
      {propertyType === "Коммерческая недвижимость" && 
        <CommercialSale onNext={onNext} onBack={onBack} onSave={onSave} />}

      <div className={styles.progressBar}>
        {/* Прогресс-бар как в SecondStep */}
      </div>
    </div>
  )
} 