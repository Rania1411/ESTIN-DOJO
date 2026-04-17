import Header from '../../Components/Header/Header.jsx';
import styles from './Resources.module.css';
import { FaFolderOpen } from 'react-icons/fa';

const YEARS = [
  {
    id: '1CP',
    label: '1CP',
    title: 'Première Année Préparatoire',
    link: 'https://drive.google.com/your-1cp-folder',
  },
  {
    id: '2CP',
    label: '2CP',
    title: 'Deuxième Année Préparatoire',
    link: 'https://drive.google.com/your-2cp-folder',
  },
  {
    id: '1CS',
    label: '1CS',
    title: 'Cycle Supérieur — 1ère année',
    link: 'https://drive.google.com/your-1cs-folder',
  },
  {
    id: '2CS',
    label: '2CS',
    title: 'Cycle Supérieur — 2ème année',
    link: 'https://drive.google.com/your-2cs-folder',
  },
  {
    id: '3CS',
    label: '3CS',
    title: 'Cycle Supérieur — 3ème année',
    link: 'https://drive.google.com/your-3cs-folder',
  },
];

function Resources() {
  return (
    <>
      <Header />

      <div className={styles.page}>
        <div className={styles.hero}>
          <h1>
            Your <em>Academic Vault</em>
          </h1>
          <p>Everything you need, beautifully organized.</p>
        </div>

        <div className={styles.grid}>
          {YEARS.map((year) => (
            <a
              key={year.id}
              href={year.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
            >
              <div className={styles.iconWrap}>
                <FaFolderOpen />
              </div>

              <div className={styles.cardText}>
                <h2>{year.label}</h2>
                <p>{year.title}</p>
              </div>

              <div className={styles.hoverLine}></div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

export default Resources;