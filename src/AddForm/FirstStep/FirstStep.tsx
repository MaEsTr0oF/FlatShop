import styles from '../AddForm.module.css'
import { FormData } from '../../types/form'
import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    ymaps: {
      ready: (callback: () => void) => void;
      Map: new (element: HTMLElement, options: {
        center: [number, number];
        zoom: number;
        controls?: string[];
      }) => any;
    };
  }
}

interface FirstStepProps {
	onNext: () => void;
	onSave: () => void;
	formData: FormData;
	updateFormData: (data: Partial<FormData>) => void;
}

export default function FirstStep({ onNext, onSave, formData, updateFormData }: FirstStepProps) {
	const mapRef = useRef<HTMLDivElement>(null);
	const [mapError, setMapError] = useState<string | null>(null);
	const [isMapLoading, setIsMapLoading] = useState(true);
	
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		updateFormData({ [name]: value });
	};

	useEffect(() => {
		let mapInstance: any = null;

		const loadYMaps = () => {
			return new Promise((resolve, reject) => {
				// Проверяем, загружен ли уже скрипт
				const existingScript = document.querySelector('script[src*="api-maps.yandex.ru"]');
				
				if (!existingScript) {
					const script = document.createElement('script');
					script.src = 'https://api-maps.yandex.ru/2.1/?apikey=3737c631-6faf-49c6-92b3-0a2f5d026ecf&lang=ru_RU';
					script.async = true;
					script.onload = () => resolve(true);
					script.onerror = () => reject(new Error('Ошибка загрузки API Яндекс.Карт'));
					document.head.appendChild(script);
				} else {
					resolve(true);
				}
			});
		};

		const initMap = async () => {
			try {
				await loadYMaps();

				if (!mapRef.current) return;

				// Ждем, пока API будет готов
				await new Promise(resolve => window.ymaps.ready(resolve));

				mapInstance = new window.ymaps.Map(mapRef.current, {
					center: [55.76, 37.64],
					zoom: 7,
					controls: ['zoomControl', 'searchControl']
				});

				setIsMapLoading(false);
				setMapError(null);

				// Добавляем обработчик клика по карте
				mapInstance.events.add('click', (e: any) => {
					const coords = e.get('coords');
					console.log('Clicked coordinates:', coords);
				});

			} catch (error) {
				console.error('Error initializing map:', error);
				setMapError('Ошибка при инициализации карты');
				setIsMapLoading(false);
			}
		};

		initMap();

		return () => {
			if (mapInstance) {
				mapInstance.destroy();
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
				<div className={styles.mapContainer}>
					<div ref={mapRef} className={styles.map}></div>
					{isMapLoading && <div className={styles.mapError}>Загрузка карты...</div>}
					{!isMapLoading && mapError && <div className={styles.mapError}>{mapError}</div>}
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