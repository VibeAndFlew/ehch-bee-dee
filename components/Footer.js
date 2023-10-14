import styles from './Footer.module.css';

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        Made with ❤️ , Mottu <img src="/logo-netlify.svg" alt="Netlify Logo" className={styles.logo} />
        <iframe
          width="110"
          height="200"
          src="https://www.myinstants.com/instant/8-bit-happy-birthday-62739/embed/"
          frameBorder="0"
          scrolling="no"
        ></iframe>
      </footer>
    </>
  );
}
