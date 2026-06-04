import { useState } from "react";
import { signInWithGoogle } from "../shared/auth";
import { GoogleSignInButton } from "./GoogleSignInButton";
import "./ConnectScreen.css";

type Props = {
  onSuccess: () => void;
  message?: string;
};

export function ConnectScreen({ onSuccess, message }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="connect-screen">
      <div className="connect-screen__logo">Avvy</div>
      <h1 className="connect-screen__headline">
        Turn your calendar into availability
      </h1>
      <p className="connect-screen__subtext">
        Sign in with Google to get started.
      </p>
      {message && <p className="connect-screen__message">{message}</p>}
      {error && <p className="connect-screen__error">{error}</p>}
      <div className="connect-screen__cta">
        <GoogleSignInButton
          onClick={handleSignIn}
          loading={loading}
          label="Sign in with Google"
        />
      </div>
    </div>
  );
}
