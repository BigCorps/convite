// ---------------------------------------------------------------------------
// Ornamentos SVG originais. Nada aqui é copiado de terceiros.
// Todas as cores saem das variáveis definidas em globals.css.
// ---------------------------------------------------------------------------

const PETALA =
  "M0 0 C -12 -5 -14 -17 -6 -21 C -2 -23 2 -23 6 -21 C 14 -17 12 -5 0 0 Z";

// Camadas da rosa: quantidade de pétalas, escala, tom, rotação inicial.
const CAMADAS: Array<[number, number, "claro" | "medio", number]> = [
  [6, 1.0, "claro", 0],
  [5, 0.72, "medio", 30],
  [4, 0.46, "medio", 58],
];

function Rosa({
  id,
  x,
  y,
  s = 1,
  rot = 0,
  claro = "var(--petala-clara)",
  medio = "var(--petala-media)",
  escuro = "var(--petala-escura)",
}: {
  id: number;
  x: number;
  y: number;
  s?: number;
  rot?: number;
  claro?: string;
  medio?: string;
  escuro?: string;
}) {
  const tons = { claro, medio };
  const semente = id * 37;

  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <circle r="21" fill={`url(#rosa-sombra-${id})`} />
      {CAMADAS.map(([n, escala, tom, deslocamento], ci) =>
        Array.from({ length: n }, (_, k) => {
          // Assimetria proposital: pétala perfeitamente regular parece adesivo.
          const ang =
            deslocamento + (k * 360) / n + (((semente + k * 17 + ci * 11) % 13) - 6);
          const esc = escala * (1 + (((semente + k * 7 + ci * 5) % 11) - 5) / 90);
          return (
            <path
              key={`${ci}-${k}`}
              d={PETALA}
              fill={tons[tom]}
              stroke={escuro}
              strokeOpacity="0.16"
              strokeWidth="0.7"
              transform={`rotate(${ang.toFixed(1)}) scale(${esc.toFixed(3)})`}
            />
          );
        })
      )}
      <path
        d="M0 -4.5 A4.5 4.5 0 1 1 -3.9 2.2 A6.2 6.2 0 1 0 5.6 -2.8"
        fill="none"
        stroke={escuro}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.62"
      />
    </g>
  );
}

function SombrasRosa() {
  return (
    <defs>
      {[0, 1, 2, 3].map((i) => (
        <radialGradient
          key={i}
          id={`rosa-sombra-${i}`}
          cx="42%"
          cy="34%"
          r="70%"
        >
          <stop offset="55%" stopColor="var(--petala-media)" stopOpacity="0" />
          <stop offset="100%" stopColor="var(--petala-escura)" stopOpacity="0.22" />
        </radialGradient>
      ))}
    </defs>
  );
}

function Ramo({
  d,
  folhas,
  cor = "var(--folha)",
}: {
  d: string;
  folhas: Array<[number, number, number, number]>; // x, y, rotação, escala
  cor?: string;
}) {
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke="var(--caule)"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      {folhas.map(([fx, fy, fr, fs], i) => (
        <g key={i} transform={`translate(${fx} ${fy}) rotate(${fr}) scale(${fs})`}>
          <ellipse rx="6.5" ry="12" fill={cor} opacity="0.88" />
          <path
            d="M0 -10 L0 10"
            stroke="var(--caule)"
            strokeWidth="0.6"
            opacity="0.4"
          />
        </g>
      ))}
    </g>
  );
}

/** Arranjo de canto. Espelhe com CSS (scaleX/scaleY) para os outros cantos. */
export function ArranjoCanto({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 220"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <SombrasRosa />
      <Ramo
        d="M4 118 C 40 112 66 92 84 62 C 96 42 104 24 106 6"
        folhas={[
          [18, 112, -28, 1],
          [36, 104, -34, 0.92],
          [54, 90, -44, 1.05],
          [70, 72, -52, 0.9],
          [84, 50, -62, 1],
          [95, 28, -70, 0.85],
          [30, 122, 148, 0.8],
          [58, 104, 140, 0.75],
        ]}
      />
      <Ramo
        d="M2 74 C 30 70 52 54 64 30 C 70 18 74 10 76 2"
        folhas={[
          [14, 70, -20, 0.8],
          [32, 60, -36, 0.85],
          [50, 42, -50, 0.78],
          [64, 20, -66, 0.7],
        ]}
        cor="var(--folha-clara)"
      />
      <Ramo
        d="M60 150 C 46 128 30 116 6 106"
        folhas={[
          [50, 138, 40, 0.7],
          [34, 124, 30, 0.66],
          [18, 112, 18, 0.6],
        ]}
        cor="var(--folha-clara)"
      />

      <Rosa id={0} x={34} y={38} s={1.35} rot={-12} />
      <Rosa
        id={1} x={74} y={82} s={1} rot={22}
        claro="var(--petala-clara-2)"
        medio="var(--petala-media-2)"
      />
      <Rosa id={2} x={14} y={92} s={0.78} rot={40} />
      <Rosa
        id={3} x={64} y={16} s={0.62} rot={-30}
        claro="var(--petala-clara-2)"
        medio="var(--petala-media-2)"
      />

      {[
        [96, 60], [104, 74], [90, 96], [30, 132], [46, 118], [12, 60],
      ].map(([bx, by], i) => (
        <circle key={i} cx={bx} cy={by} r={3.4} fill="var(--broto)" opacity="0.85" />
      ))}
    </svg>
  );
}

// O "M" do Pinyon Script tem entrada fina a esquerda e o "I" um floreio pesado
// a direita, entao o centro de massa da tinta cai 1,91 a direita e 3,79 acima
// do centro geometrico. Valores medidos, nao estimados.
const MONOGRAMA_X = -1.91;
const MONOGRAMA_Y = 3.79;

