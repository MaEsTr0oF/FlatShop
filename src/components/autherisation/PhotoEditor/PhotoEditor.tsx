import { useState, useCallback, useEffect } from 'react'
import Cropper from 'react-easy-crop'
import styles from './PhotoEditor.module.css'

interface PhotoEditorProps {
  photo: File | null;
  onClose: () => void;
  onSave: (croppedImage: File) => void;
}

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function PhotoEditor({ photo, onClose, onSave }: PhotoEditorProps) {
  const [imagePreview, setImagePreview] = useState<string>('')
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(null)

  // Заменим useState на useEffect
  useEffect(() => {
    if (photo) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(photo)
    }
  }, [photo])

  const onCropComplete = useCallback((_: any, croppedAreaPixels: CropArea) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image()
      image.addEventListener('load', () => resolve(image))
      image.addEventListener('error', error => reject(error))
      image.src = url
    })

  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: CropArea
  ): Promise<File> => {
    const image = await createImage(imageSrc)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      throw new Error('No 2d context')
    }

    // Установим размеры canvas для выходного изображения
    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height

    // Рисуем обрезанное изображение
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    )

    // Конвертируем canvas в файл
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          reject(new Error('Canvas is empty'))
          return
        }
        const file = new File([blob], 'cropped.jpg', {
          type: 'image/jpeg',
        })
        resolve(file)
      }, 'image/jpeg')
    })
  }

  const handleSave = async () => {
    try {
      if (croppedAreaPixels && imagePreview) {
        const croppedImage = await getCroppedImg(imagePreview, croppedAreaPixels)
        onSave(croppedImage)
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <h2>Фотография профиля</h2>
        <p className={styles.subtitle}>
          Выбранная область будет показываться на Вашей странице
        </p>

        <div className={styles.cropContainer}>
          {imagePreview && (
            <Cropper
              image={imagePreview}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              objectFit="contain"
              cropShape="rect"
              showGrid={false}
              cropSize={{ width: 200, height: 200 }}
              minZoom={0.5}
              maxZoom={5}
              style={{
                containerStyle: {
                  background: 'rgba(0, 0, 0, 0.8)'
                },
                cropAreaStyle: {
                  border: '2px solid #e31235',
                  boxShadow: 'none',
                  background: 'none'
                },
                mediaStyle: {
                  background: 'none'
                }
              }}
            />
          )}
        </div>

        <div className={styles.controls}>
          <input
            type="range"
            value={zoom}
            min={0.5}
            max={5}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e) => setZoom(Number(e.target.value))}
            className={styles.slider}
          />
        </div>

        <div className={styles.buttons}>
          <button 
            className={styles.backButton} 
            onClick={onClose}
          >
            Вернуться назад
          </button>
          <button 
            className={styles.saveButton} 
            onClick={handleSave}
          >
            Сохранить и продолжить
          </button>
        </div>
      </div>
    </div>
  )
} 