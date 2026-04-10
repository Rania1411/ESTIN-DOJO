import { FaTrophy, FaBookOpen, FaComments } from 'react-icons/fa';
import { LuTimer } from "react-icons/lu";
import { useState } from 'react';
import styles from './Header.module.css';
import proImg from '../../assets/pro.jpg';
import logo from '../../assets/dojo.png';
import { useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [name] = useState("User Name");
  const [image] = useState(proImg);

  const navLinks = [
    { path: '/Dashboard',            icon: <LuTimer />,  label: 'Timer' },
    { path: '/Leaderboard', icon: <FaTrophy />,    label: 'Leaderboard' },
    { path: '/Resources',   icon: <FaBookOpen />,  label: 'Resources' },
    { path: '/Chat',        icon: <FaComments />,  label: 'Chat' },
  ];

  return (
    <div className={styles.headerContainer}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Estin Dojo logo" />
        <div className={styles.logoName}>
          <h2>Estin Dojo</h2>
          <p>Study Collaboration</p>
        </div>
      </div>

      <div className={styles.listContainer}>
        {navLinks.map(({ path, icon, label }) => (
          <a
            key={path}
            href="#"
            onClick={(e) => { e.preventDefault(); navigate(path); }}
            className={`${styles.list} ${location.pathname === path ? styles.activeLink : ''}`}
          >
            {icon}{label}
          </a>
        ))}
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.nameContainer}>
          <p>{name}</p>
        </div>
        <div className={styles.profilePic}>
          <img src={image} alt="profile" />
        </div>
      </div>
    </div>
  );
}

export default Header;