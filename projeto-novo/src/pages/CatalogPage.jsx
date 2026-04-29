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

const CATALOG_NAV = [
  { label: '!!NEW DROP!!', href: '/home#hero'    },
  { label: 'Catálogo',     href: '/home'         },
  { label: 'Sobre nós',   href: '/home#sobre'   },
];

export default function CatalogPage({ title, produtos }) {
  const [dark, toggleDark] = useDarkMode();
  const { cart, addToCart, removeFromCart, total, count } = useCart();
  const showToast = useToast();

  const [cartOpen, setCartOpen]     = useState(false);
  const [modalProd, setModalProd]   = useState(null); // produto aberto no modal
  const [selectedTams, setSelectedTams] = useState({}); // { idx: tamanho }

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
