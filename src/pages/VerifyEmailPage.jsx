import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import http from "../services/http";
import { myroutes } from "../routes/routes";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  /// - États pour le renvoi du lien
  const [email, setEmail] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [resendError, setResendError] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    const emailParam = searchParams.get("email");

    if (!token || !emailParam) {
      setStatus("error");
      setMessage("Lien invalide ou incomplet.");
      return;
    }

    /// - Pré-remplir l'email pour le formulaire de renvoi
    setEmail(emailParam);

    http
      .get(`api/auth/verify-email`, { params: { token, email: emailParam } })
      .then(() => {
        setStatus("success");
        setMessage("Compte activé avec succès !");
        // Redirige vers login après 3 secondes
        setTimeout(() => navigate(myroutes.login + "?verified=1"), 3000);
      })
      .catch((err) => {
        const code = err?.response?.status;
        if (code === 410) {
          setStatus("expired"); // nouveau statut dédié
          setMessage("Ce lien a expiré. Demandez un nouveau lien ci-dessous.");
        } else if (code === 409) {
          setStatus("error");
          setMessage("Ce compte est déjà activé. Vous pouvez vous connecter.");
          setTimeout(() => navigate(myroutes.login), 4000);
        } else {
          setStatus("error");
          setMessage("Lien invalide ou déjà utilisé.");
          setTimeout(() => navigate(myroutes.login), 4000);
        }
      });
  }, []);

  async function handleResend(e) {
    e.preventDefault();
    setResendLoading(true);
    setResendMessage("");
    setResendError("");

    try {
      await http.post("api/auth/resend-activation", { email });
      setResendMessage("Un nouveau lien a été envoyé à " + email);
    } catch (err) {
      const code = err?.response?.status;
      if (code === 409) {
        setResendError("Ce compte est déjà activé.");
      } else if (code === 404) {
        setResendError("Aucun compte trouvé avec cet email.");
      } else {
        setResendError("Une erreur est survenue. Réessayez.");
      }
    } finally {
      setResendLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@500;600&family=Plus+Jakarta+Sans:wght@300;400;500&display=swap');

        .verify-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f0f7ff;
          font-family: 'Plus Jakarta Sans', sans-serif;
          padding: 1.5rem;
        }

        .verify-card {
          background: white;
          border-radius: 1.25rem;
          padding: 3rem 2.5rem;
          max-width: 440px;
          width: 100%;
          text-align: center;
          box-shadow: 0 8px 40px rgba(2,132,199,0.1);
          border: 1px solid #e0f2fe;
          animation: fadeUp .4s ease both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .verify-logo {
          display: inline-flex;
          align-items: center;
          gap: .6rem;
          margin-bottom: 2rem;
        }
        .verify-logo-mark {
          width: 2.25rem; height: 2.25rem;
          background: linear-gradient(135deg, #38bdf8, #0284c7);
          border-radius: .6rem;
          display: flex; align-items: center; justify-content: center;
        }
        .verify-logo-name {
          font-family: 'Lora', serif;
          font-size: 1.3rem; font-weight: 600; color: #0c4a6e;
        }

        /* ── Icône animée ── */
        .verify-icon {
          width: 5rem; height: 5rem;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1.5rem;
          font-size: 2.25rem;
        }
        .verify-icon.loading {
          background: #e0f2fe;
          animation: pulse 1.4s ease-in-out infinite;
        }
        .verify-icon.success { background: #d1fae5; }
        .verify-icon.error   { background: #fee2e2; }

        @keyframes pulse {
          0%,100% { transform: scale(1); opacity: 1; }
          50%      { transform: scale(1.06); opacity: .7; }
        }

        /* Spinner pour loading */
        .verify-spinner {
          width: 2.5rem; height: 2.5rem;
          border: 3px solid #bae6fd;
          border-top-color: #0284c7;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .verify-title {
          font-family: 'Lora', serif;
          font-size: 1.4rem; font-weight: 600;
          margin-bottom: .75rem; line-height: 1.3;
        }
        .verify-title.loading { color: #0c4a6e; }
        .verify-title.success { color: #065f46; }
        .verify-title.error   { color: #991b1b; }

        .verify-message {
          font-size: .9rem; color: #64748b;
          line-height: 1.65; margin-bottom: 1.75rem; font-weight: 300;
        }

        .verify-redirect {
          font-size: .78rem; color: #94a3b8;
          margin-bottom: 1.5rem;
        }

        /* Progress bar de redirection */
        .verify-progress-wrap {
          height: 3px; background: #f1f5f9;
          border-radius: 2px; margin-bottom: 1.5rem; overflow: hidden;
        }
        .verify-progress-bar {
          height: 100%;
          border-radius: 2px;
          animation: progress linear forwards;
        }
        .verify-progress-bar.success {
          background: linear-gradient(90deg, #34d399, #059669);
          animation-duration: 3s;
        }
        .verify-progress-bar.error {
          background: linear-gradient(90deg, #fca5a5, #ef4444);
          animation-duration: 4s;
        }
        @keyframes progress {
          from { width: 100%; }
          to   { width: 0%; }
        }

        .verify-btn {
          display: inline-block;
          padding: .65rem 1.75rem;
          background: linear-gradient(135deg, #38bdf8, #0284c7);
          color: white; border: none; border-radius: .75rem;
          font-size: .9rem; font-weight: 600; cursor: pointer;
          font-family: 'Plus Jakarta Sans', sans-serif;
          box-shadow: 0 4px 14px rgba(2,132,199,0.3);
          transition: all .2s; text-decoration: none;
        }
        .verify-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(2,132,199,0.4); }
      `}</style>

      <div className="verify-root">
        <div className="verify-card">
          {/* Logo */}
          <div className="verify-logo">
            <div className="verify-logo-mark">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                style={{ width: "1rem" }}
                stroke="white"
                strokeWidth="2.5"
              >
                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
              </svg>
            </div>
            <span className="verify-logo-name">MonBlog</span>
          </div>

          {/* Icône selon le statut */}
          <div
            className={`verify-icon ${status === "expired" ? "error" : status}`}
          >
            {status === "loading" && <div className="verify-spinner" />}
            {status === "success" && <span>✅</span>}
            {status === "error" && <span>❌</span>}
            {status === "expired" && <span>⏰</span>}
          </div>

          {/* Titre */}
          <h1
            className={`verify-title ${status === "expired" ? "error" : status}`}
          >
            {status === "loading" && "Vérification en cours…"}
            {status === "success" && "Compte activé !"}
            {status === "error" && "Activation échouée"}
            {status === "expired" && "Lien expiré"}
          </h1>

          {/* Message */}
          <p className="verify-message">{message}</p>

          {/* Barre de progression + message de redirection */}
          {(status === "success" || status === "error") && (
            <>
              <div className="verify-progress-wrap">
                <div className={`verify-progress-bar ${status}`} />
              </div>
              <p className="verify-redirect">
                {status === "success"
                  ? "Redirection vers la connexion dans 3 secondes…"
                  : "Redirection vers la connexion dans 4 secondes…"}
              </p>
            </>
          )}

          {/* Formulaire de renvoi — uniquement si lien expiré */}
          {status === "expired" && (
            <form
              onSubmit={handleResend}
              style={{ marginTop: "1.5rem", textAlign: "left" }}
            >
              <div style={{ marginBottom: ".75rem" }}>
                <label
                  htmlFor="resend-email"
                  style={{
                    fontSize: ".8rem",
                    color: "#64748b",
                    display: "block",
                    marginBottom: ".4rem",
                  }}
                >
                  Adresse email
                </label>
                <input
                  id="resend-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: ".6rem .9rem",
                    border: "1px solid #e2e8f0",
                    borderRadius: ".6rem",
                    fontSize: ".9rem",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Message de succès */}
              {resendMessage && (
                <p
                  style={{
                    fontSize: ".82rem",
                    color: "#059669",
                    marginBottom: ".75rem",
                  }}
                >
                  ✅ {resendMessage}
                </p>
              )}

              {/* Message d'erreur */}
              {resendError && (
                <p
                  style={{
                    fontSize: ".82rem",
                    color: "#dc2626",
                    marginBottom: ".75rem",
                  }}
                >
                  ❌ {resendError}
                </p>
              )}

              <button
                type="submit"
                disabled={resendLoading}
                className="verify-btn"
                style={{ width: "100%", opacity: resendLoading ? 0.7 : 1 }}
              >
                {resendLoading ? "Envoi en cours…" : "Renvoyer le lien"}
              </button>
            </form>
          )}

          {/* Bouton de secours */}
          {status !== "loading" && (
            <button
              className="verify-btn"
              onClick={() => navigate(myroutes.login)}
            >
              Aller à la connexion
            </button>
          )}
        </div>
      </div>
    </>
  );
}
