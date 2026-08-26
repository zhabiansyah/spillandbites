"use client";

const STAR_PATH =
  "M12 2.5l2.9 6.1 6.6.7-4.9 4.5 1.3 6.6L12 16.9 6.1 20.4l1.3-6.6L2.5 9.3l6.6-.7L12 2.5z";

export default function RatingStars({
  rating,
  size = 18,
  className = "",
}: {
  rating: number;
  size?: number;
  className?: string;
}) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.25 && rating - full < 0.75;
  const total = 5;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: total }).map((_, i) => {
        const filled = i < full;
        const half = !filled && hasHalf && i === full;
        return (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className="shrink-0"
          >
            <defs>
              <linearGradient id={`star-half-${i}`}>
                <stop offset="50%" stopColor="#FF9900" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.2)" />
              </linearGradient>
            </defs>
            <path
              d={STAR_PATH}
              fill={
                filled
                  ? "#FF9900"
                  : half
                  ? `url(#star-half-${i})`
                  : "rgba(255,255,255,0.2)"
              }
            />
          </svg>
        );
      })}
    </div>
  );
}
