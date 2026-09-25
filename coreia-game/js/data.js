// ==================== DADOS ====================
const chaptersData = [
  // ==================================================
  // CAPÍTULO 1 — GASTRONOMIA
  // ==================================================
  { name: 'Gastronomia', korName: '음식', emoji: '🍜', cssClass: 'chapter-1', questions: [
    { emoji: "🍜", q: "Qual é o prato coreano feito com repolho fermentado e apimentado?", answers: ["Kimchi", "Sushi", "Bibimbap", "Ramen"], correct: 0, hint: "Servido em quase todas as refeições.", fact: "Existem mais de 200 tipos de kimchi!" },
    { emoji: "🍚", q: "Qual prato é arroz com legumes, carne e ovo, com gochujang?", answers: ["Bibimbap", "Japchae", "Tteokbokki", "Kimbap"], correct: 0, hint: "Significa 'arroz misturado'.", fact: "O bibimbap de Jeonju é o mais tradicional!" },
    { emoji: "🍢", q: "Qual prato é feito de bolinhos de arroz em molho picante?", answers: ["Tteokbokki", "Kimbap", "Japchae", "Mandu"], correct: 0, hint: "É o lanche de rua mais popular!", fact: "Surgiu como prato real na Dinastia Joseon." },
    { emoji: "🥟", q: "Como se chamam os dumplings coreanos?", answers: ["Gyoza", "Mandu", "Wonton", "Baozi"], correct: 1, hint: "Podem ser cozidos, fritos ou em sopa.", fact: "O mandu kimchi é o mais famoso!" },
    { emoji: "🍲", q: "Qual é a famosa sopa coreana de kimchi com tofu e porco?", answers: ["Kimchi Jjigae", "Miso Soup", "Ramen", "Sundubu"], correct: 0, hint: "Cozida em panela de barro.", fact: "Comfort food clássico do inverno!" },
    { emoji: "🥩", q: "Como se chama o churrasco coreano grelhado?", answers: ["Yakiniku", "Bulgogi", "Teppanyaki", "Sukiyaki"], correct: 1, hint: "Significa 'carne no fogo'.", fact: "Marinado em molho de soja e pera!" },
    { emoji: "🍶", q: "Qual bebida alcoólica coreana é feita de arroz?", answers: ["Sake", "Soju", "Vinho", "Makgeolli"], correct: 1, hint: "Bebida mais consumida do país.", fact: "Servido com as duas mãos em respeito!" },
    { emoji: "🥢", q: "O que NÃO se faz à mesa na Coreia?", answers: ["Comer com colher", "Levantar o prato", "Esperar o mais velho", "Usar hashis"], correct: 1, hint: "É falta de educação.", fact: "O prato fica sempre na mesa!" },
    { emoji: "🍜", q: "Qual macarrão instantâneo é o favorito dos coreanos?", answers: ["Udon", "Ramyun", "Soba", "Pho"], correct: 1, hint: "Vem em pacote e é picante!", fact: "Os coreanos comem mais ramyun que qualquer país!" },
    { emoji: "🍱", q: "O que são banchan?", answers: ["Sobremesas", "Acompanhamentos", "Bebidas", "Sopas"], correct: 1, hint: "Servidos junto do arroz.", fact: "Uma refeição pode ter até 12 banchans!" },
    { emoji: "🥬", q: "Qual é o nome do molho de pimenta fermentado?", answers: ["Gochujang", "Doenjang", "Ssämjang", "Ganjang"], correct: 0, hint: "É doce, picante e espesso.", fact: "Fermentado por meses em potes de barro!" },
    { emoji: "🍗", q: "Qual prato combina frango frito com molho picante?", answers: ["Yangnyeom", "Karaage", "Teriyaki", "Tempura"], correct: 0, hint: "Comida de bar preferida.", fact: "Combina com soju e cerveja!" },
    { emoji: "🍧", q: "Qual é a sobremesa coreana de gelo raspado?", answers: ["Bingsu", "Mochi", "Dango", "Taiyaki"], correct: 0, hint: "Servida no verão.", fact: "Coberta com frutas e leite condensado!" },
    { emoji: "🌶️", q: "Qual pimenta é a base da culinária coreana?", answers: ["Pimenta do reino", "Gochu", "Jalapeño", "Habanero"], correct: 1, hint: "Vermelha e coreana.", fact: "Introduzida pelos portugueses no séc. XVI!" }
  ]},

  // ==================================================
  // CAPÍTULO 2 — K-POP & ARTE
  // ==================================================
  { name: 'K-Pop & Arte', korName: '예술', emoji: '🎵', cssClass: 'chapter-2', questions: [
    { emoji: "🎵", q: "Como se chama o gênero pop coreano mundialmente famoso?", answers: ["J-Pop", "C-Pop", "K-Pop", "Trot"], correct: 2, hint: "BTS, BLACKPINK, TWICE.", fact: "Surgiu nos anos 90 com Seo Taiji and Boys!" },
    { emoji: "🎭", q: "Como se chama o teatro tradicional com máscaras?", answers: ["Kabuki", "Talchum", "Noh", "Pansori"], correct: 1, hint: "Satirizava a nobreza.", fact: "Patrimônio da UNESCO!" },
    { emoji: "🎼", q: "Como se chama a narrativa musical de um só cantor?", answers: ["K-Pop", "Pansori", "Trot", "Samulnori"], correct: 1, hint: "Pode durar 8 horas!", fact: "Significa 'som onde as pessoas se reúnem'." },
    { emoji: "🎨", q: "Como se chama a arte coreana de dobradura de papel?", answers: ["Origami", "Jong-ie Jopgi", "Hanji", "Kkochggo"], correct: 2, hint: "Papel tradicional resistente.", fact: "O Hanji pode durar 1000 anos!" },
    { emoji: "🎤", q: "Qual grupo de K-Pop discursou na ONU?", answers: ["EXO", "BTS", "BLACKPINK", "TWICE"], correct: 1, hint: "Fandom chamado ARMY.", fact: "Discursaram em 2018 e 2020!" },
    { emoji: "🖌️", q: "Como se chama a pintura tradicional coreana?", answers: ["Ukiyo-e", "Minhwa", "Guohua", "Nihonga"], correct: 1, hint: "Significa 'pintura do povo'.", fact: "Minhwa retrata animais e sorte!" },
    { emoji: "🎸", q: "Qual instrumento de cordas tradicional coreano é tocado com arco?", answers: ["Gayageum", "Haegeum", "Geomungo", "Bipa"], correct: 1, hint: "Som parecido com violino.", fact: "Usado em música tradicional desde Goryeo!" },
    { emoji: "🥁", q: "O que significa Samulnori?", answers: ["Canto solo", "Quatro instrumentos", "Dança real", "Ópera"], correct: 1, hint: "Sa = quatro em coreano.", fact: "Envolve tambores, gongos e sinos!" },
    { emoji: "🎬", q: "Que prêmio Bong Joon-ho ganhou com 'Parasita'?", answers: ["Grammy", "Oscar de Melhor Filme", "Cannes", "Emmy"], correct: 1, hint: "Foi em 2020.", fact: "Primeiro filme não-inglês a ganhar!" },
    { emoji: "🎙️", q: "Qual grupo feminino estourou com 'DDU-DU DDU-DU'?", answers: ["TWICE", "BLACKPINK", "Red Velvet", "IVE"], correct: 1, hint: "4 integrantes.", fact: "Clipe com mais de 2 bilhões de views!" },
    { emoji: "🖼️", q: "O que é 'Chaekgeori'?", answers: ["Pintura de livros", "Dança de máscaras", "Cerâmica", "Poesia"], correct: 0, hint: "Arte da Dinastia Joseon.", fact: "Representa estantes de estudiosos!" },
    { emoji: "🩰", q: "Como se chama a dança coreana tradicional de leques?", answers: ["Buchaechum", "Hip Hop", "Ballet", "Salsa"], correct: 0, hint: "Usa leques coloridos.", fact: "Criada nos anos 1950 por Kim Baek-bong!" }
  ]},

  // ==================================================
  // CAPÍTULO 3 — TRADIÇÕES
  // ==================================================
  { name: 'Tradições', korName: '전통', emoji: '🎎', cssClass: 'chapter-3', questions: [
    { emoji: "🙇", q: "Qual é a forma tradicional de cumprimentar?", answers: ["Aperto de mão", "Reverência (jeol)", "Abraço", "Beijo"], correct: 1, hint: "A profundidade indica respeito.", fact: "Diz-se '안녕하세요'!" },
    { emoji: "👘", q: "Como se chama a vestimenta tradicional?", answers: ["Kimono", "Hanbok", "Qipao", "Ao Dai"], correct: 1, hint: "Cores vibrantes.", fact: "Hanboks para cada estação!" },
    { emoji: "🎊", q: "Qual é o Ano Novo Lunar coreano?", answers: ["Tet", "Seollal", "Chuseok", "Dano"], correct: 1, hint: "Data muito importante.", fact: "Reverência aos mais velhos!" },
    { emoji: "🌕", q: "Qual é o festival coreano de ação de graças?", answers: ["Seollal", "Chuseok", "Daeboreum", "Dano"], correct: 1, hint: "15º dia do 8º mês lunar.", fact: "Comem songpyeon!" },
    { emoji: "🎂", q: "Qual idade todos ficam mais velhos juntos?", answers: ["Idade real", "Não", "1 ano mais velhos", "18"], correct: 2, hint: "Idade coreana.", fact: "Abolida em 2023!" },
    { emoji: "🎋", q: "O que é 'Doljanchi'?", answers: ["Casamento", "Primeiro aniversário", "Formatura", "Aposentadoria"], correct: 1, hint: "Festa do bebê.", fact: "Bebê escolhe objetos para prever o futuro!" },
    { emoji: "💍", q: "Como se chama o casamento tradicional coreano?", answers: ["Pyebaek", "Honrye", "Hanbok", "Paebaek"], correct: 0, hint: "Cerimônia com reverências.", fact: "Noivos jogam tâmaras para os pais!" },
    { emoji: "🎯", q: "O que é Yutnori?", answers: ["Jogo de tabuleiro", "Dança", "Luta", "Instrumento"], correct: 0, hint: "Jogado no Ano Novo.", fact: "Usa 4 gravetos para sortear!" },
    { emoji: "👨‍👩‍👧", q: "Como se chama o sistema de parentesco por idade?", answers: ["Oppa/Eonni", "Sunbae/Hoobae", "Hyung/Noona", "Todas acima"], correct: 3, hint: "Depende do gênero.", fact: "Essencial para o respeito social!" },
    { emoji: "🪷", q: "O que é o 'Baek-il'?", answers: ["100 dias do bebê", "Ano novo", "Casamento", "Colheita"], correct: 0, hint: "Número especial.", fact: "Festa com bolo de arroz branco!" },
    { emoji: "🥋", q: "Em que ano o Taekwondo virou olímpico?", answers: ["1988", "2000", "1996", "2012"], correct: 1, hint: "Sydney sediou.", fact: "Praticado por 70 milhões no mundo!" },
    { emoji: "🏮", q: "O que se comemora no Daeboreum?", answers: ["Primeira lua cheia", "Colheita", "Ano novo", "Casamento"], correct: 0, hint: "15º dia do 1º mês lunar.", fact: "Comem nozes para saúde do ano!" }
  ]},

  // ==================================================
  // CAPÍTULO 4 — HISTÓRIA
  // ==================================================
  { name: 'História', korName: '역사', emoji: '🏯', cssClass: 'chapter-4', questions: [
    { emoji: "🏯", q: "Qual é a capital da Coreia do Sul?", answers: ["Busan", "Seul", "Pyongyang", "Tóquio"], correct: 1, hint: "Significa 'capital' em coreano.", fact: "25 milhões na região metropolitana!" },
    { emoji: "✍️", q: "Como se chama o alfabeto coreano?", answers: ["Kanji", "Hiragana", "Hangul", "Pinyin"], correct: 2, hint: "Criado pelo Rei Sejong.", fact: "Sistema mais científico!" },
    { emoji: "👑", q: "Qual rei criou o Hangul?", answers: ["Sejong, o Grande", "Taejo", "Yeongjo", "Jeongjo"], correct: 0, hint: "Governou durante Joseon.", fact: "Maior rei da história!" },
    { emoji: "🥋", q: "Qual arte marcial é coreana?", answers: ["Judô", "Kung Fu", "Taekwondo", "Karate"], correct: 2, hint: "Olimpíadas desde 2000.", fact: "70 milhões de praticantes!" },
    { emoji: "⚔️", q: "Qual almirante criou os 'barcos tartaruga'?", answers: ["Yi Sun-sin", "Wang Geon", "Sejong", "Jeongjo"], correct: 0, hint: "Herói naval.", fact: "Venceu batalhas impossíveis!" },
    { emoji: "🏛️", q: "Qual dinastia durou mais de 500 anos?", answers: ["Goryeo", "Joseon", "Silla", "Goguryeo"], correct: 1, hint: "1392 até 1910.", fact: "Última dinastia antes da ocupação japonesa!" },
    { emoji: "🌏", q: "Qual foi o primeiro reino coreano?", answers: ["Gojoseon", "Goryeo", "Silla", "Baekje"], correct: 0, hint: "Fundado por Dangun.", fact: "Em 2333 a.C. segundo a lenda!" },
    { emoji: "🕊️", q: "Em que ano a Coreia se libertou do Japão?", answers: ["1910", "1945", "1950", "1960"], correct: 1, hint: "Fim da 2ª Guerra.", fact: "Mas foi dividida em duas nações!" },
    { emoji: "🇰🇷", q: "Em que ano a Coreia do Sul sediou as Olimpíadas?", answers: ["1988", "2002", "1996", "1972"], correct: 0, hint: "Seul.", fact: "Também sediou em 2018 (PyeongChang, inverno)!" },
    { emoji: "📜", q: "O que é 'Hwarang'?", answers: ["Guerreiros jovens", "Palácio", "Aldeia", "Livro"], correct: 0, hint: "Do reino Silla.", fact: "Treinados em arte, guerra e filosofia!" },
    { emoji: "🌊", q: "Qual ilha é conhecida como a 'Havaí da Coreia'?", answers: ["Jeju", "Ulleung", "Dokdo", "Geoje"], correct: 0, hint: "Vulcânica.", fact: "Tem o maior tubo de lava do mundo!" },
    { emoji: "🏰", q: "Quantos palácios reais tem Seul?", answers: ["2", "3", "5", "7"], correct: 2, hint: "Os 'Cinco Grandes'.", fact: "Gyeongbokgung é o maior!" }
  ]},

  // ==================================================
  // CAPÍTULO 5 — MODERNIDADE
  // ==================================================
  { name: 'Modernidade', korName: '현대', emoji: '🌆', cssClass: 'chapter-5', questions: [
    { emoji: "📱", q: "Qual empresa faz os celulares Galaxy?", answers: ["LG", "Samsung", "Xiaomi", "Huawei"], correct: 1, hint: "Maior fabricante do mundo.", fact: "Samsung significa 'três estrelas'!" },
    { emoji: "🚗", q: "Qual montadora fez o carro Sonata?", answers: ["Kia", "Hyundai", "Daewoo", "SsangYong"], correct: 1, hint: "'Moderno' em coreano.", fact: "4ª maior montadora do mundo!" },
    { emoji: "🦑", q: "Qual é o jogo coreano de sobrevivência mais famoso?", answers: ["Free Fire", "Round 6", "PUBG", "Minecraft"], correct: 1, hint: "Netflix 2021.", fact: "Título original: 오징어 게임!" },
    { emoji: "🌐", q: "Qual é o app de mensagens mais usado?", answers: ["WhatsApp", "KakaoTalk", "WeChat", "Line"], correct: 1, hint: "Nome de fruta tropical.", fact: "90% dos coreanos usam!" },
    { emoji: "🎬", q: "Qual filme ganhou o Oscar de Melhor Filme em 2020?", answers: ["Oldboy", "Parasita", "Train to Busan", "The Handmaiden"], correct: 1, hint: "Dirigido por Bong Joon-ho.", fact: "Primeiro filme não-inglês a ganhar!" },
    { emoji: "🎮", q: "Qual jogo coreano popularizou o battle royale?", answers: ["PUBG", "Fortnite", "Free Fire", "Apex"], correct: 0, hint: "'PlayerUnknown'.", fact: "Criado por Brendan Greene na Coreia!" },
    { emoji: "🎤", q: "Qual é o maior fandom do mundo?", answers: ["Blinks", "ARMY", "Once", "Reveluv"], correct: 1, hint: "Fandom do BTS.", fact: "Milhões de fãs no mundo todo!" },
    { emoji: "📺", q: "O que significa 'K-Drama'?", answers: ["Drama coreano", "Drama japonês", "Drama chinês", "Novela"], correct: 0, hint: "K de Korea.", fact: "Fenômeno global na Netflix!" },
    { emoji: "🏢", q: "Qual é o bairro de tecnologia em Seul?", answers: ["Gangnam", "Hongdae", "Teheran-ro", "Itaewon"], correct: 2, hint: "Vale do Silício coreano.", fact: "Sede de Samsung, Naver e Kakao!" },
    { emoji: "🚄", q: "Qual trem-bala conecta Seul a Busan?", answers: ["Shinkansen", "KTX", "Sapsan", "Eurostar"], correct: 1, hint: "Sigla coreana.", fact: "Percorre 400 km em 2h30!" },
    { emoji: "📡", q: "Qual é o maior portal de internet coreano?", answers: ["Naver", "Google", "Baidu", "Yahoo"], correct: 0, hint: "Criou o Line.", fact: "Mais usado que Google na Coreia!" },
    { emoji: "🌐", q: "Qual cidade é o 'Vale do Silício' coreano?", answers: ["Pangyo", "Busan", "Daegu", "Gwangju"], correct: 0, hint: "Perto de Seul.", fact: "Sede de startups e gigantes de TI!" }
  ]},

  // ==================================================
  // CAPÍTULO 6 — FOLCLORE E MITOLOGIA (NOVO!)
  // ==================================================
  { name: 'Folclore', korName: '전설', emoji: '🐉', cssClass: 'chapter-3', questions: [
    { emoji: "🦊", q: "O que é uma Gumiho?", answers: ["Raposa de 9 caudas", "Dragão", "Fênix", "Tigre"], correct: 0, hint: "Pode virar mulher.", fact: "Aparece em vários K-Dramas!" },
    { emoji: "🐉", q: "O que é Yong?", answers: ["Dragão", "Tigre", "Fênix", "Tartaruga"], correct: 0, hint: "Traz chuva e sorte.", fact: "Símbolo do imperador!" },
    { emoji: "👹", q: "O que é um Dokkaebi?", answers: ["Goblin", "Fantasma", "Anjo", "Demônio"], correct: 0, hint: "Brincalhão e mágico.", fact: "Tem clava mágica que cria ouro!" },
    { emoji: "🦅", q: "O que simboliza a fênix Bonghwang?", answers: ["Renascimento", "Morte", "Guerra", "Sorte"], correct: 0, hint: "Renasce das cinzas.", fact: "Símbolo da imperatriz!" },
    { emoji: "🐻", q: "Qual animal virou mulher na lenda de Dangun?", answers: ["Urso", "Tigre", "Raposa", "Coelho"], correct: 0, hint: "Ficou 100 dias em caverna.", fact: "Deu origem à Coreia!" },
    { emoji: "👻", q: "O que é um 'Gwisin'?", answers: ["Fantasma", "Dragão", "Anjo", "Demônio"], correct: 0, hint: "Espírito.", fact: "Aparece em dramas de terror!" },
    { emoji: "🐢", q: "O que é 'Byeoljubujeon'?", answers: ["Conto da tartaruga", "Lenda do dragão", "Canto de pássaro", "Dança"], correct: 0, hint: "Fábula coreana.", fact: "Tartaruga que queria fígado de coelho!" },
    { emoji: "🌊", q: "O que é 'In-eo' na mitologia coreana?", answers: ["Sereia", "Dragão marinho", "Polvo gigante", "Baleia"], correct: 0, hint: "Metade peixe, metade humano.", fact: "Aparece no folclore de Jeju!" },
    { emoji: "🏔️", q: "O que é 'Sanshin'?", answers: ["Deus da montanha", "Deus do mar", "Deus do céu", "Deus do fogo"], correct: 0, hint: "Vive nas alturas.", fact: "Representado por um tigre ancião!" },
    { emoji: "⛩️", q: "O que é 'Cheongsan'?", answers: ["Montanha verde", "Rio azul", "Mar", "Vale"], correct: 0, hint: "Símbolo de paz.", fact: "Inspira pinturas e poesias!" }
  ]},

  // ==================================================
  // CAPÍTULO 7 — DRAMAS E CINEMA (NOVO!)
  // ==================================================
  { name: 'Dramas & Cinema', korName: '드라마', emoji: '🎬', cssClass: 'chapter-2', questions: [
    { emoji: "🎬", q: "Qual filme coreano venceu o Oscar de Melhor Filme?", answers: ["Parasita", "Oldboy", "Train to Busan", "The Handmaiden"], correct: 0, hint: "Dirigido por Bong Joon-ho.", fact: "Também ganhou Melhor Direção!" },
    { emoji: "🚂", q: "Qual filme popularizou zumbis coreanos?", answers: ["Train to Busan", "Kingdom", "Peninsula", "Alive"], correct: 0, hint: "Um trem para Busan.", fact: "Estrelado por Gong Yoo!" },
    { emoji: "🦑", q: "Qual série foi a mais vista da Netflix em 2021?", answers: ["Round 6", "Vincenzo", "Crash Landing", "Kingdom"], correct: 0, hint: "Jogo de sobrevivência.", fact: "Título original: 오징어 게임!" },
    { emoji: "💘", q: "Qual é o gênero típico de K-Drama romântico?", answers: ["Romance", "Terror", "Guerra", "Ficção"], correct: 0, hint: "Histórias de amor.", fact: "Sempre tem triângulo amoroso!" },
    { emoji: "👨‍👩‍👧", q: "Qual filme venceu a Palma de Ouro em Cannes 2019?", answers: ["Parasita", "Oldboy", "Burning", "The Handmaiden"], correct: 0, hint: "Mesmo filme do Oscar.", fact: "Primeiro coreano a ganhar!" },
    { emoji: "🕵️", q: "O que é 'Squid Game' em coreano?", answers: ["오징어 게임", "오징어 놀이", "오징어 전쟁", "오징어 게임2"], correct: 0, hint: "Game = 게임.", fact: "O título internacional é uma tradução!" },
    { emoji: "👑", q: "Qual drama histórico é chamado de 'sageuk'?", answers: ["Drama histórico", "Romance", "Comédia", "Terror"], correct: 0, hint: "Tem reis e rainhas.", fact: "Frequentemente baseado em fatos reais!" },
    { emoji: "🧛", q: "Qual drama tem vampiros coreanos?", answers: ["Scholar Who Walks the Night", "Goblin", "Hotel del Luna", "Kingdom"], correct: 0, hint: "Baseado em manhwa.", fact: "Estrelado por Lee Joon-gi!" },
    { emoji: "🏨", q: "Qual drama se passa em um hotel de fantasmas?", answers: ["Hotel del Luna", "Goblin", "Crash Landing", "Vincenzo"], correct: 0, hint: "Hotel da Lua.", fact: "Estrelado por IU!" },
    { emoji: "🗡️", q: "Qual drama mistura máfia italiana com advocacia?", answers: ["Vincenzo", "Goblin", "Start-Up", "Itaewon Class"], correct: 0, hint: "Estrelado por Song Joong-ki.", fact: "Sucesso mundial na Netflix!" }
  ]},

  // ==================================================
  // CAPÍTULO 8 — ESPORTES E COMPETIÇÕES (NOVO!)
  // ==================================================
  { name: 'Esportes', korName: '스포츠', emoji: '⚽', cssClass: 'chapter-5', questions: [
    { emoji: "⚽", q: "Qual esporte é o mais popular na Coreia do Sul?", answers: ["Futebol", "Baseball", "Taekwondo", "K-pop"], correct: 0, hint: "Paixão nacional.", fact: "A seleção chegou às semifinais em 2002!" },
    { emoji: "🥋", q: "Em que ano o Taekwondo se tornou esporte olímpico oficial?", answers: ["1988", "2000", "1996", "2012"], correct: 1, hint: "Jogos de Sydney.", fact: "Antes era só demonstração em 1988 e 1992!" },
    { emoji: "🏹", q: "Em qual esporte a Coreia domina as Olimpíadas?", answers: ["Tiro com arco", "Natação", "Corrida", "Boxe"], correct: 0, hint: "Arco e flecha.", fact: "Ganha quase todas as medalhas de ouro!" },
    { emoji: "⛸️", q: "Qual patinadora coreana ganhou ouro em 2010?", answers: ["Yuna Kim", "Mao Asada", "Choi Da-bin", "Lee Sang-hwa"], correct: 0, hint: "Rainha do gelo.", fact: "Bateu recordes mundiais!" },
    { emoji: "⚾", q: "Qual é o esporte mais assistido nos estádios coreanos?", answers: ["Baseball", "Futebol", "Vôlei", "Basquete"], correct: 0, hint: "Bate e corre.", fact: "Times como LG Twins e Doosan!" },
    { emoji: "🚴", q: "Onde foram as Olimpíadas de Inverno de 2018?", answers: ["PyeongChang", "Seul", "Busan", "Incheon"], correct: 0, hint: "Cidade pequena.", fact: "Coreia ficou em 7º no quadro de medalhas!" },
    { emoji: "🏅", q: "Qual jogador de futebol coreano jogou no Manchester United?", answers: ["Park Ji-sung", "Son Heung-min", "Lee Young-pyo", "Ki Sung-yueng"], correct: 0, hint: "Apelido: Three-Lung.", fact: "Ganhou Champions League em 2008!" },
    { emoji: "⚽", q: "Qual jogador coreano é conhecido como 'Sonny'?", answers: ["Son Heung-min", "Park Ji-sung", "Lee Kang-in", "Hwang Hee-chan"], correct: 0, hint: "Joga no Tottenham.", fact: "Artilheiro da Premier League 2022!" },
    { emoji: "🏸", q: "Em qual esporte a Coreia ganhou ouro em duplas mistas 2020?", answers: ["Badminton", "Tênis", "Squash", "Ping-pong"], correct: 0, hint: "Raquete e peteca.", fact: "Tradição no esporte desde os anos 90!" },
    { emoji: "🥇", q: "Quantas medalhas de ouro a Coreia ganhou nas Olimpíadas de Seul 1988?", answers: ["12", "20", "8", "15"], correct: 0, hint: "Ficou em 4º lugar geral.", fact: "Grande marco esportivo do país!" }
  ]},

  // ==================================================
  // CAPÍTULO 9 — GEOGRAFIA E CULTURA REGIONAL (NOVO!)
  // ==================================================
  { name: 'Regiões', korName: '지역', emoji: '🗺️', cssClass: 'chapter-4', questions: [
    { emoji: "🏙️", q: "Qual é a segunda maior cidade da Coreia?", answers: ["Busan", "Incheon", "Daegu", "Daejeon"], correct: 0, hint: "Cidade portuária.", fact: "Famosa pelas praias e o festival de cinema!" },
    { emoji: "🌋", q: "Qual ilha vulcânica fica ao sul da Coreia?", answers: ["Jeju", "Ulleung", "Dokdo", "Geoje"], correct: 0, hint: "Tem um vulcão extinto.", fact: "Símbolo: as estátuas de pedra Harubang!" },
    { emoji: "🏯", q: "Qual cidade foi capital do reino Silla?", answers: ["Gyeongju", "Seul", "Busan", "Andong"], correct: 0, hint: "Museu a céu aberto.", fact: "Tem milhares de túmulos reais!" },
    { emoji: "🎭", q: "Qual cidade é famosa pelas máscaras 'Hahoe'?", answers: ["Andong", "Gyeongju", "Jeonju", "Daegu"], correct: 0, hint: "Aldeia histórica.", fact: "Dança de máscaras da UNESCO!" },
    { emoji: "🍚", q: "Qual cidade é famosa pelo bibimbap?", answers: ["Jeonju", "Seul", "Busan", "Daegu"], correct: 0, hint: "Berço do prato.", fact: "Bibimbap de Jeonju é o mais famoso!" },
    { emoji: "🌊", q: "Qual cidade fica na fronteira com a Coreia do Norte?", answers: ["Paju", "Seul", "Incheon", "Chuncheon"], correct: 0, hint: "Tem a DMZ.", fact: "Aqui fica a vila de Panmunjom!" },
    { emoji: "🍊", q: "Qual fruta é famosa em Jeju?", answers: ["Tangerina", "Maçã", "Uva", "Melancia"], correct: 0, hint: "Cítrica e alaranjada.", fact: "Símbolo da ilha!" },
    { emoji: "🍁", q: "Qual cidade é famosa pelas folhas de bordo no outono?", answers: ["Seul", "Nami", "Busan", "Daegu"], correct: 1, hint: "Ilha famosa por dramas.", fact: "Cenário de 'Winter Sonata'!" },
    { emoji: "🏖️", q: "Qual praia famosa fica em Busan?", answers: ["Haeundae", "Nami", "Gyeongpo", "Daecheon"], correct: 0, hint: "Mais famosa da Coreia.", fact: "Recebe milhões de turistas!" },
    { emoji: "🎬", q: "Qual cidade sedia o Festival de Cinema da Coreia?", answers: ["Busan", "Seul", "Gyeongju", "Daegu"], correct: 0, hint: "BIFF.", fact: "Um dos maiores festivais da Ásia!" }
  ]},

  // ==================================================
  // CAPÍTULO 10 — ARIZA 선생님 (NOVO! ESPECIAL 🌸)
  // ==================================================
  { name: 'Ariza 선생님', korName: '아리자', emoji: '🌸', cssClass: 'chapter-2', questions: [
    { emoji: "🌸", q: "Como se escreve 'Ariza' em coreano?", answers: ["아리자", "아리사", "아리짜", "알리자"], correct: 0, hint: "아 = a, 리 = ri, 자 = za.", fact: "O nome dela em Hangul!" },
    { emoji: "👩‍🏫", q: "Como se diz 'professora' em coreano?", answers: ["선생님", "학생", "어머니", "언니"], correct: 0, hint: "Seonsaengnim.", fact: "'님' é um sufixo de respeito!" },
    { emoji: "💐", q: "O que significa '감사합니다'?", answers: ["Obrigado(a)", "Olá", "Tchau", "Desculpa"], correct: 0, hint: "Gamsahamnida.", fact: "Usado em situações formais!" },
    { emoji: "📚", q: "O que significa '공부'?", answers: ["Estudo", "Luta", "Comida", "Música"], correct: 0, hint: "Gongbu.", fact: "Combinado com 하다 = estudar!" },
    { emoji: "👋", q: "Como se diz 'olá' em coreano?", answers: ["안녕하세요", "감사합니다", "죄송합니다", "사랑해요"], correct: 0, hint: "Annyeonghaseyo.", fact: "Forma educada de cumprimentar!" },
    { emoji: "❤️", q: "O que significa '사랑해요'?", answers: ["Eu te amo", "Bom dia", "Boa noite", "Tchau"], correct: 0, hint: "Saranghaeyo.", fact: "Muito comum em K-Dramas!" },
    { emoji: "🎓", q: "O que significa '선생님' literalmente?", answers: ["Pessoa que nasceu antes", "Mestre", "Chefe", "Doutor"], correct: 0, hint: "선생 = nascer antes.", fact: "Mostra respeito pela experiência!" },
    { emoji: "🙇", q: "Como agradecer de forma MUITO respeitosa?", answers: ["깊이 감사합니다", "고마워", "땡큐", "땡큐 베리"], correct: 0, hint: "깊이 = profundamente.", fact: "Usado para pessoas mais velhas!" },
    { emoji: "🌷", q: "O que significa '꽃'?", answers: ["Flor", "Árvore", "Folha", "Fruta"], correct: 0, hint: "Kkot.", fact: "Símbolo de beleza na Coreia!" },
    { emoji: "✨", q: "O que significa '아리자 선생님, 감사합니다'?", answers: ["Ariza professora, obrigado", "Bom dia professora", "Tchau professora", "Oi, sou Ariza"], correct: 0, hint: "Frase completa.", fact: "O recado do jogo! 🌸" },
    { emoji: "💖", q: "Como se diz 'eu gosto de você' em coreano?", answers: ["좋아해요", "사랑해요", "싫어해요", "몰라요"], correct: 0, hint: "Joahae yo.", fact: "Mais leve que 'eu te amo'!" },
    { emoji: "🎂", q: "O que significa '생일 축하해요'?", answers: ["Feliz aniversário", "Bom Natal", "Feliz ano novo", "Parabéns por tudo"], correct: 0, hint: "생일 = aniversário.", fact: "Cantado em coro pelas crianças!" }
  ]}
];

