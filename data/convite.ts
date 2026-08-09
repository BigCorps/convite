// ---------------------------------------------------------------------------
// Todo o conteúdo do convite fica aqui. Para mudar textos, datas, links,
// telefone ou o enquadramento da foto, edite só este arquivo.
// ---------------------------------------------------------------------------

export const convite = {
  iniciais: "MI",

  noivos: {
    completo: "Miriam Martins & Ithiel Almeida",
    exibicao: "Miriam e Ithiel",
  },

  versiculo: {
    texto: "As muitas águas não podem apagar o amor,",
    texto2: "nem os rios afogá-lo.",
    referencia: "Cantares 8:7",
  },

  chamada:
    "Com alegria em nossos corações, convidamos você para celebrar conosco este dia tão especial.",

  data: {
    // Usado pela contagem regressiva. Mantenha o fuso -03:00.
    iso: "2026-10-31T13:00:00-03:00",
    extenso: "31 de outubro de 2026",
    diaSemana: "Sábado",
    horario: "das 13h às 18h",
    // Usado pelo calendário
    ano: 2026,
    mes: 10, // 1 = janeiro
    dia: 31,
    mesNome: "Outubro",
  },

  local: {
    nome: "Espaço Villa Giordano",
    logradouro: "Rua Pascoal Daniel, 96",
    bairro: "Vila Giordano",
    cidade: "São Paulo - SP",
    cep: "08020-370",
    mapsUrl:
      "https://www.google.com/maps/place/R.+Pascoal+Daniel,+96+-+Vila+Giordano,+S%C3%A3o+Paulo+-+SP,+08020-370",
  },

  trajes: {
    texto: "Traje social.",
    destaque: "Roupas e cores claras são reservadas à noiva.",
  },

  // Tudo que precisa de banco de dados mora no nosso site do Casar.com.
  links: {
    rsvp: "https://noivos.casar.com/miriam-e-ithiel#/rsvp",
    presentes: "https://noivos.casar.com/miriam-e-ithiel#/presentes",
    recados: "https://noivos.casar.com/miriam-e-ithiel#/recados",
    siteCompleto: "https://noivos.casar.com/miriam-e-ithiel",
  },

  // Arquivo em /public. Veja o README sobre o nome do arquivo.
  musica: "/musica.mp3",

  foto: {
    src: "/foto.jpg",
    // Recorte. Primeiro valor = horizontal, segundo = vertical.
    // Ajuste até os rostos ficarem centralizados.
    enquadramentoCapa: "56% 38%",
    enquadramentoCorpo: "56% 40%",
  },
} as const;

