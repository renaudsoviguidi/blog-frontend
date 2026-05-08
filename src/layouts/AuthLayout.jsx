export default function AuthLayout({ children }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=DM+Sans:wght@300;400;500&display=swap');

        .auth-root { min-height: 100vh; display: flex; font-family: 'DM Sans', sans-serif; background: #f0f7ff; }

        /* ── Panneau gauche ── */
        .auth-panel { display: none; position: relative; overflow: hidden;
                      background: linear-gradient(145deg, #0ea5e9 0%, #0284c7 40%, #0369a1 100%); }
        @media (min-width: 1024px) {
          .auth-panel { display: flex; flex: 1; flex-direction: column;
                        justify-content: space-between; padding: 3rem; }
        }
        .panel-dots { position: absolute; inset: 0;
                      background-image: radial-gradient(circle, rgba(255,255,255,0.12) 1.5px, transparent 1.5px);
                      background-size: 28px 28px; }
        .panel-blob { position: absolute; border-radius: 50%;
                      background: rgba(255,255,255,0.07); filter: blur(40px); }
        .panel-quote { position: relative; z-index: 2; padding: 2rem;
                       background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
                       border-radius: 1.25rem; backdrop-filter: blur(8px); }
        .panel-quote blockquote { font-family: 'Playfair Display', serif; font-size: 1.35rem;
                                  color: white; line-height: 1.55; margin: 0 0 1rem; }
        .panel-avatar-row { display: flex; align-items: center; gap: .75rem; }
        .panel-avatar { width: 2.5rem; height: 2.5rem; border-radius: 50%;
                        background: linear-gradient(135deg, #bae6fd, #7dd3fc);
                        display: flex; align-items: center; justify-content: center;
                        font-weight: 600; color: #0c4a6e; font-size: .9rem; }
        .panel-author { color: rgba(255,255,255,0.85); font-size: .85rem; }
        .panel-author strong { display: block; color: white; font-size: .9rem; }

        /* ── Côté formulaire ── */
        .auth-form-side { flex: 1; display: flex; flex-direction: column;
                          justify-content: center; align-items: center; padding: 2rem 1.5rem; }

        /* ── Carte commune ── */
        .auth-card { width: 100%; max-width: 420px; animation: fadeUp .45s ease both; }
        .auth-logo { display: flex; align-items: center; gap: .6rem; margin-bottom: 2.5rem; }
        .auth-logo-mark { width: 2.25rem; height: 2.25rem;
                          background: linear-gradient(135deg, #38bdf8, #0284c7);
                          border-radius: .6rem; display: flex; align-items: center; justify-content: center; }
        .auth-logo-name { font-family: 'Playfair Display', serif; font-size: 1.4rem;
                          font-weight: 600; color: #0c4a6e; }
        .auth-title { font-family: 'Playfair Display', serif; font-size: 1.9rem;
                      font-weight: 600; color: #0c4a6e; margin: 0 0 .4rem; line-height: 1.2; }
        .auth-subtitle { color: #64748b; font-size: .9rem; margin: 0 0 2rem; font-weight: 300; }

        /* Tabs */
        .auth-tabs { display: flex; background: #e0f2fe; border-radius: .75rem;
                     padding: .25rem; margin-bottom: 1.75rem; gap: .25rem; }
        .auth-tab { flex: 1; padding: .5rem; border: none; background: transparent;
                    border-radius: .55rem; font-size: .875rem; font-weight: 500;
                    color: #64748b; cursor: pointer; transition: all .2s ease;
                    font-family: 'DM Sans', sans-serif; }
        .auth-tab.active { background: white; color: #0284c7;
                           box-shadow: 0 1px 4px rgba(2,132,199,0.15); }

        /* Input overrides */
        .auth-card input[type="email"],
        .auth-card input[type="password"],
        .auth-card input[type="text"]:not(.otp-input) {
          border-radius: 0 !important; border: none !important;
          font-family: 'DM Sans', sans-serif !important; font-size: .9rem !important;
        }
        .auth-card input[type="text"]:not(.otp-input):focus,
        .auth-card input[type="email"]:focus,
        .auth-card input[type="password"]:focus {
          border-color: transparent !important; box-shadow: none !important;
        }
        .auth-card .text-xs.text-red-500:empty { display: none; }

        /* OTP */
        .otp-row { display: flex; gap: .75rem; justify-content: center; margin-bottom: 1.5rem; }
        .otp-input { width: 48px; height: 56px; text-align: center; font-size: 1.4rem;
                     font-weight: 600; color: #0c4a6e; background: #eff6ff;
                     border: 1.5px solid #bae6fd; border-radius: .75rem; outline: none;
                     transition: all .15s; font-family: 'DM Sans', sans-serif; }
        .otp-input:focus { border-color: #0284c7; box-shadow: 0 0 0 3px rgba(2,132,199,0.15); }

        /* Card inner (ForgotPassword) */
        .auth-inner { background: white; border-radius: 1.25rem; padding: 2rem;
                      box-shadow: 0 4px 24px rgba(2,132,199,0.08); border: 1px solid #e0f2fe; }

        /* Steps */
        .auth-steps { display: flex; gap: .5rem; margin-bottom: 2rem; }
        .auth-step { flex: 1; height: 4px; border-radius: 2px;
                     background: #e0f2fe; transition: background .3s; }
        .auth-step.active { background: #0284c7; }

        /* Button Google */
        .btn-google button {
          width: 100% !important; justify-content: center !important;
          background: white !important; color: #334155 !important;
          border: 1.5px solid #e2e8f0 !important; border-radius: .75rem !important;
          box-shadow: none !important; margin-bottom: 1.25rem;
          font-family: 'DM Sans', sans-serif !important;
        }
        .btn-google button:hover:not(:disabled) {
          border-color: #bae6fd !important; background: #f8fafc !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06) !important; transform: none !important;
        }

        /* Button submit */
        .btn-submit button, .auth-submit button {
          width: 100% !important;
          background: linear-gradient(135deg, #38bdf8, #0284c7) !important;
          box-shadow: 0 4px 14px rgba(2,132,199,0.3) !important;
          border-radius: .75rem !important; font-family: 'DM Sans', sans-serif !important;
          font-size: .95rem !important; margin-top: .25rem; transition: all .2s ease !important;
        }
        .btn-submit button:hover:not(:disabled), .auth-submit button:hover:not(:disabled) {
          box-shadow: 0 6px 20px rgba(2,132,199,0.4) !important;
          transform: translateY(-1px) !important;
        }

        /* Alert */
        .auth-card .auth-alert-wrap > div { border-radius: .75rem !important;
                                            margin-bottom: 1rem; font-size: .85rem; }

        /* Password toggle */
        .password-wrap { position: relative; }
        .password-wrap > div { margin-bottom: 0 !important; }
        .toggle-password { position: absolute; right: .9rem; top: 50%;
                           transform: translateY(-50%); color: #94a3b8; cursor: pointer;
                           background: none; border: none; padding: 0; display: flex; }

        /* Forgot */
        .forgot-row { display: flex; justify-content: flex-end; margin: .25rem 0 .75rem; }
        .forgot-link { font-size: .8rem; color: #0284c7; text-decoration: none; font-weight: 500; }
        .forgot-link:hover { text-decoration: underline; }

        /* Footer / back */
        .auth-footer, .auth-back { margin-top: 2rem; text-align: center;
                                   font-size: .82rem; color: #64748b; }
        .auth-footer a, .auth-back a { color: #0284c7; font-weight: 500; text-decoration: none; }
        .auth-footer a:hover, .auth-back a:hover { text-decoration: underline; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .fp-root { min-height: 100vh; display: flex; align-items: center;
                   justify-content: center; background: #f0f7ff;
                   font-family: 'DM Sans', sans-serif; padding: 2rem 1.5rem; }
        .fp-card { width: 100%; max-width: 420px; animation: fadeUp .45s ease both; }
        .fp-logo { display: flex; align-items: center; gap: .6rem; margin-bottom: 2.5rem; }
        .fp-logo-mark { width: 2.25rem; height: 2.25rem; background: linear-gradient(135deg,#38bdf8,#0284c7);
                        border-radius: .6rem; display: flex; align-items: center; justify-content: center; }
        .fp-logo-name { font-family: 'Playfair Display', serif; font-size: 1.4rem;
                        font-weight: 600; color: #0c4a6e; }
        .fp-inner { background: white; border-radius: 1.25rem; padding: 2rem;
                    box-shadow: 0 4px 24px rgba(2,132,199,0.08); border: 1px solid #e0f2fe; }
        .fp-title { font-family: 'Playfair Display', serif; font-size: 1.75rem;
                    font-weight: 600; color: #0c4a6e; margin: 0 0 .4rem; }
        .fp-subtitle { color: #64748b; font-size: .9rem; margin: 0 0 2rem; font-weight: 300; }
        .fp-steps { display: flex; gap: .5rem; margin-bottom: 2rem; }
        .fp-step { flex: 1; height: 4px; border-radius: 2px; background: #e0f2fe; transition: background .3s; }
        .fp-step.active { background: #0284c7; }

        .otp-row { display: flex; gap: .75rem; justify-content: center; margin-bottom: 1.5rem; }
        .otp-input { width: 48px; height: 56px; text-align: center; font-size: 1.4rem;
                     font-weight: 600; color: #0c4a6e; background: #eff6ff;
                     border: 1.5px solid #bae6fd; border-radius: .75rem; outline: none;
                     transition: all .15s; font-family: 'DM Sans', sans-serif; }
        .otp-input:focus { border-color: #0284c7; box-shadow: 0 0 0 3px rgba(2,132,199,0.15); }

        .fp-card input[type="email"],
        .fp-card input[type="password"],
        .fp-card input[type="text"]:not(.otp-input) {
          border: none !important; border-radius: 0 !important;
          font-family: 'DM Sans', sans-serif !important; font-size: .9rem !important;
        }
        .fp-card input[type="text"]:not(.otp-input):focus,
        .fp-card input[type="email"]:focus,
        .fp-card input[type="password"]:focus {
          border-color: transparent !important; box-shadow: none !important;
        }

        .fp-submit button { width: 100% !important;
          background: linear-gradient(135deg,#38bdf8,#0284c7) !important;
          box-shadow: 0 4px 14px rgba(2,132,199,0.3) !important;
          border-radius: .75rem !important; font-family: 'DM Sans', sans-serif !important;
          font-size: .95rem !important; transition: all .2s ease !important; }
        .fp-submit button:hover:not(:disabled) {
          box-shadow: 0 6px 20px rgba(2,132,199,0.4) !important;
          transform: translateY(-1px) !important; }

        .password-wrap { position: relative; }
        .toggle-password { position: absolute; right: .9rem; top: 50%; transform: translateY(-50%);
                           color: #94a3b8; cursor: pointer; background: none; border: none;
                           padding: 0; display: flex; }

        .fp-back { margin-top: 1.5rem; text-align: center; font-size: .82rem; color: #64748b; }
        .fp-back a { color: #0284c7; font-weight: 500; text-decoration: none; }
        .fp-back a:hover { text-decoration: underline; }

        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      <div className="auth-root">
        {/* Panneau gauche décoratif */}
        <div className="auth-panel">
          <div className="panel-dots" />
          <div
            className="panel-blob"
            style={{ width: 300, height: 300, top: -80, right: -60 }}
          />
          <div
            className="panel-blob"
            style={{ width: 200, height: 200, bottom: 40, left: -40 }}
          />
          {/* Quote */}
          <div />
          <div className="panel-quote">
            <blockquote>
              "Écrire, c'est aussi une façon de penser à voix haute."
            </blockquote>
            <div className="panel-avatar-row">
              <div className="panel-avatar">AD</div>
              <div className="panel-author">
                <strong>Alex Dupont</strong>
                Rédacteur en chef
              </div>
            </div>
          </div>
        </div>

        {/* Contenu injecté */}
        <div className="auth-form-side">{children}</div>
      </div>
    </>
  );
}
