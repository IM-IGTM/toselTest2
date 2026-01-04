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
  // 1️⃣ 세트 1 : 한글 → 영어 (입술/목/손가락, 이미지 O)
  // -----------------------------
  const setKorToEng_1 = [
    {
      title: "입술",
      options: shuffle(["lip", "neck", "finger", "uncle", "small"]),
      correct: "lip",
      img: "img/lip.jpg",
    },
    {
      title: "목",
      options: shuffle(["neck", "finger", "lip", "thin", "full"]),
      correct: "neck",
      img: "img/neck.jpg",
    },
    {
      title: "손가락",
      options: shuffle(["finger", "neck", "uncle", "mother", "lip"]),
      correct: "finger",
      img: "img/finger.jpg",
    },
  ];

  // -----------------------------
  // 2️⃣ 세트 2 : 영어 → 한글 (cousin/father/mother, 이미지 X)
  // -----------------------------
  const setEngToKor_2 = [
    {
      title: "cousin",
      options: shuffle(["사촌", "아버지", "어머니", "배부른", "마른"]),
      correct: "사촌",
      img: null,
    },
    {
      title: "father",
      options: shuffle(["아버지", "사촌", "어머니", "작은", "입술"]),
      correct: "아버지",
      img: null,
    },
    {
      title: "mother",
      options: shuffle(["어머니", "사촌", "아버지", "목", "얇은"]),
      correct: "어머니",
      img: null,
    },
  ];

  // -----------------------------
  // 3️⃣ 세트 3 : 한글 → 영어 (삼촌/배부른/작은/마른, 이미지 X)
  // -----------------------------
  const setKorToEng_3 = [
    {
      title: "삼촌",
      options: shuffle(["uncle", "full", "small", "thin", "lip"]),
      correct: "uncle",
      img: null,
    },
    {
      title: "배부른",
      options: shuffle(["full", "uncle", "thin", "finger", "neck"]),
      correct: "full",
      img: null,
    },
    {
      title: "작은",
      options: shuffle(["small", "thin", "full", "mother", "cousin"]),
      correct: "small",
      img: null,
    },
    {
      title: "마른",
      options: shuffle(["thin", "small", "uncle", "father", "full"]),
      correct: "thin",
      img: null,
    },
  ];

  // -----------------------------
  // 4️⃣ 공통 포맷으로 변환
  //    - correctIndex 계산
  // -----------------------------
  function finalizeSet(arr) {
    return arr.map((q) => {
      const correctIndex = q.options.indexOf(q.correct);
      return {
        title: q.title,
        options: q.options,
        correctIndex,
        img: q.img || null,
      };
    });
  }

  // -----------------------------
  // 5️⃣ 최종 시험 문제 배열
  // -----------------------------
  const questions = [
    ...finalizeSet(setKorToEng_1),
    ...finalizeSet(setEngToKor_2),
    ...finalizeSet(setKorToEng_3),
  ]; // 총 3 + 3 + 4 = 10문제

  // -----------------------------
  // 6️⃣ 정답 테이블 동적 생성 (5문제씩 가로)
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
        titleTd.textContent = questions[n - 1].title;
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
  // 7️⃣ 시험 상태 변수
  // -----------------------------
  let currentQuestion = 0;
  let selectedIndex = null;

  const TIMER_DURATION = 20;
  let timeLeft = TIMER_DURATION;
  let countdownInterval = null;

  let correctCount = 0;
  const wrongList = [];

  const questionLabel = document.getElementById("questionLabel");
  const btn1 = document.querySelector(".one");
  const btn2 = document.querySelector(".two");
  const btn3 = document.querySelector(".three");
  const btn4 = document.querySelector(".four");
  const btn5 = document.querySelector(".five");
  const buttons = [btn1, btn2, btn3, btn4, btn5];

  const timerSpan = document.getElementById("timer-sec");

  // -----------------------------
  // 8️⃣ 타이머
  // -----------------------------
  function updateTimerDisplay() {
    if (timerSpan) {
      timerSpan.textContent = timeLeft;
    }
  }

  function startTimer() {
    if (countdownInterval) {
      clearInterval(countdownInterval);
    }
    timeLeft = TIMER_DURATION;
    updateTimerDisplay();

    countdownInterval = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();

      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        handleTimeout();
      }
    }, 1000);
  }

  function handleTimeout() {
    if (currentQuestion >= questions.length) return;

    const questionNumber = currentQuestion + 1;
    const answerCell = document.getElementById("answer-q" + questionNumber);

    if (answerCell) {
      answerCell.textContent = "-";
      answerCell.setAttribute("value", "-");
      answerCell.classList.add("wrong-cell");
    }

    wrongList.push(questionNumber);
    currentQuestion++;

    if (currentQuestion < questions.length) {
      renderQuestion();
    } else {
      finishExam();
    }
  }

  // -----------------------------
  // 9️⃣ 시험 종료
  // -----------------------------
  function finishExam() {
    if (countdownInterval) {
      clearInterval(countdownInterval);
    }

    const quizContainer = document.querySelector(".quiz-container");
    if (quizContainer) {
      quizContainer.style.display = "none";
    }

    const examOver = document.querySelector(".examOver");
    if (examOver) {
      examOver.style.display = "block";
    }
  }

  // -----------------------------
  // 🔟 문제 렌더링
  // -----------------------------
  function renderQuestion() {
    const q = questions[currentQuestion];
    if (!q) return;

    selectedIndex = null;
    buttons.forEach((btn) => btn && btn.classList.remove("selected"));

    // 줄바꿈 지원 + 가운데 정렬용 (CSS에서 text-align:center, white-space:pre-line 권장)
    if (questionLabel) {
      questionLabel.innerHTML = q.title.replace(/\n/g, "<br>");
    }

    const imgTag = document.getElementById("questionImage");
    if (imgTag) {
      if (q.img) {
        imgTag.src = q.img;
        imgTag.style.display = "block";
      } else {
        imgTag.style.display = "none";
      }
    }

    q.options.forEach((opt, idx) => {
      const btn = buttons[idx];
      if (btn) {
        btn.textContent = idx + 1 + ". " + opt;
      }
    });

    startTimer();
  }

  renderQuestion();

  // -----------------------------
  // 1️⃣1️⃣ 정답 확정 (Space)
  // -----------------------------
  function handleAnswer(choiceIndex) {
    const q = questions[currentQuestion];
    if (!q) return;

    if (countdownInterval) {
      clearInterval(countdownInterval);
    }

    const selectedText = q.options[choiceIndex];
    const questionNumber = currentQuestion + 1;
    const answerCell = document.getElementById("answer-q" + questionNumber);

    if (answerCell) {
      answerCell.textContent = selectedText;
      answerCell.setAttribute("value", selectedText);
    }

    if (choiceIndex === q.correctIndex) {
      correctCount++;
    } else {
      wrongList.push(questionNumber);
      if (answerCell) {
        answerCell.classList.add("wrong-cell");
      }
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
      renderQuestion();
    } else {
      finishExam();
    }
  }

  // -----------------------------
  // 1️⃣2️⃣ 키보드 입력 (1~5 / Space)
  // -----------------------------
  const keyToIndex = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4 };

  document.addEventListener("keydown", function (event) {
    if (currentQuestion >= questions.length) return;

    // 스페이스: 정답 확정
    if (event.code === "Space") {
      event.preventDefault();
      if (selectedIndex === null) {
        alert("먼저 1~5 중 하나를 선택하세요.");
        return;
      }
      handleAnswer(selectedIndex);
      return;
    }

    // 숫자 1~5: 보기 선택
    const choiceIndex = keyToIndex[event.key];
    if (choiceIndex !== undefined) {
      selectedIndex = choiceIndex;
      buttons.forEach((btn, idx) => {
        if (!btn) return;
        if (idx === choiceIndex) btn.classList.add("selected");
        else btn.classList.remove("selected");
      });
    } else {
      alert("⚠️ 경고: 허용되지 않은 키입니다!");
    }
  });

  // -----------------------------
  // 1️⃣3️⃣ 마우스 클릭 경고 (시험 중에만)
  // -----------------------------
  document.addEventListener("click", function () {
    if (currentQuestion >= questions.length) return;
    alert("⚠️ 경고: 허용되지 않은 키입니다!");
  });

  // -----------------------------
  // 1️⃣4️⃣ 결과보기 버튼 (비밀번호 1234)
  // -----------------------------
  window.resultOk = function () {
    const pw = prompt("결과를 보려면 비밀번호를 입력하세요.");
    if (pw !== "1234") {
      alert("비밀번호가 올바르지 않습니다.");
      return;
    }

    const examOver = document.querySelector(".examOver");
    if (examOver) {
      examOver.style.display = "none";
    }

    const answerPanel = document.querySelector(".answer-panel");
    if (answerPanel) {
      answerPanel.style.display = "block";
    }

    const resultName = document.getElementById("result-name");
    const resultCorrect = document.getElementById("result-correct");
    const resultTotal = document.getElementById("result-total");

    if (resultName) resultName.textContent = studentNameValue;
    if (resultCorrect) resultCorrect.textContent = correctCount;
    if (resultTotal) resultTotal.textContent = questions.length;

    const answerPanelEl = document.querySelector(".answer-panel");
    if (!answerPanelEl) return;

    // html2canvas + jsPDF 로 PDF 저장
    setTimeout(() => {
      html2canvas(answerPanelEl).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF("p", "mm", "a4");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

        const d = new Date();
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        const dateStr = `${yyyy}${mm}${dd}`;
        const safeName = (studentNameValue || "이름없음").replace(/\s+/g, "_");

        pdf.save(`${dateStr}_${safeName}_결과.pdf`);
      });
    }, 500);
  };
};