// ==================== CARTAS COLECIONÁVEIS ====================
const collectibleCards = [
  { id: 'kimchi', emoji: '🥬', name: 'Kimchi', rarity: 'Comum', atk: 3, def: 5 },
  { id: 'hanbok', emoji: '👘', name: 'Hanbok', rarity: 'Comum', atk: 2, def: 6 },
  { id: 'gayageum', emoji: '🎻', name: 'Gayageum', rarity: 'Raro', atk: 5, def: 4 },
  { id: 'hangul', emoji: '한', name: 'Hangul', rarity: 'Raro', atk: 6, def: 6 },
  { id: 'cheongja', emoji: '🏺', name: 'Cheongja', rarity: 'Épico', atk: 7, def: 7 },
  { id: 'dokkaebi', emoji: '👹', name: 'Dokkaebi', rarity: 'Épico', atk: 9, def: 6 },
  { id: 'sakura', emoji: '🌸', name: 'Sakura', rarity: 'Comum', atk: 2, def: 4 },
  { id: 'taegeuk', emoji: '☯️', name: 'Taegeuk', rarity: 'Lendário', atk: 10, def: 10 },
  { id: 'yong', emoji: '🐉', name: 'Yong', rarity: 'Lendário', atk: 12, def: 8 },
  { id: 'gumiho', emoji: '🦊', name: 'Gumiho', rarity: 'Épico', atk: 8, def: 7 },
  { id: 'yeon', emoji: '🪷', name: 'Lótus', rarity: 'Raro', atk: 5, def: 8 },
  { id: 'songpyeon', emoji: '🍡', name: 'Songpyeon', rarity: 'Comum', atk: 3, def: 4 },
  { id: 'jin', emoji: '🐲', name: 'Jin', rarity: 'Épico', atk: 8, def: 9 },
  { id: 'kkachi', emoji: '🦅', name: 'Kkachi', rarity: 'Raro', atk: 7, def: 5 },
  { id: 'sanshin', emoji: '⛰️', name: 'Sanshin', rarity: 'Épico', atk: 6, def: 10 },
  { id: 'haetae', emoji: '🦁', name: 'Haetae', rarity: 'Lendário', atk: 11, def: 9 },
  { id: 'bulgogi', emoji: '🥩', name: 'Bulgogi', rarity: 'Comum', atk: 4, def: 3 },
  { id: 'buk', emoji: '🥁', name: 'Buk', rarity: 'Comum', atk: 4, def: 5 },
  { id: 'hanji', emoji: '📜', name: 'Hanji', rarity: 'Raro', atk: 4, def: 7 },
  { id: 'ttakji', emoji: '🎴', name: 'Ttakji', rarity: 'Comum', atk: 3, def: 3 },
  { id: 'ariza', emoji: '🌸', name: 'Ariza 선생님', rarity: 'Lendário', atk: 15, def: 15 }
];

