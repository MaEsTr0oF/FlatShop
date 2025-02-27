import styles from '../AddForm.module.css'
import { useState } from 'react'

export interface PriceData {
  rentType: string;
  minRentPeriod: string;
  price: string;
  utilities: boolean;
  maintenance: boolean;
  vat: string;
  onlineShow: boolean;
  deposit: string;
  maxGuests?: number;
  rules?: {
    children: boolean;
    pets: boolean;
    smoking: boolean;
    party: boolean;
    docs: boolean;
    month: boolean;
  };
  mortgage: boolean;
  showingTime: {
    everyday: boolean;
    startTime: string;
    endTime: string;
    online: boolean;
    customDays: {
      monday: boolean;
      tuesday: boolean;
      wednesday: boolean;
      thursday: boolean;
      friday: boolean;
      saturday: boolean;
      sunday: boolean;
    };
  };
}

interface FifthStepProps {
  onNext: () => void;
  onBack: () => void;
  onSave?: () => void;
  onDataUpdate?: (data: PriceData) => void;
  initialData?: PriceData | null;
}

export default function FifthStep({ onNext, onBack, onSave, onDataUpdate, initialData }: FifthStepProps) {
  const [formData, setFormData] = useState<PriceData>({
    rentType: initialData?.rentType || '',
    minRentPeriod: initialData?.minRentPeriod || '',
    price: initialData?.price || '',
    utilities: initialData?.utilities || false,
    maintenance: initialData?.maintenance || false,
    vat: initialData?.vat || 'Да',
    onlineShow: initialData?.onlineShow || false,
    deposit: initialData?.deposit || '',
    mortgage: initialData?.mortgage || false,
    showingTime: initialData?.showingTime || {
      everyday: false,
      startTime: '',
      endTime: '',
      online: false,
      customDays: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
    }
  });

  const handleSubmit = () => {
    if (onDataUpdate) {
      onDataUpdate(formData);
    }
    if (onSave) {
      onSave();
    }
    onNext();
  };

  return (
    <div className={styles.stepContainer}>
      <div className={styles.header}>
        <h3 className={styles.step}>05/<span>05</span></h3>
        <h2 className={styles.title}>УСЛОВИЯ АРЕНДЫ</h2>
      </div>

      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label>Тип аренды</label>
          <select
            name="rentType"
            value={formData.rentType}
            onChange={(e) => setFormData({...formData, rentType: e.target.value})}
            className={styles.select}
          >
            <option value="">Субъект</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Минимальный срок аренды</label>
          <input
            type="text"
            name="minRentPeriod"
            value={formData.minRentPeriod}
            onChange={(e) => setFormData({...formData, minRentPeriod: e.target.value})}
            className={styles.input}
            placeholder="Мес."
          />
        </div>

        <div className={styles.formGroup}>
          <label>Арендная плата</label>
          <select
            name="price"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            className={styles.select}
          >
            <option value="">₽ (429) + 17 ₽/м²</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={formData.utilities}
              onChange={(e) => setFormData({...formData, utilities: e.target.checked})}
            />
            <span className={styles.checkmark}></span>
            Коммунальные услуги включены
          </label>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={formData.maintenance}
              onChange={(e) => setFormData({...formData, maintenance: e.target.checked})}
            />
            <span className={styles.checkmark}></span>
            Эксплуатационные расходы услуги включены
          </label>
        </div>

        <div className={styles.formGroup}>
          <label>НДС включен</label>
          <select
            name="vat"
            value={formData.vat}
            onChange={(e) => setFormData({...formData, vat: e.target.value})}
            className={styles.select}
          >
            <option value="Да">Да</option>
            <option value="Нет">Нет</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={formData.onlineShow}
              onChange={(e) => setFormData({...formData, onlineShow: e.target.checked})}
            />
            <span className={styles.checkmark}></span>
            Онлайн-показ
          </label>
        </div>

        <div className={styles.formGroup}>
          <label>Залог</label>
          <input
            type="text"
            name="deposit"
            value={formData.deposit}
            onChange={(e) => setFormData({...formData, deposit: e.target.value})}
            className={styles.input}
            placeholder="Размер залога"
          />
        </div>

        <div className={styles.buttons}>
          <button
            type="button"
            onClick={onBack}
            className={styles.saveButton}
          >
            Сохранить и выйти
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className={styles.nextButton}
          >
            Выставить объявление
          </button>
        </div>
      </form>
    </div>
  );
} 