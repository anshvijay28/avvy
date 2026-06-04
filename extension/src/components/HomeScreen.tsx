import type { User } from "@supabase/supabase-js";
import "./HomeScreen.css";

type Props = {
  user: User;
  onSignOut: () => void;
  signingOut?: boolean;
};

export function HomeScreen({ user, onSignOut, signingOut = false }: Props) {
  const email = user.email ?? "Signed in";
  const name = user.user_metadata?.full_name ?? user.user_metadata?.name;
  const avatar = user.user_metadata?.avatar_url ?? user.user_metadata?.picture;

  return (
    <div className="home-screen">
      <header className="home-screen__header">
        <span className="home-screen__logo">Avvy</span>
        <button
          type="button"
          className="home-screen__sign-out"
          onClick={onSignOut}
          disabled={signingOut}
        >
          {signingOut ? "Signing out…" : "Sign out"}
        </button>
      </header>

      <div className="home-screen__profile">
        {avatar && (
          <img className="home-screen__avatar" src={avatar} alt="" />
        )}
        <p className="home-screen__greeting">
          {name ? `Hi, ${name}` : "You're signed in"}
        </p>
        <p className="home-screen__email muted">{email}</p>
      </div>

      <div className="home-screen__placeholder">
        <p className="home-screen__placeholder-title">Availability generator</p>
        <p className="home-screen__placeholder-text muted">
          Calendar integration comes next. For now, sign-in is working.
        </p>
      </div>
    </div>
  );
}
