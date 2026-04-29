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
