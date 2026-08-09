# Convite — Miriam & Ithiel

Página única, estática. Não usa banco de dados: confirmação de presença,
lista de presentes e recados são links para o site do Casar.com e para o WhatsApp.

## Rodar

```
npm install
npm run dev
```

## O que falta colocar em `public/`

| Arquivo | O que é | Situação |
| --- | --- | --- |
| `foto.jpg` | Foto do casal, 880×1068 | já incluída, tratada |
| `musica.mp3` | Trilha do convite | **falta** |

### Sobre o arquivo de música

O nome do arquivo aparece nos controles de mídia do celular (tela de bloqueio e
central de notificações) quando o áudio está tocando. Como você não quer que
apareça o nome da música ou da banda, mantenha o arquivo como `musica.mp3` e
não preencha as tags ID3 (título, artista, álbum). Para limpar as tags:

```
ffmpeg -i original.mp3 -map 0:a -map_metadata -1 -c:a copy public/musica.mp3
```

## Trocar a foto

Coloque a nova imagem em qualquer lugar, ajuste `ORIGEM` e `RECORTE` em
`scripts/tratar-foto.py` e rode:

```
python3 scripts/tratar-foto.py
```

O script recorta, dessatura o fundo, puxa a imagem para a paleta rosê e grava
em `public/foto.jpg`. Se preferir só reenquadrar sem tratar, troque
`enquadramentoCapa` e `enquadramentoCorpo` em `data/convite.ts`.

## Mudar textos, datas e links

Tudo está em `data/convite.ts`. Nenhum outro arquivo precisa ser tocado.

## Deploy

1. Suba o repositório no GitHub.
2. Importe na Vercel (detecta Next.js sozinho, sem configuração).
3. Em Settings → Domains, adicione `convite.bigcorps.com.br`.
4. No DNS do `bigcorps.com.br`, crie o CNAME que a Vercel indicar.

## Testar antes de enviar aos convidados

- [ ] Abrir `convite.bigcorps.com.br` numa aba anônima, no celular, em 4G.
- [ ] Clicar no lacre e confirmar que a música começa sozinha.
- [ ] Abrir cada um dos quatro botões e conferir se caem na seção certa.
- [ ] Corrigir no painel do Casar.com as seções Cerimônia e Recepção, que ainda
      estão com o texto padrão do template (data de 2022, endereço em Itu).
