"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

type DropdownProps = {
  label: string;
  options: string[];
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
};

export default function Dropdown({
  label,
  options,
  value,
  placeholder = "Select an option",
  disabled = false,
  onChange,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxId = useId();

  const selected = value !== undefined ? value : internalValue;

  /* Close on outside click */
  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open]);

  /* Close with Escape */
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleSelect = (option: string) => {
    setInternalValue(option);
    onChange?.(option);
    setOpen(false);

    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  };

  const handleToggle = () => {
    if (disabled || options.length === 0) return;

    setOpen((current) => !current);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative w-full"
    >
      {/* TRIGGER */}
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        className={`
          group flex w-full items-center justify-between
          rounded-2xl border bg-white
          px-4 py-3.5 text-left
          transition-all duration-200
          ${
            open
              ? "border-[#0D21A1] ring-4 ring-[#EEF4FF]"
              : "border-[#E2E8F0] hover:border-[#94A3B8]"
          }
          ${
            disabled
              ? "cursor-not-allowed bg-[#F8FAFC] opacity-60"
              : "cursor-pointer"
          }
        `}
      >
        <span className="min-w-0">
          {/* LABEL */}
          <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#64748B]">
            {label}
          </span>

          {/* VALUE */}
          <span
            className={`
              mt-1 block truncate text-sm font-semibold
              ${
                selected
                  ? "text-[#111827]"
                  : "text-[#94A3B8]"
              }
            `}
          >
            {selected || placeholder}
          </span>
        </span>

        {/* ARROW */}
        <span
          className={`
            ml-3 flex h-8 w-8 shrink-0 items-center justify-center
            rounded-full bg-[#F8FAFC]
            text-[#64748B]
            transition-all duration-200
            group-hover:bg-[#EEF4FF]
            group-hover:text-[#0D21A1]
            ${open ? "rotate-180 bg-[#EEF4FF] text-[#0D21A1]" : ""}
          `}
          aria-hidden="true"
        >
          <ChevronDown size={16} strokeWidth={2} />
        </span>
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          id={listboxId}
          role="listbox"
          aria-label={label}
          className="
            absolute left-0 right-0 top-full z-50 mt-2
            overflow-hidden rounded-2xl
            border border-[#E2E8F0]
            bg-white p-1.5
            shadow-[0_20px_50px_rgba(15,23,42,0.12)]
            animate-in fade-in slide-in-from-top-2
            duration-150
          "
        >
          {options.length > 0 ? (
            <div className="max-h-64 overflow-y-auto">
              {options.map((option) => {
                const isSelected = selected === option;

                return (
                  <button
                    key={option}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(option)}
                    className={`
                      flex w-full items-center justify-between
                      rounded-xl px-3.5 py-3
                      text-left text-sm
                      transition-colors duration-150
                      ${
                        isSelected
                          ? "bg-[#EEF4FF] font-semibold text-[#0D21A1]"
                          : "text-[#334155] hover:bg-[#F8FAFC] hover:text-[#0D21A1]"
                      }
                    `}
                  >
                    <span className="truncate">
                      {option}
                    </span>

                    {isSelected && (
                      <span className="ml-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0D21A1] text-white">
                        <Check size={14} strokeWidth={2.5} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="px-4 py-6 text-center">
              <p className="text-sm font-medium text-[#64748B]">
                No options available
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}