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
2.2- Hooks
a) useCart.js
Este código serve para funções do carrinho, como adicionar e remover um item, sendo um modo de uso.
~~~js
import { useState, useEffect } from 'react';

export function useCart() {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('maskCart') || '[]'); }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('maskCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (nome, preco, img, tamanho, cor) => {
    if (!tamanho) return false;
    setCart(prev => {
      const existing = prev.find(
        i => i.nome === nome && i.tamanho === tamanho && i.cor === cor
      );
      if (existing) {
        return prev.map(i => i === existing ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { nome, preco, img, tamanho, cor, qty: 1 }];
    });
    return true;
  };

  const removeFromCart = (idx) => {
    setCart(prev => prev.filter((_, i) => i !== idx));
  };

  const total = cart.reduce((acc, i) => acc + i.preco * i.qty, 0);
  const count = cart.reduce((acc, i) => acc + i.qty, 0);

  return { cart, addToCart, removeFromCart, total, count };
}
~~~
b) useDarkMode.js
Sua função é definir o modo de uso do DarkMode.
~~~js
import { useState, useEffect } from 'react';

export function useDarkMode() {
  const [dark, setDark] = useState(
    () => localStorage.getItem('darkMode') === 'on'
  );

  useEffect(() => {
    if (dark) {
      document.body.classList.add('dark');
      localStorage.setItem('darkMode', 'on');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('darkMode', 'off');
    }
  }, [dark]);

  const toggleDark = () => setDark(d => !d);

  return [dark, toggleDark];
}
~~~
c) useToast.js
Define o modo de uso do toas, que serve para mostrar notificações temporárias , evitando repetição de lógica.
~~~js
import { useCallback, useRef } from 'react';

