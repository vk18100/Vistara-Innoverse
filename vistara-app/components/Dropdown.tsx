"use client";

import { useState } from "react";

type DropdownProps = {
  label: string;
  options: string[];
};

export default function Dropdown({
  label,
  options,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  return (
    <div className="relative w-full">

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm hover:border-[#03045e]"
      >
        <span>
          <span className="block text-xs text-gray-400">
            {label}
          </span>

          <span className="mt-1 block font-medium text-gray-800">
            {selected}
          </span>
        </span>

        <span
          className={`text-gray-400 transition ${
            open ? "rotate-180" : ""
          }`}
        >
          ↓
        </span>
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">

          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
              className="block w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-[#f5f7ff] hover:text-[#03045e]"
            >
              {option}
            </button>
          ))}

        </div>
      )}
    </div>
  );
}