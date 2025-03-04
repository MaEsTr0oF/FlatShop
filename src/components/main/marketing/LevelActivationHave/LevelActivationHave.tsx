import styles from './LevelActivationHave.module.css'
import LinearBonusPartner from '../LinerBonusPartner/LinerBonusPartner'

interface LevelActivationHaveProps {
	level: number;
}

export default function LevelActivationHave({ level }: LevelActivationHaveProps) {
	const getItemClass = (itemLevel: number) => {
		let classes = styles.level__item;
		if (level >= itemLevel) {
			classes += ' ' + styles.active;
		}
		if (level+1 === itemLevel) {
			classes += ' ' + styles.progress;
		}
		return classes;
	};

	return (
		<div>
			<h2 className={styles.title}>АКТИВАЦИИ УРОВНЯ</h2>
			<div className={styles.level}>
				<div className={styles.level__container} style={{"--level": level} as React.CSSProperties}>
					<div className={getItemClass(1)}>
						<img src={level>0 ? "/img/marketing/level1.png" : "/img/marketing/level1Dis.png"} alt="" />
						<span>1 УРОВЕНЬ</span>
						<button className={level === 1 ? styles.activeButton : ''}>
							Перейти на следующий уровень
						</button>
					</div>
					<div className={getItemClass(2)}>
						<img src={level>1 ? "/img/marketing/level2.png" : "/img/marketing/level2Dis.png"} alt="" />
						<span>2 УРОВЕНЬ</span>
						<button className={level === 2 ? styles.activeButton : ''}>
							Перейти на следующий уровень
						</button>
					</div>
					<div className={getItemClass(3)}>
						<img src={level>2 ? "/img/marketing/level3.png" : "/img/marketing/level3Dis.png"} alt="" />
						<span>3 УРОВЕНЬ</span>
						<button className={level === 3 ? styles.activeButton : ''}>
							Перейти на следующий уровень
						</button>
					</div>
					<div className={getItemClass(4)}>
						<img src={level>3 ? "/img/marketing/level4.png" : "/img/marketing/level4Dis.png"} alt="" />
						<span>4 УРОВЕНЬ</span>
						<button className={level === 4 ? styles.activeButton : ''}>
							Перейти на следующий уровень
						</button>
					</div>
					<div className={getItemClass(5)}>
						<img src={level>4 ? "/img/marketing/level5.png" : "/img/marketing/level5Dis.png"} alt="" />
						<span>5 УРОВЕНЬ</span>
						<button className={level === 5 ? styles.activeButton : ''}>
							Перейти на следующий уровень
						</button>
					</div>
					<div className={getItemClass(6)}>
						<img src={level>5 ? "/img/marketing/level6.png" : "/img/marketing/level6Dis.png"} alt="" />
						<span>6 УРОВЕНЬ</span>
						<button className={level === 6 ? styles.activeButton : ''}>
							Перейти на следующий уровень
						</button>
					</div>
					<div className={getItemClass(7)}>
						<img src={level>6 ? "/img/marketing/level7.png" : "/img/marketing/level7Dis.png"} alt="" />
						<span>7 УРОВЕНЬ</span>
						<button className={level === 7 ? styles.activeButton : ''}>
							Перейти на следующий уровень
						</button>
					</div>
				</div>
			</div>
			<LinearBonusPartner />
		</div>
	)
}
