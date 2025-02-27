import { useState } from 'react'
import FirstStep from './FirstStep/FirstStep'
import SecondStep, { FormData as SecondStepData } from './SecondStep/SecondStep'
import ThirdStep, { ThirdStepData } from './ThirdStep/ThirdStep'
import FourthStep, { FourthStepData } from './FourthStep/FourthStep'
import styles from './AddForm.module.css'
import FifthStep, { PriceData } from './FifthStep/FifthStep'

interface FormData {
	title: string;
	propertyType: string;
	listingType: string;
	address: string;
	rentType: string;
	secondStepData: SecondStepData | null;
	thirdStepData: ThirdStepData | null;
	fourthStepData: FourthStepData | null;
	fifthStepData: PriceData | null;
}

interface AddFormProps {
	onClose: () => void;
	onSubmit: (data: FormData) => void;
}

type StepData = SecondStepData | ThirdStepData | FourthStepData | PriceData;

export default function AddForm({ onClose, onSubmit }: AddFormProps) {
	const [currentStep, setCurrentStep] = useState(1)
	const [formData, setFormData] = useState<FormData>({
		title: '',
		propertyType: 'Квартира',
		listingType: 'Продажа',
		address: '',
		rentType: 'Долгосрочная аренда',
		secondStepData: null,
		thirdStepData: null,
		fourthStepData: null,
		fifthStepData: null
	})

	const handleNext = () => {
		setCurrentStep(prev => prev + 1)
	}

	const handleBack = () => {
		setCurrentStep(prev => prev - 1)
	}

	const handleSave = () => {
		localStorage.setItem('formData', JSON.stringify(formData))
		onClose()
	}

	const handleSubmit = () => {
		console.log('Итоговые данные формы:', formData)
		onSubmit(formData)
		onClose()
	}

	const updateFormData = (newData: Partial<FormData>) => {
		setFormData(prev => ({
			...prev,
			...newData
		}))
	}

	const updateStepData = (step: number, data: StepData) => {
		const stepDataMap: Record<number, keyof FormData> = {
			2: 'secondStepData',
			3: 'thirdStepData',
			4: 'fourthStepData',
			5: 'fifthStepData'
		}
		
		const key = stepDataMap[step]
		if (key) {
			setFormData(prev => ({
				...prev,
				[key]: data
			}))
		}
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
					onDataUpdate={(data: SecondStepData) => updateStepData(2, data)}
					initialData={formData.secondStepData}
				/>
			)}
			{currentStep === 3 && (
				<ThirdStep
					onNext={handleNext}
					onBack={handleBack}
					onSave={handleSave}
					onDataUpdate={(data: ThirdStepData) => updateStepData(3, data)}
					initialData={formData.thirdStepData}
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
					onDataUpdate={(data: FourthStepData) => updateStepData(4, data)}
					initialData={formData.fourthStepData}
				/>
			)}
			{currentStep === 5 && (
				<FifthStep
					onNext={handleSubmit}
					onBack={handleBack}
					onSave={handleSave}
					propertyType={formData.propertyType}
					listingType={formData.listingType}
					rentType={formData.rentType}
					onDataUpdate={(data: PriceData) => updateStepData(5, data)}
					initialData={formData.fifthStepData}
				/>
			)}
		</div>
	)
} 