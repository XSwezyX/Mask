import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';
import Toast from '../components/Toast';
import { useCart } from '../hooks/useCart';
import { useDarkMode } from '../hooks/useDarkMode';
import { useToast } from '../hooks/useToast';

const SLIDES = [
  '/Pack de roupas MASK pt2/Dark Gray-front-20260407.png',
  '/Pack de roupas MASK pt2/CLOUD CALCA MASK.png',
  '/Pack de roupas MASK pt2/SHORTS MASK PW.png',
  '/Pack de roupas MASK pt2/MOLETOM M ESSENTIAL GREEN.png',
];

const HOME_NAV = [
  { label: '!!NEW DROP!!', href: '#hero'  },
  { label: 'Sobre nós',    href: '#sobre' },
];

export default function HomePage() {
  const [dark, toggleDark] = useDarkMode();
  const { cart, removeFromCart, total, count } = useCart();
  const showToast = useToast();

  const [cartOpen, setCartOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(
      () => setActiveSlide((i) => (i + 1) % SLIDES.length),
      3000
    );
    return () => clearInterval(timer);
  }, []);

  // Close cart on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setCartOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <Toast />

      <Header
        dark={dark}
        toggleDark={toggleDark}
        cartCount={count}
        onCartOpen={() => setCartOpen(true)}
        navLinks={HOME_NAV}
      />

      {/* HERO SLIDER */}
      <section id="hero" className="hero">
        {SLIDES.map((src, i) => (
          <img
            key={src}
            className={`slide${activeSlide === i ? ' active' : ''}`}
            src={src}
            alt={`Slide ${i + 1}`}
          />
        ))}
      </section>

      {/* CATEGORIAS */}
      <main>
        <section className="categorias">
          <Link to="/camisetas" className="categoria" id="categoria">
            <img src="/Pack de Roupas Mask/Modelo camisetas.jpg" alt="Camisetas" />
            <div className="overlay"><h2>Camisetas</h2></div>
          </Link>

          <Link to="/shorts" className="categoria">
            <img src="/Pack de Roupas Mask/Modelo shorts.jpeg" alt="Shorts" />
            <div className="overlay"><h2>Shorts</h2></div>
          </Link>

          <Link to="/calcas" className="categoria">
            <img src="/Pack de Roupas Mask/Modelo calça.jpeg" alt="Calças" />
            <div className="overlay"><h2>Calças</h2></div>
          </Link>

          <Link to="/moletons" className="categoria">
            <img src="/Pack de Roupas Mask/Modelo moletom.jpg" alt="Moletons" />
            <div className="overlay"><h2>Moletons</h2></div>
          </Link>
        </section>

        {/* SOBRE */}
        <section id="sobre" className="sobre">
          <h2 className="type">Sobre a Mask</h2>
          <p>
            A Mask nasceu com a ideia de criar roupas que representem atitude,
            identidade e cultura urbana. Inspirada no streetwear moderno,
            a marca busca trazer peças únicas que expressem personalidade
            e estilo. Cada coleção é pensada para quem quer se destacar
            e mostrar sua visão através da moda.
          </p>
          <div className="fotos-sobre">
            <img src="/Pack de Roupas Mask/foto-sobre-1.jpeg" alt="Sobre" />
          </div>
        </section>

        {/* INFORMAÇÕES */}
        <section id="informacoes" className="informacoes">
          <div className="informacoes-texto">
            <h2 className="type">Informações</h2>
            <p><strong>Telefone:</strong> (11) 99999-9999</p>
            <p><strong>Email:</strong> maskcompany@email.com</p>
            <p><strong>Endereço:</strong> São Paulo - SP</p>
            <p><strong>Horário:</strong> Seg - Sex / 9h às 18h</p>
          </div>
          <img
            src="/Pack de Roupas Mask/masklogo-removebg-preview.png"
            alt="Mask Logo"
          />
        </section>
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
