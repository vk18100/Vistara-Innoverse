"use client";

import { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  title: string;
  description?: string;
  children?: ReactNode;
  onClose: () => void;
};

export default function Modal({
  open,
  title,
  description,
  children,
  onClose,
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">

      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">

        <div className="flex items-start justify-between gap-4">

          <div>
            <h2 className="text-xl font-semibold text-[#03045e]">
              {title}
            </h2>

            {description && (
              <p className="mt-2 text-sm leading-6 text-gray-500">
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          >
            ×
          </button>

        </div>

        {children && (
          <div className="mt-6">
            {children}
          </div>
        )}

      </div>
    </div>
  );
}