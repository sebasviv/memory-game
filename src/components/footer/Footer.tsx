import './Footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="app-footer__brand">
        <span className="app-footer__title">Memory Game</span>
        <span className="app-footer__subtitle">
          Desafía tu memoria en una aventura interdimensional.
        </span>
      </div>

      <div className="app-footer__meta">
        <span className="app-footer__badge">Rick &amp; Morty Vibes</span>
        <span className="app-footer__copy">© {currentYear} Memory Game</span>
      </div>
    </footer>
  );
};

export default Footer;