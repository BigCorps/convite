"use client";

import Image from "next/image";
import { useState } from "react";
import { convite } from "@/data/convite";
import { ArranjoCanto, PadraoGravado } from "./Ornamentos";

export default function Envelope({ onAbrir }: { onAbrir: () => void }) {
  const [abrindo, setAbrindo] = useState(false);
  const [oculto, setOculto] = useState(false);

  function abrir() {
    if (abrindo) return;
    setAbrindo(true);
    // Precisa acontecer dentro do gesto do usuario: e o que libera o audio.
    onAbrir();
    window.setTimeout(() => setOculto(true), 1400);
  }

  if (oculto) return null;

  return (
    <div
      className={`envelope ${abrindo ? "abrindo" : ""}`}
      role="button"
      tabIndex={0}
      aria-label="Abrir o convite"
      onClick={abrir}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          abrir();
        }
      }}
    >
      <div className="envelope-foto">
        <Image
          src={convite.foto.src}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: convite.foto.enquadramentoCapa }}
        />
        <div className="envelope-veu" />
      </div>

      <div className="envelope-aba">
        <PadraoGravado />
        <div className="envelope-vinco" />
      </div>

      <div className="envelope-centro">
        <ArranjoCanto className="envelope-flor esquerda" />
        <ArranjoCanto className="envelope-flor direita" />

        {/* PNG e nao SVG de proposito: o monograma em Pinyon Script dependia
            da fonte carregar e do alinhamento vir do CSS. Como imagem, sai
            identico em qualquer navegador. */}
        <div className="envelope-lacre">
          <Image
            src="/lacre.png"
            alt={`Lacre com as iniciais ${convite.iniciais}`}
            width={232}
            height={232}
            priority
          />
        </div>

        <span className="envelope-etiqueta">Clique para abrir</span>
      </div>
    </div>
  );
}
