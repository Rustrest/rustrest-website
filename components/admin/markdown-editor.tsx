"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { Bold, Code, Eye, Heading2, ImagePlus, Italic, Link2, List, Pencil, Upload, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MarkdownContent } from "@/components/markdown/markdown-content";
import { cn } from "@/lib/utils";

function ToolbarButton({
  icon: Icon,
  label,
  onClick,
  active,
}: {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "flex h-7 w-7 items-center justify-center rounded text-muted hover:bg-background hover:text-foreground",
        active && "bg-background text-foreground"
      )}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

export function MarkdownEditor({
  value,
  onChange,
  placeholder,
  minHeight = "h-64",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<"write" | "preview">("write");
  const [imagePanelOpen, setImagePanelOpen] = useState(false);
  const [imageUrlDraft, setImageUrlDraft] = useState("");
  const [imageAltDraft, setImageAltDraft] = useState("");

  function focusSelection(start: number, end: number) {
    requestAnimationFrame(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      textarea.focus();
      textarea.setSelectionRange(start, end);
    });
  }

  function wrapSelection(prefix: string, suffix: string = prefix) {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const { selectionStart, selectionEnd } = textarea;
    const selected = value.slice(selectionStart, selectionEnd);
    const next =
      value.slice(0, selectionStart) + prefix + selected + suffix + value.slice(selectionEnd);
    onChange(next);
    focusSelection(selectionStart + prefix.length, selectionStart + prefix.length + selected.length);
  }

  function prefixLine(prefix: string) {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const { selectionStart } = textarea;
    const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1;
    const next = value.slice(0, lineStart) + prefix + value.slice(lineStart);
    onChange(next);
    focusSelection(selectionStart + prefix.length, selectionStart + prefix.length);
  }

  function insertAtCursor(text: string) {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const { selectionStart, selectionEnd } = textarea;
    const next = value.slice(0, selectionStart) + text + value.slice(selectionEnd);
    onChange(next);
    const cursor = selectionStart + text.length;
    focusSelection(cursor, cursor);
  }

  function insertCodeBlock() {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const { selectionStart, selectionEnd } = textarea;
    const selected = value.slice(selectionStart, selectionEnd) || "code here";
    const fenced = "```\n" + selected + "\n```\n";
    const next = value.slice(0, selectionStart) + fenced + value.slice(selectionEnd);
    onChange(next);
    const cursor = selectionStart + 4;
    focusSelection(cursor, cursor + selected.length);
  }

  function handleLink() {
    const url = window.prompt("Link URL");
    if (!url) return;
    const textarea = textareaRef.current;
    const selected = textarea ? value.slice(textarea.selectionStart, textarea.selectionEnd) : "";
    insertAtCursor(`[${selected || "link text"}](${url})`);
  }

  function toggleImagePanel() {
    setImagePanelOpen((open) => {
      if (open) return false;
      setImageUrlDraft("");
      setImageAltDraft("");
      return true;
    });
  }

  function handleInsertImageUrl() {
    if (!imageUrlDraft.trim()) return;
    insertAtCursor(`![${imageAltDraft}](${imageUrlDraft.trim()})\n`);
    setImagePanelOpen(false);
  }

  function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    insertAtCursor(`![${file.name}](${objectUrl})\n`);
  }

  function triggerImageUpload() {
    fileInputRef.current?.click();
  }

  return (
    <div className="rounded-md border border-border bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-y-1 border-b border-border px-2 py-1.5">
        <div className="flex items-center gap-1">
          {mode === "write" && (
            <>
              <ToolbarButton icon={Bold} label="Bold" onClick={() => wrapSelection("**")} />
              <ToolbarButton icon={Italic} label="Italic" onClick={() => wrapSelection("_")} />
              <ToolbarButton icon={Heading2} label="Heading" onClick={() => prefixLine("## ")} />
              <ToolbarButton icon={List} label="Bulleted list" onClick={() => prefixLine("- ")} />
              <ToolbarButton icon={Code} label="Code block" onClick={insertCodeBlock} />
              <ToolbarButton icon={Link2} label="Insert link" onClick={handleLink} />
              <ToolbarButton icon={ImagePlus} label="Image URL" onClick={toggleImagePanel} active={imagePanelOpen} />
              <ToolbarButton icon={Upload} label="Upload image" onClick={triggerImageUpload} />
            </>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            size="sm"
            variant={mode === "write" ? "secondary" : "ghost"}
            onClick={() => setMode("write")}
          >
            <Pencil className="h-3.5 w-3.5" />
            Write
          </Button>
          <Button
            type="button"
            size="sm"
            variant={mode === "preview" ? "secondary" : "ghost"}
            onClick={() => setMode("preview")}
          >
            <Eye className="h-3.5 w-3.5" />
            Preview
          </Button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleImageUpload}
      />

      {mode === "write" && imagePanelOpen && (
        <div className="space-y-3 border-b border-border p-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex-1">
              <label className="mb-1 block text-sm text-muted">Image URL</label>
              <Input
                autoFocus
                value={imageUrlDraft}
                onChange={(e) => setImageUrlDraft(e.target.value)}
                placeholder="https://example.com/image.png"
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-sm text-muted">Alt text (optional)</label>
              <Input
                value={imageAltDraft}
                onChange={(e) => setImageAltDraft(e.target.value)}
                placeholder="Describe the image"
              />
            </div>
          </div>

          {imageUrlDraft.trim() && (
            <div className="overflow-hidden rounded-md border border-border bg-background">
              {/* eslint-disable-next-line @next/next/no-img-element -- previewing an arbitrary pasted URL, not a static asset */}
              <img
                src={imageUrlDraft.trim()}
                alt={imageAltDraft || "Preview"}
                className="max-h-48 w-full object-contain"
              />
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => setImagePanelOpen(false)}>
              Cancel
            </Button>
            <Button type="button" size="sm" onClick={handleInsertImageUrl} disabled={!imageUrlDraft.trim()}>
              Insert
            </Button>
          </div>
        </div>
      )}

      {mode === "write" ? (
        <textarea
          ref={textareaRef}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full resize-y rounded-b-md bg-transparent p-3 text-sm text-foreground outline-none",
            minHeight
          )}
        />
      ) : (
        <div className={cn("overflow-y-auto p-4", minHeight)}>
          {value.trim() ? (
            <MarkdownContent content={value} />
          ) : (
            <p className="text-sm text-muted">Nothing to preview yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
