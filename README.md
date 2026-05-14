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

3. App.jsx
Ativa o sistema de roteamento da aplicação, permitindo navegação entre páginas sem recarregar o site.
~~~jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
~~~
Chama os componentes da página principal
~~~jsx
import LoginPage   from './pages/LoginPage';
import HomePage    from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
~~~
Importa dados do produto
~~~jsx
import { camisetas, shorts, calcas, moletons } from './data/products';
~~~
Criacao da função
~~~jsx
export default function App() {
  return (
~~~
Ativa o sistema de roteamento da aplicação, permitindo navegação entre páginas sem recarregar o site.
~~~jsx 
    <BrowserRouter>
~~~
Definição das rotas, definindo como vai ser cada uma delas em cada componente.
~~~jsx
      <Routes>
        <Route path="/"          element={<LoginPage />} />
        <Route path="/home"      element={<HomePage />} />
        <Route path="/camisetas" element={<CatalogPage title="Camisetas" produtos={camisetas} />} />
        <Route path="/shorts"    element={<CatalogPage title="Shorts"    produtos={shorts}    />} />
        <Route path="/calcas"    element={<CatalogPage title="Calças"    produtos={calcas}    />} />
        <Route path="/moletons"  element={<CatalogPage title="Moletons"  produtos={moletons}  />} />
        <Route path="*"          element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
~~~
4. index.js
Importa a biblioteca React, necessária para usar JSX e componentes React.
~~~js
import React from 'react';
~~~
Importa o ReactDOM, que é responsável por renderizar componentes React no DOM (a página HTML).
~~~js
import ReactDOM from 'react-dom/client';
~~~
Importa o arquivo CSS global que estiliza toda a aplicação.
~~~js
import './styles/global.css';
~~~
Importa o componente App, que é o componente raiz da sua aplicação.
~~~js
import App from './App';
~~~
Cria uma "raiz" do React no elemento HTML com id="root".
~~~js
const root = ReactDOM.createRoot(document.getElementById('root'));
~~~
Renderiza o componente App dentro da raiz criada.
~~~js
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

5. Styles
5.1 base
5.1.1 reset.css
Serve para o reset de estilos
~~~css
/* ============================================
   MASK® — RESET
   ============================================ */

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  transition: background-color 0.3s, color 0.3s;
}
~~~
5.1.2 typography
Uso de fontes para o projeto 
~~~css
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700;800;900&display=swap');

body {
  background-color: #FFFFFF;
  color: #1a1a1a;
  font-family: 'Barlow', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  line-height: 1.6;
}
~~~
5.1.3 variables.css
Variáveis globais
~~~css
/* ============================================
   MASK® — VARIÁVEIS GLOBAIS
   ============================================ */

:root {
  /* Cores base */
  --white:  #f5f0e8;
  --black:  #0a0a0a;
  --accent: #c8b89a;

  /* Glassmorphism (login) */
  --glass:  rgba(10, 10, 10, 0.65);
  --border: rgba(245, 240, 232, 0.15);

  /* Feedback */
  --error:  #e07070;
}
~~~
5.2 Components
5.2.1 cart.css
Carrinho de compras e seu funcionamento
~~~css
/* ============================================
   MASK® — CART SIDEBAR
   ============================================ */

.cart-overlay {
  display: none;
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 8000;
}
.cart-overlay.active { display: block; }

.cart-sidebar {
  position: fixed; top: 0; right: -420px;
  width: 420px; max-width: 100vw; height: 100%;
  background: #fff;
  z-index: 8500;
  display: flex; flex-direction: column;
  border-left: 2px solid #1a1a1a;
  transition: right 0.35s cubic-bezier(0.4,0,0.2,1);
}
.cart-sidebar.active { right: 0; }

.cart-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 24px 24px 20px;
  border-bottom: 2px solid #1a1a1a;
}
.cart-header h3 {
  font-size: 1.2rem; font-weight: 900;
  text-transform: uppercase; letter-spacing: 2px; color: #1a1a1a;
}
.cart-close {
  background: none; border: none;
  font-size: 1.4rem; cursor: pointer; color: #1a1a1a;
}

