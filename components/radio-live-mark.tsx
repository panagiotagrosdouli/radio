import type { SVGProps } from "react";

export function RadioLiveMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
      <circle cx="24" cy="24" r="18" fill="#E3EF62" />
      <circle cx="24" cy="24" r="12.5" stroke="#172252" strokeWidth="1.25" opacity=".38" />
      <circle cx="24" cy="24" r="8" stroke="#172252" strokeWidth="1" opacity=".28" />
      <path d="M8 25h5.5l3.2-6 4.3 12 4.2-15 4.1 13 3-7h3.2" stroke="#172252" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="24" r="3.4" fill="#FF6548" stroke="#E3EF62" strokeWidth="1.3" />
    </svg>
  );
}
