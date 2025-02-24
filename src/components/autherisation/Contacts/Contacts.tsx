import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Contacts.module.css'
import PhotoEditor from '../PhotoEditor/PhotoEditor'

export default function Contacts() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [patronymic, setPatronymic] = useState('')
  const [gender, setGender] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [city, setCity] = useState('')
  const [photo, setPhoto] = useState<File | null>(null)
  const [showPhotoEditor, setShowPhotoEditor] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string>('')
  const [errors, setErrors] = useState<string[]>([])
  
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  const validateForm = (): boolean => {
    const newErrors: string[] = []

    if (!lastName) newErrors.push('Введите фамилию')
    if (!firstName) newErrors.push('Введите имя')
    if (!gender) newErrors.push('Выберите пол')
    if (!birthDate) newErrors.push('Введите дату рождения')
    if (!city) newErrors.push('Введите город')
    if (!photo) newErrors.push('Загрузите фото профиля')

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Сохраняем имя пользователя
      localStorage.setItem('userName', `${firstName} ${lastName}`)
      navigate('/finish')
    }
  }

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedPhoto(file)
      setShowPhotoEditor(true)
    }
  }

  const handlePhotoSave = (croppedImage: File) => {
    setPhoto(croppedImage)
    setShowPhotoEditor(false)
    
    // Создаем URL для предпросмотра
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewImage(reader.result as string)
    }
    reader.readAsDataURL(croppedImage)
  }

  return (
    <div className={styles.contactsContainer}>
      <form onSubmit={handleSubmit} className={styles.contactsForm}>
        <button type="button" onClick={handleBack} className={styles.backButton}>
          Вернуться назад
        </button>

        <div className={styles.stepIndicator}>
          <span>03</span>/04
        </div>

        <h2>Контакты</h2>

        {errors.length > 0 && (
          <div className={styles.errors}>
            {errors.map((error, index) => (
              <p key={index} className={styles.error}>{error}</p>
            ))}
          </div>
        )}

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Фамилия *</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Константинопольский"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Имя *</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Константин"
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Отчество</label>
          <input
            type="text"
            value={patronymic}
            onChange={(e) => setPatronymic(e.target.value)}
            placeholder="Константинович"
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Пол *</label>
            <div className={styles.radioGroup}>
              <label className={styles.radio}>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === 'male'}
                  onChange={(e) => setGender(e.target.value)}
                />
                <span>Мужской</span>
              </label>
              <label className={styles.radio}>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === 'female'}
                  onChange={(e) => setGender(e.target.value)}
                />
                <span>Женский</span>
              </label>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Дата рождения *</label>
            <div className={styles.dateInputWrapper}>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className={styles.dateInput}
              />
              <img 
                src="/img/autherisation/calendar.png" 
                alt="calendar" 
                className={styles.calendarIcon}
              />
            </div>
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.selectWrapper}>
            <label>Select *</label>
            <select 
              className={styles.select}
              defaultValue=""
            >
              <option value="" disabled>Input</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
          </div>
          
          <div className={styles.inputWrapper}>
            <label>Город *</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Введите свой город"
            />
          </div>
        </div>

        <div className={styles.photoUpload}>
          <label htmlFor="photoInput" className={styles.photoLabel}>
            <div className={styles.photoIcon}>
              {previewImage ? (
                <div className={styles.previewContainer}>
                  <img 
                    src={previewImage} 
                    alt="Preview" 
                    className={styles.preview}
                  />
                  <span>Изменить фото</span>
                </div>
              ) : (
                <>
                  <span>Установить фото профиля</span>
                  <p className={styles.photoHint}>
                    Размер не должен превышать более 4 Мб.
                    Загружайте собственную фотографию вашей личности,
                    она необходима для прохождения верификации
                    пользователя. Фото профиля должна быть четким, не
                    размазанным.
                  </p>
                </>
              )}
            </div>
          </label>
          <input
            id="photoInput"
            type="file"
            accept="image/*"
            onChange={handlePhotoSelect}
            className={styles.fileInput}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Продолжить
        </button>
      </form>

      {showPhotoEditor && (
        <PhotoEditor
          photo={selectedPhoto}
          onClose={() => setShowPhotoEditor(false)}
          onSave={handlePhotoSave}
        />
      )}

      <div className={styles.progressBar}>
        <div className={styles.step}>
          <div className={styles.line} />
          <div className={styles.stepContent}>
            <img src="/img/autherisation/Point.png" alt="Complete" />
            <span>Регистрация</span>
          </div>
          <div className={`${styles.line} ${styles.finish}`} />
          <div className={styles.stepContent}>
            <img src="/img/autherisation/Point.png" alt="Complete" />
            <span>Код из SMS</span>
          </div>
          <div className={`${styles.line} ${styles.finish}`} />
          <div className={`${styles.stepContent} ${styles.active}`}>
            <h3>03</h3>
            <span>Контакты</span>
          </div>
          <div className={`${styles.line} ${styles.progress}`} />
          <div className={styles.stepContent}>
            <h3>04</h3>
            <span>Регистрация</span>
          </div>
        </div>
      </div>
    </div>
  )
} 