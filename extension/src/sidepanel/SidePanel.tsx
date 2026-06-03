import { ConnectScreen } from "../components/ConnectScreen";
import { AvailabilityTable } from "../components/AvailabilityTable";
import { ChatInput } from "../components/ChatInput";

export function SidePanel() {
  // TODO: check chrome.storage.local for session on mount
  const isConnected = false;
  const hasTable = false;

  if (!isConnected) {
    return <ConnectScreen />;
  }

  return (
    <div>
      <h1>Avvy</h1>
      {/* TODO: date range picker + generate button */}
      <AvailabilityTable slots={[]} />
      <ChatInput disabled={!hasTable} />
    </div>
  );
}
