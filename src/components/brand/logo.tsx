import Image from "next/image";
import { cn } from "@/lib/utils";
import { Wordmark } from "./wordmark";
import simbolo from "../../../public/brand/cv-simbolo.png";

type LogoProps = {
  className?: string;
  /** Altura do símbolo em px; o wordmark acompanha proporcionalmente. */
  size?: number;
  priority?: boolean;
};

/** Símbolo oficial (arquivo CV.png) + wordmark oficial vetorizado do PDF. */
export function Logo({ className, size = 36, priority = false }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Image
        src={simbolo}
        alt=""
        width={size}
        height={size}
        priority={priority}
        sizes={`${size}px`}
        className="shrink-0"
      />
      <Wordmark style={{ height: size * 0.5, width: "auto" }} />
    </span>
  );
}
