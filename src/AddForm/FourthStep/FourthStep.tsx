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
  console.log('FourthStep props:', { propertyType, listingType, rentType });
  return (
    <div className={styles.container}>
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
        {/* Прогресс-бар как в SecondStep */}
      </div>
    </div>
  )
} 