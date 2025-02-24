import styles from './Analytics.module.css'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

// Регистрируем необходимые плагины
ChartJS.register(ArcElement, ChartDataLabels)

interface AnalyticsItem {
  id: number
  text: string
  percentage: number
  color: string
}

interface AnalyticsProps {
  items: AnalyticsItem[]
  totalPercentage: number
}

const Analytics = ({ items, totalPercentage }: AnalyticsProps) => {
  const data = {
    labels: items.map(item => item.text),
    datasets: [{
      data: items.map(item => item.percentage),
      backgroundColor: items.map(item => item.color),
      borderWidth: 0,
      cutout: '75%',
      spacing: 0
    }]
  }

  const options = {
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      },
      datalabels: {
        formatter: (value: number) => value + '%',
        backgroundColor: 'white',
        borderRadius: 25,
        padding: { top: 0, bottom: 0, left: 0, right: 0 },
        font: {
          size: 14,
          weight: 'bold' as const
        },
        color: '#333',
        offset: 15,
        align: 'end' as const,
        anchor: 'end' as const,
        display: true
      }
    },
    rotation: 270, // Изменили rotation для правильного расположения процентов
    circumference: 360,
    maintainAspectRatio: false,
    layout: {
      padding: 40
    }
  }

  return (
    <div className={styles.analytics}>
      <h2>АНАЛИТИКА ВАШИХ ДОХОДОВ</h2>
      <div className={styles.content}>
        <div className={styles.textSection}>
          {items.map(item => (
            <div key={item.id} className={styles.textItem}>
              <div className={styles.textHeader}>
                <div className={styles.textInfo}>
                  <span>{item.text}</span>
                  <button className={styles.questionMark}>?</button>
                </div>
                <span className={styles.percentage}>{item.percentage}%</span>
              </div>
              <div 
                className={styles.progressBar} 
                style={{ 
                  backgroundColor: item.color,
                  width: `${item.percentage}%`
                }}
              />
            </div>
          ))}
        </div>
        
        <div className={styles.chartSection}>
          <div className={styles.chartWrapper}>
            <Doughnut data={data} options={options} />
            <div className={styles.centerText}>+{totalPercentage}%</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
