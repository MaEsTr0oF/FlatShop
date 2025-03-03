import { useState, useEffect } from 'react'
import FirstStep from './FirstStep/FirstStep'
import SecondStep from './SecondStep/SecondStep'
import ThirdStep from './ThirdStep/ThirdStep'
import FourthStep from './FourthStep/FourthStep'
import styles from './AddForm.module.css'
import FifthStep from './FifthStep/FifthStep'
import { FormData, AddFormProps, SecondStepData, ThirdStepData, FourthStepData, PriceData } from '../types/form'

type StepData = SecondStepData | ThirdStepData | FourthStepData | PriceData;

export default function AddForm({ onClose, onSubmit }: AddFormProps) {
	const [currentStep, setCurrentStep] = useState(() => {
		const savedStep = localStorage.getItem('currentStep');
		return savedStep ? parseInt(savedStep) : 1;
	});

	const [formData, setFormData] = useState<FormData>(() => {
		const savedData = localStorage.getItem('formData');
		return savedData ? JSON.parse(savedData) : {
			title: '',
			propertyType: 'Квартира',
			listingType: 'Продажа',
			address: '',
			rentType: 'Долгосрочная аренда',
			secondStepData: null,
			thirdStepData: null,
			fourthStepData: null,
			fifthStepData: null
		};
	});

	useEffect(() => {
		localStorage.setItem('currentStep', currentStep.toString());
		localStorage.setItem('formData', JSON.stringify(formData));
	}, [currentStep, formData]);

	const handleNext = () => {
		setCurrentStep(prev => prev + 1);
	}

	const handleBack = () => {
		setCurrentStep(prev => prev - 1);
	}

	const handleSave = () => {
		localStorage.setItem('formData', JSON.stringify(formData));
		localStorage.setItem('currentStep', currentStep.toString());
		onClose();
	}

	const handleSubmit = () => {
		console.log('Итоговые данные формы:', formData);
		onSubmit(formData);
		// Очищаем localStorage после успешной отправки формы
		localStorage.removeItem('formData');
		localStorage.removeItem('currentStep');
		onClose();
	}

	const updateFormData = (newData: Partial<FormData>) => {
		setFormData(prev => ({
			...prev,
			...newData
		}));
	}

	const updateStepData = (step: number, data: StepData) => {
		const stepDataMap: Record<number, keyof FormData> = {
			2: 'secondStepData',
			3: 'thirdStepData',
			4: 'fourthStepData',
			5: 'fifthStepData'
		}
		
		const key = stepDataMap[step];
		if (key) {
			setFormData(prev => ({
				...prev,
				[key]: data
			}));
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
				/>
			)}
			{currentStep === 5 && (
				<FifthStep
					onNext={handleSubmit}
					onBack={handleBack}
				
					onSave={handleSave}
				/>
			)}
		</div>
	)
} 