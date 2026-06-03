import type { FormEvent } from "react";

type Props = {
  disabled?: boolean;
};

export function ChatInput({ disabled = true }: Props) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: POST /chat with message + current slots
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={
          disabled
            ? "Generate first to start refining"
            : "Refine your availability..."
        }
        disabled={disabled}
      />
      <button type="submit" disabled={disabled}>
        Send
      </button>
    </form>
  );
}
