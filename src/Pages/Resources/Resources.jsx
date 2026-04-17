import { useState } from 'react';
import Header from '../../Components/Header/Header.jsx';
import styles from './Resources.module.css';
import { FaRegFile } from 'react-icons/fa';
import { FiChevronRight } from 'react-icons/fi';

const YEARS = [
  {
    id: '1CP',
    label: '1CP',
    title: 'Première Année Préparatoire',
    semesters: [
      {
        name: 'Semestre 01',
        modules: [
          'Algebre_01',
          'Algo_et_structure_de_donnees_statiques',
          'Analyse_mathematique_01',
          'Architecture_des_ordinateurs',
          'Bureautique_et_web',
          'Elec_01',
          'English_01',
          'Intro_sys',
        ],
      },
      {
        name: 'Semestre 02',
        modules: [
          'Algebre_02',
          'Algo_et_struc_de_donnees_dynamique',
          'Analyse_mathematique_02',
          'Electronique_fondamentale_01',
          'Mecanique_du_point',
          "Technique d'expression",
          'English_02',
          'Intro_sys_02',
        ],
      },
    ],
  },
  {
    id: '2CP',
    label: '2CP',
    title: 'Deuxième Année Préparatoire',
    semesters: [
      {
        name: 'Semestre 01',
        modules: [
          'Analyse_03',
          'Algebre_03',
          'Archi_02',
          "Economie d'entreprise",
          'Electronique_fondamentale_02',
          'ProbaStat_01',
          'SFSD',
        ],
      },
      {
        name: 'Semestre 02',
        modules: [
          'Analyse_04',
          'Introduction aux SI',
          'Logique mathematique',
          'Optiques et ondes electromagnetique',
          'Probabilite et statistique_2',
          'Programmation orientee objet',
          'Concours',
        ],
      },
    ],
  },
  {
    id: '1CS',
    label: '1CS',
    title: 'Première Année Cycle Supérieur',
    semesters: [
      {
        name: 'Semestre 01',
        modules: ['ANG', 'BDD', 'GL', 'PAFA', 'RO_1', 'RX_1', 'SE', 'THL'],
      },
      {
        name: 'Semestre 02',
        modules: ['ADCI', 'ANUM', 'ESTN', 'IA', 'MF', 'RO_2', 'RX_2', 'SEC'],
      },
    ],
  },
  {
    id: '2CS',
    label: '2CS',
    title: 'Deuxième Année Cycle Supérieur',
    semesters: [
      {
        name: 'Semestre 01',
        modules: ['ANAD', 'ANG', 'BDA', 'CLD', 'COMP', 'CPRJ', 'FDS'],
      },
      {
        name: 'Semestre 02',
        modules: ['ANAD_02', 'Cloud', 'Deep Learning', 'IoT', 'Mobile Dev', 'NLP', 'Security'],
      },
    ],
  },
  {
    id: '3CS',
    label: '3CS',
    title: 'Troisième Année Cycle Supérieur',
    semesters: [
      {
        name: 'Semestre 01',
        modules: ['PFE', 'Recherche opérationnelle', 'Vision artificielle', 'Crypto', 'Cloud avancé', 'Stage'],
      },
      {
        name: 'Semestre 02',
        modules: ['Mémoire de fin d\'études', 'Soutenance', 'Projet industriel'],
      },
    ],
  },
];

function Resources() {
  const [activeYear, setActiveYear] = useState('1CP');
  const year = YEARS.find(y => y.id === activeYear);

  return (
    <>
      <Header />
      <div className={styles.page}>

        <div className={styles.pageHeader}>
          <h1>Study <em>Resources</em></h1>
          <p>All modules, all years — organised for Estin students.</p>
        </div>

        <div className={styles.yearTabs}>
          {YEARS.map(y => (
            <button
              key={y.id}
              className={`${styles.yearTab} ${activeYear === y.id ? styles.active : ''}`}
              onClick={() => setActiveYear(y.id)}
            >
              {y.label}
            </button>
          ))}
        </div>

    
        <div className={styles.content} key={activeYear}>
          <div className={styles.yearLabel}>
            <h2>{year.label}</h2>
            <span className={styles.badge}>{year.title}</span>
          </div>

          <div className={styles.semesterGrid}>
            {year.semesters.map((sem) => (
              <div key={sem.name} className={styles.semCard}>
                <div className={styles.semHeader}>
                  <h3>{sem.name}</h3>
                </div>
                <div className={styles.moduleList}>
                  {sem.modules.map((mod) => (
                    <div key={mod} className={styles.moduleItem}>
                      <FaRegFile className={styles.fileIcon} />
                      <span className={styles.moduleName}>{mod}</span>
                      <FiChevronRight className={styles.moduleArrow} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
   
    </>
  );
}

export default Resources;