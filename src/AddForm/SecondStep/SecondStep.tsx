import { useState } from 'react'
import styles from './SecondStep.module.css'
import FlatRoom from './FlatRoom'
import HouseRoom from './HouseRoom'
import CommercialRoom from './CommercialRoom'

interface SecondStepProps {
	onNext: () => void;
	onBack: () => void;
	onSave: () => void;
	propertyType: string;
	listingType: string;
}

export interface FormData {
	type: 'квартира' | 'апартаменты' | 'дом' | 'Офис' | 'Коворкинг';
	roomCount: number;
	beds: BedInfo[];
	bedType?: string;
	bedCount?: number;
	roomType: {
		isolated: boolean;
		adjacent: boolean;
	};
	floor: number;
	hasMultipleFloors?: boolean;
	layout?: {
		open: boolean;
		cabinet: boolean;
	};
	totalArea: number;
	kitchenArea: number;
	livingArea: number;
	ceilingHeight: number;
	powerCapacity?: number;
	bathroom: 'Совмещенный' | 'Раздельный' | 'В доме' | 'На улице';
	windows: {
		courtyard: boolean;
		street: boolean;
		sunny: boolean;
	};
	features: {
		balcony: boolean;
		loggia: boolean;
		wardrobe: boolean;
		panoramicWindows: boolean;
		warmFloor: boolean;
		bathhouse: boolean;
		pool: boolean;
		terrace: boolean;
	};
	renovation: 'Евро' | 'Косметический' | 'Требуется ремонт' | 'Без ремонта';
	furniture: {
		kitchen: boolean;
		clothes: boolean;
		sleeping: boolean;
	};
	appliances: {
		refrigerator: boolean;
		dishwasher: boolean;
		washer: boolean;
		conditioner: boolean;
		waterHeater: boolean;
	};
	additionalFeatures: {
		wifi: boolean;
		tv: boolean;
		towels: boolean;
		hygiene: boolean;
		bedLinen: boolean;
	};
	landCategory?: 'ИЖС' | 'СНТ' | 'ЛПХ';
	buildYear?: number;
	floorCount?: number;
	landArea?: number;
	wallMaterial?: 'Брус' | 'Кирпич' | 'Бетон';
	parking?: 'Гараж' | 'Парковка' | 'Нет';
	bathroomLocation?: {
		inHouse: boolean;
		outside: boolean;
	};
	transport?: {
		asphaltRoad: boolean;
		publicTransport: boolean;
		railwayStation: boolean;
	};
	infrastructure?: {
		shop: boolean;
		kindergarten: boolean;
		pharmacy: boolean;
		school: boolean;
	};
}

export interface BedInfo {
	type: string;
	count: number;
}

export default function SecondStep({ onNext, onBack, onSave, propertyType, listingType}: SecondStepProps) {
	const [formData, setFormData] = useState<FormData>({
		type: propertyType === 'Дом' ? 'дом' : propertyType === 'Офис' || propertyType === 'Коворкинг' ? propertyType : 'квартира',
		roomCount: 1,
		beds: [],
		bedType: propertyType === 'Дом' && listingType === 'Аренда' ? 'Односпальная (70-110)' : undefined,
		bedCount: propertyType === 'Дом' && listingType === 'Аренда' ? 1 : undefined,
		roomType: {
			isolated: false,
			adjacent: false,
		},
		floor: 1,
		hasMultipleFloors: false,
		layout: propertyType === 'Офис' || propertyType === 'Коворкинг' ? {
			open: false,
			cabinet: false,
		} : undefined,
		totalArea: 0,
		kitchenArea: 0,
		livingArea: 0,
		ceilingHeight: 2.5,
		powerCapacity: propertyType === 'Офис' || propertyType === 'Коворкинг' ? 0 : undefined,
		bathroom: propertyType === 'Дом' ? 'В доме' : 'Совмещенный',
		windows: {
			courtyard: false,
			street: false,
			sunny: false,
		},
		features: {
			balcony: false,
			loggia: false,
			wardrobe: false,
			panoramicWindows: false,
			warmFloor: false,
			bathhouse: false,
			pool: false,
			terrace: false,
		},
		renovation: 'Без ремонта',
		furniture: {
			kitchen: false,
			clothes: false,
			sleeping: false,
		},
		appliances: {
			refrigerator: false,
			dishwasher: false,
			washer: false,
			conditioner: false,
			waterHeater: false,
		},
		additionalFeatures: {
			wifi: false,
			tv: false,
			towels: false,
			hygiene: false,
			bedLinen: false,
		},
		landCategory: propertyType === 'Дом' ? 'ИЖС' : undefined,
		buildYear: propertyType === 'Дом' ? new Date().getFullYear() : undefined,
		floorCount: propertyType === 'Дом' ? 1 : undefined,
		landArea: propertyType === 'Дом' ? 0 : undefined,
		wallMaterial: propertyType === 'Дом' ? 'Брус' : undefined,
		parking: propertyType === 'Дом' ? 'Гараж' : undefined,
		bathroomLocation: propertyType === 'Дом' ? { inHouse: false, outside: false } : undefined,
		transport: propertyType === 'Дом' ? { asphaltRoad: false, publicTransport: false, railwayStation: false } : undefined,
		infrastructure: propertyType === 'Дом' ? { shop: false, kindergarten: false, pharmacy: false, school: false } : undefined,
	})

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3 className={styles.step}>02/<span>05</span></h3>
				<h2 className={styles.title}>{propertyType}</h2>
			</div>

			{(propertyType === "Комната" || propertyType === "Квартира") && (
				<FlatRoom
					formData={formData}
					setFormData={setFormData}
					propertyType={propertyType}
					listingType={listingType}
					onNext={onNext}
					onBack={onBack}
					onSave={onSave}
				/>
			)}
			{propertyType === "Дом" && (
				<HouseRoom
					formData={formData}
					setFormData={setFormData}
					propertyType={propertyType}
					listingType={listingType}
					onNext={onNext}
					onBack={onBack}
					onSave={onSave}
				/>
			)}
			{(propertyType === "Коммерческая недвижимость") && (
				<CommercialRoom
					formData={formData}
					setFormData={setFormData}
					propertyType={propertyType}
					listingType={listingType}
					onNext={onNext}
					onBack={onBack}
					onSave={onSave}
				/>
			)}

			<div className={styles.progressBar}>
				<div className={styles.progressLine} style={{ '--progress-width': '20%' } as React.CSSProperties} />
				<div className={styles.progressStep}>
					<div className={`${styles.stepNumber} ${styles.completed}`}>01</div>
					<div className={styles.stepTitle}>Новое объявление</div>
				</div>
				<div className={styles.progressStep}>
					<div className={`${styles.stepNumber} ${styles.active}`}>02</div>
					<div className={styles.stepTitle}>О квартире</div>
				</div>
				<div className={styles.progressStep}>
					<div className={styles.stepNumber}>03</div>
					<div className={styles.stepTitle}>О доме</div>
				</div>
				<div className={styles.progressStep}>
					<div className={styles.stepNumber}>04</div>
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

