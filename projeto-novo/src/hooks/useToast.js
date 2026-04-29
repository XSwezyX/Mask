import { useCallback, useRef } from 'react';

export function useToast() {
  const timerRef = useRef(null);

  const showToast = useCallback((msg) => {
    const toast = document.getElementById('mask-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => toast.classList.remove('show'), 2500);
  }, []);

  return showToast;
}
