import Image from "next/image";

type VistaraLogoProps = {
  dark?: boolean;
};

export default function Logo({ dark = true }: VistaraLogoProps) {
  return (
    <div className="flex items-center gap-4">
      <Image
        src="/images/logo1.png"
        alt="Vistara"
        width={58}
        height={58}
        className={`h-[58px] w-[58px] object-contain ${
          dark ? "brightness-0 invert" : ""
        }`}
        priority
      />

      <span
        className={`
          font-serif
          text-[34px]
          font-bold
          leading-none
          tracking-[-0.04em]
          ${dark ? "text-white" : "text-[#03045E]"}
        `}
      >
        Vistara
      </span>
    </div>
  );
}