import styles from './Teammate.module.css'

interface TeammateProps {
	image?: string;
	name: string;
	level: number;
	location: string;
	id: string;
	partnersCount: string;
	phone: string;
}

const defaultTeammates: TeammateProps[] = [
	{
		image: '/img/partners/melania.png',
		name: 'Мелания Трамп',
		level: 7,
		location: 'г. Вашингтон',
		id: '000 000 001',
		partnersCount: '17 человек',
		phone: '+7 (900) 839 23 32'
	}
];

export default function Teammate() {
	const teammates = defaultTeammates;

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>ВАШ НАСТАВНИК</h2>
			
			<div className={styles.teammateList}>
				{teammates.map((teammate) => (
					<div key={teammate.id} className={styles.teammateCard}>
						<div className={styles.cardContent}>
							<div className={styles.mainInfo}>
								<div className={styles.avatar}>
									<img src={teammate.image} alt={teammate.name} />
								</div>
								<div className={styles.info}>
									<span className={styles.name}>{teammate.name}</span>
									<div className={styles.level}>
										<div className={styles.levelBadge}>{teammate.level}</div>
										<span>Уровень</span>
										<span className={styles.dot}>•</span>
										<span>{teammate.location}</span>
									</div>
									<div className={styles.userId}>
										ID пользователя <span>• {teammate.id}</span>
									</div>
								</div>
							</div>

							<div className={styles.details}>
								<div className={styles.detailItem}>
									<span className={styles.label}>Сеть партнеров</span>
									<span className={styles.value}>{teammate.partnersCount}</span>
								</div>
								<div className={styles.detailItem}>
									<span className={styles.label}>Номер телефона</span>
									<span className={styles.value}>{teammate.phone}</span>
								</div>
							</div>

							<div className={styles.actions}>
								<button type="button" className={styles.chatButton}>
									<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
										<path d="M10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C15.514 20 20 15.514 20 10C20 4.486 15.514 0 10 0ZM15 11H11V15H9V11H5V9H9V5H11V9H15V11Z" fill="currentColor"/>
									</svg>
									Чат
								</button>
								<button type="button" className={styles.socialButton}>
									<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
										<path d="M10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C15.514 20 20 15.514 20 10C20 4.486 15.514 0 10 0ZM14.926 6.886L13.281 14.536C13.161 15.036 12.861 15.161 12.436 14.936L9.936 13.036L8.736 14.186C8.601 14.321 8.486 14.436 8.226 14.436L8.411 11.886L13.011 7.736C13.216 7.556 12.966 7.456 12.696 7.636L7.071 11.036L4.596 10.236C4.111 10.086 4.096 9.746 4.696 9.521L14.226 5.821C14.636 5.671 14.996 5.921 14.926 6.886Z" fill="currentColor"/>
									</svg>
								</button>
								<button type="button" className={styles.socialButton}>
									<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
										<path d="M10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C15.514 20 20 15.514 20 10C20 4.486 15.514 0 10 0ZM15.1 11.3C15.1 11.3 16.1 12.3 16.3 12.7C16.3 12.7 16.4 12.8 16.3 13C16.2 13.3 15.7 13.4 15.6 13.4H13.8C13.7 13.4 13.4 13.4 13.1 13.2C12.8 13 12.5 12.6 12.2 12.3C11.7 11.8 11.3 11.7 11.1 11.7C10.8 11.7 10.8 11.7 10.8 12.1V13C10.8 13.2 10.7 13.4 10.1 13.4H9.1C8.5 13.4 6.8 13.2 5.3 11.6C3.5 9.7 1.9 6.3 1.9 6.2C1.9 6 2.1 5.9 2.3 5.9H4.1C4.3 5.9 4.4 6 4.5 6.2C4.6 6.4 4.9 7.1 5.3 7.8C6.1 9.2 6.6 9.6 7 9.6C7.3 9.6 7.3 9.3 7.3 8.9V7.3C7.3 6.5 7.1 6.3 7 6.2C6.9 6.1 6.9 6 7.1 5.9C7.3 5.8 7.6 5.8 8.2 5.8H8.7C9.2 5.8 9.3 5.9 9.4 6V8.6C9.4 8.8 9.5 8.9 9.6 8.9C9.8 8.9 10 8.8 10.4 8.4C11.2 7.5 11.7 6.3 11.7 6.3C11.8 6.2 11.9 6 12.1 6H13.9C14.5 6 14.6 6.2 14.5 6.4C14.4 7 13.3 8.5 13.3 8.5C13.2 8.7 13.1 8.8 13.3 9C13.4 9.2 13.9 9.6 14.2 10C14.8 10.7 15.1 11.1 15.1 11.3Z" fill="currentColor"/>
									</svg>
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
