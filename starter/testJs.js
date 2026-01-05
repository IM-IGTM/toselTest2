window.onload = function () {
  // -----------------------------
  // 0. 학생 이름 및 설정
  // -----------------------------
  const urlParams = new URLSearchParams(window.location.search);
  const studentNameValue = urlParams.get("studentName") || "이름 정보 없음";

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // -----------------------------
  // 1. Starter 레벨 원본 데이터 (100문제)
  // -----------------------------
  const rawData = [
    // 1유형: 그림보고 맞추기 (이미지 O)
    { q: "모서리, 모퉁이", a: "corner", type: 1 },
    { q: "지구본", a: "globe", type: 1 },
    { q: "준비가 된", a: "ready", type: 1 },
    { q: "교과서", a: "textbook", type: 1 },
    { q: "대양, 바다", a: "ocean", type: 1 },
    { q: "모으다, 수집하다", a: "collect", type: 1 },
    { q: "경주", a: "race", type: 1 },
    { q: "달콤한, 향기로운", a: "sweet", type: 1 },
    { q: "단어", a: "word", type: 1 },
    { q: "꿈, 꿈을 꾸다", a: "dream", type: 1 },
    { q: "조끼", a: "vest", type: 1 },
    { q: "(귀 기울여) 듣다", a: "listen", type: 1 },
    { q: "나비", a: "butterfly", type: 1 },
    { q: "용감한", a: "brave", type: 1 },
    { q: "선물", a: "gift", type: 1 },
    { q: "운동, 운동하다", a: "exercise", type: 1 },
    { q: "공정한", a: "fair", type: 1 },
    { q: "즐거운, 재미", a: "fun", type: 1 },
    { q: "레몬", a: "lemon", type: 1 },
    { q: "입고있다", a: "wear", type: 1 },
    { q: "가리키다", a: "point", type: 1 },
    { q: "일본어", a: "Japanese", type: 1 },
    { q: "아침(식사)", a: "breakfast", type: 1 },
    { q: "거미", a: "spider", type: 1 },
    { q: "받다, 얻다", a: "get", type: 1 },
    { q: "어느, 어떤", a: "any", type: 1 },
    { q: "카페", a: "cafe", type: 1 },
    { q: "질문, 의문, 문제", a: "question", type: 1 },
    { q: "빗자루", a: "broom", type: 1 },
    { q: "철자를 말하다(쓰다)", a: "spell", type: 1 },
    { q: "샤워를 하다", a: "shower", type: 1 },
    { q: "동물", a: "animal", type: 1 },
    { q: "야채, 채소", a: "vegetable", type: 1 },
    { q: "시간", a: "hour", type: 1 },
    { q: "늦은", a: "late", type: 1 },
    { q: "함께, 같이", b: "together", type: 1 },
    { q: "공간, 장소", a: "space", type: 1 },
    { q: "방, -실", a: "room", type: 1 },
    { q: "(미식) 축구", a: "football", type: 1 },
    { q: "주시하다, 보다", a: "watch", type: 1 },
    { q: "(짐을) 싸다", a: "pack", type: 1 },
    { q: "덤불, 관목", a: "bush", type: 1 },
    { q: "찾다", a: "find", type: 1 },
    { q: "안전한", a: "safe", type: 1 },
    { q: "볼, 뺨", a: "cheek", type: 1 },
    { q: "옷", a: "clothes", type: 1 },
    { q: "아이, 청소년", a: "kid", type: 1 },
    { q: "빠른", a: "quick", type: 1 },
    { q: "버튼, 단추", a: "button", type: 1 },
    { q: "애완동물", a: "pet", type: 1 },
    { q: "둘 다", a: "both", type: 1 },
    { q: "컴퓨터", a: "computer", type: 1 },
    { q: "말하다, 이야기하다", a: "speak", type: 1 },
    { q: "샐러드", a: "salad", type: 1 },
    { q: "들판", a: "field", type: 1 },
    { q: "바라다, 희망하다", a: "hope", type: 1 },
    { q: "유지하다, 보존하다", a: "keep", type: 1 },
    { q: "(소리가) 큰, 시끄러운", a: "loud", type: 1 },
    { q: "공유하다", a: "share", type: 1 },
    { q: "(종이나 천을) 접다", a: "fold", type: 1 },
    { q: "피부", a: "skin", type: 1 },
    { q: "초", a: "second", type: 1 },
    { q: "초대하다", a: "invite", type: 1 },
    { q: "혀", a: "tongue", type: 1 },
    { q: "사람들", a: "people", type: 1 },
    { q: "주위에서", a: "around", type: 1 },
    { q: "보통, 대개", a: "usually", type: 1 },
    { q: "애벌레", a: "worm", type: 1 },
    { q: "정장", a: "suit", type: 1 },
    { q: "연습하다, 실행", a: "practice", type: 1 },

    // 2유형: 한글 뜻보고 맞추기 (이미지 X)
    { q: "미술", a: "art", type: 2 },
    { q: "양탄자, 카펫", a: "carpet", type: 2 },
    { q: "모든", a: "all", type: 2 },
    { q: "중심, 중앙", a: "center", type: 2 },
    { q: "목구멍, 목", a: "throat", type: 2 },
    { q: "거실", a: "living room", type: 2 },
    { q: "악어", a: "crocodile", type: 2 },
    { q: "자신의(~의) [소유]", a: "own", type: 2 },
    { q: "고치다", a: "fix", type: 2 },
    { q: "머무르다", a: "stay", type: 2 },
    { q: "시원한", a: "cool", type: 2 },
    { q: "습관", a: "habit", type: 2 },
    { q: "잘, 건강한", a: "well", type: 2 },
    { q: "반복하다", a: "repeat", type: 2 },
    { q: "색", a: "color", type: 2 },
    { q: "알다", a: "know", type: 2 },
    { q: "도착하다", a: "arrive", type: 2 },
    { q: "시험", a: "exam", type: 2 },
    { q: "채우다, 채워지다", a: "fill", type: 2 },
    { q: "맑은", a: "clear", type: 2 },

    // 3유형: 그림과 문장보고 맞추기 (이미지 O)
    { q: "Her dream is to be a _______.\n농부", a: "farmer", type: 3 },
    { q: "I'm _______ to meet you.\n기쁜", a: "glad", type: 3 },
    { q: "Look at that _______ jumping!\n돌고래", a: "dolphin", type: 3 },
    {
      q: "That is the tallest _______ in my city.\n건물",
      a: "building",
      type: 3,
    },
    { q: "He is a famous _______.\n음악가", a: "musician", type: 3 },
    { q: "How much is this _______?\n플루트", a: "flute", type: 3 },
    { q: "We _______ about our new teacher.\n이야기하다", a: "talk", type: 3 },
    { q: "How many _______ are there?\n아이들", a: "children", type: 3 },
    { q: "_______ some things for school.\n가져오다", a: "bring", type: 3 },
    { q: "The cat is under the _______.\n식탁", a: "table", type: 3 },
  ];

  // -----------------------------
  // 2. 최종 문제 데이터 구성 (셔플 및 오답 자동 생성)
  // -----------------------------
  const allAnswerPool = rawData.map((d) => d.a);
  const questions = rawData.map((item) => {
    const wrongOnes = shuffle(
      allAnswerPool.filter((ans) => ans !== item.a)
    ).slice(0, 4);
    const options = shuffle([item.a, ...wrongOnes]);
    return {
      title: item.q,
      options: options,
      correctIndex: options.indexOf(item.a),
      img: item.type === 1 || item.type === 3 ? `img/${item.a}.png` : null,
    };
  });

  // -----------------------------
  // 3. 정답 테이블 생성 (결과 확인용)
  // -----------------------------
  const tbody = document.querySelector(".answer-table tbody");
  if (tbody) {
    tbody.innerHTML = "";
    const totalQ = questions.length;
    const groupSize = 5;
    for (let g = 0; g < Math.ceil(totalQ / groupSize); g++) {
      const start = g * groupSize + 1;
      const titleRow = document.createElement("tr");
      const answerRow = document.createElement("tr");

      titleRow.innerHTML = `<td>문제</td>`;
      answerRow.innerHTML = `<td>선택</td>`;

      for (let n = start; n < start + groupSize && n <= totalQ; n++) {
        const titleTd = document.createElement("td");
        titleTd.id = "title-q" + n;
        titleTd.textContent = questions[n - 1].title.split("\n")[0];
        titleRow.appendChild(titleTd);

        const answerTd = document.createElement("td");
        answerTd.id = "answer-q" + n;
        answerRow.appendChild(answerTd);
      }
      tbody.appendChild(titleRow);
      tbody.appendChild(answerRow);
    }
  }

  // -----------------------------
  // 4. 시험 기능 변수 및 타이머
  // -----------------------------
  let currentQuestion = 0;
  let selectedIndex = null;
  let correctCount = 0;
  let timeLeft = 20;
  let countdownInterval = null;

  const timerSpan = document.getElementById("timer-sec");
  const questionLabel = document.getElementById("questionLabel");
  const buttons = document.querySelectorAll(".choice-row button");

  function startTimer() {
    if (countdownInterval) clearInterval(countdownInterval);
    timeLeft = 20;
    if (timerSpan) timerSpan.textContent = timeLeft;
    countdownInterval = setInterval(() => {
      timeLeft--;
      if (timerSpan) timerSpan.textContent = timeLeft;
      if (timeLeft <= 0) handleTimeout();
    }, 1000);
  }

  function handleTimeout() {
    const qNum = currentQuestion + 1;
    const cell = document.getElementById("answer-q" + qNum);
    if (cell) {
      cell.textContent = "-";
      cell.classList.add("wrong-cell");
    }
    nextStep();
  }

  function renderQuestion() {
    const q = questions[currentQuestion];
    if (!q) return;

    selectedIndex = null;
    buttons.forEach((btn) => btn.classList.remove("selected"));
    questionLabel.innerHTML = q.title.replace(/\n/g, "<br>");

    const imgTag = document.getElementById("questionImage");
    if (imgTag) {
      if (q.img) {
        imgTag.src = q.img;
        imgTag.style.display = "block";
        imgTag.onerror = () => {
          imgTag.style.display = "none";
        };
      } else {
        imgTag.style.display = "none";
      }
    }

    q.options.forEach((opt, idx) => {
      if (buttons[idx]) buttons[idx].textContent = idx + 1 + ". " + opt;
    });
    startTimer();
  }

  function handleAnswer(choiceIdx) {
    if (countdownInterval) clearInterval(countdownInterval);
    const q = questions[currentQuestion];
    const qNum = currentQuestion + 1;
    const cell = document.getElementById("answer-q" + qNum);

    if (cell) cell.textContent = q.options[choiceIdx];
    if (choiceIdx === q.correctIndex) {
      correctCount++;
    } else {
      if (cell) cell.classList.add("wrong-cell");
    }
    nextStep();
  }

  function nextStep() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      renderQuestion();
    } else {
      finishExam();
    }
  }

  function finishExam() {
    if (countdownInterval) clearInterval(countdownInterval);
    document.querySelector(".quiz-container").style.display = "none";
    document.querySelector(".examOver").style.display = "block";
  }

  // -----------------------------
  // 5. 키보드 및 클릭 이벤트
  // -----------------------------
  const keyToIndex = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4 };
  document.addEventListener("keydown", (e) => {
    if (currentQuestion >= questions.length) return;

    if (e.code === "Space") {
      e.preventDefault();
      if (selectedIndex !== null) handleAnswer(selectedIndex);
    }

    const idx = keyToIndex[e.key];
    if (idx !== undefined) {
      selectedIndex = idx;
      buttons.forEach((btn, i) => {
        i === idx
          ? btn.classList.add("selected")
          : btn.classList.remove("selected");
      });
    }
  });

  document.addEventListener("click", (e) => {
    if (currentQuestion < questions.length && !e.target.closest(".resultOk")) {
      alert("⚠️ 키보드(1~5 및 Space)를 사용해 주세요!");
    }
  });

  // 결과보기 및 PDF
  window.resultOk = function () {
    const pw = prompt("결과 비밀번호를 입력하세요.");
    if (pw !== "1234") return alert("비밀번호 오류");

    document.querySelector(".examOver").style.display = "none";
    document.querySelector(".answer-panel").style.display = "block";
    document.getElementById("result-name").textContent = studentNameValue;
    document.getElementById("result-correct").textContent = correctCount;
    document.getElementById("result-total").textContent = questions.length;

    setTimeout(() => {
      html2canvas(document.querySelector(".answer-panel")).then((canvas) => {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(
          canvas.toDataURL("image/png"),
          "PNG",
          0,
          0,
          210,
          (canvas.height * 210) / canvas.width
        );
        pdf.save(`${studentNameValue}_결과.pdf`);
      });
    }, 500);
  };

  renderQuestion();
};
