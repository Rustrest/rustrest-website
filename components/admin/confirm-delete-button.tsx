"use client";

import { useState } from "react";

export function ConfirmDeleteButton({ onConfirm }: { onConfirm: () => Promise<void> }) {
  const [confirming, setConfirming] = useState(false);
  const [pending, setPending] = useState(false);

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="text-red-400 hover:underline"
      >
        Delete
      </button>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 text-xs">
      <span className="text-muted">Delete?</span>
      <button
        type="button"
        onClick={async () => {
          setPending(true);
          await onConfirm();
        }}
        disabled={pending}
        className="font-medium text-red-400 hover:underline disabled:opacity-50"
      >
        {pending ? "Deleting…" : "Yes"}
      </button>
      <button
        type="button"
        onClick={() => setConfirming(false)}
        disabled={pending}
        className="text-muted hover:underline disabled:opacity-50"
      >
        Cancel
      </button>
    </span>
  );
}