/** Lacre de cera com o monograma. */
export function Lacre({ iniciais }: { iniciais: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Lacre com as iniciais ${iniciais.split("").join(" e ")}`}
    >
      <defs>
        <radialGradient id="cera" cx="38%" cy="30%" r="78%">
          <stop offset="0%" stopColor="var(--cera-luz)" />
          <stop offset="52%" stopColor="var(--cera-meio)" />
          <stop offset="100%" stopColor="var(--cera-sombra)" />
        </radialGradient>
        <radialGradient id="cera-interna" cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor="var(--cera-meio)" />
          <stop offset="100%" stopColor="var(--cera-sombra)" />
        </radialGradient>
      </defs>

      <path
        d="M50 5 C 61 3 68 12 77 14 C 88 16 95 25 92 35 C 89 45 97 53 94 63
           C 91 73 81 77 75 85 C 69 93 57 97 47 93 C 37 89 27 93 19 87
           C 11 81 7 70 8 60 C 9 50 3 40 9 32 C 15 24 24 17 32 13 C 40 9 42 7 50 5 Z"
        fill="url(#cera)"
      />
      <circle cx="50" cy="50" r="34" fill="url(#cera-interna)" opacity="0.85" />
      <circle
        cx="50" cy="50" r="34"
        fill="none"
        stroke="var(--cera-sombra)"
        strokeWidth="1.6"
        opacity="0.55"
      />
      <circle
        cx="50" cy="49" r="31"
        fill="none"
        stroke="var(--cera-luz)"
        strokeWidth="0.9"
        opacity="0.5"
      />
      <text
        x={50 + MONOGRAMA_X} y={50 + MONOGRAMA_Y}
        textAnchor="middle"
        dominantBaseline="central"
        className="lacre-monograma"
        fill="var(--cera-sombra)"
      >
        {iniciais}
      </text>
      <text
        x={50 + MONOGRAMA_X} y={50 + MONOGRAMA_Y - 0.8}
        textAnchor="middle"
        dominantBaseline="central"
        className="lacre-monograma"
        fill="var(--cera-luz)"
        opacity="0.9"
      >
        {iniciais}
      </text>
    </svg>
  );
}

/** Raminho horizontal usado entre as seções, com uma rosa ao centro. */
export function RaminhoDivisor() {
  const direita: Array<[number, number, number, number]> = [
    [128, 20, 62, 0.62],
    [148, 17, 74, 0.54],
    [166, 15, 86, 0.46],
    [136, 26, 116, 0.5],
    [156, 24, 104, 0.42],
  ];
  const esquerda = direita.map(
    ([x, y, r, e]) => [220 - x, y, -r, e] as [number, number, number, number]
  );

  return (
    <svg
      className="raminho"
      viewBox="0 0 220 44"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <SombrasRosa />
      <path
        d="M120 21 C 140 19 164 18 186 21"
        fill="none"
        stroke="var(--caule)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M100 21 C 80 19 56 18 34 21"
        fill="none"
        stroke="var(--caule)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.8"
      />
      {[...direita, ...esquerda].map(([x, y, r, e], i) => (
        <ellipse
          key={i}
          rx="6.5"
          ry="12"
          fill={i % 3 === 0 ? "var(--folha)" : "var(--folha-clara)"}
          opacity="0.85"
          transform={`translate(${x} ${y}) rotate(${r}) scale(${e})`}
        />
      ))}
      <circle cx="196" cy="21" r="2.6" fill="var(--broto)" />
      <circle cx="24" cy="21" r="2.6" fill="var(--broto)" />
      <Rosa id={0} x={110} y={21} s={0.62} rot={-8} />
    </svg>
  );
}

/** Acento pequeno: um botão de rosa com duas folhas. */
export function Broto({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 60 60"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <SombrasRosa />
      <path
        d="M30 52 C 30 42 30 36 30 30"
        fill="none"
        stroke="var(--caule)"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <ellipse
        rx="5.5"
        ry="10"
        fill="var(--folha)"
        opacity="0.85"
        transform="translate(21 44) rotate(-34)"
      />
      <ellipse
        rx="5.5"
        ry="10"
        fill="var(--folha-clara)"
        opacity="0.85"
        transform="translate(39 44) rotate(34)"
      />
      <Rosa id={1} x={30} y={24} s={0.8} rot={10} />
    </svg>
  );
}

/** Filete vertical que separa as seções. */
export function Divisor() {
  return (
    <div className="divisor" aria-hidden="true">
      <RaminhoDivisor />
    </div>
  );
}

/** Padrao gravado usado no verso do envelope. */
export function PadraoGravado() {
  return (
    <svg
      className="gravado"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern
          id="folhagem"
          width="88"
          height="88"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(12)"
        >
          <path
            d="M12 76 C 30 66 40 48 42 26"
            fill="none"
            stroke="var(--gravado-linha)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {[
            [18, 68, -30, 1],
            [28, 58, -42, 0.9],
            [36, 44, -56, 0.95],
            [41, 30, -70, 0.8],
            [24, 72, 145, 0.8],
            [34, 60, 136, 0.7],
          ].map(([lx, ly, lr, ls], i) => (
            <ellipse
              key={i}
              rx="7"
              ry="13"
              fill="var(--gravado-folha)"
              transform={`translate(${lx} ${ly}) rotate(${lr}) scale(${ls})`}
            />
          ))}
          <circle cx="62" cy="18" r="7" fill="var(--gravado-folha)" />
          <circle cx="62" cy="18" r="3" fill="var(--gravado-linha)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#folhagem)" />
    </svg>
  );
}
