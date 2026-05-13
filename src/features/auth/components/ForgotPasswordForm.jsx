import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Pencil, Eye, EyeOff } from "lucide-react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import ToastContainer from "../../../components/ui/ToastContainer";
import { forgotPassword, resetPassword, verifyOtp } from "../api";
import { myroutes } from "../../../routes/routes";
import useToast from "../../../hooks/useToast";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const { toasts, toast, removeToast } = useToast();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSendOtp(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await forgotPassword(email);
      toast.success(res.message);
      setStep(2);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp(e) {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Le code doit contenir 6 chiffres.");
      return;
    }
    setLoading(true);
    try {
      const res = await verifyOtp(email, otp);
      toast.success(res.message);
      setStep(3);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Code invalide ou expiré.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword(e) {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }
    if (password.length < 8) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    setLoading(true);
    try {
      const res = await resetPassword(email, otp, password, passwordConfirm);
      toast.success(res.message);
      setTimeout(() => navigate(myroutes.login), 2000);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fp-card">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Logo */}
      <div className="fp-inner">
      <div className="fp-logo">
        <div className="fp-logo-mark">
          <Pencil size={18} color="white" strokeWidth={2.5} />
        </div>
        <span className="fp-logo-name">MonBlog</span>
      </div>

        {/* Barre de progression */}
        <div className="fp-steps">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`fp-step ${step >= s ? "active" : ""}`} />
          ))}
        </div>

        {/* ── Étape 1 : email ── */}
        {step === 1 && (
          <>
            <h2 className="fp-title">Mot de passe oublié</h2>
            <p className="fp-subtitle">
              Entrez votre email, nous vous enverrons un code à 6 chiffres.
            </p>
            <form onSubmit={handleSendOtp}>
              <div style={{ marginBottom: "1.25rem" }}>
                <Input
                  label="Adresse email"
                  type="email"
                  icon={<Mail size={20} />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="fp-submit">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  loading={loading}
                >
                  Envoyer le code
                </Button>
              </div>
            </form>
          </>
        )}

        {/* ── Étape 2 : OTP ── */}
        {step === 2 && (
          <>
            <h2 className="fp-title">Vérification</h2>
            <p className="fp-subtitle">
              Code envoyé à{" "}
              <strong style={{ color: "#0284c7" }}>{email}</strong>. Vérifiez
              votre boîte mail.
            </p>
            <form onSubmit={handleVerifyOtp}>
              <div className="otp-row">
                {Array.from({ length: 6 }).map((_, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className="otp-input"
                    value={otp[i] || ""}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/, "");
                      const arr = otp.split("");
                      arr[i] = val;
                      setOtp(arr.join("").slice(0, 6));
                      if (val && i < 5)
                        document.getElementById(`otp-${i + 1}`)?.focus();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !otp[i] && i > 0)
                        document.getElementById(`otp-${i - 1}`)?.focus();
                    }}
                    onPaste={(e) => {
                      e.preventDefault();
                      const pasted = e.clipboardData
                        .getData("text")
                        .replace(/\D/g, "")
                        .slice(0, 6);
                      setOtp(pasted);
                      document
                        .getElementById(`otp-${Math.min(pasted.length, 5)}`)
                        ?.focus();
                    }}
                  />
                ))}
              </div>
              <div className="fp-submit">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  loading={loading}
                >
                  Vérifier le code
                </Button>
              </div>
            </form>
            <div className="fp-back">
              Pas reçu ?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleSendOtp(e);
                }}
              >
                Renvoyer
              </a>
            </div>
          </>
        )}

        {/* ── Étape 3 : nouveau mot de passe ── */}
        {step === 3 && (
          <>
            <h2 className="fp-title">Nouveau mot de passe</h2>
            <p className="fp-subtitle">Choisissez un mot de passe sécurisé.</p>
            <form onSubmit={handleResetPassword}>
              <div style={{ marginBottom: "1rem" }}>
                <div className="password-wrap">
                  <Input
                    label="Nouveau mot de passe"
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
                    {showPassword ? <Eye size={17} /> : <EyeOff size={17} />}
                  </button>
                </div>
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <div className="password-wrap">
                  <Input
                    label="Confirmer le mot de passe"
                    type={showConfirm ? "text" : "password"}
                    icon={<Lock size={20} />}
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    error={
                      passwordConfirm && password !== passwordConfirm
                        ? "Les mots de passe ne correspondent pas"
                        : undefined
                    }
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    {showConfirm ? <Eye size={17} /> : <EyeOff size={17} />}
                  </button>
                </div>
              </div>
              <div className="fp-submit">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  loading={loading}
                >
                  Réinitialiser le mot de passe
                </Button>
              </div>
            </form>
          </>
        )}
      </div>

      <div className="fp-back" style={{ marginTop: "1.5rem" }}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate(myroutes.login);
          }}
        >
          ← Retour à la connexion
        </a>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
