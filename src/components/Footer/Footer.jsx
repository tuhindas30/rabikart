import SocialIcons from "../SocialIcons/SocialIcons";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h3 className={styles.footerHeading}>RabiKart v0.1</h3>
      <SocialIcons />
      <div className={styles.credits}>
        Made with ❤️ by
        <a href="https://tuhindas.me" className={styles.profileLink}>
          Tuhin Das
        </a>
      </div>
    </footer>
  );
};

export default Footer;
