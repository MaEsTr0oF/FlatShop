import { useState } from 'react'
import styles from './Reviews.module.css'
import SubFooterButton from '../subfooter/SubFooterButton'

interface Review {
  id: number;
  name: string;
  role: string;
  year: string;
  text: string;
  image: string;
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: "Михаил",
      role: "риелтор",
      year: "с 2022 года",
      text: "«За первый квартал сотрудничества закрыл 5 сделок. Отличная поддержка от команды и быстрые выплаты!»",
      image: "/img/marketing/partner1.png"
    },
    {
      id: 2,
      name: "Анастасия",
      role: "агент",
      year: "с 5-летним опытом",
      text: "«Удобная система выплат и поддержка! Лучшие условия на рынке. Уже привлекла в команду 3 новых агентов»",
      image: "/img/marketing/partner2.png"
    },
    {
      id: 3,
      name: "Алексей",
      role: "партнёр",
      year: "с 2023 года",
      text: "«Я за месяц продал 3 квартиры и заработал 500 000 Р! Всё честно и быстро!»",
      image: "/img/marketing/partner3.png"
    },
    {
      id: 4,
      name: "Дмитрий",
      role: "руководитель отдела",
      year: "с 2021 года",
      text: "«Начинал как агент, теперь управляю командой из 12 человек. Доход вырос в 4 раза!»",
      image: "/img/marketing/partner4.png"
    },
    {
      id: 5,
      name: "Елена",
      role: "специалист по коммерческой недвижимости",
      year: "с 2023 года",
      text: "«Специализируюсь на офисных помещениях. За полгода провела сделок на 40 миллионов рублей»",
      image: "/img/marketing/partner5.png"
    }
  ]);

  const handleReviewClick = (clickedIndex: number) => {
    if (clickedIndex === 2) return;

    setReviews(prevReviews => {
      const newReviews = [...prevReviews];
      [newReviews[clickedIndex], newReviews[2]] = [newReviews[2], newReviews[clickedIndex]];
      return newReviews;
    });
  };

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>ЧТО ГОВОРЯТ НАШИ ПАРТНЁРЫ?</h2>
        <div className={styles.reviewsContainer}>
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className={`${styles.reviewCard} ${index === 2 ? styles.active : ''}`}
              onClick={() => handleReviewClick(index)}
            >
              <div className={styles.imageWrapper}>
                <img src={review.image} alt={review.name} />
              </div>
              {index === 2 && review.text && (
                <div className={styles.reviewContent}>
                  <div className={styles.reviewInfo}>
                    <h3>{review.name}</h3>
                    <p>{review.role}</p>
                    <p>{review.year}</p>
                  </div>
                  <p className={styles.reviewText}>{review.text}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <SubFooterButton 
        label="Начни зарабатывать уже сегодня!"
        buttonText="Разместить объявление"
        subtitle=""
        to="/main/sales"
      />
    </>
  );
} 