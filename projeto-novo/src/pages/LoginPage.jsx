import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ——— Validators ———
const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const validPassword = (v) => /[!@#$%^&*()\-_=+[\]{};:'",.<>?/\\|`~]/.test(v);
const validPhone = (v) => /^\(\d{2}\)\d{4,5}-\d{4}$/.test(v);

const EMPTY = { email: '', password: '', phone: '', birth: '', gender: '' };

// ✅ Mantido fora (correto)
const Field = ({ id, label, error, children }) => (
  <div className="login-field">
    <label htmlFor={id}>{label}</label>
    {children}
    <div className="bar" />
    {error && <span className="field-error show">{error}</span>}
  </div>
);

export default function LoginPage() {
  const navigate = useNavigate();
  const [panel, setPanel] = useState('login');

  // Login state
  const [login, setLogin] = useState({ email: '', password: '' });
  const [loginErr, setLoginErr] = useState({});

  // Register state
  const [reg, setReg] = useState(EMPTY);
  const [regErr, setRegErr] = useState({});

  const switchPanel = (to) => {
    setPanel(to);
    setLoginErr({});
    setRegErr({});
  };

  // ——— Phone mask ———
  const maskPhone = (v) => {
    let d = v.replace(/\D/g, '').slice(0, 11);
    if (d.length > 6) {
      const sep = d.length === 11 ? 7 : 6;
      d = `(${d.slice(0,2)})${d.slice(2, sep)}-${d.slice(sep)}`;
    } else if (d.length > 2) d = `(${d.slice(0,2)})${d.slice(2)}`;
    else if (d.length > 0) d = `(${d}`;
    return d;
  };

  // ——— Login submit ———
  const handleLogin = () => {
    const errs = {};
    if (!login.email) errs.email = 'O e-mail não pode estar vazio.';
    else if (!validEmail(login.email)) errs.email = 'E-mail inválido. Use o formato: nome@dominio.com';
    if (!login.password) errs.password = 'A senha não pode estar vazia.';
    setLoginErr(errs);
    if (Object.keys(errs).length) return;
    localStorage.setItem('user', login.email);
    navigate('/home');
  };

  // ——— Register submit ———
  const handleRegister = () => {
    const errs = {};
    if (!reg.email) errs.email = 'O e-mail não pode estar vazio.';
    else if (!validEmail(reg.email)) errs.email = 'E-mail inválido.';
    if (!reg.password) errs.password = 'A senha não pode estar vazia.';
    else if (!validPassword(reg.password)) errs.password = 'A senha precisa ter ao menos um caractere especial.';
    if (!reg.phone) errs.phone = 'O telefone não pode estar vazio.';
    else if (!validPhone(reg.phone)) errs.phone = 'Formato inválido. Use: (11)91234-5678';
    if (!reg.birth) errs.birth = 'Selecione sua data de nascimento.';
    if (!reg.gender) errs.gender = 'Selecione uma opção de gênero.';
    setRegErr(errs);
    if (Object.keys(errs).length) return;
    localStorage.setItem('userData', JSON.stringify(reg));
    navigate('/home');
  };

  return (
    <div className="login-body">
      <div className="login-bg">
        <img src="/Pack de Roupas Mask/Maski.jpeg" alt="Background" />
      </div>
      <div className="login-bg-overlay" />

      <main className="login-page">
        <div className="login-card">

          {/* ——— LOGIN ——— */}
          {panel === 'login' && (
            <div className="panel-entering">
              <p className="login-tagline">Member Access</p>

              <Field id="email" label="E-mail" error={loginErr.email}>
                <input
                  id="email" type="email" placeholder="seu@email.com" autoComplete="off"
                  value={login.email}
                  className={loginErr.email ? 'invalid' : ''}
                  onChange={(e) => { setLogin({ ...login, email: e.target.value }); setLoginErr({ ...loginErr, email: '' }); }}
                />
              </Field>

              <Field id="password" label="Senha" error={loginErr.password}>
                <input
                  id="password" type="password" placeholder="••••••••"
                  value={login.password}
                  className={loginErr.password ? 'invalid' : ''}
                  onChange={(e) => { setLogin({ ...login, password: e.target.value }); setLoginErr({ ...loginErr, password: '' }); }}
                />
              </Field>

              <div style={{ marginBottom: 12 }} />
              <button className="login-btn" onClick={handleLogin}>Entrar</button>

              <div className="login-divider"><span>ou</span></div>
              <p className="login-switch">
                Ainda não tem conta?{' '}
                <a onClick={() => switchPanel('register')}>Criar conta</a>
              </p>
            </div>
          )}

          {/* ——— REGISTER ——— */}
          {panel === 'register' && (
            <div className="panel-entering">
              <p className="login-tagline">Criar conta</p>

              <Field id="reg-email" label="E-mail" error={regErr.email}>
                <input
                  id="reg-email" type="email" placeholder="seu@email.com"
                  value={reg.email}
                  className={regErr.email ? 'invalid' : ''}
                  onChange={(e) => { setReg({ ...reg, email: e.target.value }); setRegErr({ ...regErr, email: '' }); }}
                />
              </Field>

              <Field id="reg-password" label="Senha" error={regErr.password}>
                <input
                  id="reg-password" type="password" placeholder="Mín. 1 caractere especial (#@$!...)"
                  value={reg.password}
                  className={regErr.password ? 'invalid' : ''}
                  onChange={(e) => { setReg({ ...reg, password: e.target.value }); setRegErr({ ...regErr, password: '' }); }}
                />
              </Field>

              <Field id="reg-phone" label="Telefone" error={regErr.phone}>
                <input
                  id="reg-phone" type="tel" placeholder="(11)91234-5678" maxLength={14}
                  value={reg.phone}
                  className={regErr.phone ? 'invalid' : ''}
                  onChange={(e) => { setReg({ ...reg, phone: maskPhone(e.target.value) }); setRegErr({ ...regErr, phone: '' }); }}
                />
              </Field>

              <Field id="reg-birth" label="Data de nascimento" error={regErr.birth}>
                <input
                  id="reg-birth" type="date"
                  value={reg.birth}
                  className={regErr.birth ? 'invalid' : ''}
                  onChange={(e) => { setReg({ ...reg, birth: e.target.value }); setRegErr({ ...regErr, birth: '' }); }}
                />
              </Field>

              <Field id="reg-gender" label="Gênero" error={regErr.gender}>
                <select
                  id="reg-gender"
                  value={reg.gender}
                  className={regErr.gender ? 'invalid' : ''}
                  onChange={(e) => { setReg({ ...reg, gender: e.target.value }); setRegErr({ ...regErr, gender: '' }); }}
                >
                  <option value="">Selecione</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="nao">Prefiro não comentar</option>
                </select>
              </Field>

              <button className="login-btn" onClick={handleRegister}>Cadastrar</button>

              <div className="login-divider"><span>ou</span></div>
              <p className="login-switch">
                Já tem conta? <a onClick={() => switchPanel('login')}>Entrar</a>
              </p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}