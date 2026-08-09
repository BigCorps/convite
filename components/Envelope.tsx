"use client";

import Image from "next/image";
import { useState } from "react";
import { convite } from "@/data/convite";
import { ArranjoCanto, Lacre, PadraoGravado } from "./Ornamentos";

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

        <div className="envelope-lacre">
          <Lacre iniciais={convite.iniciais} />
        </div>

        <span className="envelope-etiqueta">Clique para abrir</span>
      </div>
    </div>
  );
}
