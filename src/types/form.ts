export interface SecondStepData {
	type: 'квартира' | 'апартаменты' | 'дом' | 'Офис' | 'Коворкинг' | 'Комната';
	buildingType?: 'Блочный' | 'Кирпичный' | 'Монолитный' | 'Панельный';
	roomCount: number;
	beds?: BedInfo[];
	bedType?: string;
	bedCount?: number;
	roomType?: {
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
	kitchenArea?: number;
	livingArea?: number;
	ceilingHeight: number;
	powerCapacity?: number;
	bathroom: string;
	windows: {
		courtyard: boolean;
		street: boolean;
		sunny: boolean;
	};
	features?: {
		balcony: boolean;
		loggia: boolean;
		wardrobe: boolean;
		panoramicWindows: boolean;
		warmFloor: boolean;
		bathhouse: boolean;
		pool: boolean;
		terrace: boolean;
	};
	renovation: string;
	furniture?: {
		kitchen: boolean;
		clothes: boolean;
		sleeping: boolean;
	};
	appliances?: {
		refrigerator: boolean;
		dishwasher: boolean;
		washer: boolean;
		conditioner: boolean;
		waterHeater: boolean;
	};
	additionalFeatures?: {
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
	parking?: 'Гараж' | 'Подземный гараж' | 'На улице' | 'Без парковки';
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

export interface ThirdStepData {
	photos: File[];
	videoUrl: string;
	description: string;
}

export interface FourthStepData {
	readiness: string;
	buildingType: string;
	passengerElevator: string;
	freightElevator: string;
	yearOfConstruction?: number;
	floorCount?: number;
	houseFeatures?: {
		concierge: boolean;
		garbage: boolean;
		gas: boolean;
	};
	yardFeatures?: {
		playground: boolean;
		sportsGround: boolean;
		closedTerritory: boolean;
	};
	parking: {
		underground: boolean;
		ground: boolean;
		multilevel: boolean;
		barrier: boolean;
	};
	security: boolean;
	ventilation: boolean;
	conditioning: boolean;
	heating: string;
	salePhotos: string[];
	rentPhotos: string[];
	videoUrl: string;
	description: string;
	price?: string;
	utilities?: string;
	otherUtilities?: string;
	commission?: string;
	deposit?: string;
}

export interface PriceData {
	price: number;
	priceType?: string;
	mortgage?: boolean;
	commission?: number;
	shareSale?: boolean;
	auction?: boolean;
	hasCurrentTenant?: boolean;
	utilities: {
		included: boolean;
		electricity: boolean;
		gas: boolean;
		water: boolean;
		internet: boolean;
	};
	maintenance?: boolean;
	vat?: string;
	deposit?: number;
	rentType?: string;
	minRentPeriod?: string;
	onlineShow?: boolean;
	maxGuests?: number;
	rules: {
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

export interface FormData {
	// Общие поля
	title: string;
	propertyType: string;
	listingType: string;
	rentType?: string;
	address: string;

	// Данные второго шага
	secondStepData: SecondStepData | null;

	// Данные третьего шага
	thirdStepData: ThirdStepData | null;

	// Данные четвертого шага
	fourthStepData: FourthStepData | null;

	// Данные пятого шага
	fifthStepData: PriceData | null;
}

export interface Advertisement extends FormData {
	id: number;
	createdAt: string;
}

export interface AddFormProps {
	onClose: () => void;
	onSubmit: (data: FormData) => void;
} 