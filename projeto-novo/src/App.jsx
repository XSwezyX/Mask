import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage   from './pages/LoginPage';
import HomePage    from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import { camisetas, shorts, calcas, moletons } from './data/products';

export default function App() {
  return (
    <BrowserRouter>
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
