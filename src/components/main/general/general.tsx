import styles from './general.module.css'
import Card from '../card/Card'
import { useState, ChangeEvent, useRef, useEffect } from 'react'
import Analytics from '../analytics/Analytics'
import Comments from '../comments/Comments'
import News from '../news/News'

export default function General() {
	const [amount, setAmount] = useState<string>('0')
	const [cursorPosition, setCursorPosition] = useState<number>(0)
	const inputRef = useRef<HTMLInputElement>(null)

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const input = e.target
		const selectionStart = input.selectionStart || 0
		
		// Убираем все нечисловые символы
		let value = input.value.replace(/[^0-9]/g, '')
		
		// Убираем ведущие нули
		value = value.replace(/^0+/, '') || '0'
		
		setAmount(value)
		
		// Сохраняем позицию курсора
		const newPosition = selectionStart - (input.value.length - value.length)
		setCursorPosition(newPosition)
	}

	// Форматируем число для отображения с пробелами между тысячами
	const formatAmount = (value: string): string => {
		return value.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
	}

	// Восстанавливаем позицию курсора после форматирования
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.selectionStart = cursorPosition
			inputRef.current.selectionEnd = cursorPosition
		}
	}, [amount, cursorPosition])

	const analyticsData = [
		{ id: 1, text: 'Текст 1', percentage: 38, color: '#E31235' },
		{ id: 2, text: 'Текст 2', percentage: 19, color: '#FF4B6A' },
		{ id: 3, text: 'Текст 3', percentage: 24, color: '#FF8095' },
		{ id: 4, text: 'Текст 4', percentage: 19, color: '#333333' },
	]

	return (
		<main className={styles.general}>
			<div className={styles.general_banner}>
				<div className={styles.general_content}>
					<h2>Стань частью команды</h2>
					<span>Начни обучение и присоединись к нам</span>
					<button type="button">Присоединиться</button>
				</div>
				<img src="/img/general/workers.png" alt="workers" />
			</div>

			

			<div className={styles.accounts}>
				
				<div className={styles.withdrawSection}>
				  <h2>СЧЕТА</h2>
					<div className={styles.withdrawHeader}>
						<h3>Вывод наличных</h3>
						<a href="#">История операций</a>
					</div>
					 <div className={styles.input}>
						<input 
							ref={inputRef}
							type="text" 
							placeholder='0' 
							onChange={handleInputChange}
							value={formatAmount(amount)}
						/>
						<button className={styles.confirmButton}>Подтвердить</button>
					 </div>
					<div className={styles.withdrawOptions}>
						<button onClick={() => setAmount('300')}>300 ₽</button>
						<button onClick={() => setAmount('600')}>600 ₽</button>
						<button onClick={() => setAmount('900')}>900 ₽</button>
					</div>
					
					<p className={styles.secureInfo}>
						Интернет-платежи защищены сертификатом SSL 
						и протоколом 3D Secure. Пополняя кошелек, 
						вы соглашаетесь с <a href="#">офертой</a>. 
						<a href="#">Политика конфиденциальности</a>
					</p>
				</div>
				  <div className={styles.cardsSection}>
					<Card 
						type="partners"
						balance="12 000"
						accountNumber="PRF 398 390 403"
						owner="Konstantin Konstantinopol'skij"
					/>
					<Card 
						type="sales"
						balance="20 560"
						accountNumber="PFX 398 390 403"
						owner="Konstantin Konstantinopol'skij"
					/>
				</div>
			</div>
			<div className={styles.analytics}>
				<Analytics items={analyticsData} totalPercentage={15} />
				<Comments />
			</div>
			<News />
		</main>
	)
}
