window.onload = function () {
  // -----------------------------
  // 0. 학생 이름 (결과에서 사용)
  // -----------------------------
  const urlParams = new URLSearchParams(window.location.search);
  const studentNameValue = urlParams.get("studentName") || "이름 정보 없음";

  // -----------------------------
  // 공통: 배열 섞기
  // -----------------------------
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // -----------------------------
  // 1. 원본 데이터 (100문제)
  // -----------------------------
  const rawData = [
    // 1유형: 그림보고 맞추기 (이미지 O)
    { q: "시험", a: "test", type: 1 },
    { q: "심다", a: "plant", type: 1 },
    { q: "새", a: "bird", type: 1 },
    { q: "헬멧", a: "helmet", type: 1 },
    { q: "지도", a: "map", type: 1 },
    { q: "창문", a: "window", type: 1 },
    { q: "강", a: "river", type: 1 },
    { q: "읽다", a: "read", type: 1 },
    { q: "남자형제", a: "brother", type: 1 },
    { q: "삼각형", a: "triangle", type: 1 },
    { q: "간식", a: "snack", type: 1 },
    { q: "발가락", a: "toe", type: 1 },
    { q: "팔", a: "arm", type: 1 },
    { q: "(발로) 차다", a: "kick", type: 1 },
    { q: "이름", a: "name", type: 1 },
    { q: "쓰다", a: "write", type: 1 },
    { q: "자전거", a: "bike", type: 1 },
    { q: "예술가", a: "artist", type: 1 },
    { q: "아기", a: "baby", type: 1 },
    { q: "곰", a: "bear", type: 1 },
    { q: "귀", a: "ear", type: 1 },
    { q: "돼지", a: "pig", type: 1 },
    { q: "포도", a: "grape", type: 1 },
    { q: "무용수", a: "dancer", type: 1 },
    { q: "개구리", a: "frog", type: 1 },
    { q: "그릇", a: "bowl", type: 1 },
    { q: "계란", a: "egg", type: 1 },
    { q: "사슴", a: "deer", type: 1 },
    { q: "공", a: "ball", type: 1 },
    { q: "식탁, 테이블", a: "table", type: 1 },
    { q: "캠프", a: "camp", type: 1 },
    { q: "접시", a: "dish", type: 1 },
    { q: "신선한", a: "fresh", type: 1 },
    { q: "우유", a: "milk", type: 1 },
    { q: "스토브", a: "stove", type: 1 },
    { q: "큰", a: "big", type: 1 },
    { q: "돕다", a: "help", type: 1 },
    { q: "목", a: "neck", type: 1 },
    { q: "가족", a: "family", type: 1 },
    { q: "서다", a: "stand", type: 1 },
    { q: "노란색", a: "yellow", type: 1 },
    { q: "사자", a: "lion", type: 1 },
    { q: "생일", a: "birthday", type: 1 },
    { q: "냄비", a: "pot", type: 1 },
    { q: "호랑이", a: "tiger", type: 1 },
    { q: "고양이", a: "cat", type: 1 },
    { q: "도시", a: "city", type: 1 },
    { q: "케이크", a: "cake", type: 1 },
    { q: "달리다", a: "run", type: 1 },
    { q: "달, 월", a: "month", type: 1 },
    { q: "건너다, 가로지르다", a: "cross", type: 1 },
    { q: "나무", a: "tree", type: 1 },
    { q: "자다", a: "sleep", type: 1 },
    { q: "길, 도로", a: "road", type: 1 },
    { q: "보라색", a: "purple", type: 1 },
    { q: "침대", a: "bed", type: 1 },
    { q: "얼룩말", a: "zebra", type: 1 },
    { q: "아픈", a: "sick", type: 1 },
    { q: "밥, 쌀", a: "rice", type: 1 },
    { q: "머리카락", a: "hair", type: 1 },
    { q: "마시다", a: "drink", type: 1 },
    { q: "(잠에서) 깨다", a: "wake", type: 1 },
    { q: "주스", a: "juice", type: 1 },
    { q: "웃다", a: "smile", type: 1 },
    { q: "복싱", a: "boxing", type: 1 },
    { q: "꽃병", a: "vase", type: 1 },
    { q: "열둘(12)", a: "twelve", type: 1 },
    { q: "원", a: "circle", type: 1 },
    { q: "빨간색", a: "red", type: 1 },
    { q: "뚱뚱한", a: "fat", type: 1 },

    // 2유형: 뜻보고 맞추기 (이미지 X)
    { q: "프라이팬", a: "pan", type: 2 },
    { q: "자", a: "ruler", type: 2 },
    { q: "초록색", a: "green", type: 2 },
    { q: "시간", a: "time", type: 2 },
    { q: "연필", a: "pencil", type: 2 },
    { q: "비행기", a: "plane", type: 2 },
    { q: "노래하다", a: "sing", type: 2 },
    { q: "의자", a: "chair", type: 2 },
    { q: "별", a: "star", type: 2 },
    { q: "반[학급]", a: "class", type: 2 },
    { q: "만들다", a: "make", type: 2 },
    { q: "어머니", a: "mother", type: 2 },
    { q: "넥타이", a: "tie", type: 2 },
    { q: "하나", a: "one", type: 2 },
    { q: "몸", a: "body", type: 2 },
    { q: "장갑", a: "glove", type: 2 },
    { q: "낮", a: "day", type: 2 },
    { q: "밤", a: "night", type: 2 },
    { q: "햄버거", a: "hamburger", type: 2 },
    { q: "갈색", a: "brown", type: 2 },

    // 3유형: 문장+그림보고 맞추기 (이미지 O)
    { q: "My family loves to _______.\n여행하다", a: "travel", type: 3 },
    { q: "Let's feel the fresh _______.\n공기", a: "air", type: 3 },
    { q: "There is a dog _______ the chair.\n아래에", a: "under", type: 3 },
    { q: "Open the _______, please.\n문", a: "door", type: 3 },
    { q: "I eat _______ for breakfast.\n빵", a: "bread", type: 3 },
    { q: "I _______ a gift to my friend.\n주다", a: "give", type: 3 },
    { q: "Take your _______.\n코트", a: "coat", type: 3 },
    { q: "Can I drink a _______ of milk?\n컵", a: "cup", type: 3 },
    { q: "_______ your hands.\n박수", a: "clap", type: 3 },
    { q: "She wants to be a ______.\n가수", a: "singer", type: 3 },
  ];

  // 모든 정답 리스트 (오답 추출용)
  const allAnswerPool = rawData.map((d) => d.a);

  // -----------------------------
  // 2. 최종 시험 문제 배열 생성 (자동 보기 구성)
  // -----------------------------
  const questions = rawData.map((item) => {
    // 사지선다를 위해 현재 정답 제외하고 3개만 랜덤 추출
    const wrongOnes = shuffle(
      allAnswerPool.filter((ans) => ans !== item.a)
    ).slice(0, 3);
    const options = shuffle([item.a, ...wrongOnes]);

    return {
      title: item.q,
      options: options,
      correctIndex: options.indexOf(item.a),
      type: item.type,
      // 1유형과 3유형만 이미지 경로 생성, 2유형은 null
      img: item.type === 1 || item.type === 3 ? `img/${item.a}.png` : null,
    };
  });

  // -----------------------------
  // 3. 정답 테이블 동적 생성
  // -----------------------------
  const tbody = document.querySelector(".answer-table tbody");
  if (tbody) {
    tbody.innerHTML = "";
    const totalQuestions = questions.length;
    const groupSize = 5;
    const groupCount = Math.ceil(totalQuestions / groupSize);

    for (let g = 0; g < groupCount; g++) {
      const start = g * groupSize + 1;
      const titleRow = document.createElement("tr");
      const titleLabelCell = document.createElement("td");
      titleLabelCell.textContent = "문제";
      titleRow.appendChild(titleLabelCell);

      const answerRow = document.createElement("tr");
      const answerLabelCell = document.createElement("td");
      answerLabelCell.textContent = "선택";
      answerRow.appendChild(answerLabelCell);

      for (let n = start; n < start + groupSize && n <= totalQuestions; n++) {
        const titleTd = document.createElement("td");
        titleTd.id = "title-q" + n;
        titleTd.className = "question-title-cell";
        titleTd.textContent = questions[n - 1].title.split("\n")[0];
        titleRow.appendChild(titleTd);

        const answerTd = document.createElement("td");
        answerTd.id = "answer-q" + n;
        answerTd.className = "answer";
        answerRow.appendChild(answerTd);
      }
      tbody.appendChild(titleRow);
      tbody.appendChild(answerRow);
    }
  }

  // -----------------------------
  // 4. 시험 상태 변수
  // -----------------------------
  let currentQuestion = 0;
  let selectedIndex = null;
  const TIMER_DURATION = 20;
  let timeLeft = TIMER_DURATION;
  let countdownInterval = null;
  let correctCount = 0;

  const questionLabel = document.getElementById("questionLabel");
  const buttons = [
    document.querySelector(".one"),
    document.querySelector(".two"),
    document.querySelector(".three"),
    document.querySelector(".four"),
    // 사지선다이므로 .five 제외
  ];
  const timerSpan = document.getElementById("timer-sec");

  // -----------------------------
  // 5. 핵심 로직 함수
  // -----------------------------
  function startTimer() {
    if (countdownInterval) clearInterval(countdownInterval);
    timeLeft = TIMER_DURATION;
    if (timerSpan) timerSpan.textContent = timeLeft;

    countdownInterval = setInterval(() => {
      timeLeft--;
      if (timerSpan) timerSpan.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        handleTimeout();
      }
    }, 1000);
  }

  function handleTimeout() {
    if (currentQuestion >= questions.length) return;
    const qNum = currentQuestion + 1;
    const cell = document.getElementById("answer-q" + qNum);
    if (cell) {
      cell.textContent = "-";
      cell.classList.add("wrong-cell");
    }
    currentQuestion++;
    currentQuestion < questions.length ? renderQuestion() : finishExam();
  }

  function renderQuestion() {
    const q = questions[currentQuestion];
    if (!q) return;

    selectedIndex = null;
    buttons.forEach((btn) => btn && btn.classList.remove("selected"));

    if (questionLabel) {
      questionLabel.innerHTML = q.title.replace(/\n/g, "<br>");
    }

    const imgTag = document.getElementById("questionImage");

    if (questionLabel) {
      if (q.type === 1) {
        // 유형 1(그림보고 맞추기)인 경우 텍스트 라벨을 - 로 표시
        questionLabel.textContent = "-";
      } else {
        // 그 외 유형은 기존처럼 텍스트 출력 (줄바꿈 지원)
        questionLabel.innerHTML = q.title.replace(/\n/g, "<br>");
      }
    }

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

    // 사지선다이므로 만약 HTML에 5번 버튼이 있다면 숨김 처리
    const btnFive = document.querySelector(".five");
    if (btnFive) btnFive.style.display = "none";

    q.options.forEach((opt, idx) => {
      if (buttons[idx]) buttons[idx].textContent = idx + 1 + ". " + opt;
    });

    startTimer();
  }

  function handleAnswer(choiceIndex) {
    const q = questions[currentQuestion];
    if (countdownInterval) clearInterval(countdownInterval);

    const selectedText = q.options[choiceIndex];
    const qNum = currentQuestion + 1;
    const cell = document.getElementById("answer-q" + qNum);
    if (cell) cell.textContent = selectedText;

    if (choiceIndex === q.correctIndex) {
      correctCount++;
    } else {
      if (cell) cell.classList.add("wrong-cell");
    }

    currentQuestion++;
    currentQuestion < questions.length ? renderQuestion() : finishExam();
  }

  function finishExam() {
    if (countdownInterval) clearInterval(countdownInterval);
    document.querySelector(".quiz-container").style.display = "none";
    document.querySelector(".examOver").style.display = "block";
  }

  // -----------------------------
  // 6. 이벤트 및 초기화
  // -----------------------------
  const keyToIndex = { 1: 0, 2: 1, 3: 2, 4: 3 }; // 5번 제외

  document.addEventListener("keydown", function (e) {
    if (currentQuestion >= questions.length) return;

    if (e.code === "Space") {
      e.preventDefault();
      if (selectedIndex === null) {
        alert("먼저 1~4 중 하나를 선택하세요.");
        return;
      }
      handleAnswer(selectedIndex);
      return;
    }

    const idx = keyToIndex[e.key];
    if (idx !== undefined) {
      selectedIndex = idx;
      buttons.forEach((btn, i) => {
        if (btn)
          i === idx
            ? btn.classList.add("selected")
            : btn.classList.remove("selected");
      });
    }
  });

  window.resultOk = function () {
    const pw = prompt("결과를 보려면 비밀번호를 입력하세요.");
    if (pw !== "1234") {
      alert("비밀번호가 올바르지 않습니다.");
      return;
    }

    document.querySelector(".examOver").style.display = "none";
    document.querySelector(".answer-panel").style.display = "block";

    document.getElementById("result-name").textContent = studentNameValue;
    document.getElementById("result-correct").textContent = correctCount;
    document.getElementById("result-total").textContent = questions.length;

    const element = document.querySelector(".answer-panel");
    setTimeout(() => {
      html2canvas(element).then((canvas) => {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF("p", "mm", "a4");
        const imgData = canvas.toDataURL("image/png");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

        const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
        pdf.save(`${dateStr}_${studentNameValue}_결과.pdf`);
      });
    }, 500);
  };

  renderQuestion();
};
