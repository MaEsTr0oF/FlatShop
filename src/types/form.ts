export interface SecondStepData {
	type: 'квартира' | 'апартаменты' | 'дом' | 'Офис' | 'Коворкинг';
	roomCount: number;
	totalArea: number;
	floor?: number;
	buildingType?: string;
	ceilingHeight?: number;
	renovation?: string;
	bathroom?: string;
	balcony?: boolean;
	windows: {
		courtyard: boolean;
		street: boolean;
		sunny: boolean;
	};
}

export interface ThirdStepData {
	photos: File[];
	videoUrl: string;
	description: string;
}

export interface FourthStepData {
	readiness?: string;
	buildingType?: string;
	passengerElevator?: string;
	freightElevator?: string;
	parking?: {
		underground: boolean;
		ground: boolean;
		multilevel: boolean;
		barrier: boolean;
	};
	security?: boolean;
	ventilation?: boolean;
	conditioning?: boolean;
	heating?: string;
	salePhotos?: File[];
	rentPhotos?: File[];
	videoUrl?: string;
	description?: string;
}

export interface PriceData {
	price: number;
	priceType?: string;
	mortgage?: boolean;
	commission?: number;
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
	address: string;
	rentType: string;

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