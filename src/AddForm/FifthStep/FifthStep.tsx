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

  return (
    <div className={styles.stepContainer}>
      {renderComponent()}
		<div className={styles.buttons}>
				<button type="button" onClick={onBack} className={styles.backButton}>
					Назад
				</button>
				<button type="button" onClick={onNext} className={styles.nextButton}>
				Выставить объявление
				</button>
				<button type="button" onClick={onSave} className={styles.saveButton}>
					Сохранить и выйти
				</button>
			</div>
		<div className={styles.progressBar}>
        <div className={styles.progressLine} style={{ '--progress-width': '100%' } as React.CSSProperties} />
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
  );
} 