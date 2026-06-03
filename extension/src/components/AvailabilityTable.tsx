import type { FreeSlot } from "../shared/types";

type Props = {
  slots: FreeSlot[];
};

export function AvailabilityTable({ slots }: Props) {
  const handleCopy = () => {
    // TODO: copy formatted table to clipboard
  };

  if (slots.length === 0) {
    return <p>No availability generated yet.</p>;
  }

  return (
    <div>
      <ul>
        {slots.map((slot) => (
          <li key={slot.date}>{slot.label}</li>
        ))}
      </ul>
      <button type="button" onClick={handleCopy}>
        Copy to clipboard
      </button>
    </div>
  );
}