.cart-items {
  flex: 1; overflow-y: auto; padding: 20px;
  display: flex; flex-direction: column; gap: 16px;
}

.cart-empty {
  text-align: center; padding: 60px 20px;
  color: #aaa; font-size: 0.9rem;
  text-transform: uppercase; letter-spacing: 1px;
}
.cart-empty::before {
  content: '🛒';
  display: block; font-size: 3rem; margin-bottom: 16px;
}

.cart-item {
  display: flex; gap: 14px;
  border: 1px solid #e8e8e8; padding: 12px;
  position: relative;
}
.cart-item img {
  width: 70px; height: 70px;
  object-fit: cover; flex-shrink: 0;
  border: 1px solid #eee;
}
.cart-item-info { flex: 1; }
.cart-item-info h4 {
  font-size: 0.85rem; font-weight: 800;
  text-transform: uppercase; color: #1a1a1a; margin-bottom: 4px;
}
.cart-item-info p { font-size: 0.75rem; color: #7a7a7a; margin-bottom: 4px; }
.cart-item-info .cart-item-preco { font-size: 1rem; font-weight: 900; color: #1a1a1a; }

.cart-item-remove {
  background: none; border: none; color: #ccc;
  cursor: pointer; font-size: 1rem;
  position: absolute; top: 10px; right: 10px;
  transition: color 0.2s;
}
.cart-item-remove:hover { color: #1a1a1a; }

.cart-footer { padding: 20px 24px; border-top: 2px solid #1a1a1a; }

.cart-total {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 16px;
}
.cart-total span {
  font-size: 0.8rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 1px; color: #1a1a1a;
}
.cart-total strong { font-size: 1.4rem; font-weight: 900; color: #1a1a1a; }

.btn-checkout {
  width: 100%; padding: 16px;
  background: #1a1a1a; color: #fff;
  font-size: 0.85rem; font-weight: 800;
  text-transform: uppercase; letter-spacing: 3px;
  border: 2px solid #1a1a1a; cursor: pointer;
  transition: all 0.2s; font-family: 'Barlow', sans-serif;
}
.btn-checkout:hover { background: #fff; color: #1a1a1a; }
~~~
5.2.2 cat-nav.css
Menu de navegação de categorias do site
~~~css
/* ============================================
   MASK® — CATEGORY NAV BAR
   ============================================ */

.cat-nav {
  display: flex;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  padding: 0 5%;
  overflow-x: auto;
  scrollbar-width: none;
}
.cat-nav::-webkit-scrollbar { display: none; }

.cat-nav-link {
  display: inline-block;
  padding: 14px 24px;
  font-size: 0.8rem; font-weight: 800;
  text-transform: uppercase; letter-spacing: 2px;
  text-decoration: none; color: #7a7a7a;
  border-bottom: 3px solid transparent;
  transition: color 0.2s, border-color 0.2s;
  white-space: nowrap;
}
.cat-nav-link:hover         { color: #1a1a1a; border-bottom-color: #1a1a1a; }
.cat-nav-link.active        { color: #1a1a1a; border-bottom-color: #1a1a1a; }
~~~
5.2.3 footer.css
Footer do site
~~~css
/* ============================================
   MASK® — FOOTER
   ============================================ */

footer {
  background: #ffffff;
  color: #1a1a1a;
  padding: 50px 10%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
}

footer h4 {
  font-size: 0.8rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: #000;
  margin-bottom: 16px;
}

footer p,
footer a {
  font-size: 0.85rem;
  color: #666;
  text-decoration: none;
  line-height: 1.8;
  display: block;
  transition: color 0.2s;
}

footer a:hover { color: #000; }

.footer-brand img {
  height: 60px;
  filter: brightness(0);
  margin-bottom: 12px;
}

.footer-bottom {
  background: #f5f5f5;
  text-align: center;
  padding: 16px;
  font-size: 0.75rem;
  color: #777;
  text-transform: uppercase;
  letter-spacing: 1px;
}
~~~
5.2.4 header.css
Header do site 
~~~css
/* ============================================
   MASK® — HEADER / NAV
   ============================================ */

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #FFFFFF;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 2px solid #1a1a1a;
}

.logo { display: flex; align-items: center; }
.logo img { height: 70px; margin-right: 30px; }
.logo a { display: flex; align-items: center; }

nav {
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
}

nav ul:not(.icons) {
  display: flex;
  list-style: none;
  gap: 15px;
}

nav ul li a {
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #1a1a1a;
  transition: color 0.2s;
}
nav ul li a:hover { color: #7a7a7a; }

.icons {
  display: flex;
  list-style: none;
  gap: 20px;
  font-size: 1.4rem;
  align-items: center;
}
.icons a { text-decoration: none; position: relative; }

#toggle-dark {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: inherit;
}

/* Cart badge no header */
.cart-wrapper { position: relative; cursor: pointer; font-size: 1.4rem; }

.cart-count {
  position: absolute;
  top: -8px; right: -10px;
  background: #1a1a1a; color: #fff;
  font-size: 0.65rem; font-weight: 800;
  width: 18px; height: 18px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Barlow', sans-serif;
}
~~~
5.2.5 modal.css
Serve para o controle do modal do produto, controlando visual e aparencia.
~~~css
/* ============================================
   MASK® — PRODUCT MODAL
   ============================================ */

.modal-overlay {
  display: none; position: fixed; inset: 0;
  background: rgba(0,0,0,0.6); z-index: 9000;
  align-items: center; justify-content: center;
  padding: 20px; backdrop-filter: blur(3px);
}
.modal-overlay.active { display: flex; }

.modal {
  background: #fff; max-width: 950px; width: 100%;
  max-height: 90vh; overflow-y: auto;
  position: relative; border: 2px solid #1a1a1a;
  animation: modalIn 0.3s ease;
}

.modal-close {
  position: absolute; top: 16px; right: 16px;
  background: #1a1a1a; color: #fff;
  border: none; width: 36px; height: 36px;
  font-size: 1.2rem; cursor: pointer;
  z-index: 10; display: flex; align-items: center; justify-content: center;
  font-family: 'Barlow', sans-serif; font-weight: 700; transition: background 0.2s;
}
.modal-close:hover { background: #444; }

.modal-body { display: grid; grid-template-columns: 1fr 1fr; }

/* Gallery */
.modal-gallery { background: #f0f0f0; position: relative; min-height: 500px; }

.modal-main-img {
  width: 100%; height: 500px;
  object-fit: cover; display: block;
}

.modal-thumbs {
  display: flex; gap: 8px; padding: 12px;
  background: #e8e8e8; overflow-x: auto;
}
.modal-thumbs img {
  width: 70px; height: 70px;
  object-fit: cover; cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.2s; flex-shrink: 0;
}
.modal-thumbs img.active,
.modal-thumbs img:hover { border-color: #1a1a1a; }

/* Info panel */
.modal-info {
  padding: 40px 35px;
  display: flex; flex-direction: column; gap: 18px;
}
.modal-info .modal-cat {
  font-size: 0.75rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 3px; color: #7a7a7a;
}
.modal-info h2 {
  font-size: 1.8rem; font-weight: 900;
  text-transform: uppercase; letter-spacing: -0.5px;
  color: #1a1a1a; line-height: 1.1;
}
.modal-preco { font-size: 2rem; font-weight: 900; color: #1a1a1a; }
.modal-desc {
  font-size: 0.9rem; color: #555; line-height: 1.7;
  border-top: 1px solid #eee; padding-top: 16px;
}

.modal-section-label {
  font-size: 0.72rem; font-weight: 800;
  text-transform: uppercase; letter-spacing: 2px; color: #aaa; margin-bottom: 8px;
}

/* Tamanhos */
.modal-tamanhos { display: flex; gap: 8px; flex-wrap: wrap; }

.tamanho-btn {
  width: 46px; height: 46px; border: 2px solid #ccc;
  background: #fff; font-size: 0.8rem; font-weight: 800;
  text-transform: uppercase; cursor: pointer;
  transition: all 0.2s; font-family: 'Barlow', sans-serif; color: #1a1a1a;
}
.tamanho-btn:hover,
.tamanho-btn.selected { background: #1a1a1a; color: #fff; border-color: #1a1a1a; }

/* Cores */
.modal-cores { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }

.cor-dot {
  width: 28px; height: 28px; border-radius: 50%;
  border: 2px solid #ccc; cursor: pointer;
  transition: transform 0.2s, border-color 0.2s;
}
.cor-dot:hover,
.cor-dot.selected { transform: scale(1.2); border-color: #1a1a1a; }

.cor-nome {
  font-size: 0.78rem; font-weight: 600;
  text-transform: uppercase; letter-spacing: 1px; color: #555;
}

.modal-material {
  font-size: 0.85rem; color: #555;
  background: #f8f8f8; padding: 12px 16px;
  border-left: 3px solid #1a1a1a;
}

.btn-add-modal {
  padding: 16px; background: #1a1a1a; color: #fff;
  font-size: 0.85rem; font-weight: 800;
  text-transform: uppercase; letter-spacing: 3px;
  border: 2px solid #1a1a1a; cursor: pointer;
  transition: all 0.25s; font-family: 'Barlow', sans-serif; margin-top: auto;
}
.btn-add-modal:hover { background: #fff; color: #1a1a1a; }
~~~
5.2.6 toast.css
Serve para definir as notificações pequenas que aparecem no site
~~~css
/* ============================================
   MASK® — TOAST NOTIFICATION
   ============================================ */

.toast {
  position: fixed; bottom: 30px; left: 50%;
  transform: translateX(-50%) translateY(80px);
  background: #1a1a1a; color: #fff;
  padding: 14px 28px;
  font-size: 0.82rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 2px;
  z-index: 9999; border: 1px solid #444;
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
  white-space: nowrap;
  pointer-events: none;
}
.toast.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
~~~
5.3 pages
5.3.1 catalog.css
Define os estilos da pagina de catalogo.
~~~css
/* ============================================
   MASK® — CATALOG PAGE
   ============================================ */

/* Banner */
.category-banner {
  width: 100%; background-color: #1a1a1a; color: #fff;
  padding: 60px 10%;
  display: flex; align-items: flex-end; gap: 20px;
  position: relative; overflow: hidden;
}
.category-banner::before {
  content: '';
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background: repeating-linear-gradient(
    45deg, transparent, transparent 10px,
    rgba(255,255,255,0.02) 10px, rgba(255,255,255,0.02) 20px
  );
}
.category-banner h1 {
  font-family: 'Bebas Neue', 'Barlow', sans-serif;
  font-size: clamp(3.5rem, 8vw, 7rem);
  letter-spacing: 4px; text-transform: uppercase;
  color: #fff; line-height: 1; position: relative;
}
.category-banner p {
  font-size: 1rem; color: #aaa;
  text-transform: uppercase; letter-spacing: 2px;
  position: relative; padding-bottom: 8px;
}
.banner-text { display: flex; flex-direction: column; gap: 8px; }

/* Product section */
.produtos-section { padding: 60px 5%; background: #f8f8f8; }

.produtos-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 40px; padding-bottom: 20px;
  border-bottom: 2px solid #1a1a1a;
}
.produtos-header h2 {
  font-size: 1.5rem; font-weight: 800;
  text-transform: uppercase; letter-spacing: 2px;
}
.produtos-count {
  font-size: 0.9rem; color: #7a7a7a;
  font-weight: 600; text-transform: uppercase; letter-spacing: 1px;
}

/* Grid */
.produtos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
}

/* Product card */
.produto-card {
  background: #fff; border: 1px solid #e0e0e0;
  overflow: hidden; cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
}
.produto-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.12);
}

.produto-card-img {
  position: relative; height: 340px;
  overflow: hidden; background: #f0f0f0;
}
.produto-card-img img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.5s ease, opacity 0.4s;
  filter: grayscale(10%);
}

/* Flip on hover */
.produto-card:hover .img-front { opacity: 0; }
.img-back {
  position: absolute; top: 0; left: 0;
  width: 100%; height: 100%;
  opacity: 0; transition: opacity 0.4s; object-fit: cover;
}
.produto-card:hover .img-back { opacity: 1; }

/* Badge */
.produto-badge {
  position: absolute; top: 14px; left: 14px;
  background: #1a1a1a; color: #fff;
  font-size: 0.65rem; font-weight: 800;
  text-transform: uppercase; letter-spacing: 1.5px;
  padding: 5px 10px; z-index: 2;
}

/* Card info */
.produto-card-info { padding: 20px; border-top: 1px solid #e8e8e8; }
.produto-card-info h3 {
  font-size: 1rem; font-weight: 800;
  text-transform: uppercase; letter-spacing: 0.5px;
  margin-bottom: 6px; color: #1a1a1a;
}
.produto-card-info .desc {
  font-size: 0.82rem; color: #7a7a7a; margin-bottom: 12px; line-height: 1.4;
}

.produto-card-bottom {
  display: flex; align-items: center;
  justify-content: space-between; gap: 10px; flex-wrap: wrap;
}

.produto-preco { font-size: 1.2rem; font-weight: 900; color: #1a1a1a; letter-spacing: -0.5px; }

.tamanhos-mini { display: flex; gap: 5px; flex-wrap: wrap; }

.tamanho-tag {
  font-size: 0.65rem; font-weight: 700;
  border: 1px solid #ccc; padding: 3px 7px;
  text-transform: uppercase; color: #555;
  cursor: pointer; transition: all 0.2s;
}
.tamanho-tag:hover,
.tamanho-tag.selected { background: #1a1a1a; color: #fff; border-color: #1a1a1a; }

.btn-add-card {
  width: 100%; margin-top: 14px; padding: 12px;
  background: #1a1a1a; color: #fff;
  font-size: 0.8rem; font-weight: 800;
  text-transform: uppercase; letter-spacing: 2px;
  border: 2px solid #1a1a1a; cursor: pointer;
  transition: all 0.2s; font-family: 'Barlow', sans-serif;
}
.btn-add-card:hover  { background: #fff; color: #1a1a1a; }
.btn-add-card:active { transform: scale(0.98); }
~~~
5.3.2 home.css
Serve para estilizar a página inicial
~~~css
/* ============================================
   MASK® — HOME PAGE
   ============================================ */

/* Hero / Slider */
.hero {
  position: relative;
  height: 500px; width: 80%;
  margin: 40px auto;
  background-color: #f0f0f0;
  overflow: hidden;
  border: 1px solid #1a1a1a;
}

.slide {
  position: absolute; top: 0; left: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  z-index: 1;
}
.slide.active { opacity: 1; }

/* Categorias */
.categorias {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2px;
  padding: 20px;
  background-color: #eaeaea;
}

.categoria {
  position: relative; height: 500px;
  overflow: hidden; background-color: #FFFFFF;
  display: block; text-decoration: none;
}

.categoria img {
  width: 100%; height: 100%;
  object-fit: cover; filter: grayscale(20%); transition: 0.4s;
}
.categoria:hover img { filter: grayscale(0%); transform: scale(1.05); }

.overlay {
  position: absolute;
  top: 10%; left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255,255,255,0.9);
  padding: 10px 25px;
  border: 1px solid #1a1a1a;
}
.overlay h2 {
  font-size: 1.5rem; text-transform: uppercase;
  font-weight: 800; color: #1a1a1a; white-space: nowrap;
}

/* Sobre */
.sobre,
.informacoes { padding: 80px 10%; text-align: left; }

.sobre h2, .informacoes h2 {
  font-size: 3rem; margin-bottom: 40px;
  text-transform: uppercase; letter-spacing: -2px;
}

.fotos-sobre img {
  display: block; margin: 0 auto;
  width: 50%; height: 500px;
  object-fit: cover; object-position: top;
  border: 1px solid #1a1a1a;
}

/* Informações com logo flutuante */
.informacoes {
  display: flex; align-items: center;
  justify-content: space-between;
  padding: 40px; position: relative;
}

.informacoes-texto         { max-width: 400px; }
.informacoes-texto h2      { margin-bottom: 15px; font-size: 28px; }
.informacoes-texto p       { margin: 5px 0; font-size: 16px; }

.informacoes > img {
  max-width: 200px; height: auto;
  position: absolute; left: 50%;
  transform: translateX(-50%);
  animation: flutuar 3s ease-in-out infinite;
}
~~~
5.3.3 login.css
Contem os estilos da pagina inicial.
~~~css
/* ============================================
   MASK® — LOGIN PAGE
   ============================================ */

.login-body {
  height: 100vh; width: 100vw;
  font-family: 'Space Mono', monospace;
  background: var(--black);
  color: var(--white);
  overflow: hidden; position: relative;
}

.login-bg { position: fixed; inset: 0; overflow: hidden; }
.login-bg img {
  width: 100%; height: 100%;
  object-fit: cover;
  filter: brightness(0.70) saturate(0.9);
}

.login-bg-overlay {
  position: fixed; inset: 0;
  background: linear-gradient(
    135deg,
    rgba(0,0,0,0.4) 0%,
    rgba(0,0,0,0.1) 50%,
    rgba(0,0,0,0.5) 100%
  );
}

.login-page {
  position: relative; z-index: 10;
  display: flex; height: 100vh; width: 100vw;
  align-items: center; justify-content: flex-start;
  padding: 0 8vw; overflow-y: auto;
}

.login-card {
  width: 380px;
  background: var(--glass);
  backdrop-filter: blur(20px) saturate(1.2);
  border: 1px solid var(--border);
  border-radius: 4px; padding: 44px;
  animation: fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
}

.login-tagline {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 14px; letter-spacing: 5px;
  color: var(--accent); opacity: 0.9;
  margin-bottom: 32px; text-transform: uppercase;
}

/* Fields */
.login-field { margin-bottom: 20px; position: relative; }

.login-field label {
  display: block;
  font-size: 9px; letter-spacing: 3.5px;
  text-transform: uppercase; color: var(--accent);
  opacity: 0.8; margin-bottom: 8px;
}

.login-field input,
.login-field select {
  width: 100%;
  background: rgba(245, 240, 232, 0.07);
  border: 1px solid var(--border);
  border-bottom-color: rgba(245, 240, 232, 0.3);
  color: var(--white);
  font-family: 'Space Mono', monospace; font-size: 13px;
  padding: 13px 14px; outline: none; border-radius: 1px;
}

.login-field input::placeholder { color: rgba(245, 240, 232, 0.3); }

.login-field input:focus,
.login-field select:focus {
  border-color: rgba(245, 240, 232, 0.5);
  background: rgba(245, 240, 232, 0.1);
}

.login-field select option { background: #1a1a1a; color: var(--white); }

input[type="date"] { color-scheme: dark; }
input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(0.8); cursor: pointer;
}

/* Focus bar */
.login-field .bar {
  position: absolute; bottom: 0; left: 0;
  width: 100%; height: 1px;
  background: var(--white);
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.login-field input:focus + .bar { transform: scaleX(1); }

/* Button */
.login-btn {
  width: 100%; background: var(--white); color: var(--black);
  border: none; font-family: 'Bebas Neue', sans-serif;
  font-size: 16px; letter-spacing: 5px;
  padding: 16px; cursor: pointer; border-radius: 1px; margin-top: 4px;
}
.login-btn:hover { background: var(--accent); color: var(--black); }

/* Divider */
.login-divider {
  display: flex; align-items: center; gap: 14px; margin: 28px 0;
}
.login-divider::before, .login-divider::after {
  content: ''; flex: 1; height: 1px; background: var(--border);
}
.login-divider span {
  font-size: 9px; letter-spacing: 3px;
  text-transform: uppercase; color: rgba(245,240,232,0.4);
}

/* Switch link */
.login-switch {
  text-align: center; font-size: 10px;
  letter-spacing: 2px; text-transform: uppercase;
  color: rgba(245,240,232,0.5);
}
.login-switch a {
  color: var(--white); text-decoration: none;
  border-bottom: 1px solid rgba(245,240,232,0.4);
  padding-bottom: 1px; cursor: pointer; transition: border-color 0.2s;
}
.login-switch a:hover { border-color: var(--white); }

/* Validation */
.login-field input.invalid,
.login-field select.invalid {
  border-color: var(--error) !important;
  background: rgba(224, 112, 112, 0.07) !important;
}

.field-error {
  font-size: 9px; letter-spacing: 1.5px;
  color: var(--error); margin-top: 6px; display: none;
}
.field-error.show { display: block; }
~~~
5.4 utils
5.4.1 animations.css
Define as animaçoes do site.
~~~css
/* ============================================
   MASK® — ANIMAÇÕES
   ============================================ */

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes flutuar {
  0%   { transform: translate(-50%, 0px); }
  50%  { transform: translate(-50%, -15px); }
  100% { transform: translate(-50%, 0px); }
}

@keyframes modalIn {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

.panel-entering {
  animation: slideIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
}
~~~
5.4.2 dark-mode.css
Usado para fazer o darkmode do site.
~~~css
/* ============================================
   MASK® — DARK MODE
   ============================================ */

/* Base */
body.dark { background-color: #121212; color: #ffffff; }
body.dark h1, body.dark h2, body.dark h3, body.dark h4,
body.dark h5, body.dark h6, body.dark p, body.dark span,
body.dark li, body.dark strong { color: #ffffff; }
body.dark a   { color: #ffffff; }
body.dark p   { color: #d1d1d1; }

/* Logo swap */
.logo-dark { display: none; }
body.dark .logo-light { display: none; }
body.dark .logo-dark  { display: block; }

/* Header */
body.dark header { background-color: #1a1a1a; border-bottom: 1px solid #fff; }

/* Home sections */
body.dark .sobre,
body.dark .informacoes,
body.dark .categorias { background-color: #1a1a1a; }
body.dark .overlay h2  { color: #1a1a1a; }
body.dark .categoria   { filter: brightness(0.95); }
body.dark .informacoes > img { filter: brightness(0) invert(1); }

/* Catalog */
body.dark .produtos-section  { background: #181818; }
body.dark .produtos-header   { border-color: #333; }
body.dark .produtos-header h2 { color: #fff; }

/* Product card */
body.dark .produto-card             { background: #222; border-color: #333; }
body.dark .produto-card-info h3,
body.dark .produto-preco            { color: #fff; }
body.dark .produto-card-img         { background: #333; }
body.dark .btn-add-card             { background: #fff; color: #1a1a1a; border-color: #fff; }
body.dark .btn-add-card:hover       { background: #1a1a1a; color: #fff; border-color: #fff; }
body.dark .tamanho-tag:hover,
body.dark .tamanho-tag.selected     { background: #fff; color: #1a1a1a; }

/* Category nav */
body.dark .cat-nav                          { background: #1a1a1a; border-bottom-color: #333; }
body.dark .cat-nav-link                     { color: #777; }
body.dark .cat-nav-link:hover,
body.dark .cat-nav-link.active              { color: #fff; border-bottom-color: #fff; }

/* Category banner */
body.dark .category-banner { background-color: #0d0d0d; }

/* Modal */
body.dark .modal             { background: #1a1a1a; border-color: #444; }
body.dark .modal-info h2,
body.dark .modal-preco       { color: #fff; }
body.dark .modal-desc        { color: #ccc; border-top-color: #333; }
body.dark .modal-material    { background: #222; color: #ccc; }
body.dark .modal-gallery     { background: #222; }
body.dark .modal-thumbs      { background: #2a2a2a; }
body.dark .tamanho-btn       { background: #222; color: #fff; border-color: #444; }
body.dark .tamanho-btn:hover,
body.dark .tamanho-btn.selected { background: #fff; color: #1a1a1a; }
body.dark .cor-nome          { color: #ccc; }

/* Cart */
body.dark .cart-sidebar      { background: #1a1a1a; border-color: #333; }
body.dark .cart-header       { border-color: #333; }
body.dark .cart-header h3,
body.dark .cart-close        { color: #fff; }
body.dark .cart-item         { border-color: #333; }
body.dark .cart-item-info h4,
body.dark .cart-item-info .cart-item-preco { color: #fff; }
body.dark .cart-footer       { border-color: #333; }
body.dark .cart-total span,
body.dark .cart-total strong { color: #fff; }

/* Footer */
body.dark footer               { background: #111; color: #fff; }
body.dark footer h4            { color: #fff; }
body.dark footer p,
body.dark footer a             { color: #aaa; }
body.dark footer a:hover       { color: #fff; }
body.dark .footer-brand img    { filter: brightness(0) invert(1); }
body.dark .footer-bottom       { background: #000; color: #777; }
~~~
5.4.3 responsive.css
Usado para fazer a responsividade do site.
~~~css
/* ============================================
   MASK® — RESPONSIVO
   ============================================ */

@media (max-width: 900px) {
  header {
    flex-direction: column;
    padding: 20px;
    gap: 10px;
  }
  .logo img { margin-bottom: 10px; margin-right: 0; }

  nav { flex-direction: column; gap: 10px; width: 100%; }
  nav ul:not(.icons) { gap: 10px; flex-wrap: wrap; justify-content: center; }
  .icons { justify-content: center; }

  .hero { height: 300px; width: 95%; margin: 20px auto; }

  .informacoes { flex-direction: column; text-align: center; }
  .informacoes > img {
    position: static;
    transform: none;
    margin: 20px 0;
    animation: none;
  }

  .fotos-sobre img { width: 90%; height: 320px; }

  .modal-body { grid-template-columns: 1fr; }
  .modal-main-img { height: 320px; }
  .modal-info { padding: 24px 20px; }

  .cart-sidebar { width: 100vw; }

  .category-banner { padding: 40px 6%; }
  .category-banner h1 { font-size: clamp(2.5rem, 12vw, 5rem); }

  .produtos-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
  }
}

@media (max-width: 600px) {
  .produtos-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .produto-card-img { height: 220px; }
}

@media (max-width: 400px) {
  .produtos-grid { grid-template-columns: 1fr; }
}
~~~
6. global.css
Importa todos os css usados.
~~~css
/* ============================================
   MASK® — ENTRY POINT
   Importa todos os módulos de estilo.
   Apenas este arquivo é importado em index.js.
   ============================================ */

/* Base */
@import './base/variables.css';
@import './base/reset.css';
@import './base/typography.css';

/* Utilitários */
@import './utils/animations.css';
@import './utils/dark-mode.css';
@import './utils/responsive.css';

/* Componentes */
@import './components/header.css';
@import './components/footer.css';
@import './components/cart.css';
@import './components/modal.css';
@import './components/cat-nav.css';
@import './components/toast.css';

/* Páginas */
@import './pages/login.css';
@import './pages/home.css';
@import './pages/catalog.css';
~~~
