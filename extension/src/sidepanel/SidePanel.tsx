import { useCallback, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { ConnectScreen } from "../components/ConnectScreen";
import { HomeScreen } from "../components/HomeScreen";
import { restoreSession, signOut } from "../shared/auth";
import { supabase } from "../shared/supabase";

export function SidePanel() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  const refreshUser = useCallback(async () => {
    const session = await restoreSession();
    setUser(session?.user ?? null);
  }, []);

  useEffect(() => {
    refreshUser().finally(() => setLoading(false));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, [refreshUser]);

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await signOut();
      setUser(null);
    } finally {
      setSigningOut(false);
    }
  };

  if (loading) {
    return (
      <main className="panel centered">
        <p className="muted">Loading…</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="panel">
        <ConnectScreen onSuccess={refreshUser} />
      </main>
    );
  }

  return (
    <main className="panel">
      <HomeScreen user={user} onSignOut={handleSignOut} signingOut={signingOut} />
    </main>
  );
}
