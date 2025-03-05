import styles from '../AddForm.module.css'
import { FormData } from '../../types/form'
import { useEffect, useRef, useState } from 'react';

interface FirstStepProps {
	onNext: () => void;
	onSave: () => void;
	formData: FormData;
	updateFormData: (data: Partial<FormData>) => void;
}

interface GeoObject {
	geometry: {
		getCoordinates(): number[];
	};
	getAddressLine(): string;
}

interface GeoObjectCollection {
	get(index: number): GeoObject;
	getLength(): number;
}

interface GeocodeResult {
	geoObjects: GeoObjectCollection;
}

interface PlacemarkProperties {
	balloonContent: string;
}

interface PlacemarkOptions {
	preset: string;
}

interface Placemark {
	geometry: {
		getCoordinates(): number[];
	};
	properties: PlacemarkProperties;
	options: PlacemarkOptions;
}

interface YMap {
	destroy(): void;
	setCenter(center: number[]): void;
	setZoom(zoom: number): void;
	geoObjects: {
		add(object: Placemark): void;
		remove(object: Placemark): void;
		removeAll(): void;
	};
}

interface YMaps {
	Map: new (element: HTMLElement, options: MapOptions) => YMap;
	ready: (callback: () => void) => void;
	geocode(request: string): Promise<GeocodeResult>;
	Placemark: new (
		geometry: number[],
		properties: { balloonContent: string },
		options: { preset: string }
	) => Placemark;
}

interface MapOptions {
	center: [number, number];
	zoom: number;
	controls?: string[];
}

declare global {
	interface Window {
		ymaps: YMaps;
	}
}

const YMAPS_API_KEY = '3737c631-6faf-49c6-92b3-0a2f5d026ecf';
let isScriptLoading = false;

