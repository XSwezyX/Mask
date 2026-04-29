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
