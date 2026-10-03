"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ImagePlus,
  Loader2,
  Plus,
  Star,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { ChangeEvent, DragEvent, useRef, useState } from "react";

type PhotoItem = {
  id: string;
  url: string;
  name: string;
  isCover: boolean;
};

const initialPhotos: PhotoItem[] = [
  {
    id: "photo-1",
    url: "/images/house.jpg",
    name: "house.jpg",
    isCover: true,
  },
  {
    id: "photo-2",
    url: "/images/beachhouse.jpg",
    name: "beachhouse.jpg",
    isCover: false,
  },
  {
    id: "photo-3",
    url: "/images/dubai.jpg",
    name: "dubai.jpg",
    isCover: false,
  },
  {
    id: "photo-4",
    url: "/images/big.jpg",
    name: "big.jpg",
    isCover: false,
  },
];

export default function PhotosPage() {
  const params = useParams();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const propertyId = params.id as string;

  const [photos, setPhotos] =
    useState<PhotoItem[]>(initialPhotos);

  const [isDragging, setIsDragging] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const maxPhotos = 12;

  function createPhoto(file: File): PhotoItem {
    return {
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      url: URL.createObjectURL(file),
      name: file.name,
      isCover: photos.length === 0,
    };
  }

  function addFiles(files: FileList | File[]) {
    const validFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/"),
    );

    if (!validFiles.length) {
      setError("Please select valid image files.");
      return;
    }

    const remaining = maxPhotos - photos.length;

    if (remaining <= 0) {
      setError(`You can upload up to ${maxPhotos} photos.`);
      return;
    }

    const selected = validFiles.slice(0, remaining);

    const newPhotos = selected.map(createPhoto);

    setPhotos((current) => [...current, ...newPhotos]);
    setError("");
  }

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    if (event.target.files) {
      addFiles(event.target.files);
    }

    event.target.value = "";
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.files) {
      addFiles(event.dataTransfer.files);
    }
  }

  function removePhoto(id: string) {
    setPhotos((current) => {
      const photo = current.find((item) => item.id === id);

      if (photo?.url.startsWith("blob:")) {
        URL.revokeObjectURL(photo.url);
      }

      const remaining = current.filter(
        (item) => item.id !== id,
      );

      if (
        photo?.isCover &&
        remaining.length > 0
      ) {
        return remaining.map((item, index) => ({
          ...item,
          isCover: index === 0,
        }));
      }

      return remaining;
    });
  }

  function setCover(id: string) {
    setPhotos((current) =>
      current.map((photo) => ({
        ...photo,
        isCover: photo.id === id,
      })),
    );
  }

  async function handleSave() {
    if (photos.length < 3) {
      setError(
        "Please add at least 3 photos before continuing.",
      );
      return;
    }

    try {
      setSaving(true);
      setError("");

      /*
       * Production API:
       *
       * const formData = new FormData();
       *
       * photos.forEach((photo) => {
       *   // Upload actual File objects here.
       * });
       *
       * await fetch(
       *   `/api/host/properties/${propertyId}/photos`,
       *   {
       *     method: "POST",
       *     body: formData,
       *   }
       * );
       */

      await new Promise((resolve) =>
        setTimeout(resolve, 900),
      );

      router.push(
        `/host/property/new/${propertyId}/guests`,
      );
    } catch {
      setError(
        "Something went wrong while saving your photos.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#FAF8F3] text-[#18181B]">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-black/8 bg-[#FAF8F3]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link
            href={`/host/property/new/${propertyId}/amenities`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#57534E] transition hover:text-[#18181B]"
          >
            <ArrowLeft size={17} />
            <span className="hidden sm:inline">
              Back
            </span>
          </Link>

          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A711E]">
              List your property
            </p>

            <p className="mt-1 text-xs text-[#78716C]">
              Photos
            </p>
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-[#D9A441] px-4 py-2.5 text-sm font-bold text-[#18181B] transition hover:bg-[#E7C46D] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <Loader2
                size={15}
                className="animate-spin"
              />
            ) : (
              <Check size={15} />
            )}

            <span className="hidden sm:inline">
              {saving ? "Saving..." : "Save & continue"}
            </span>

            <span className="sm:hidden">
              {saving ? "Saving" : "Save"}
            </span>
          </button>
        </div>
      </header>

      {/* PROGRESS */}
      <div className="border-b border-black/6 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-3 sm:px-8">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-semibold text-[#57534E]">
              Step 3 of 7
            </p>

            <p className="text-xs text-[#A8A29E]">
              {photos.length}/{maxPhotos} photos
            </p>
          </div>

          <div className="mt-2 h-1 overflow-hidden rounded-full bg-[#E9E5DB]">
            <div className="h-full w-[43%] rounded-full bg-[#D9A441]" />
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:py-12">
        {/* TITLE */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF8E8] text-[#9A711E]">
            <ImagePlus size={25} />
          </div>

          <h1 className="mt-5 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Show guests your space
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#78716C]">
            Great photos help guests understand your property
            before they book. Add your best photos and choose
            one as the cover image.
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mx-auto mt-7 flex max-w-3xl items-start gap-3 rounded-2xl border border-[#E7B7B0] bg-[#FFF1EF] p-4 text-sm text-[#873F36]">
            <X size={17} className="mt-0.5 shrink-0" />

            <div>
              <p className="font-bold">
                Something needs attention
              </p>

              <p className="mt-1">{error}</p>
            </div>

            <button
              type="button"
              onClick={() => setError("")}
              className="ml-auto"
            >
              <X size={15} />
            </button>
          </div>
        )}

        {/* UPLOAD */}
        <div className="mx-auto mt-9 max-w-5xl">
          <div
            onDragEnter={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={(event) => {
              event.preventDefault();
              setIsDragging(false);
            }}
            onDrop={handleDrop}
            className={`rounded-[28px] border-2 border-dashed p-6 transition sm:p-8 ${
              isDragging
                ? "border-[#D9A441] bg-[#FFF8E8]"
                : "border-[#D8D3C8] bg-white"
            }`}
          >
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5F2EB] text-[#9A711E]">
                <Upload size={23} />
              </div>

              <h2 className="mt-4 text-base font-bold">
                {isDragging
                  ? "Drop your photos here"
                  : "Add photos of your property"}
              </h2>

              <p className="mt-2 text-xs leading-5 text-[#78716C]">
                Drag and drop images here, or select them
                from your device.
              </p>

              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={photos.length >= maxPhotos}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#18181B] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#292524] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Plus size={16} />
                Add photos
              </button>

              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />

              <p className="mt-4 text-[11px] text-[#A8A29E]">
                JPG, PNG or WEBP · Up to {maxPhotos} photos
              </p>
            </div>
          </div>
        </div>

        {/* PHOTO GRID */}
        <section className="mx-auto mt-9 max-w-5xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A711E]">
                Your gallery
              </p>

              <h2 className="mt-1 font-serif text-2xl font-semibold">
                Property photos
              </h2>
            </div>

            <span className="text-xs text-[#78716C]">
              {photos.length} added
            </span>
          </div>

          {photos.length === 0 ? (
            <EmptyPhotos
              onAdd={() => inputRef.current?.click()}
            />
          ) : (
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {photos.map((photo, index) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  index={index}
                  onCover={() => setCover(photo.id)}
                  onRemove={() =>
                    removePhoto(photo.id)
                  }
                />
              ))}

              {photos.length < maxPhotos && (
                <button
                  type="button"
                  onClick={() =>
                    inputRef.current?.click()
                  }
                  className="group flex min-h-[190px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#D8D3C8] bg-white transition hover:border-[#D9A441] hover:bg-[#FFFDF7]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5F2EB] text-[#9A711E] transition group-hover:bg-[#FFF8E8]">
                    <Plus size={20} />
                  </span>

                  <span className="mt-3 text-sm font-bold">
                    Add another
                  </span>

                  <span className="mt-1 text-[11px] text-[#A8A29E]">
                    {maxPhotos - photos.length} slots left
                  </span>
                </button>
              )}
            </div>
          )}
        </section>

        {/* TIPS */}
        <section className="mx-auto mt-10 max-w-5xl rounded-[26px] border border-[#D9A441]/25 bg-[#FFF8E8] p-6 sm:p-7">
          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#9A711E] shadow-sm">
              <Star size={18} />
            </div>

            <div className="flex-1">
              <h3 className="font-serif text-xl font-semibold">
                Tips for better property photos
              </h3>

              <p className="mt-1 text-sm text-[#78716C]">
                Make your listing easier for guests to
                understand.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Tip text="Use bright, well-lit photos." />
                <Tip text="Show bedrooms and bathrooms clearly." />
                <Tip text="Include exterior and common areas." />
                <Tip text="Keep photos landscape where possible." />
                <Tip text="Avoid blurry or heavily edited images." />
                <Tip text="Choose your strongest image as the cover." />
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM NAV */}
        <div className="mx-auto mt-10 flex max-w-5xl items-center justify-between border-t border-black/8 pt-6">
          <Link
            href={`/host/property/new/${propertyId}/amenities`}
            className="inline-flex items-center gap-2 rounded-xl border border-black/8 bg-white px-4 py-3 text-sm font-bold text-[#57534E] transition hover:bg-[#F5F2EB]"
          >
            <ArrowLeft size={16} />
            Previous
          </Link>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-[#D9A441] px-5 py-3 text-sm font-bold text-[#18181B] transition hover:bg-[#E7C46D] disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2
                  size={16}
                  className="animate-spin"
                />
                Saving...
              </>
            ) : (
              <>
                Continue
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* PHOTO CARD                                                                  */
/* -------------------------------------------------------------------------- */

function PhotoCard({
  photo,
  index,
  onCover,
  onRemove,
}: {
  photo: PhotoItem;
  index: number;
  onCover: () => void;
  onRemove: () => void;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-[#ECE9E1] ${
        photo.isCover
          ? "ring-2 ring-[#D9A441] ring-offset-2"
          : ""
      }`}
    >
      <div className="aspect-[4/3]">
        <img
          src={photo.url}
          alt={`Property photo ${index + 1}`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-0 transition group-hover:opacity-100" />

      {/* COVER */}
      {photo.isCover && (
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-[#D9A441] px-2.5 py-1.5 text-[10px] font-bold text-[#18181B]">
          <Star
            size={11}
            fill="currentColor"
          />
          Cover
        </div>
      )}

      {/* INDEX */}
      <span className="absolute right-3 top-3 flex h-6 min-w-6 items-center justify-center rounded-full bg-black/50 px-1.5 text-[10px] font-bold text-white backdrop-blur">
        {index + 1}
      </span>

      {/* ACTIONS */}
      <div className="absolute inset-x-2 bottom-2 flex items-center justify-between gap-2 opacity-0 transition group-hover:opacity-100">
        {!photo.isCover ? (
          <button
            type="button"
            onClick={onCover}
            className="inline-flex items-center gap-1.5 rounded-lg bg-white/95 px-2.5 py-2 text-[10px] font-bold text-[#18181B] backdrop-blur"
          >
            <Star size={12} />
            Make cover
          </button>
        ) : (
          <span className="rounded-lg bg-black/45 px-2.5 py-2 text-[10px] font-semibold text-white backdrop-blur">
            Main photo
          </span>
        )}

        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove photo"
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/95 text-[#873F36] backdrop-blur transition hover:bg-white"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* EMPTY PHOTOS                                                                */
/* -------------------------------------------------------------------------- */

function EmptyPhotos({
  onAdd,
}: {
  onAdd: () => void;
}) {
  return (
    <div className="mt-5 rounded-[24px] border border-black/8 bg-white px-6 py-14 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5F2EB] text-[#9A711E]">
        <ImagePlus size={24} />
      </div>

      <h3 className="mt-4 font-serif text-xl font-semibold">
        No photos added yet
      </h3>

      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#78716C]">
        Add at least three clear photos to continue with
        your property listing.
      </p>

      <button
        type="button"
        onClick={onAdd}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#18181B] px-5 py-3 text-sm font-bold text-white"
      >
        <Plus size={16} />
        Add first photo
      </button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* TIP                                                                         */
/* -------------------------------------------------------------------------- */

function Tip({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[#9A711E]">
        <Check size={12} />
      </span>

      <p className="text-xs leading-5 text-[#57534E]">
        {text}
      </p>
    </div>
  );
}