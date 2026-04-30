import { Link, useNavigate } from 'react-router-dom';

export default function Header({ dark, toggleDark, cartCount, onCartOpen, navLinks }) {
  const navigate = useNavigate();

return (
  <header>
    <div className="logo">
      <Link to="/home">
        <img 
          src="/Pack de Roupas Mask/MASK BLACK.png" 
          alt="Mask" 
          className="logo-light"
        />
        <img 
          src="/Pack de Roupas Mask/maskLogo.jpeg" 
          alt="Mask"
          className="logo-dark"
        />
      </Link>
    </div>
      <nav>
        <ul>
          {navLinks
            ? navLinks.map((l, i) => (
                <li key={i}>
                  {l.href.startsWith('/') ? (
                    <Link to={l.href}>{l.label}</Link>
                  ) : (
                    <a href={l.href}>{l.label}</a>
                  )}
                </li>
              ))
            : null}
        </ul>

        <ul className="icons">
          <li>
            <button id="toggle-dark" onClick={toggleDark}>
              {dark ? '☀️' : '🌙'}
            </button>
          </li>
          <li>
            <Link to="/">👤</Link>
          </li>
          <li>
            <div className="cart-wrapper" onClick={onCartOpen}>
              🛒
              {cartCount > 0 && (
                <span className="cart-count">{cartCount}</span>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}