// ==================== PETS ====================
const petsData = [
  { id: 'tiger', emoji: '🐯', name: 'Horang-i', desc: 'Tigre', bonus: 'Dobra streak' },
  { id: 'dragon', emoji: '🐉', name: 'Yong', desc: 'Dragão', bonus: '+50% moedas' },
  { id: 'fox', emoji: '🦊', name: 'Gumiho', desc: 'Raposa', bonus: 'Sorte em cartas' },
  { id: 'crane', emoji: '🦢', name: 'Hak', desc: 'Grou', bonus: '+5s tempo' },
  { id: 'cat', emoji: '🐈', name: 'Goyang-i', desc: 'Gato', bonus: '+10 karma' },
  { id: 'dog', emoji: '🐕', name: 'Gae', desc: 'Cão', bonus: 'Vida extra' },
  { id: 'turtle', emoji: '🐢', name: 'Geobugi', desc: 'Tartaruga', bonus: 'Dica grátis' },
  { id: 'phoenix', emoji: '🦅', name: 'Bonghwang', desc: 'Fênix', bonus: 'Recompensa dobrada' }
];

// ==================== CONQUISTAS ====================
const achievementsList = [
  { id: 'first', icon: '🌟', name: 'Primeira', desc: 'Primeira resposta' },
  { id: 'streak5', icon: '🔥', name: 'Chamas', desc: '5 acertos' },
  { id: 'streak10', icon: '⚡', name: 'Imparável', desc: '10 acertos' },
  { id: 'streak20', icon: '💫', name: 'Lendário', desc: '20 acertos' },
  { id: 'perfect', icon: '👑', name: 'Perfeito', desc: '100%' },
  { id: 'fast', icon: '💨', name: 'Veloz', desc: '< 3s' },
  { id: 'no-hint', icon: '🎯', name: 'Sem Ajuda', desc: 'Sem dicas' },
  { id: 'chapter1', icon: '🍜', name: 'Chef', desc: 'Gastronomia' },
  { id: 'chapter2', icon: '🎵', name: 'Artista', desc: 'Arte' },
  { id: 'chapter3', icon: '🎎', name: 'Tradicional', desc: 'Tradições' },
  { id: 'chapter4', icon: '🏯', name: 'Historiador', desc: 'História' },
  { id: 'chapter5', icon: '🌆', name: 'Moderno', desc: 'Modernidade' },
  { id: 'chapter6', icon: '🐉', name: 'Lendário', desc: 'Folclore' },
  { id: 'chapter7', icon: '🎬', name: 'Cinéfilo', desc: 'Dramas & Cinema' },
  { id: 'chapter8', icon: '⚽', name: 'Atleta', desc: 'Esportes' },
  { id: 'chapter9', icon: '🗺️', name: 'Viajante', desc: 'Regiões' },
  { id: 'chapter10', icon: '🌸', name: 'Aluno Ariza', desc: 'Ariza 선생님' },
  { id: 'hangul', icon: '한', name: 'Hangul', desc: 'Mini jogo' },
  { id: 'memory', icon: '🧠', name: 'Memória', desc: 'Jogo da memória' },
  { id: 'puzzle', icon: '🧩', name: 'Puzzle', desc: 'Quebra-cabeça' },
  { id: 'painter', icon: '🎨', name: 'Pintor', desc: 'Pintura' },
  { id: 'calligrapher', icon: '✍️', name: 'Calígrafo', desc: 'Caligrafia' },
  { id: 'share', icon: '📤', name: 'Divulgador', desc: 'Compartilhar' },
  { id: 'duo', icon: '👥', name: 'Amigos', desc: '2 players' },
  { id: 'boss', icon: '👹', name: 'Caçador', desc: 'Chefão' },
  { id: 'collector', icon: '🃏', name: 'Colecionador', desc: '20 cartas' },
  { id: 'coin500', icon: '💰', name: 'Rico', desc: '500 moedas' },
  { id: 'coin1000', icon: '💎', name: 'Milionário', desc: '1000 moedas' },
  { id: 'level10', icon: '🎖️', name: 'Veterano', desc: 'Nível 10' },
  { id: 'level20', icon: '🏅', name: 'Mestre', desc: 'Nível 20' },
  { id: 'chaos', icon: '🌀', name: 'Caótico', desc: 'Modo Caos' },
  { id: 'time-attack', icon: '⏱️', name: 'Corredor', desc: 'Tempo' },
  { id: 'rpg', icon: '⚔️', name: 'Aventureiro', desc: 'RPG' },
  { id: 'meditator', icon: '🧘', name: 'Zen', desc: 'Meditação' },
  { id: 'tea-master', icon: '🍵', name: 'Chá', desc: 'Cerimônia' },
  { id: 'karaoke-star', icon: '🎤', name: 'Estrela', desc: 'Karaokê' },
  { id: 'tarot-master', icon: '🔮', name: 'Vidente', desc: 'Tarô' },
  { id: 'gardener', icon: '🌱', name: 'Jardineiro', desc: 'Plantas' },
  { id: 'hanbok-designer', icon: '👘', name: 'Estilista', desc: 'Hanbok' },
  { id: 'sijo-lover', icon: '📜', name: 'Poeta', desc: 'Sijo' },
  { id: 'combat', icon: '🥋', name: 'Lutador', desc: 'Taekwondo' },
  { id: 'baduk', icon: '⚫', name: 'Estrategista', desc: 'Go' },
  { id: 'world-explorer', icon: '🌆', name: 'Explorador', desc: 'Mundo 3D' },
  { id: 'chef-master', icon: '🍽️', name: 'Master Chef', desc: 'Restaurante' },
  { id: 'idol-manager', icon: '🎤', name: 'Manager', desc: 'K-Idol' },
  { id: 'sa ju', icon: '🌟', name: 'Astrólogo', desc: 'Saju' },
  { id: 'pianist', icon: '🎹', name: 'Pianista', desc: 'Piano' },
  { id: 'gambler', icon: '🎲', name: 'Apostador', desc: 'Dado' },
  { id: 'fortune-teller', icon: '🃏', name: 'Cartomante', desc: 'Cartas' },
  { id: 'map-explorer', icon: '🗺️', name: 'Cartógrafo', desc: 'Mapa' },
  { id: 'historian', icon: '📅', name: 'Cronista', desc: 'Timeline' },
  { id: 'pet-owner', icon: '🐯', name: 'Dono de Pet', desc: 'Adotar pet' },
  { id: 'pet-master', icon: '🎁', name: 'Pet Master', desc: 'Pet nível 10' },
  { id: 'mission-master', icon: '✅', name: 'Missionário', desc: '10 missões' },
  { id: 'drummer', icon: '🥁', name: 'Baterista', desc: 'Tambor' },
  { id: 'pixel-artist', icon: '🖼️', name: 'Pixel Artist', desc: 'Pixel Art' },
  { id: 'mandala-maker', icon: '🌺', name: 'Mandala', desc: 'Mandala' },
  { id: 'scratch-win', icon: '🎰', name: 'Sortudo', desc: 'Raspadinha' },
  { id: 'tcg-master', icon: '🃏', name: 'TCG Master', desc: 'Batalha TCG' },
  { id: 'code-master', icon: '🔑', name: 'Hacker', desc: 'Código secreto' },
  { id: 'ariza-fan', icon: '🌸', name: 'Fã da Ariza', desc: 'Código ARIZA' }
];

