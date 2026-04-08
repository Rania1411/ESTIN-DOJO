import styles from './Footer.module.css';
import { FaGithub, FaInstagram } from 'react-icons/fa';
import { CiTwitter } from "react-icons/ci";

function Footer() {
  return (
    <div className={styles.footer}>
      <a href="#">© 2026 Estin Dojo. All rights reserved.</a>

      <div className={styles.rightSide}>
        <div className={styles.links}>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
        <div className={styles.social}>
          <FaGithub />
          <FaInstagram />
          <CiTwitter />
        </div>
      </div>
    </div>
  );
}

export default Footer;