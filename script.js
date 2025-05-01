const questions = [
  {
    text: "Como você reage diante de um desafio inesperado no trabalho?",
    options: [
      { text: "A) Enfrento o problema de imediato, sem hesitar", house: "a" },
      { text: "B) Paro, analiso e busco a melhor solução lógica", house: "b" },
      { text: "C) Converso com o time e buscamos uma solução juntos", house: "c" },
      { text: "D) Penso em como virar o jogo a meu favor", house: "d" },
    ]
  },
  {
    text: "Qual dessas qualidades você mais valoriza em um colega de trabalho?",
    options: [
      { text: "A) Coragem e atitude", house: "a" },
      { text: "B) Inteligência e criatividade", house: "b" },
      { text: "C) Lealdade e empatia", house: "c" },
      { text: "D) Ambição e resultados", house: "d" },
    ]
  },
  {
    text: "Seu estilo de trabalho é mais...",
    options: [
      { text: "A) Rápido e prático – prefiro ação!", house: "a" },
      { text: "B) Detalhista e planejado – gosto de saber onde estou pisando", house: "b" },
      { text: "C) Colaborativo e acolhedor – ninguém faz nada sozinho", house: "c" },
      { text: "D) Estratégico e focado – penso sempre no próximo passo", house: "d" },
    ]
  },
  {
    text: "O que te motiva a seguir em frente?",
    options: [
      { text: "A) Superar limites e fazer a diferença", house: "a" },
      { text: "B) Aprender e expandir conhecimento", house: "b" },
      { text: "C) Ajudar os outros e sentir que contribuo com o time", house: "c" },
      { text: "D) Alcançar meus objetivos e crescer profissionalmente", house: "d" },
    ]
  },
  {
    text: "Em uma situação de conflito, você...",
    options: [
      { text: "A) Assume a liderança e resolve logo", house: "a" },
      { text: "B) Busca compreender todas as perspectivas", house: "b" },
      { text: "C) Tenta manter a harmonia entre as partes", house: "c" },
      { text: "D) Usa sua influência para conduzir o resultado desejado", house: "d" },
    ]
  },
];

const bgImages = [
  'img1.jpg',
  'img2.jpg',
  'img3.jpg',
  'img4.jpg',
  'img5.jpg'
];

// Pré-carregamento das imagens
bgImages.forEach(src => {
  const img = new Image();
  img.src = src;
});

let currentQuestion = 0;
const scores = { a: 0, b: 0, c: 0, d: 0 };

function startQuiz() {
  document.querySelector('.start-screen').style.display = 'none';
  document.getElementById('quiz').style.display = 'block';
  renderQuestion();
}

function renderQuestion() {
  const questionDiv = document.getElementById("question");
  const optionsDiv = document.getElementById("options");
  const nextBtn = document.getElementById("nextBtn");

  // Mudar imagem de fundo da página
  document.body.style.backgroundImage = `url('${bgImages[currentQuestion]}')`;

  questionDiv.innerHTML = `<h2>${questions[currentQuestion].text}</h2>`;
  optionsDiv.innerHTML = "";

  questions[currentQuestion].options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;
    btn.onclick = () => {
      scores[opt.house]++;
      Array.from(optionsDiv.children).forEach(b => b.disabled = true);
      btn.style.backgroundColor = "#ffcf4a";
      btn.style.color = "#000";
      nextBtn.style.display = 'inline';
    };
    optionsDiv.appendChild(btn);
  });

  nextBtn.style.display = 'none';
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const quiz = document.getElementById("quiz");
  let max = Math.max(scores.a, scores.b, scores.c, scores.d);
  let house =
    scores.a === max ? "Grifinória" :
    scores.b === max ? "Corvinal" :
    scores.c === max ? "Lufa-Lufa" :
    "Sonserina";

  quiz.innerHTML = `
    <h1>Sua Casa é...</h1>
    <h2 style="font-size: 3rem; color: gold;">${house}</h2>
    <p>Você se destacou pelas qualidades e estratégias que representam essa casa no mundo corporativo mágico!</p>
  `;

  // Imagem final (opcional)
  document.body.style.backgroundImage = `url('img/final.jpeg')`;
}