export default function FirstStep({ onNext, onSave, formData, updateFormData }: FirstStepProps) {
	const mapRef = useRef<HTMLDivElement>(null);
	const [mapError, setMapError] = useState<string>('');
	const [isMapLoading, setIsMapLoading] = useState(true);
	const mapInstance = useRef<YMap | null>(null);
	const currentPlacemark = useRef<Placemark | null>(null);
	const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

	const handleError = (err: unknown) => {
		const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
		console.error('Map error:', err);
		setMapError(`Ошибка при инициализации карты: ${errorMessage}`);
		setIsMapLoading(false);
	};

	const searchAddress = async (address: string) => {
		if (!window.ymaps || !mapInstance.current) return;

		try {
			// Очищаем предыдущую метку
			if (currentPlacemark.current) {
				mapInstance.current.geoObjects.remove(currentPlacemark.current);
				currentPlacemark.current = null;
			}

			if (!address.trim()) return;

			const result = await window.ymaps.geocode(address);
			if (result.geoObjects.getLength() > 0) {
				const firstGeoObject = result.geoObjects.get(0);
				const coords = firstGeoObject.geometry.getCoordinates();
				
				// Создаем метку
				currentPlacemark.current = new window.ymaps.Placemark(coords, {
					balloonContent: firstGeoObject.getAddressLine()
				}, {
					preset: 'islands#redDotIcon'
				});

				// Добавляем метку на карту
				mapInstance.current.geoObjects.add(currentPlacemark.current);
				
				// Центрируем карту на найденной точке
				mapInstance.current.setCenter(coords);
				mapInstance.current.setZoom(16);
			}
		} catch (err) {
			console.error('Ошибка при поиске адреса:', err);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		updateFormData({ [name]: value });

		// Если изменилось поле адреса, запускаем поиск с задержкой
		if (name === 'address') {
			if (searchTimeout.current) {
				clearTimeout(searchTimeout.current);
			}
			searchTimeout.current = setTimeout(() => {
				searchAddress(value);
			}, 500); // Задержка 500мс для предотвращения частых запросов
		}
	};

	useEffect(() => {
		const initMap = async () => {
			try {
				if (!mapRef.current) {
					console.error('Map container not found');
					setMapError('Ошибка инициализации карты: контейнер не найден');
					setIsMapLoading(false);
					return;
				}

				// Если API уже загружен, просто инициализируем карту
				if (window.ymaps) {
					window.ymaps.ready(() => {
						try {
							if (mapRef.current && !mapInstance.current) {
								const mapContainer = mapRef.current;
								if (mapContainer.offsetWidth === 0 || mapContainer.offsetHeight === 0) {
									console.error('Map container has zero dimensions');
									setMapError('Ошибка инициализации карты: неверные размеры контейнера');
									setIsMapLoading(false);
									return;
								}

								mapInstance.current = new window.ymaps.Map(mapRef.current, {
									center: [55.76, 37.64],
									zoom: 10,
									controls: ['zoomControl', 'geolocationControl']
								});
								console.log('Map initialized successfully');
								setIsMapLoading(false);
							}
						} catch (err: unknown) {
							handleError(err);
						}
					});
					return;
				}

				// Если скрипт уже загружается, ждем
				if (isScriptLoading) {
					const checkYMaps = setInterval(() => {
						if (window.ymaps) {
							clearInterval(checkYMaps);
							window.ymaps.ready(() => {
								try {
									if (mapRef.current && !mapInstance.current) {
										mapInstance.current = new window.ymaps.Map(mapRef.current, {
											center: [55.76, 37.64],
											zoom: 10,
											controls: ['zoomControl', 'geolocationControl']
										});
										console.log('Map initialized successfully (after wait)');
										setIsMapLoading(false);
									}
								} catch (err: unknown) {
									handleError(err);
								}
							});
						}
					}, 100);
					return;
				}

				// Если скрипт еще не загружается, начинаем загрузку
				isScriptLoading = true;
				const script = document.createElement('script');
				script.src = `https://api-maps.yandex.ru/2.1/?apikey=${YMAPS_API_KEY}&lang=ru_RU`;
				script.async = true;
				
				script.onload = () => {
					window.ymaps.ready(() => {
						try {
							if (mapRef.current && !mapInstance.current) {
								mapInstance.current = new window.ymaps.Map(mapRef.current, {
									center: [55.76, 37.64],
									zoom: 10,
									controls: ['zoomControl', 'geolocationControl']
								});
								console.log('Map initialized successfully (after script load)');
								setIsMapLoading(false);
							}
						} catch (err: unknown) {
							handleError(err);
						}
					});
				};

				script.onerror = (err: Event | string) => {
					console.error('Error loading Yandex Maps script:', err);
					isScriptLoading = false;
					setMapError('Ошибка загрузки API Яндекс.Карт');
					setIsMapLoading(false);
				};

				document.head.appendChild(script);
			} catch (err: unknown) {
				handleError(err);
			}
		};

		initMap();

		return () => {
			if (mapInstance.current) {
				mapInstance.current.geoObjects.removeAll();
				mapInstance.current.destroy();
				mapInstance.current = null;
			}
			if (searchTimeout.current) {
				clearTimeout(searchTimeout.current);
			}
		};
	}, []);

	return (
		<div className={styles.stepContainer}>
			<div className={styles.header}>
				<h3 className={styles.step}>01/<span>05</span></h3>
				<h2 className={styles.title}>НОВОЕ ОБЪЯВЛЕНИЕ</h2>
			</div>

			<form className={styles.form}>
				<div className={styles.formGroup}>
					<label>Название объявления</label>
					<input
						type="text"
						name="title"
						value={formData.title}
						onChange={handleChange}
						placeholder="Введите название"
						className={styles.input}
					/>
				</div>

				<div className={styles.formGroup}>
					<label>Тип объекта недвижимости</label>
					<select
						name="propertyType"
						value={formData.propertyType}
						onChange={handleChange}
						className={styles.select}
					>
						<option value="Квартира">Квартира</option>
						<option value="Комната">Комната</option>
						<option value="Дом">Дом</option>
						<option value="Коммерческая недвижимость">Коммерческая недвижимость</option>
					</select>
				</div>

				<div className={styles.formGroup}>
					<label>Тип объявления</label>
					<select
						name="listingType"
						value={formData.listingType}
						onChange={handleChange}
						className={styles.select}
					>
						<option value="Продажа">Продажа</option>
						<option value="Аренда">Аренда</option>
					</select>
				</div>

				{formData.listingType === 'Аренда' && formData.propertyType !== 'Коммерческая недвижимость' && (
					<div className={styles.formGroup}>
						<label>Тип аренды</label>
						<select
							name="rentType"
							value={formData.rentType}
							onChange={handleChange}
							className={styles.select}
						>
							<option value="Долгосрочная аренда">Долгосрочная аренда</option>
							<option value="Посуточная аренда">Посуточная аренда</option>
						</select>
					</div>
				)}

				<div className={styles.formGroup}>
					<label>Расположение</label>
					<input
						type="text"
						name="address"
						value={formData.address}
						onChange={handleChange}
						placeholder="Введите адрес"
						className={styles.input}
					/>
				</div>

				<div className={styles.mapContainer} style={{ width: '100%', height: '400px', position: 'relative' }}>
					{isMapLoading && <div className={styles.mapLoading}>Загрузка карты...</div>}
					{mapError && <div className={styles.mapError}>{mapError}</div>}
					<div ref={mapRef} className={styles.map} style={{ width: '100%', height: '100%' }}></div>
				</div>

				<div className={styles.buttons}>
					<button
						type="button"
						onClick={onNext}
						className={styles.nextButton}
					>
						Продолжить
					</button>
					<button
						type="button"
						onClick={onSave}
						className={styles.saveButton}
					>
						Сохранить и выйти
					</button>
				</div>
			</form>

			<div className={styles.progressBar}>
				<div className={styles.progressLine} style={{ '--progress-width': '20%' } as React.CSSProperties} />
				<div className={styles.progressStep}>
					<div className={`${styles.stepNumber} ${styles.completed}`}>01</div>
					<div className={styles.stepTitle}>Новое объявление</div>
				</div>
				<div className={styles.progressStep}>
					<div className={`${styles.stepNumber} `}>02</div>
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