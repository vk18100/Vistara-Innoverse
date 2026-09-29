"use client";

import { useEffect, useRef, useState } from "react";

type DropdownProps = {
  label: string;
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
};

export default function Dropdown({
  label,
  options,
  value,
  onChange,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(options[0] ?? "");

  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected = value ?? internalValue;

  /* Close dropdown when clicking outside */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* Handle selection */
  const handleSelect = (option: string) => {
    setInternalValue(option);
    onChange?.(option);
    setOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative w-full"
    >
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-left text-sm transition hover:border-[#03045E] focus:outline-none focus:ring-2 focus:ring-[#03045E]/20"
      >
        <span>
          <span className="block text-xs text-gray-400">
            {label}
          </span>

          <span className="mt-1 block font-medium text-gray-800">
            {selected || "Select"}
          </span>
        </span>

        <span
          className={`text-gray-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          ↓
        </span>
      </button>

      {/* Options */}
      {open && options.length > 0 && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white p-1 shadow-[0_15px_40px_rgba(3,4,94,0.12)]"
        >
          {options.map((option) => {
            const isSelected = selected === option;

            return (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option)}
                className={`block w-full rounded-lg px-4 py-3 text-left text-sm transition ${
                  isSelected
                    ? "bg-[#EEF2FF] font-semibold text-[#03045E]"
                    : "text-gray-700 hover:bg-[#F5F7FF] hover:text-[#03045E]"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}