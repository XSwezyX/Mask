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
