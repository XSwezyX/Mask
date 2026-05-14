import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';
import CatNav from '../components/CatNav';
import Toast from '../components/Toast';
import { useCart } from '../hooks/useCart';
import { useDarkMode } from '../hooks/useDarkMode';
import { useToast } from '../hooks/useToast';

const CATALOG_NAV = [
  { label: '!!NEW DROP!!', href: '/home#hero' },
  { label: 'Catálogo',     href: '/home'       },
  { label: 'Sobre nós',   href: '/home#sobre' },
];

export default function ProductPage({ produtos, categoria }) {
  const { idx } = useParams();
  const navigate = useNavigate();
  const produto = produtos[Number(idx)];

  const [dark, toggleDark] = useDarkMode();
  const { cart, addToCart, removeFromCart, total, count } = useCart();
  const showToast = useToast();

  const [cartOpen, setCartOpen]     = useState(false);
  const [mainImg, setMainImg]       = useState('');
  const [selectedTam, setSelectedTam] = useState('');
  const [selectedCor, setSelectedCor] = useState('');

  useEffect(() => {
    if (!produto) return;
    setMainImg(produto.imgs[0]);
    setSelectedCor(produto.cores[0]?.nome || '');
    window.scrollTo(0, 0);
  }, [produto]);

  if (!produto) {
    return (
      <div className="pp-not-found">
        <p>Produto não encontrado.</p>
        <button onClick={() => navigate(`/${categoria}`)}>← Voltar ao catálogo</button>
      </div>
    );
  }

  const fmt = (val) => 'R$ ' + val.toFixed(2).replace('.', ',');

  const handleAdd = () => {
    const ok = addToCart(produto.nome, produto.preco, produto.imgs[0], selectedTam, selectedCor);
    if (!ok) { showToast('Selecione um tamanho!'); return; }
    showToast('✓ Adicionado ao carrinho');
  };

  // Muda imagem principal ao trocar cor, se houver imagem correspondente
  const handleCorSelect = (cor) => {
    setSelectedCor(cor.nome);
    // tenta encontrar imagem com o nome da cor no path
    const match = produto.imgs.find(img =>
      img.toLowerCase().includes(cor.nome.toLowerCase().split(' ')[0])
    );
    if (match) setMainImg(match);
  };

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

      <main className="pp-wrapper">

        {/* BREADCRUMB */}
        <nav className="pp-breadcrumb">
          <Link to="/home">Home</Link>
          <span>›</span>
          <Link to={`/${categoria}`}>{produto.categoria}</Link>
          <span>›</span>
          <span>{produto.nome}</span>
        </nav>

        <div className="pp-body">

          {/* ── GALERIA ── */}
          <div className="pp-gallery">
            <div className="pp-main-img-wrap">
              {produto.badge && (
                <span className="pp-badge">{produto.badge}</span>
              )}
              <img
                className="pp-main-img"
                src={mainImg}
                alt={produto.nome}
              />
            </div>

            <div className="pp-thumbs">
              {produto.imgs.map((src, i) => (
                <button
                  key={i}
                  className={`pp-thumb${mainImg === src ? ' active' : ''}`}
                  onClick={() => setMainImg(src)}
                >
                  <img src={src} alt={`${produto.nome} ${i + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* ── INFO ── */}
          <div className="pp-info">
            <span className="pp-categoria">{produto.categoria}</span>
            <h1 className="pp-nome">{produto.nome}</h1>
            <div className="pp-preco">{fmt(produto.preco)}</div>
            <p className="pp-desc">{produto.descFull}</p>

            {/* CORES */}
            <div className="pp-section">
              <p className="pp-label">
                Cor: <strong>{selectedCor}</strong>
              </p>
              <div className="pp-cores">
                {produto.cores.map((c) => (
                  <button
                    key={c.nome}
                    className={`pp-cor-dot${selectedCor === c.nome ? ' selected' : ''}`}
                    style={{ background: c.hex }}
                    title={c.nome}
                    onClick={() => handleCorSelect(c)}
                    aria-label={c.nome}
                  />
                ))}
              </div>
            </div>

            {/* TAMANHOS */}
            <div className="pp-section">
              <p className="pp-label">Tamanho</p>
              <div className="pp-tamanhos">
                {produto.tamanhos.map((t) => (
                  <button
                    key={t}
                    className={`pp-tam-btn${selectedTam === t ? ' selected' : ''}`}
                    onClick={() => setSelectedTam(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* MATERIAL */}
            <div className="pp-material">
              <span>Material</span>
              <p>{produto.material}</p>
            </div>

            {/* CTA */}
            <button className="pp-btn-add" onClick={handleAdd}>
              Adicionar ao Carrinho
            </button>

            <button
              className="pp-btn-back"
              onClick={() => navigate(`/${categoria}`)}
            >
              ← Voltar ao catálogo
            </button>
          </div>

        </div>
      </main>

      <Footer />

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
