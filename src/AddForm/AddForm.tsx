import { useState, useEffect, useCallback } from 'react'
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
		const savedState = localStorage.getItem('addFormState');
		if (savedState) {
			const { currentStep } = JSON.parse(savedState);
			return currentStep;
		}
		return 1;
	});

	const [formData, setFormData] = useState<FormData>(() => {
		const savedState = localStorage.getItem('addFormState');
		if (savedState) {
			const { formData } = JSON.parse(savedState);
			return formData;
		}
		return {
			title: '',
			propertyType: '',
			listingType: '',
			address: '',
			secondStepData: null,
			thirdStepData: null,
			fourthStepData: null,
			fifthStepData: null
		};
	});

	useEffect(() => {
		const dataToSave = {
			currentStep,
			formData
		};
		localStorage.setItem('addFormState', JSON.stringify(dataToSave));
	}, [currentStep, formData]);

	const handleNext = () => {
		setCurrentStep((prev: number) => Math.min(prev + 1, 5));
	};

	const handleBack = () => {
		setCurrentStep((prev: number) => Math.max(prev - 1, 1));
	};

	const handleSubmit = () => {
		onSubmit(formData);
		localStorage.removeItem('addFormState');
	};

	const handleSave = () => {
		const dataToSave = {
			currentStep,
			formData
		};
		localStorage.setItem('addFormState', JSON.stringify(dataToSave));
		onClose();
	};

	const updateFormData = (data: Partial<FormData>) => {
		setFormData(prev => ({
			...prev,
			...data
		}));
	};
	const updateStepData = useCallback((step: number, data: StepData) => {
		setFormData(prev => {
			const newData = { ...prev };
			switch (step) {
				case 2:
					newData.secondStepData = data as SecondStepData;
					break;
				case 3:
					newData.thirdStepData = data as ThirdStepData;
					break;
				case 4:
					newData.fourthStepData = data as FourthStepData;
					break;
				case 5:
					newData.fifthStepData = data as PriceData;
					break;
			}
			return newData;
		});
	}, []);
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
					onDataUpdate={(data) => updateStepData(2, data)}
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
				/>
			)}
			{currentStep === 5 && (
				<FifthStep
					onNext={handleSubmit}
					onBack={handleBack}
					propertyType={formData.propertyType}
					listingType={formData.listingType}
					onSave={handleSave}
					onDataUpdate={(data: PriceData) => updateStepData(5, data)}
					initialData={formData.fifthStepData}
				/>
			)}
		</div>
	);
} 