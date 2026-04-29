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