// ==================== MISSÕES ====================
const missionsList = [
  { id: 'm1', icon: '🎯', title: 'Atirador', desc: 'Acerte 15 perguntas', reward: 30 },
  { id: 'm2', icon: '🔥', title: 'Em Chamas', desc: '7 acertos seguidos', reward: 50 },
  { id: 'm3', icon: '💰', title: 'Rico', desc: 'Ganhe 300 moedas', reward: 80 },
  { id: 'm4', icon: '🎮', title: 'Gamer', desc: 'Jogue 5 mini jogos', reward: 40 },
  { id: 'm5', icon: '🏆', title: 'Vencedor', desc: 'Vença 3 partidas', reward: 100 },
  { id: 'm6', icon: '🎨', title: 'Artista', desc: 'Use pintura/caligrafia', reward: 25 },
  { id: 'm7', icon: '🐯', title: 'Cuidador', desc: 'Alimente seu pet', reward: 35 },
  { id: 'm8', icon: '🔮', title: 'Místico', desc: 'Tire o tarô', reward: 30 },
  { id: 'm9', icon: '🌸', title: 'Ariza', desc: 'Acerte 5 do capítulo Ariza', reward: 120 },
  { id: 'm10', icon: '📚', title: 'Estudioso', desc: 'Complete 3 capítulos', reward: 90 }
];