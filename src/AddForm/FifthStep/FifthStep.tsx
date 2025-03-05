import styles from '../AddForm.module.css'
import { PriceData } from '../../types/form'
import FlatSale from './Flat/FlatSale'
import FlatArend from './Flat/FlatArend'
import HouseSale from './House/HouseSale'
import HouseArend from './House/HouseArend'
import RoomSale from './Room/RoomSale'
import RoomArend from './Room/RoomArend'
import CommercialSale from './Commercial/CommercialSale.tsx'
import CommercialArend from './Commercial/CommercialArend.tsx'
import ProgressBar from '../components/ProgressBar'

interface FifthStepProps {
  onNext: () => void;
  onBack: () => void;
  onSave: () => void;
  onDataUpdate: (data: PriceData) => void;
  initialData: PriceData | null;
  propertyType: string;
  listingType: string;
}

export default function FifthStep({ 
  onNext, 
  onBack, 
  onSave, 
  onDataUpdate, 
  initialData,
  propertyType,
  listingType 
}: FifthStepProps) {
  const renderComponent = () => {
    const commonProps = {
      onNext,
      onBack,
      onSave,
      onDataUpdate,
      initialData
    };

    const arendProps = {
      ...commonProps,
      rentType: listingType
    };
    switch (propertyType) {
      case 'Квартира':
        return listingType === 'Продажа' 
          ? <FlatSale {...commonProps} />
          : <FlatArend {...arendProps} />;
      case 'Дом':
        return listingType === 'Продажа'
          ? <HouseSale {...commonProps} />
          : <HouseArend {...commonProps} />;
      case 'Комната':
        return listingType === 'Продажа'
          ? <RoomSale {...commonProps} />
          : <RoomArend {...commonProps} />;
      case 'Коммерческая недвижимость':
        return listingType === 'Продажа'
          ? <CommercialSale {...commonProps} />
          : <CommercialArend {...commonProps} />;
      default:
        return null;
    }
  };

  const steps = [
    { number: '01', title: 'Новое объявление' },
    { number: '02', title: 'О квартире' },
    { number: '03', title: 'О доме' },
    { number: '04', title: 'Фото и описание' },
    { number: '05', title: 'Условия сделки' }
  ];

  return (
    <div className={styles.stepContainer}>
      {renderComponent()}
      <ProgressBar currentStep={5} steps={steps} />
    </div>
  );
} 