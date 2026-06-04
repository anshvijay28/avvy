import { ConnectScreen } from "../components/ConnectScreen";
import { AvailabilityTable } from "../components/AvailabilityTable";
import { ChatInput } from "../components/ChatInput";

export function SidePanel() {
  // TODO: check chrome.storage.local for session on mount; route to main view when connected
  const isConnected = false;
  const hasTable = false;

  if (!isConnected) {
    return (
      <main className="panel">
        <ConnectScreen />
      </main>
    );
  }

  return (
    <main className="panel">
      <h1>Avvy</h1>
      {/* TODO: date range picker + generate button */}
      <AvailabilityTable slots={[]} />
      <ChatInput disabled={!hasTable} />
    </main>
  );
}
