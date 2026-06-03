export function ConnectScreen() {
  const handleConnect = () => {
    // TODO: launchWebAuthFlow → signInWithIdToken → store session
  };

  return (
    <div>
      <h1>Avvy</h1>
      <p>Connect your Google Calendar to generate availability tables.</p>
      <button type="button" onClick={handleConnect}>
        Connect Google Calendar
      </button>
    </div>
  );
}
