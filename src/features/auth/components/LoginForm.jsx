import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Alert from "../../../components/ui/Alert";
import { Eye, EyeOff, Lock, Mail, Pencil, User } from "lucide-react";
import ToastContainer from "../../../components/ui/ToastContainer";
import { useToast } from "../../../hooks/useToast";
import { myroutes } from "../../../routes/routes";


function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" style={{ width: "1.1rem", height: "1.1rem" }}>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}


const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;


const LoginForm = () => {
  const { login, register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const googleBtnRef = useRef(null);

  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toasts, toast, removeToast } = useToast();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      let message;

      if (mode === "login") {
        message = await login(email, password);

        toast.success(message);
        setTimeout(() => navigate(myroutes.homepage), 2000);
      } else {
        if (!name.trim()) {
          toast.error("Le nom complet est requis.");
          setLoading(false);
          return;
        }

        if (password !== password_confirmation) {
          toast.error("Les mots de passe ne correspondent pas.");
          setLoading(false);
          return;
        }

        if (password.length < 8) {
          toast.error("Le mot de passe doit contenir au moins 8 caractères.");
          setLoading(false);
          return;
        }
        message = await register(name, email, password, password_confirmation);

        toast.success(message);
        setTimeout(() => navigate(myroutes.login + "?registered=1"), 2000);
      }
    } catch (err) {
      const message =
        err?.response?.data?.message || "Une erreur est survenue.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (params.get("registered") === "1") {
      toast.info(
        "Inscription réussie ! Vérifiez votre email pour activer votre compte.",
      );
    }
    if (params.get("verified") === "1") {
      toast.success("Compte activé ! Vous pouvez maintenant vous connecter.");
    }
    if (params.get("error") === "link_expired") {
      toast.error("Ce lien a expiré. Demandez un nouveau lien.");
    }
    if (params.get("error") === "already_verified") {
      toast.info("Votre compte est déjà activé.");
    }
    if (params.get("error") === "invalid_link") {
      toast.error("Lien invalide.");
    }


    // Injection du script si pas encore présent
    if (!document.getElementById("google-gsi-script")) {
      const script = document.createElement("script");
      script.id = "google-gsi-script";
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      script.onload = initGoogle;
    } else {
      // Script déjà présent (HMR, navigation retour…)
      initGoogle();
    }

    return () => {
      // Nettoyage : révoque le one-tap si l'utilisateur quitte la page
      window.google?.accounts.id.cancel();
    };
  }, []);

  function initGoogle() {
    if (!window.google) return;

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleCallback, // appelé après consentement
      auto_select: false,
      cancel_on_tap_outside: true,
    });
  }

  /// ─ Callback reçu après que Google renvoie le credential
  async function handleGoogleCallback({ credential }) {
    setGoogleLoading(true);
    try {
      const message = await loginWithGoogle(credential); // credential = JWT signé par Google
      toast.success(message ?? "Connexion Google réussie");
      navigate(myroutes.homepage);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Erreur lors de la connexion Google.";
      toast.error(message);
    } finally {
      setGoogleLoading(false);
    }
  }

  /// ─ Déclenché au clic sur le bouton "Continuer avec Google"
  function handleGoogle() {
    if (!window.google) {
      toast.error("Le SDK Google n'est pas encore chargé. Réessayez.");
      return;
    }
    // Ouvre la popup de sélection de compte Google
    window.google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        // One-tap bloqué (navigateur, cookie…) → fallback popup OAuth classique
        window.google.accounts.id.renderButton(googleBtnRef.current, {
          type: "standard",
          shape: "rectangular",
          theme: "outline",
          text: "continue_with",
          size: "large",
          logo_alignment: "left",
          width: 380,
        });
        // Simule un clic sur le bouton rendu par Google
        googleBtnRef.current?.querySelector("div[role=button]")?.click();
      }
    });
  }

  return (
    <div className="auth-card">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      {/* Logo */}
      <div className="fp-inner">
      <div className="auth-logo">
        <div className="auth-logo-mark">
          <Pencil size={18} color="white" strokeWidth={2.5} />
        </div>
        <span className="auth-logo-name">MonBlog</span>
      </div>

      <h2 className="auth-title">
        {mode === "login" ? "Bon retour 👋" : "Créer un compte"}
      </h2>
      <p className="auth-subtitle">
        {mode === "login"
          ? "Connectez-vous pour retrouver vos articles."
          : "Rejoignez la communauté MonBlog."}
      </p>

      {/* Tabs */}
      <div className="auth-tabs">
        <button
          className={`auth-tab ${mode === "login" ? "active" : ""}`}
          onClick={() => {
            setMode("login");
            setPasswordConfirmation("");
            setError("");
          }}
        >
          Connexion
        </button>
        <button
          className={`auth-tab ${mode === "register" ? "active" : ""}`}
          onClick={() => {
            setMode("register");
            setPasswordConfirmation("");
            setError("");
          }}
        >
          Inscription
        </button>
      </div>

        <div ref={googleBtnRef} style={{ display: "none" }} />
      {/* Button — Google */}
      <div className="btn-google">
        <Button
          variant="secondary"
          size="md"
          loading={googleLoading}
          onClick={handleGoogle}
        >
          {!googleLoading && <GoogleIcon />}
          {googleLoading ? "Redirection…" : "Continuer avec Google"}
        </Button>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: ".75rem",
          marginBottom: "1.25rem",
          color: "#94a3b8",
          fontSize: ".8rem",
        }}
      >
        <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
        ou par email
        <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
      </div>

      <form onSubmit={handleSubmit}>
        {/* Alert */}
        <div className="auth-alert-wrap">
          <Alert message={error} variant="error" />
        </div>

        {/* Input — nom */}
        {mode === "register" && (
          <div style={{ marginBottom: "1rem" }}>
            <Input
              label="Nom complet"
              type="text"
              icon={<User size={20} />}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        {/* Input — email */}
        <div style={{ marginBottom: "1rem" }}>
          <Input
            label="Adresse email"
            type="email"
            icon={<Mail size={20} />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Input — mot de passe + toggle */}
        <div style={{ marginBottom: "1rem" }}>
          <div className="password-wrap">
            <Input
              label="Mot de passe"
              type={showPassword ? "text" : "password"}
              icon={<Lock size={20} />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <Eye className="w-[1.1rem]" />
              ) : (
                <EyeOff className="w-[1.1rem]" />
              )}
            </button>
          </div>
        </div>
        {/* Confirmation mot de passe — uniquement en mode register */}
        {mode === "register" && (
          <div style={{ marginBottom: "1rem" }}>
            <div className="password-wrap">
              <Input
                label="Confirmer le mot de passe"
                type={showConfirmPassword ? "text" : "password"}
                icon={<Lock size={20} />}
                value={password_confirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                error={
                  password_confirmation && password !== password_confirmation
                    ? "Les mots de passe ne correspondent pas"
                    : undefined
                }
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <Eye className="w-[1.1rem]" />
                ) : (
                  <EyeOff className="w-[1.1rem]" />
                )}
              </button>
            </div>
          </div>
        )}

        {mode === "login" && (
          <div className="forgot-row">
            <Link to={myroutes.forgotpassword} className="forgot-link">
              Mot de passe oublié ?
            </Link>
          </div>
        )}

        {/* Button — submit */}
        <div className="btn-submit">
          <Button type="submit" variant="primary" size="md" loading={loading}>
            {mode === "login" ? "Se connecter" : "Créer mon compte"}
          </Button>
        </div>
      </form>
      </div>

      <div className="auth-footer">
        {mode === "login" ? (
          <>
            Pas encore de compte ?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setMode("register");
              }}
            >
              S'inscrire
            </a>
          </>
        ) : (
          <>
            Déjà un compte ?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setMode("login");
              }}
            >
              Se connecter
            </a>
          </>
        )}
      </div>
    </div>
  );
}
export default LoginForm

