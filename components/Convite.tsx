"use client";

import Image from "next/image";
import { convite } from "@/data/convite";
import { ArranjoCanto, Broto, Divisor } from "./Ornamentos";
import { Calendario, Contagem } from "./Contagem";
import Player from "./Player";

type Props = {
  audioRef: React.RefObject<HTMLAudioElement | null>;
};

function Botao({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="botao" href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export default function Convite({ audioRef }: Props) {
  const { local, data, versiculo, noivos, trajes, links } = convite;

  return (
    <main className="papel">
      <ArranjoCanto className="canto canto-se" />
      <ArranjoCanto className="canto canto-sd" />
      <ArranjoCanto className="canto canto-ie" />
      <ArranjoCanto className="canto canto-id" />
      <ArranjoCanto className="canto canto-me" />
      <ArranjoCanto className="canto canto-md" />

      <section className="secao secao-foto">
        <div className="moldura">
          <Image
            src={convite.foto.src}
            alt={`${noivos.exibicao}`}
            width={880}
            height={1068}
            priority
            sizes="(max-width: 480px) 92vw, 400px"
            style={{ objectPosition: convite.foto.enquadramentoCorpo }}
          />
        </div>
      </section>

      <section className="secao">
        <blockquote className="versiculo">
          <p>
            &ldquo;{versiculo.texto}
            <br />
            {versiculo.texto2}&rdquo;
          </p>
          <cite>{versiculo.referencia}</cite>
        </blockquote>
      </section>

      <section className="secao">
        <Player audioRef={audioRef} />
      </section>

      <Divisor />

      <section className="secao">
        <p className="chamada">{convite.chamada}</p>
        <h1 className="nomes">{noivos.exibicao}</h1>
        <p className="subtitulo">Convidam para a cerimônia de casamento</p>
      </section>

      <section className="bloco-data">
        <p className="rotulo claro">A realizar-se no dia</p>
        <p className="data-extenso">{data.extenso}</p>
        <p className="data-hora">
          {data.diaSemana}, {data.horario}
        </p>
      </section>

      <p className="aviso-pontualidade">{convite.avisoPontualidade}</p>

      <section className="secao">
        <Contagem />
      </section>

      <section className="secao">
        <Calendario />
      </section>

      <Divisor />

      <section className="secao">
        <Broto className="broto-titulo" />
        <h2 className="titulo-script">Localização</h2>
        <p className="texto">
          Para celebrarmos cada momento juntos, a cerimônia e a recepção
          acontecerão no mesmo local.
        </p>
        <p className="local-nome">{local.nome}</p>
        <p className="local-endereco">
          {local.logradouro}
          <br />
          {local.bairro} &middot; {local.cidade}
          <br />
          CEP {local.cep}
        </p>
        <Botao href={local.mapsUrl}>Ver localização</Botao>
      </section>

      <Divisor />

      <section className="secao">
        <Broto className="broto-titulo" />
        <h2 className="titulo-script">Confirmação de presença</h2>
        <p className="texto">
          Sua presença é muito importante para nós. Pedimos a gentileza de
          confirmar quantas pessoas virão com você.
        </p>
        <Botao href={links.rsvp}>Confirmar presença</Botao>
      </section>

      <Divisor />

      <section className="secao">
        <Broto className="broto-titulo" />
        <h2 className="titulo-script">Lista de presentes</h2>
        <p className="texto">
          O maior presente é dividir esse dia com você. Mas, se quiser nos
          presentear, preparamos uma lista com carinho.
        </p>
        <Botao href={links.presentes}>Acessar nossa lista</Botao>
      </section>

      <Divisor />

      <section className="secao">
        <Broto className="broto-titulo" />
        <h2 className="titulo-script">Recados</h2>
        <p className="texto">
          Queremos guardar suas palavras. Deixe um recado no nosso mural.
        </p>
        <Botao href={links.recados}>Deixar um recado</Botao>
      </section>

      <Divisor />

      <section className="secao">
        <Broto className="broto-titulo" />
        <h2 className="titulo-script">Dress code</h2>
        <p className="texto">{trajes.texto}</p>
        <p className="destaque">{trajes.destaque}</p>
      </section>

      <section className="secao secao-fim">
        <p className="despedida">
          Esperamos <em>por você!</em>
        </p>
        <p className="assinatura">{noivos.completo}</p>
      </section>
    </main>
  );
}
