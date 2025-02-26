import styles from './Operations.module.css'
import { useState } from 'react'

interface Operation {
  id: string;
  date: string;
  time: string;
  type: string;
  description: string;
  amount: number;
}

type SortField = 'date' | 'type' | null;
type SortDirection = 'asc' | 'desc';

export default function Operations() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState<SortField>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const itemsPerPage = 10

  const operations: Operation[] = [
    { id: '345323', date: '25.01.2025', time: '09:00:00', type: 'Тип операции 9', description: 'Продажа квартиры', amount: 1000 },
    { id: '345323', date: '25.01.2025', time: '09:00:00', type: 'Тип операции 2', description: 'Сдача квартиры в посуточную аренду', amount: 50000 },
    { id: '345323', date: '25.01.2025', time: '09:00:00', type: 'Тип операции 3', description: 'Сдача квартиры в посуточную аренду', amount: 700 },
    { id: '345323', date: '25.01.2025', time: '09:00:00', type: 'Тип операции 4', description: 'Сдача квартиры в долгосрочную аренду', amount: 100000 },
    { id: '345323', date: '25.01.2025', time: '09:00:00', type: 'Тип операции 5', description: 'Продажа дома', amount: 1000 },
    { id: '345323', date: '25.01.2025', time: '09:00:00', type: 'Тип операции 6', description: 'Сдача дома в посуточную аренду', amount: 50000 },
    { id: '345323', date: '25.01.2025', time: '09:00:00', type: 'Тип операции 1', description: 'Сдача комнаты в долгосрочную аренду', amount: 700 },
    { id: '345323', date: '25.01.2025', time: '09:00:00', type: 'Тип операции 1', description: 'Сдача дома в долгосрочную аренду', amount: 100000 },
    { id: '345323', date: '25.01.2025', time: '09:00:00', type: 'Тип операции 1', description: 'Продажа комнаты', amount: 1000 },
    { id: '345323', date: '25.01.2025', time: '09:00:00', type: 'Тип операции 9', description: 'Продажа квартиры', amount: 50000 },
    { id: '345323', date: '25.01.2025', time: '09:00:00', type: 'Тип операции 1', description: 'Продажа квартиры', amount: 1000 },
    { id: '345323', date: '25.01.2025', time: '09:00:00', type: 'Тип операции 2', description: 'Сдача квартиры в посуточную аренду', amount: 50000 },
    { id: '345323', date: '25.01.2025', time: '09:00:00', type: 'Тип операции 3', description: 'Сдача квартиры в посуточную аренду', amount: 700 },
    { id: '345323', date: '25.01.2025', time: '09:00:00', type: 'Тип операции 4', description: 'Сдача квартиры в долгосрочную аренду', amount: 100000 },
    { id: '345323', date: '25.01.2025', time: '09:00:00', type: 'Тип операции 5', description: 'Продажа дома', amount: 1000 },
    { id: '345323', date: '25.01.2025', time: '09:00:00', type: 'Тип операции 6', description: 'Сдача дома в посуточную аренду', amount: 50000 },
    { id: '345323', date: '25.01.2025', time: '09:00:00', type: 'Тип операции 1', description: 'Сдача комнаты в долгосрочную аренду', amount: 700 },
    { id: '345323', date: '25.01.2025', time: '09:00:00', type: 'Тип операции 1', description: 'Сдача дома в долгосрочную аренду', amount: 100000 },
    { id: '345323', date: '25.01.2025', time: '09:00:00', type: 'Тип операции 1', description: 'Продажа комнаты', amount: 1000 },
    { id: '345323', date: '25.01.2025', time: '09:00:00', type: 'Тип операции 1', description: 'Продажа квартиры', amount: 50000 },
    { id: '345323', date: '25.01.2025', time: '09:00:00', type: 'Тип операции 1', description: 'Продажа квартиры', amount: 1000 },
    { id: '345323', date: '25.01.2025', time: '09:00:00', type: 'Тип операции 2', description: 'Сдача квартиры в посуточную аренду', amount: 50000 },
    { id: '345323', date: '25.01.2025', time: '09:00:00', type: 'Тип операции 3', description: 'Сдача квартиры в посуточную аренду', amount: 700 },
    { id: '345323', date: '25.01.2025', time: '09:00:00', type: 'Тип операции 4', description: 'Сдача квартиры в долгосрочную аренду', amount: 100000 },
    { id: '345323', date: '25.01.2025', time: '09:00:00', type: 'Тип операции 5', description: 'Продажа дома', amount: 1000 },
    { id: '345323', date: '25.01.2025', time: '09:00:00', type: 'Тип операции 6', description: 'Сдача дома в посуточную аренду', amount: 50000 },
    { id: '345323', date: '25.01.2025', time: '09:00:00', type: 'Тип операции 1', description: 'Сдача комнаты в долгосрочную аренду', amount: 700 },
    { id: '345323', date: '25.01.2025', time: '09:00:00', type: 'Тип операции 1', description: 'Сдача дома в долгосрочную аренду', amount: 100000 },
    { id: '345323', date: '25.01.2025', time: '09:00:00', type: 'Тип операции 11', description: 'Продажа комнаты', amount: 1000 },
    { id: '345323', date: '25.01.2025', time: '09:00:00', type: 'Тип операции 10', description: 'Продажа квартиры', amount: 50000 },
  ]

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
    setCurrentPage(1)
  }

  const sortOperations = (ops: Operation[]) => {
    if (!sortField) return ops

    return [...ops].sort((a, b) => {
      let compareResult = 0
      if (sortField === 'date') {
        const dateA = new Date(`${a.date} ${a.time}`)
        const dateB = new Date(`${b.date} ${b.time}`)
        compareResult = dateA.getTime() - dateB.getTime()
      } else if (sortField === 'type') {
        compareResult = a.type.localeCompare(b.type)
      }
      return sortDirection === 'asc' ? compareResult : -compareResult
    })
  }

  const filteredOperations = operations.filter(op => 
    op.id.includes(searchQuery) || 
    op.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sortedOperations = sortOperations(filteredOperations)

  // Вычисляем индексы для текущей страницы
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = sortedOperations.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(sortedOperations.length / itemsPerPage)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  // Обработчик изменения страницы
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className={styles.operationsContainer}>
      <div className={styles.header}>
        <h2>ОПЕРАЦИИ ПО СЧЁТУ</h2>
        <div className={styles.search}>
          <input 
            type="text" 
            placeholder="Введите ID для поиска" 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
          />
          <img src="/img/partners/search.png" alt="search" />
        </div>
      </div>

      <table className={styles.operationsTable}>
        <thead>
          <tr>
            <th>№ операции</th>
            <th 
              className={`${styles.sort} ${sortField === 'date' ? styles[sortDirection] : ''}`}
              onClick={() => handleSort('date')}
              data-type="date"
            >
              Дата и время
            </th>
            <th 
              className={`${styles.sort} ${sortField === 'type' ? styles[sortDirection] : ''}`}
              onClick={() => handleSort('type')}
              data-type="type"
            >
              Тип операции
            </th>
            <th>Назначение платежа</th>
            <th>Сумма, руб.</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((operation, index) => (
            <tr key={index} className={index % 2 === 0 ? styles.evenRow : ''}>
              <td>{operation.id}</td>
              <td>{operation.date} {operation.time}</td>
              <td>{operation.type}</td>
              <td>{operation.description}</td>
              <td>{operation.amount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button 
          className={styles.paginationArrow}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {pages.map(page => (
          <button
            key={page}
            className={`${styles.paginationButton} ${currentPage === page ? styles.active : ''}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        <button 
          className={styles.paginationArrow}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  )
} 