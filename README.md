1- PUBLIC  
Public foi separado em 4 partes:
a) Pack de Roupas Mask.
Nesse pack de roupas foi deixado as principais fotos que deixamos como global para ser usado em mais de um lugar.
b) Pack de Roupas MASK pt2.
Nesse pack deixamos mais arquivos de imagem que usamos conforme fizemos o site, deixando como global para seu uso em mais de uma página.
c) index.html
Deixamos os elementos html básicos que usamos nas páginas, evitando repetição.
~~~html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>MASK®</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
~~~
d) Manifest.json
~~~json
{
  "short_name": "React App",
  "name": "Create React App Sample",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
~~~
2- SRC
2.1- Components
a) CartSidebar.jsx
Aqui fizemos o funcionamento do carrinho, deixando seu funcionamento quando o cliente for interagir.
~~~jsx
export default function CartSidebar({ open, onClose, cart, onRemove, total, onCheckout }) {
  const fmt = (val) => 'R$ ' + val.toFixed(2).replace('.', ',');

  return (
    <>
      <div
        className={`cart-overlay${open ? ' active' : ''}`}
        id="cart-bg"
        onClick={onClose}
      />
      <aside className={`cart-sidebar${open ? ' active' : ''}`} id="cart-sidebar">
        <div className="cart-header">
          <h3>Meu Carrinho</h3>
          <button className="cart-close" onClick={onClose}>✕</button>
        </div>

        <div className="cart-items" id="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">Carrinho vazio</div>
          ) : (
            cart.map((item, idx) => (
              <div className="cart-item" key={idx}>
                <img src={item.img} alt={item.nome} />
                <div className="cart-item-info">
                  <h4>{item.nome}</h4>
                  <p>Tamanho: {item.tamanho} &nbsp;|&nbsp; Cor: {item.cor}</p>
                  <p className="cart-item-preco">{fmt(item.preco)}</p>
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => onRemove(idx)}
                  title="Remover"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-total">
            <span>Total</span>
            <strong id="cart-total-value">{fmt(total)}</strong>
          </div>
          <button className="btn-checkout" onClick={onCheckout}>
            Finalizar Compra
          </button>
        </div>
      </aside>
    </>
  );
}
~~~
b) CatNav.jsx
Aqui é separado o meio de navegação  pelo carrinho, mostrando as categorias existentes.
~~~jsx
import { Link, useLocation } from 'react-router-dom';

const CATEGORIAS = [
  { label: 'Camisetas', to: '/camisetas' },
  { label: 'Shorts',    to: '/shorts'    },
  { label: 'Calças',    to: '/calcas'    },
  { label: 'Moletons',  to: '/moletons'  },
];

export default function CatNav() {
  const { pathname } = useLocation();

  return (
    <nav className="cat-nav">
      {CATEGORIAS.map((c) => (
        <Link
          key={c.to}
          to={c.to}
          className={`cat-nav-link${pathname === c.to ? ' active' : ''}`}
        >
          {c.label}
        </Link>
      ))}
    </nav>
  );
}
~~~
c) Footer.jsx
Este separamento é para o footer do site, deixando cada informação necessária separada.
~~~jsx
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
~~~
d) Header.jsx
Este separamento serve para o header do site, deixando todos os componentes de interface existentes nele, além do dark mode funcionando
~~~jsx
import { Link, useNavigate } from 'react-router-dom';

export default function Header({ dark, toggleDark, cartCount, onCartOpen, navLinks }) {
  const navigate = useNavigate();

  return (
    <header>
      <div className="logo">
        <Link to="/home">
          <img src="/Pack de Roupas Mask/MASK BLACK.png" alt="Mask" />
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
~~~
e) ProductModal.jsx
Esse código foi criado para o cliente poder definir cusmotizações antes de adicionar o produto no carrinho, sendo um modelo interativo, definindo cor e tamanho.
~~~jsx
import { useState, useEffect } from 'react';

export default function ProductModal({ produto, onClose, onAddToCart }) {
  const [mainImg, setMainImg] = useState('');
  const [selectedTam, setSelectedTam] = useState('');
  const [selectedCor, setSelectedCor] = useState('');

  useEffect(() => {
    if (!produto) return;
    setMainImg(produto.imgs[0]);
    setSelectedTam('');
    setSelectedCor(produto.cores[0]?.nome || '');
  }, [produto]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!produto) return null;

  const fmt = (val) => 'R$ ' + val.toFixed(2).replace('.', ',');

  const handleAdd = () => {
    onAddToCart(produto.nome, produto.preco, produto.imgs[0], selectedTam, selectedCor);
    onClose();
  };

  return (
    <div
      className="modal-overlay active"
      id="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-body">

          {/* Gallery */}
          <div className="modal-gallery">
            <img className="modal-main-img" src={mainImg} alt={produto.nome} />
            <div className="modal-thumbs">
              {produto.imgs.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={produto.nome}
                  className={mainImg === src ? 'active' : ''}
                  onClick={() => setMainImg(src)}
                />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="modal-info">
            <span className="modal-cat">{produto.categoria}</span>
            <h2>{produto.nome}</h2>
            <div className="modal-preco">{fmt(produto.preco)}</div>
            <p className="modal-desc">{produto.descFull}</p>

            {/* Tamanhos */}
            <div>
              <p className="modal-section-label">Tamanhos</p>
              <div className="modal-tamanhos">
                {produto.tamanhos.map((t) => (
                  <button
                    key={t}
                    className={`tamanho-btn${selectedTam === t ? ' selected' : ''}`}
                    onClick={() => setSelectedTam(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Cores */}
            <div>
              <p className="modal-section-label">Cores disponíveis</p>
              <div className="modal-cores">
                {produto.cores.map((c) => (
                  <div
                    key={c.nome}
                    className={`cor-dot${selectedCor === c.nome ? ' selected' : ''}`}
                    style={{ background: c.hex }}
                    title={c.nome}
                    onClick={() => setSelectedCor(c.nome)}
                  />
                ))}
              </div>
              <span className="cor-nome">{selectedCor}</span>
            </div>

            <div className="modal-material">
              <strong>Material:</strong> {produto.material}
            </div>

            <button className="btn-add-modal" onClick={handleAdd}>
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
~~~
f) Toast.jsx
Componente usado para servir de container vazio, sendo renderizado como uma div vazia, sendo usada em DOM.
~~~jsx
export default function Toast() {
  return <div className="toast" id="mask-toast" />;
}
~~~
