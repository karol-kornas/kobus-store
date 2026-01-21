import clsx from "clsx";

type SmartImageProps = {
  src?: string | null;
  srcSet?: string;
  sizes?: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  wrapClassName?: string;
  fallback?: React.ReactNode;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
};

export function SmartImage({
  src,
  srcSet,
  sizes,
  alt,
  width,
  height,
  className,
  wrapClassName,
  fallback,
  loading = "lazy",
  fetchPriority = "auto",
}: SmartImageProps) {
  return (
    <div className={clsx("relative overflow-hidden ", wrapClassName)}>
      {src ? (
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          fetchPriority={fetchPriority}
          decoding="async"
          className={clsx("text-transparent", className)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
          {fallback ?? "Brak zdjęcia"}
        </div>
      )}
    </div>
  );
}
