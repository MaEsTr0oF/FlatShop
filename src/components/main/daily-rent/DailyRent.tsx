import { useState, useMemo, useEffect } from 'react'
import styles from './DailyRent.module.css'
import { Link } from 'react-router-dom';
import AddButton from '../../AddButton/AddButton';
interface Property {
	id: string;
	type: string;
	city: string;
	address: string;
	description: string;
	date: string;
	area: number;
	floor: string;
	price: number;
	status: 'Свободна' | 'Подтверждена' | 'Закрыта' | 'Заявка на бронь';
	image: string;
}

interface Filters {
	type: string;
	city: string;
	date: string;
	price: string;
	status: string;
}

export default function DailyRent() {
	const [currentPage, setCurrentPage] = useState(1)
	const [activeTab, setActiveTab] = useState('Посуточная аренда')
	const [filters, setFilters] = useState<Filters>({
		type: '',
		city: '',
		date: '',
		price: '',
		status: ''
	})
	const itemsPerPage = 10

	const properties: Property[] = [
		{
			id: '1',
			type: 'Коммерческое помещение',
			city: 'Комсольск-на-Амуре',
			address: 'ул. Областная, 5',
			area: 1000,
			description: 'офис',
			floor: ' 3/12',
			date: '25.01.2025 - 30.01.2025',
			price: 3500,
			status: 'Подтверждена',
			image: '/img/sales/image1.svg'
		},
		{
			id: '2',
			type: 'Комната',
			city: 'Санкт-Петербург',
			address: 'ул. Областная, 5',
			area: 10,
			description: 'комната',
			floor: '3/12',
			date: '25.01.2025 - 30.01.2025',
			price: 2000,
			status: 'Свободна',
			image: '/img/sales/image2.svg'
		},
		{
			id: '3',
			type: 'Дом',
			city: 'Сочи',
			address: 'ул. Морская, 25',
			area: 150,
			description: 'дом',
			floor: '',
			date: '25.01.2025 - 30.01.2025',
			price: 15000,
			status: 'Закрыта',
			image: '/img/sales/image3.svg'
		},
		{
			id: '4',
			type: 'Квартира',
			city: 'Санкт-Петербург',
			address: 'пр. Просвещения, 72',
			area: 60,
			description: '1-к. квартира',
			floor: '8/12',
			date: '25.01.2025 - 30.01.2025',
			price: 100500,
			status: 'Заявка на бронь',
			image: '/img/sales/image4.svg'
		},
		{
			id: '5',
			type: 'Коммерческое помещение',
			city: 'Комсольск-на-Амуре',
			address: 'ул. Областная, 5',
			area: 1000,
			description: 'офис',
			floor: ' 3/12',
			date: '25.01.2025 - 30.01.2025',
			price: 3500,
			status: 'Подтверждена',
			image: '/img/sales/image1.svg'
		},
		{
			id: '6',
			type: 'Комната',
			city: 'Санкт-Петербург',
			address: 'ул. Областная, 5',
			area: 10,
			description: 'комната',
			floor: '3/12',
			date: '25.01.2025 - 30.01.2025',
			price: 2000,
			status: 'Свободна',
			image: '/img/sales/image2.svg'
		},
		{
			id: '7',
			type: 'Дом',
			city: 'Сочи',
			address: 'ул. Морская, 25',
			area: 150,
			description: 'дом',
			floor: '',
			date: '25.01.2025 - 30.01.2025',
			price: 15000,
			status: 'Закрыта',
			image: '/img/sales/image3.svg'
		},
		{
			id: '8',
			type: 'Квартира',
			city: 'Санкт-Петербург',
			address: 'пр. Просвещения, 72',
			area: 60,
			description: '1-к. квартира',
			floor: '8/12',
			date: '25.01.2025 - 30.01.2025',
			price: 100500,
			status: 'Заявка на бронь',
			image: '/img/sales/image4.svg'
		},
		{
			id: '9',
			type: 'Коммерческое помещение',
			city: 'Комсольск-на-Амуре',
			address: 'ул. Областная, 5',
			area: 1000,
			description: 'офис',
			floor: ' 3/12',
			date: '25.01.2025 - 30.01.2025',
			price: 3500,
			status: 'Подтверждена',
			image: '/img/sales/image1.svg'
		},
		{
			id: '10',
			type: 'Комната',
			city: 'Санкт-Петербург',
			address: 'ул. Областная, 5',
			area: 10,
			description: 'комната',
			floor: '3/12',
			date: '25.01.2025 - 30.01.2025',
			price: 2000,
			status: 'Свободна',
			image: '/img/sales/image2.svg'
		},
		{
			id: '11',
			type: 'Дом',
			city: 'Сочи',
			address: 'ул. Морская, 25',
			area: 150,
			description: 'дом',
			floor: '',
			date: '25.01.2025 - 30.01.2025',
			price: 15000,
			status: 'Закрыта',
			image: '/img/sales/image3.svg'
		},
		{
			id: '12',
			type: 'Квартира',
			city: 'Санкт-Петербург',
			address: 'пр. Просвещения, 72',
			area: 60,
			description: '1-к. квартира',
			floor: '8/12',
			date: '25.01.2025 - 30.01.2025',
			price: 100500,
			status: 'Заявка на бронь',
			image: '/img/sales/image4.svg'
		},
	]

	const filterOptions = useMemo(() => ({
		type: [...new Set(properties.map(p => p.type))],
		city: [...new Set(properties.map(p => p.city))],
		status: [...new Set(properties.map(p => p.status))],
		date: [...new Set(properties.map(p => p.date))],
		price: ['0-2000', '2000-5000', '5000-15000', '15000-30000', '30000-100000', '100000+']
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
			if (filters.date && property.date !== filters.date) return false
			if (filters.price) {
				const [min, max] = filters.price.split('-').map(Number)
				if (filters.price === '100000+') {
					if (property.price < 100000) return false
				} else {
					if (property.price < min || property.price > max) return false
				}
			}
			return true
		})
	}, [properties, filters])

	const getStatusClass = (status: Property['status']) => {
		switch (status) {
			case 'Свободна':
				return styles.available
			case 'Подтверждена':
				return styles.occupied
			case 'Закрыта':
				return styles.reserved
			case 'Заявка на бронь':
				return styles.pending
			default:
				return ''
		}
	}

	const indexOfLastItem = currentPage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage
	const currentItems = filteredProperties.slice(indexOfFirstItem, indexOfLastItem)
	const totalPages = Math.ceil(filteredProperties.length / itemsPerPage)

	// Убедимся, что текущая страница не выходит за пределы
	useEffect(() => {
		if (currentPage > totalPages && totalPages > 0) {
			setCurrentPage(totalPages)
		}
	}, [currentPage, totalPages])

	const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

	const handleResetFilters = () => {
		setFilters({
			type: '',
			city: '',
			date: '',
			price: '',
			status: ''
		})
		setCurrentPage(1)
	}

	const isFiltersEmpty = Object.values(filters).every(value => value === '')

	return (
		<div className={styles.dailyRentContainer}>
			<div className={styles.header}>
				<h1 className={styles.title}>МОИ ОБЪЯВЛЕНИЯ</h1>
				<AddButton />
			</div>

			<div className={styles.tabs}>
				<Link to="/main/sales"><button 
					className={`${styles.tab} ${activeTab === 'Продажа' ? styles.active : ''}`}
					onClick={() => setActiveTab('Продажа')}
				>
					Продажа
				</button>
				</Link>
				<button 
					className={`${styles.tab} ${activeTab === 'Посуточная аренда' ? styles.active : ''}`}
					onClick={() => setActiveTab('Посуточная аренда')}
				>
					Посуточная аренда
				</button>
				<Link to="/main/long-term"><button 
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
						value={filters.date}
						onChange={(e) => handleFilterChange('date', e.target.value)}
					>
						<option value="">Период</option>
						{filterOptions.date.map(date => (
							<option key={date} value={date}>{date}</option>
						))}
					</select>
					<select 
						className={styles.filter}
						value={filters.price}
						onChange={(e) => handleFilterChange('price', e.target.value)}
					>
						<option value="">Стоимость за сутки, руб</option>
						{filterOptions.price.map(range => (
							<option key={range} value={range}>
								{range === '100000+' 
									? '100 000+'
									: range.split('-').map(num => Number(num).toLocaleString()).join('-')
								}
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

			<table className={styles.dailyRentTable}>
				<thead>
					<tr>
						<th>Тип объявления</th>
						<th>Город</th>
						<th>Описание</th>
						<th>Период</th>
						<th>Стоимость в сутки, руб</th>
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
							<td>{`${property.description}, ${property.area} м², ${property.floor}`}</td>
							<td>{property.date}</td>
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
				{totalPages <= 7 ? (
					// Если страниц меньше или равно 7, показываем все
					pages.map(page => (
						<button
							key={page}
							className={`${styles.paginationButton} ${currentPage === page ? styles.active : ''}`}
							onClick={() => setCurrentPage(page)}
						>
							{page}
						</button>
					))
				) : (
					// Если страниц больше 7, показываем с многоточием
					<>
						{currentPage > 3 && (
							<>
								<button
									className={styles.paginationButton}
									onClick={() => setCurrentPage(1)}
								>
									1
								</button>
								<span className={styles.paginationEllipsis}>...</span>
							</>
						)}
						
						{pages
							.filter(page => 
								page === 1 || 
								page === totalPages || 
								(page >= currentPage - 1 && page <= currentPage + 1)
							)
							.map(page => (
								<button
									key={page}
									className={`${styles.paginationButton} ${currentPage === page ? styles.active : ''}`}
									onClick={() => setCurrentPage(page)}
								>
									{page}
								</button>
							))
						}
						
						{currentPage < totalPages - 2 && (
							<>
								<span className={styles.paginationEllipsis}>...</span>
								<button
									className={styles.paginationButton}
									onClick={() => setCurrentPage(totalPages)}
								>
									{totalPages}
								</button>
							</>
						)}
					</>
				)}
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