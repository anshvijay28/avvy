import { GoogleSignInButton } from "./GoogleSignInButton";
import "./ConnectScreen.css";

export function ConnectScreen() {
  const handleSignUp = () => {
    // UI-only stub; OAuth wiring comes later
  };

  return (
    <div className="connect-screen">
      <div className="connect-screen__logo">Avvy</div>
      <h1 className="connect-screen__headline">
        Turn your calendar into availability
      </h1>
      <p className="connect-screen__subtext">
        Connect Google Calendar to generate copy-pasteable availability tables
        in seconds.
      </p>
      <div className="connect-screen__cta">
        <GoogleSignInButton onClick={handleSignUp} />
      </div>
      <p className="connect-screen__footer muted">
        We&apos;ll ask for read-only calendar access
      </p>
    </div>
  );
}
