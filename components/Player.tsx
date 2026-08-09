"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  audioRef: React.RefObject<HTMLAudioElement | null>;
};

function formata(s: number) {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${r.toString().padStart(2, "0")}`;
}

export default function Player({ audioRef }: Props) {
  const [tocando, setTocando] = useState(false);
  const [posicao, setPosicao] = useState(0);
  const [duracao, setDuracao] = useState(0);
  const [repetir, setRepetir] = useState(true);
  const arrastando = useRef(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const onPlay = () => setTocando(true);
    const onPause = () => setTocando(false);
    const onTime = () => {
      if (!arrastando.current) setPosicao(a.currentTime);
    };
    const onMeta = () => setDuracao(a.duration || 0);

    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    if (a.readyState >= 1) onMeta();
    setTocando(!a.paused);

    return () => {
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
    };
  }, [audioRef]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.loop = repetir;
  }, [repetir, audioRef]);

  function alternar() {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) void a.play().catch(() => undefined);
    else a.pause();
  }

  function reiniciar() {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = 0;
    setPosicao(0);
    void a.play().catch(() => undefined);
  }

  function buscar(valor: number) {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = valor;
    setPosicao(valor);
  }

  const progresso = duracao > 0 ? (posicao / duracao) * 100 : 0;

  return (
    <div className="player">
      <p className="player-chamada">
        {tocando ? "Tocando agora" : "Toque para ouvir nossa musica"}
      </p>

      <div className="player-barra">
        <input
          type="range"
          min={0}
          max={duracao || 0}
          step={0.1}
          value={posicao}
          aria-label="Posicao da musica"
          onPointerDown={() => (arrastando.current = true)}
          onPointerUp={() => (arrastando.current = false)}
          onChange={(e) => buscar(Number(e.target.value))}
          style={{ ["--progresso" as string]: `${progresso}%` }}
        />
        <div className="player-tempos">
          <span>{formata(posicao)}</span>
          <span>{formata(duracao)}</span>
        </div>
      </div>

      <div className="player-controles">
        <button
          type="button"
          className="player-btn"
          onClick={reiniciar}
          aria-label="Reiniciar musica"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M7 5v14M19 5l-9 7 9 7z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          type="button"
          className="player-btn player-btn-principal"
          onClick={alternar}
          aria-label={tocando ? "Pausar musica" : "Tocar musica"}
        >
          {tocando ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M9 6v12M15 6v12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5.5l11 6.5-11 6.5z" fill="currentColor" />
            </svg>
          )}
        </button>

        <button
          type="button"
          className={`player-btn ${repetir ? "ativo" : ""}`}
          onClick={() => setRepetir((v) => !v)}
          aria-pressed={repetir}
          aria-label="Repetir musica"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M4 9a4 4 0 0 1 4-4h9m0 0l-3-3m3 3l-3 3M20 15a4 4 0 0 1-4 4H7m0 0l3 3m-3-3l3-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
