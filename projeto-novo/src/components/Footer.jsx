import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      <footer>
        <div className="footer-brand">
          <img src="/Pack de Roupas Mask/masklogo-removebg-preview.png" alt="Mask Logo" />
          <p>Streetwear com atitude e identidade.</p>
        </div>
        <div>
          <h4>Navegação</h4>
          <Link to="/home">Home</Link>
          <Link to="/camisetas">Camisetas</Link>
          <Link to="/shorts">Shorts</Link>
          <Link to="/calcas">Calças</Link>
          <Link to="/moletons">Moletons</Link>
        </div>
        <div>
          <h4>Contato</h4>
          <p>(11) 99999-9999</p>
          <p>maskcompany@email.com</p>
          <p>São Paulo — SP</p>
          <p>Seg–Sex / 9h às 18h</p>
        </div>
      </footer>
      <div className="footer-bottom">© 2026 Mask®. Todos os direitos reservados.</div>
    </>
  );
}
