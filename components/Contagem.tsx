"use client";

import { useEffect, useState } from "react";
import { convite } from "@/data/convite";

const ALVO = new Date(convite.data.iso).getTime();

type Restante = { dias: number; horas: number; minutos: number; segundos: number };

function calcular(): Restante {
  const delta = Math.max(0, ALVO - Date.now());
  return {
    dias: Math.floor(delta / 86400000),
    horas: Math.floor(delta / 3600000) % 24,
    minutos: Math.floor(delta / 60000) % 60,
    segundos: Math.floor(delta / 1000) % 60,
  };
}

export function Contagem() {
  // Comeca nulo de proposito: evita divergencia entre servidor e cliente.
  const [r, setR] = useState<Restante | null>(null);

  useEffect(() => {
    setR(calcular());
    const id = setInterval(() => setR(calcular()), 1000);
    return () => clearInterval(id);
  }, []);

  const campos: Array<[string, number | null]> = [
    ["Dias", r?.dias ?? null],
    ["Horas", r?.horas ?? null],
    ["Minutos", r?.minutos ?? null],
    ["Segundos", r?.segundos ?? null],
  ];

  return (
    <div className="contagem">
      <p className="rotulo">Faltam</p>
      <div className="contagem-grade">
        {campos.map(([nome, valor], i) => (
          <div className="contagem-campo" key={nome}>
            <span className="contagem-numero">
              {valor === null ? "--" : valor.toString().padStart(2, "0")}
            </span>
            <span className="contagem-nome">{nome}</span>
            {i < campos.length - 1 && (
              <span className="contagem-doispontos" aria-hidden="true">
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const SEMANA = ["D", "S", "T", "Q", "Q", "S", "S"];

export function Calendario() {
  const { ano, mes, dia, mesNome } = convite.data;
  const primeiro = new Date(ano, mes - 1, 1).getDay(); // 0 = domingo
  const total = new Date(ano, mes, 0).getDate();

  const celulas: Array<number | null> = [
    ...Array.from({ length: primeiro }, () => null),
    ...Array.from({ length: total }, (_, i) => i + 1),
  ];

  return (
    <div className="calendario">
      <p className="rotulo">O grande dia</p>
      <p className="calendario-mes">{mesNome}</p>
      <div className="calendario-grade" role="presentation">
        {SEMANA.map((d, i) => (
          <span className="calendario-cabecalho" key={`c${i}`}>
            {d}
          </span>
        ))}
        {celulas.map((n, i) =>
          n === null ? (
            <span key={`v${i}`} />
          ) : (
            <span
              key={n}
              className={`calendario-dia ${n === dia ? "marcado" : ""}`}
            >
              {n === dia && (
                <svg className="calendario-coracao" viewBox="0 0 32 30" aria-hidden="true">
                  <path
                    d="M16 27C6 20.5 2 15.6 2 10.5 2 6 5.4 3 9.4 3c2.7 0 5.1 1.5 6.6 3.9C17.5 4.5 19.9 3 22.6 3 26.6 3 30 6 30 10.5c0 5.1-4 10-14 16.5z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                </svg>
              )}
              <span className="calendario-numero">{n}</span>
            </span>
          )
        )}
      </div>
    </div>
  );
}
