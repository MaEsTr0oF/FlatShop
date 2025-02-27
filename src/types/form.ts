export interface FormData {
  // Общие поля
  title: string;
  propertyType: string;
  listingType: string;
  address: string;
  rentType: string;

  // Данные второго шага
  secondStepData: {
    type: 'квартира' | 'апартаменты' | 'дом' | 'Офис' | 'Коворкинг';
    roomCount: number;
    totalArea: number;
    floor?: number;
    [key: string]: any; // Для дополнительных полей
  } | null;

  // Данные третьего шага
  thirdStepData: {
    photos: File[];
    videoUrl: string;
    description: string;
  } | null;

  // Данные четвертого шага
  fourthStepData: {
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
    [key: string]: any; // Для дополнительных полей
  } | null;

  // Данные пятого шага
  fifthStepData: {
    price?: number;
    deposit?: number;
    commission?: number;
    [key: string]: any; // Для дополнительных полей
  } | null;
}

export interface Advertisement extends FormData {
  id: number;
  createdAt: string;
} 