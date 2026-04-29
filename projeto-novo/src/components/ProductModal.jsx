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
