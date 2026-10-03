"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
};

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = "md",
}: ModalProps) {
  /* ---------------- ESCAPE KEY + BODY SCROLL ---------------- */

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  /* ---------------- SIZE ---------------- */

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      {/* BACKDROP */}

      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/30 backdrop-blur-[2px]"
      />

      {/* MODAL */}

      <div
        className={`
          relative
          w-full
          ${sizeClasses[size]}
          max-h-[90vh]
          overflow-hidden
          rounded-[28px]
          border border-[#E7E2D8]
          bg-white
          shadow-[0_25px_80px_rgba(41,37,36,0.18)]
          animate-in
          fade-in
          zoom-in-95
          duration-200
        `}
        onClick={(event) => event.stopPropagation()}
      >
        {/* HEADER */}

        {(title || description) && (
          <div className="flex items-start justify-between gap-5 border-b border-[#E7E2D8] px-5 py-5 sm:px-7 sm:py-6">
            <div className="min-w-0">
              {title && (
                <h2
                  id="modal-title"
                  className="font-serif text-xl font-semibold tracking-tight text-[#292524] sm:text-2xl"
                >
                  {title}
                </h2>
              )}

              {description && (
                <p className="mt-1.5 max-w-xl text-sm leading-6 text-[#756D63]">
                  {description}
                </p>
              )}
            </div>

            {/* CLOSE */}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-[#E7E2D8]
                text-[#78716C]
                transition
                hover:border-[#C6A15B]
                hover:bg-[#F7F3EA]
                hover:text-[#8B6F3D]
              "
            >
              <X size={17} strokeWidth={1.8} />
            </button>
          </div>
        )}

        {/* CONTENT */}

        <div className="max-h-[calc(90vh-100px)] overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
          {children}
        </div>
      </div>
    </div>
  );
}