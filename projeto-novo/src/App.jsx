import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage   from './pages/LoginPage';
import HomePage    from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import { camisetas, shorts, calcas, moletons } from './data/products';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"      element={<LoginPage />} />
        <Route path="/home"  element={<HomePage />} />

        {/* Catálogos */}
        <Route path="/camisetas" element={<CatalogPage title="Camisetas" produtos={camisetas} categoria="camisetas" />} />
        <Route path="/shorts"    element={<CatalogPage title="Shorts"    produtos={shorts}    categoria="shorts"    />} />
        <Route path="/calcas"    element={<CatalogPage title="Calças"    produtos={calcas}    categoria="calcas"    />} />
        <Route path="/moletons"  element={<CatalogPage title="Moletons"  produtos={moletons}  categoria="moletons"  />} />

        {/* Páginas de produto (rota dinâmica) */}
        <Route path="/camisetas/:idx" element={<ProductPage produtos={camisetas} categoria="camisetas" />} />
        <Route path="/shorts/:idx"    element={<ProductPage produtos={shorts}    categoria="shorts"    />} />
        <Route path="/calcas/:idx"    element={<ProductPage produtos={calcas}    categoria="calcas"    />} />
        <Route path="/moletons/:idx"  element={<ProductPage produtos={moletons}  categoria="moletons"  />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
