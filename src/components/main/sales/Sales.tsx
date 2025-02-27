import { useState, useMemo, useEffect } from 'react'
import styles from './Sales.module.css'
import { Link } from 'react-router-dom';
import AddButton from '../../AddButton/AddButton';
import { Advertisement } from '../../../types/form';

interface Property {
	id: string;
	type: string;
	city: string;
	address: string;
	area: number;
	floor: string;
	price: number;
	status: 'Активно' | 'Назначен осмотр' | 'Продано' | 'Этап сделки';
	image: string;
}

interface Filters {
	type: string;
	city: string;
	object: string;
	price: string;
	status: string;
}

export default function Sales() {
	const [currentPage, setCurrentPage] = useState(1)
	const [activeTab, setActiveTab] = useState('Продажа')
	const [filters, setFilters] = useState<Filters>({
		type: '',
		city: '',
		object: '',
		price: '',
		status: ''
	})
	const [properties, setProperties] = useState<Property[]>([])
	const itemsPerPage = 10

	// Загрузка объявлений из localStorage
	useEffect(() => {
		const loadAds = () => {
			const savedAds = JSON.parse(localStorage.getItem('salesAds') || '[]') as Advertisement[]
			const convertedProperties: Property[] = savedAds.map(ad => ({
				id: String(ad.id),
				type: ad.propertyType,
				city: ad.address.split(',')[0] || 'Не указан',
				address: ad.address,
				area: ad.secondStepData?.totalArea || 0,
				floor: ad.secondStepData?.floor?.toString() || '',
				price: ad.fifthStepData?.price || 0,
				status: 'Активно',
				image: ad.thirdStepData?.photos?.[0] ? URL.createObjectURL(ad.thirdStepData.photos[0]) : '/img/sales/image1.svg'
			}))
			setProperties(convertedProperties)
		}

		loadAds()
		// Добавляем слушатель события storage для обновления данных при изменении localStorage
		window.addEventListener('storage', loadAds)
		return () => window.removeEventListener('storage', loadAds)
	}, [])

	// Получаем уникальные значения для фильтров
	const filterOptions = useMemo(() => ({
		type: [...new Set(properties.map(p => p.type))],
		city: [...new Set(properties.map(p => p.city))],
		status: [...new Set(properties.map(p => p.status))],
		price: ['0-10000', '10000-50000', '50000-100000']
	}), [properties])

	const handleFilterChange = (filterName: keyof Filters, value: string) => {
		setFilters(prev => ({
			...prev,
			[filterName]: value
		}))
		setCurrentPage(1)
	}

	const filteredProperties = useMemo(() => {
		return properties.filter(property => {
			if (filters.type && property.type !== filters.type) return false
			if (filters.city && property.city !== filters.city) return false
			if (filters.status && property.status !== filters.status) return false
			if (filters.price) {
				const [min, max] = filters.price.split('-').map(Number)
				if (max) {
					if (property.price < min || property.price > max) return false
				} else {
					if (property.price < min) return false
				}
			}
			return true
		})
	}, [properties, filters])

	const getStatusClass = (status: Property['status']) => {
		switch (status) {
			case 'Активно':
				return styles.active
			case 'Назначен осмотр':
				return styles.pending
			case 'Продано':
				return styles.sold
			case 'Этап сделки':
				return styles.pending
			default:
				return ''
		}
	}

	// Пагинация
	const indexOfLastItem = currentPage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage
	const currentItems = filteredProperties.slice(indexOfFirstItem, indexOfLastItem)
	const totalPages = Math.ceil(filteredProperties.length / itemsPerPage)
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

	const handleResetFilters = () => {
		setFilters({
			type: '',
			city: '',
			object: '',
			price: '',
			status: ''
		})
		setCurrentPage(1)
	}

	const isFiltersEmpty = Object.values(filters).every(value => value === '')

	return (
		<div className={styles.salesContainer}>
			<div className={styles.header}>
				<h1 className={styles.title}>МОИ ОБЪЯВЛЕНИЯ</h1>
				<AddButton />
			</div>

			<div className={styles.tabs}>
				<Link to="/main/sales">
					<button 
						className={`${styles.tab} ${activeTab === 'Продажа' ? styles.active : ''}`}
						onClick={() => setActiveTab('Продажа')}
					>
						Продажа
					</button>
				</Link>
				<Link to="/main/daily-rent">
					<button 
						className={`${styles.tab} ${activeTab === 'Посуточная аренда' ? styles.active : ''}`}
						onClick={() => setActiveTab('Посуточная аренда')}
					>
						Посуточная аренда
					</button>
				</Link>
				<Link to="/main/long-term">
					<button 
						className={`${styles.tab} ${activeTab === 'Долгосрочная аренда' ? styles.active : ''}`}
						onClick={() => setActiveTab('Долгосрочная аренда')}
					>
						Долгосрочная аренда
					</button>
				</Link>
			</div>

			<div className={styles.filtersWrapper}>
				<div className={styles.filters}>
					<select 
						className={styles.filter}
						value={filters.type}
						onChange={(e) => handleFilterChange('type', e.target.value)}
					>
						<option value="">Тип объявления</option>
						{filterOptions.type.map(type => (
							<option key={type} value={type}>{type}</option>
						))}
					</select>
					<select 
						className={styles.filter}
						value={filters.city}
						onChange={(e) => handleFilterChange('city', e.target.value)}
					>
						<option value="">Город</option>
						{filterOptions.city.map(city => (
							<option key={city} value={city}>{city}</option>
						))}
					</select>
					<select 
						className={styles.filter}
						value={filters.object}
						onChange={(e) => handleFilterChange('object', e.target.value)}
					>
						<option value="">Объект</option>
						{filterOptions.type.map(type => (
							<option key={type} value={type}>{type}</option>
						))}
					</select>
					<select 
						className={styles.filter}
						value={filters.price}
						onChange={(e) => handleFilterChange('price', e.target.value)}
					>
						<option value="">Стоимость, руб</option>
						{filterOptions.price.map(range => (
							<option key={range} value={range}>
								{range.split('-').map(num => Number(num).toLocaleString()).join('-')}
							</option>
						))}
					</select>
					<select 
						className={styles.filter}
						value={filters.status}
						onChange={(e) => handleFilterChange('status', e.target.value)}
					>
						<option value="">Статус</option>
						{filterOptions.status.map(status => (
							<option key={status} value={status}>{status}</option>
						))}
					</select>
				</div>
				<button
					className={styles.resetButton}
					onClick={handleResetFilters}
					disabled={isFiltersEmpty}
				>
					Сбросить фильтры
				</button>
			</div>

			<table className={styles.salesTable}>
				<thead>
					<tr>
						<th>Тип объявления</th>
						<th>Город</th>
						<th>Площадь, этаж</th>
						<th>Стоимость, руб</th>
						<th>Статус</th>
					</tr>
				</thead>
				<tbody>
					{currentItems.map((property) => (
						<tr key={property.id}>
							<td>
								<div className={styles.propertyInfo}>
									<img 
										src={property.image} 
										alt={property.type} 
										className={styles.propertyImage}
									/>
									<div className={styles.propertyDetails}>
										<div>{property.type}</div>
										<div className={styles.propertyAddress}>{property.address}</div>
									</div>
								</div>
							</td>
							<td>{property.city}</td>
							<td>{`${property.area} м², ${property.floor}`}</td>
							<td>{property.price.toLocaleString()}</td>
							<td>
								<div className={`${styles.status} ${getStatusClass(property.status)}`}>
									{property.status}
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className={styles.pagination}>
				<button 
					className={styles.paginationArrow}
					onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
					disabled={currentPage === 1}
				>
					&lt;
				</button>
				{pages.map(page => (
					<button
						key={page}
						className={`${styles.paginationButton} ${currentPage === page ? styles.active : ''}`}
						onClick={() => setCurrentPage(page)}
					>
						{page}
					</button>
				))}
				<button 
					className={styles.paginationArrow}
					onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
					disabled={currentPage === totalPages}
				>
					&gt;
				</button>
			</div>
		</div>
	)
}
