import styles from '../AddForm.module.css'

interface ProgressBarProps {
	currentStep: number;
	steps: Array<{
		number: string;
		title: string;
	}>;
}

export default function ProgressBar({ currentStep, steps }: ProgressBarProps) {
	return (
		<div className={styles.progressBar}>
			<div 
				className={styles.progressLine} 
				style={{ '--progress-width': `${(currentStep / steps.length) * 100}%` } as React.CSSProperties} 
			/>
			{steps.map((step, index) => (
				<div key={step.number} className={styles.progressStep}>
					<div 
						className={`${styles.stepNumber} ${
							index + 1 === currentStep 
								? styles.active 
								: index + 1 < currentStep 
									? styles.completed 
									: ''
						}`}
					>
						{step.number}
					</div>
					<div className={styles.stepTitle}>{step.title}</div>
				</div>
			))}
		</div>
	)
} 