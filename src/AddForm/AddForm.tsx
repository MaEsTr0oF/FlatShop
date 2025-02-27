import { useState } from 'react'
import FirstStep from './FirstStep/FirstStep'
import SecondStep from './SecondStep/SecondStep'
import ThirdStep from './ThirdStep/ThirdStep'
import FourthStep from './FourthStep/FourthStep'
import styles from './AddForm.module.css'
import FifthStep from './FifthStep/FifthStep'
interface FormData {
	title: string;
	propertyType: string;
	listingType: string;
	address: string;
	rentType: string;
}

export default function AddForm() {
	const [currentStep, setCurrentStep] = useState(1)
	const [formData, setFormData] = useState<FormData>({
		title: '',
		propertyType: 'Комната',
		listingType: 'Продажа',
		address: '',
		rentType: 'Долгосрочная аренда'
	})

	const handleNext = () => {
		setCurrentStep(prev => prev + 1)
	}

	const handleBack = () => {
		setCurrentStep(prev => prev - 1)
	}

	const handleSave = () => {
		// Здесь будет логика сохранения и выхода
		console.log('Сохранение и выход')
	}

	const updateFormData = (newData: Partial<FormData>) => {
		setFormData(prev => ({
			...prev,
			...newData
		}))
	}

	return (
		<div className={styles.container}>
			{currentStep === 1 && (
				<FirstStep
					onNext={handleNext}
					onSave={handleSave}
					formData={formData}
					updateFormData={updateFormData}
				/>
			)}
			{currentStep === 2 && (
				<SecondStep
					onNext={handleNext}
					onBack={handleBack}
					onSave={handleSave}
					propertyType={formData.propertyType}
					listingType={formData.listingType}
				/>
			)}
			{currentStep === 3 && (
				<ThirdStep
					onNext={handleNext}
					onBack={handleBack}
					onSave={handleSave}
				/>
			)}
			{currentStep === 4 && (
				<FourthStep
					onNext={handleNext}
					onBack={handleBack}
					onSave={handleSave}
					propertyType={formData.propertyType}
					listingType={formData.listingType}
					rentType={formData.rentType}
				/>
			)}
			{currentStep === 5 && (
				<FifthStep
					onNext={handleNext}
					onBack={handleBack}
					onSave={handleSave}
					propertyType={formData.propertyType}
					listingType={formData.listingType}
					rentType={formData.rentType}
				/>
			)}
		</div>
	)
} 