export function useToast() {
  const timerRef = useRef(null);

  const showToast = useCallback((msg) => {
    const toast = document.getElementById('mask-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => toast.classList.remove('show'), 2500);
  }, []);

  return showToast;
}
~~~
2.3-Pages
a) CatalogPages.jsx
Página catalógo, mostrando produtos e ofertas.
Importações aplicadas nas páginas, servindo para otimizar e deixar com os componentes necessários.
~~~jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';
import CatNav from '../components/CatNav';
import ProductModal from '../components/ProductModal';
import Toast from '../components/Toast';
import { useCart } from '../hooks/useCart';
import { useDarkMode } from '../hooks/useDarkMode';
import { useToast } from '../hooks/useToast';
~~~
Criação de uma variável do catálogo.
~~~jsx
const CATALOG_NAV = [
  { label: '!!NEW DROP!!', href: '/home#hero'    },
  { label: 'Catálogo',     href: '/home'         },
  { label: 'Sobre nós',   href: '/home#sobre'   },
];
~~~
Exportaçãoe e estado do componente, como tema da página, dados do carrinho, função para mostrar notificações, verificação do estado do carrinho e verificação de qual produto está aberto. 
~~~jsx
export default function CatalogPage({ title, produtos }) {
  const [dark, toggleDark] = useDarkMode();
  const { cart, addToCart, removeFromCart, total, count } = useCart();
  const showToast = useToast();

  const [cartOpen, setCartOpen]     = useState(false);
  const [modalProd, setModalProd]   = useState(null); // produto aberto no modal
  const [selectedTams, setSelectedTams] = useState({}); // { idx: tamanho }
~~~
Fecha o modal usando ESC.
~~~jsx
  // Close on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        setModalProd(null);
        setCartOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
~~~
Funções aplicadas no site. 
~~~jsx
  const handleSelectTam = (idx, tam) => {
    setSelectedTams((prev) => ({ ...prev, [idx]: tam }));
  };

  const handleAddFromCard = (produto, idx) => {
    const tamanho = selectedTams[idx] || '';
    const ok = addToCart(produto.nome, produto.preco, produto.imgFront, tamanho, produto.cores[0]?.nome || '');
    if (!ok) { showToast('Selecione um tamanho!'); return; }
    showToast('✓ Adicionado ao carrinho');
  };

  const handleAddFromModal = (nome, preco, img, tamanho, cor) => {
    const ok = addToCart(nome, preco, img, tamanho, cor);
    if (!ok) { showToast('Selecione um tamanho!'); return; }
    showToast('✓ Adicionado ao carrinho');
  };

  const fmt = (val) => 'R$ ' + val.toFixed(2).replace('.', ',');

  return (
    <>
      <Toast />

      <Header
        dark={dark}
        toggleDark={toggleDark}
        cartCount={count}
        onCartOpen={() => setCartOpen(true)}
        navLinks={CATALOG_NAV}
      />

      <CatNav />

      {/* BANNER */}
      <section className="category-banner">
        <div className="banner-text">
          <p>Coleção 2026</p>
          <h1>{title}</h1>
        </div>
      </section>

      {/* PRODUTOS */}
      <main>
        <section className="produtos-section">
          <div className="produtos-header">
            <h2>Todos os {title}</h2>
            <span className="produtos-count">{produtos.length} produtos</span>
          </div>

          <div className="produtos-grid">
            {produtos.map((produto, idx) => (
              <article
                key={idx}
                className="produto-card"
                onClick={() => setModalProd(produto)}
              >
                <div className="produto-card-img">
                  {produto.badge && (
                    <span className="produto-badge">{produto.badge}</span>
                  )}
                  <img className="img-front" src={produto.imgFront} alt={produto.nome} />
                  {produto.imgBack && (
                    <img className="img-back" src={produto.imgBack} alt={`${produto.nome} costas`} />
                  )}
                </div>

                <div className="produto-card-info">
                  <h3>{produto.nome}</h3>
                  <p className="desc">{produto.desc}</p>

                  <div className="produto-card-bottom">
                    <span className="produto-preco">{fmt(produto.preco)}</span>
                    <div className="tamanhos-mini">
                      {produto.tamanhos.map((t) => (
                        <span
                          key={t}
                          className={`tamanho-tag${selectedTams[idx] === t ? ' selected' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectTam(idx, t);
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    className="btn-add-card"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddFromCard(produto, idx);
                    }}
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {/* MODAL */}
      {modalProd && (
        <ProductModal
          produto={modalProd}
          onClose={() => setModalProd(null)}
          onAddToCart={handleAddFromModal}
        />
      )}

      <CartSidebar
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onRemove={removeFromCart}
        total={total}
        onCheckout={() => showToast('Em breve: checkout online!')}
      />
    </>
  );
}
~~~

b)HomePage.jsx 

Importações
~~~jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Componentes
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';
import Toast from '../components/Toast';

// Hooks personalizados
import { useCart } from '../hooks/useCart';
import { useDarkMode } from '../hooks/useDarkMode';
import { useToast } from '../hooks/useToast';
Importa React, navegação, componentes e lógica separada (hooks).
~~~
Links do menu.  

Estados principais
~~~jsx
const [dark, toggleDark] = useDarkMode();
const { cart, removeFromCart, total, count } = useCart();
const showToast = useToast();
Tema, carrinho e notificações.
const [cartOpen, setCartOpen] = useState(false);
const [activeSlide, setActiveSlide] = useState(0);
~~~
Controle do carrinho e slider.    

Efeitos
~~~jsx
// Troca automática de slide
useEffect(() => {
  const timer = setInterval(
    () => setActiveSlide((i) => (i + 1) % SLIDES.length),
    3000
  );
  return () => clearInterval(timer);
}, []);
// Fecha carrinho com ESC
useEffect(() => {
  const handler = (e) => { if (e.key === 'Escape') setCartOpen(false); };
  window.addEventListener('keydown', handler);
  return () => window.removeEventListener('keydown', handler);
}, []);
~~~  
Hero (slider)
~~~jsx
<section id="hero">
  {SLIDES.map((src, i) => (
    <img className={activeSlide === i ? 'active' : ''} />
  ))}
</section>
~~~
Renderiza imagens e apenas uma fica ativa por vez  

Categorias
~~~jsx
<Link to="/camisetas">...</Link>
<Link to="/shorts">...</Link>
<Link to="/calcas">...</Link>
<Link to="/moletons">...</Link>
~~~  
Cards clicáveis → levam para páginas  

Carrinho lateral  
~~~jsx
<CartSidebar
  open={cartOpen}
  cart={cart}
  total={total}
  onRemove={removeFromCart}
  onCheckout={() => showToast('Em breve')}
/>
~~~
Mostra itens
Permite remover
Checkout ainda fake (toast)

c) LoginPage.jsx  

Importações
~~~jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
useState: estados
useNavigate: redirecionar página
~~~
Validações
~~~jsx
const validEmail = (v) => ...
const validPassword = (v) => ...
const validPhone = (v) => ...
~~~

Funções que verificam:  
email válido  
senha com caractere especial  
telefone no formato (11)91234-5678

Dados padrão
~~~jsx
const EMPTY = { email: '', password: '', phone: '', birth: '', gender: '' };
const Field = ({ id, label, error, children }) => (...)
~~~
Estado inicial do cadastro    
Reutiliza:  
label  
input  
erro  

Estados principais  
~~~jsx
const [panel, setPanel] = useState('login');
Alterna entre login e cadastro
const [login, setLogin] = useState({ ... });
const [loginErr, setLoginErr] = useState({});
Dados + erros do login
const [reg, setReg] = useState(EMPTY);
const [regErr, setRegErr] = useState({});
~~~
Dados + erros do cadastro  

Troca de tela  
~~~jsx
const switchPanel = (to) => {
  setPanel(to);
  setLoginErr({});
  setRegErr({});
};
~~~  
Alterna entre login/register e limpa erros  
Remove tudo que não é número  
Formata automaticamente enquanto digita  
Login  
~~~jsx
const handleLogin = () => {
  // valida
  // salva no localStorage
  // redireciona
};
~~~
Cadastro
~~~jsx
const handleRegister = () => {
  // valida tudo
  // salva dados
  // redireciona
};
~~~  
Valida todos campos e salva usuário completo no localStorage  

Layout base  
~~~jsx
<div className="login-body">
  <div className="login-bg">...</div>
  <main className="login-page">...</main>
</div>
~~~  
Fundo com imagem + overlay + Card central  

Painel LOGIN  
{panel === 'login' && ( ... )}
Inputs:
email
senha
Botão entrar
Link → cadastro
🆕 Painel REGISTER
{panel === 'register' && ( ... )}
Inputs:
email
senha
telefone (com máscara)
data nascimento
gênero
Botão cadastrar
Link → login
