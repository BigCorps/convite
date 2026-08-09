"use client";

import { useRef, useState } from "react";
import { convite } from "@/data/convite";
import Envelope from "@/components/Envelope";
import ConviteConteudo from "@/components/Convite";

export default function Pagina() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [aberto, setAberto] = useState(false);

  function abrir() {
    setAberto(true);
    const a = audioRef.current;
    // Chamado dentro do clique: e assim que o navegador libera o autoplay.
    if (a) void a.play().catch(() => undefined);
    document.body.classList.remove("travado");
  }

  return (
    <>
      <audio ref={audioRef} src={convite.musica} loop preload="auto" />
      {!aberto && <Envelope onAbrir={abrir} />}
      <ConviteConteudo audioRef={audioRef} />
    </>
  );
}
