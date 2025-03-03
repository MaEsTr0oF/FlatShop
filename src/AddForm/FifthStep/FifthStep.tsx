import styles from '../AddForm.module.css'
import { useState } from 'react'
import { PriceData } from '../../types/form'

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
    price: initialData?.price || 0,
    maintenance: initialData?.maintenance || false,
    vat: initialData?.vat || 'Да',
    onlineShow: initialData?.onlineShow || false,
    deposit: initialData?.deposit || 0,
    mortgage: initialData?.mortgage || false,
    commission: initialData?.commission || 0,
    utilities: {
      included: initialData?.utilities?.included || false,
      electricity: initialData?.utilities?.electricity || false,
      gas: initialData?.utilities?.gas || false,
      water: initialData?.utilities?.water || false,
      internet: initialData?.utilities?.internet || false,
    },
    rules: {
      children: initialData?.rules?.children || false,
      pets: initialData?.rules?.pets || false,
      smoking: initialData?.rules?.smoking || false,
      party: initialData?.rules?.party || false,
      docs: initialData?.rules?.docs || false,
      month: initialData?.rules?.month || false,
    },
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
            onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
            className={styles.select}
          >
            <option value="">₽ (429) + 17 ₽/м²</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Коммунальные услуги</label>
          <div className={styles.checkboxGroup}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={formData.utilities.included}
                onChange={(e) => setFormData({
                  ...formData,
                  utilities: {
                    ...formData.utilities,
                    included: e.target.checked
                  }
                })}
              />
              <span className={styles.checkmark}></span>
              Включены в стоимость
            </label>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={formData.utilities.electricity}
                onChange={(e) => setFormData({
                  ...formData,
                  utilities: {
                    ...formData.utilities,
                    electricity: e.target.checked
                  }
                })}
              />
              <span className={styles.checkmark}></span>
              Электричество
            </label>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={formData.utilities.gas}
                onChange={(e) => setFormData({
                  ...formData,
                  utilities: {
                    ...formData.utilities,
                    gas: e.target.checked
                  }
                })}
              />
              <span className={styles.checkmark}></span>
              Газ
            </label>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={formData.utilities.water}
                onChange={(e) => setFormData({
                  ...formData,
                  utilities: {
                    ...formData.utilities,
                    water: e.target.checked
                  }
                })}
              />
              <span className={styles.checkmark}></span>
              Вода
            </label>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={formData.utilities.internet}
                onChange={(e) => setFormData({
                  ...formData,
                  utilities: {
                    ...formData.utilities,
                    internet: e.target.checked
                  }
                })}
              />
              <span className={styles.checkmark}></span>
              Интернет
            </label>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={formData.maintenance}
              onChange={(e) => setFormData({...formData, maintenance: e.target.checked})}
            />
            <span className={styles.checkmark}></span>
            Эксплуатационные расходы включены
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
            onChange={(e) => setFormData({...formData, deposit: parseInt(e.target.value)})}
            className={styles.input}
            placeholder="Размер залога"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Правила</label>
          <div className={styles.checkboxGroup}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={formData.rules.children}
                onChange={(e) => setFormData({
                  ...formData,
                  rules: {
                    ...formData.rules,
                    children: e.target.checked
                  }
                })}
              />
              <span className={styles.checkmark}></span>
              Можно с детьми
            </label>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={formData.rules.pets}
                onChange={(e) => setFormData({
                  ...formData,
                  rules: {
                    ...formData.rules,
                    pets: e.target.checked
                  }
                })}
              />
              <span className={styles.checkmark}></span>
              Можно с животными
            </label>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={formData.rules.smoking}
                onChange={(e) => setFormData({
                  ...formData,
                  rules: {
                    ...formData.rules,
                    smoking: e.target.checked
                  }
                })}
              />
              <span className={styles.checkmark}></span>
              Можно курить
            </label>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={formData.rules.party}
                onChange={(e) => setFormData({
                  ...formData,
                  rules: {
                    ...formData.rules,
                    party: e.target.checked
                  }
                })}
              />
              <span className={styles.checkmark}></span>
              Можно устраивать вечеринки
            </label>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={formData.rules.docs}
                onChange={(e) => setFormData({
                  ...formData,
                  rules: {
                    ...formData.rules,
                    docs: e.target.checked
                  }
                })}
              />
              <span className={styles.checkmark}></span>
              Нужны документы
            </label>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={formData.rules.month}
                onChange={(e) => setFormData({
                  ...formData,
                  rules: {
                    ...formData.rules,
                    month: e.target.checked
                  }
                })}
              />
              <span className={styles.checkmark}></span>
              Оплата помесячно
            </label>
          </div>
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