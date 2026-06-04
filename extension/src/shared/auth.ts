import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "./supabase";

const SESSION_KEY = "session";

function getRedirectUri(): string {
  // Web application OAuth client: no trailing slash (must match Google Cloud Authorized redirect URIs)
  return `https://${chrome.runtime.id}.chromiumapp.org`;
}

function launchWebAuthFlow(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    chrome.identity.launchWebAuthFlow({ url, interactive: true }, (redirectedTo) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }
      if (!redirectedTo) {
        reject(new Error("Sign-in was cancelled"));
        return;
      }
      resolve(redirectedTo);
    });
  });
}

export async function signInWithGoogle(): Promise<{ session: Session; user: User }> {
  const manifest = chrome.runtime.getManifest();
  const oauth2 = manifest.oauth2;
  if (!oauth2?.client_id || !oauth2.scopes?.length) {
    throw new Error("OAuth is not configured in manifest.json");
  }

  const redirectUri = getRedirectUri();

  const url = new URL("https://accounts.google.com/o/oauth2/auth");
  url.searchParams.set("client_id", oauth2.client_id);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "id_token");
  url.searchParams.set("scope", oauth2.scopes.join(" "));
  url.searchParams.set("access_type", "offline");

  const redirectedTo = await launchWebAuthFlow(url.href);
  const hash = new URL(redirectedTo).hash.substring(1);
  const params = new URLSearchParams(hash);
  const idToken = params.get("id_token");
  if (!idToken) {
    throw new Error("No ID token returned from Google");
  }

  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: "google",
    token: idToken,
  });
  if (error || !data.session) {
    throw new Error(error?.message ?? "Failed to create Supabase session");
  }

  await chrome.storage.local.set({ [SESSION_KEY]: data.session });
  return { session: data.session, user: data.session.user };
}

export async function restoreSession(): Promise<Session | null> {
  const { session } = await chrome.storage.local.get(SESSION_KEY);
  if (!session) return null;

  const { data, error } = await supabase.auth.setSession(session);
  if (error || !data.session) {
    await chrome.storage.local.remove(SESSION_KEY);
    return null;
  }

  await chrome.storage.local.set({ [SESSION_KEY]: data.session });
  return data.session;
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
  await chrome.storage.local.remove(SESSION_KEY);
}
