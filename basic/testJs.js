window.onload = function () {
  // -----------------------------
  // 0. 학생 이름 및 초기 설정
  // -----------------------------
  const urlParams = new URLSearchParams(window.location.search);
  const studentNameValue = urlParams.get("studentName") || "이름 정보 없음";

  // -----------------------------
  // 1. 원본 데이터 (130문제)
  // -----------------------------
  const rawData = [
    { q: "디자인, 설계, 디자인하다", a: "design" },
    { q: "밀림, 정글", a: "jungle" },
    { q: "밖으로, 밖에", a: "out" },
    { q: "나누다", a: "divide" },
    { q: "두통", a: "headache" },
    { q: "서로", a: "each other" },
    { q: "문제, 곤란", a: "trouble" },
    { q: "우체국", a: "post office" },
    { q: "복권", a: "lottery" },
    { q: "자리, 좌석", a: "seat" },
    { q: "종이", a: "paper" },
    { q: "마지막에", a: "last" },
    { q: "박람회, 공정한", a: "fair" },
    { q: "수도, 대문자", a: "capital" },
    { q: "상, 수여하다", a: "award" },
    { q: "의식, 식", a: "ceremony" },
    { q: "주말", a: "weekend" },
    { q: "병[단지]", a: "jar" },
    { q: "위로, 위쪽에", a: "up" },
    { q: "낙타", a: "camel" },
    { q: "바비큐[숯불구이]", a: "barbecue" },
    { q: "프로젝트, 계획, 연구, 계획[기획]하다", a: "project" },
    { q: "가을", a: "autumn" },
    { q: "제안하다, 제공하다, 제의, 제안", a: "offer" },
    { q: "형성되다, 구성되다, 서식, 유형", a: "form" },
    { q: "모든 것, 모두", a: "everything" },
    { q: "가까이, 가까운", a: "near" },
    { q: "다리", a: "bridge" },
    { q: "금, 금화, 금색의", a: "gold" },
    { q: "번개", a: "lightning" },
    { q: "다이아몬드, 금강석/마름모꼴", a: "diamond" },
    { q: "이동하는, 이동식의, 휴대폰", a: "mobile" },
    { q: "누구나, 아무나", a: "anyone" },
    { q: "발명하다", a: "invent" },
    { q: "믿다", a: "believe" },
    { q: "궁전, 왕실, 대저택", a: "palace" },
    { q: "이상한, 낯선", a: "strange" },
    { q: "표현하다, 급행의, 신속한", a: "express" },
    { q: "앨범", a: "album" },
    { q: "주문하다, 명령하다, 주문, 명령, 지시/순서", a: "order" },
    { q: "돔, 반구형 지붕[모양]", a: "dome" },
    { q: "무술", a: "martial art" },
    { q: "출납원", a: "cashier" },
    { q: "벽난로", a: "fireplace" },
    { q: "골프 치는 사람, 골프 선수", a: "golfer" },
    { q: "다른, 다른 사람[것]", a: "other" },
    { q: "~을 입다", a: "put on" },
    { q: "딸", a: "daughter" },
    { q: "열", a: "fever" },
    { q: "그림자, 어둠", a: "shadow" },
    { q: "유니콘[전설상의 동물]", a: "unicorn" },
    { q: "걸음, 단계, 움직이다", a: "step" },
    { q: "손님, 고객", a: "customer" },
    { q: "해질녘, 일몰, 노을", a: "sunset" },
    { q: "수줍음을 타는, 부끄러워하는", a: "shy" },
    { q: "괜찮은, 받아들일 만한, 괜찮게", a: "alright" },
    { q: "비밀, 비밀의", a: "secret" },
    { q: "활기, 기운, 에너지", a: "energy" },
    { q: "강의, 과정, 항로", a: "course" },
    { q: "정도(수준)", a: "level" },
    { q: "충돌하다, 박살하다, 사고", a: "crash" },
    { q: "요리사(주방장)", a: "chef" },
    { q: "이유, 까닭, 근거", a: "reason" },
    { q: "현관, 복도, 홀 (큰 방)", a: "hall" },
    { q: "가난한, 불쌍한", a: "poor" },
    { q: "평가하다", a: "evaluate" },
    { q: "물약", a: "potion" },
    { q: "노동자, 일을 하는 사람", a: "worker" },
    { q: "고향", a: "hometown" },
    { q: "환영하다, 맞다", a: "greet" },
    { q: "~을 따라", a: "along" },
    { q: "인형", a: "doll" },
    { q: "긴 의자, 침상, 소파", a: "couch" },
    { q: "퍼즐, 수수께끼", a: "puzzle" },
    { q: "유람선 여행, 유람선을 타다", a: "cruise" },
    { q: "거리, 도로", a: "street" },
    { q: "(위로)들어 올리다, 올라가다, 승강기, 엘레베이터", a: "lift" },
    { q: "계란형의, 타원형의, 타원형", a: "oval" },
    { q: "갑자기", a: "suddenly" },
    { q: "욕조, 목욕시키다", a: "bath" },
    { q: "비디오", a: "video" },
    { q: "소설", a: "novel" },
    { q: "외로운, 쓸쓸한", a: "lonely" },
    { q: "기념하다, 축하하다", a: "celebrate" },
    { q: "날짜", a: "date" },
    { q: "아시아", a: "Asia" },
    { q: "놀라게 하다", a: "amaze" },
    { q: "지저분한, 엉망인", a: "messy" },
    { q: "희극, 코미디", a: "comedy" },
    { q: "경쟁, 대회", a: "competition" },
    { q: "친구", a: "buddy" },
    // 2유형
    {
      q: "They are ______ in the desert.\n그것들은 사막에 위치해있다.",
      a: "locate",
    },
    {
      q: "Yes, it's ______ than orange juice.\n맞아, 오렌지 주스보다 그게 더 나아.",
      a: "better",
    },
    {
      q: "Sarah needs help with her _____.\nSarah는 그녀의 프로젝트에 도움이 필요하다.",
      a: "project",
    },
    { q: "I'm not __________.\n확실하지 않다.", a: "sure" },
    { q: "Did you see the _______ just now?\n방금 번개 봤어?", a: "lightning" },
    {
      q: "We were trying to catch a _______ .\n우리는 잠자리를 잡으려고 했었다.",
      a: "dragonfly",
    },
    {
      q: "He did not want to ____________\n그는 떠나고 싶어하지 않았다.",
      a: "leave",
    },
    {
      q: "A bird with black _______ flies across the street.\n검은색 깃털을 가진 새가 거리를 가로질러 날아간다.",
      a: "feather",
    },
    {
      q: "You should check your daily ______.\n당신의 일상 생활을 확인해 볼 필요가 있다.",
      a: "routain",
    },
    {
      q: "a luxuriously furnished _________\n고급스러운 가구들이 갖춰진 아파트",
      a: "apartment",
    },
    {
      q: "I have another _______ at 8.\n나는 8시에 다른 약속이 있다.",
      a: "appointment",
    },
    { q: "Do you have a _____?\n끈을 가지고 있니?", a: "strap" },
    {
      q: "My friend wants to work at a hair ____.\n내 친구는 미용실에서 일하기를 원한다.",
      a: "salon",
    },
    { q: "___________ the summer vacation.\n여름방학 동안에", a: "during" },
    {
      q: "It may help ease the ____.\n그것은 아마 통증을 줄이는데 도움이 될 것이다.",
      a: "pain",
    },
    {
      q: "He found a long, black ____.\n그는 검은색의 긴 예복을 발견했다.",
      a: "robe",
    },
    {
      q: "_________ favors the brave.\n하늘[행운]은 용기 있는 자를 돕는다.",
      a: "fortune",
    },
    {
      q: "The military _________ was founded in London.\n런던에서 육군사관학교가 설립되었다.",
      a: "academy",
    },
    {
      q: "The door is ______ every night.\n그 문은 매일 밤마다 잠겨있다.",
      a: "lock",
    },
    { q: "I picked a _____________.\n나는 꽃 한 송이를 꺾었다.", a: "flower" },
    {
      q: "I like to put ____ on my toast.\n나는 토스트에 잼을 발라 먹는 것을 좋아한다.",
      a: "jam",
    },
    {
      q: "You can see the _____ from here.\n여기서 경치를 볼 수 있다.",
      a: "view",
    },
    {
      q: "What does the _______ ask swimmers to do?\n안전요원이 수영하는 사람들에게 무엇을 요청하는가?",
      a: "lifeguard",
    },
    {
      q: "Thr walls have different _______ pictures.\n그 벽돌에는 서로 다른 공룡 그림들이 그려져 있다.",
      a: "dinosaur",
    },
    {
      q: "Wait a minute in front of the ______ counter.\n계산대 앞에서 잠시만 기다려주세요.",
      a: "cashier",
    },
    {
      q: "He wants to be a police ______.\n그는 경찰관이 되고 싶어한다.",
      a: "officer",
    },
    {
      q: "She ______ to go to the mountain.\n그녀는 산에 가기로 결정했다.",
      a: "decide",
    },
    { q: "_______ is sweet.\n초콜릿은 달콤하다.", a: "chocolate" },
    {
      q: "I saw a _____ on my way home.\n집으로 오는 길에 귀뚜라미를 봤다.",
      a: "cricket",
    },
    { q: "She arrived ____________.\n그녀는 어제 도착했다.", a: "yesterday" },
    {
      q: "It's my favorite _______.\n그것은 내가 가장 좋아하는 수집품이다.",
      a: "collection",
    },
    {
      q: "I don't like the strong smell of _____.\n나는 강한 마늘 냄새를 좋아하지 않는다.",
      a: "garlic",
    },
    { q: "This movie is so _____.\n이 영화는 너무 지루하다.", a: "boring" },
    { q: "He is a really nice _____.\n그는 정말 좋은 사람이다.", a: "guy" },
    { q: "Where is the ______?\n보물은 어디에 있는가?", a: "treasure" },
    {
      q: "There are many ____ buidings in the city.\n도시에는 높은 건물들이 많이 있다.",
      a: "high",
    },
    {
      q: "Is there a menu for _______ ?\n채식주의자를 위한 메뉴가 있니?",
      a: "vegetarian",
    },
    {
      q: "The price of oil might ____ again.\n기름 가격이 또 다시 상승할 수도 있다.",
      a: "rise",
    },
    {
      q: "The ship sank to the _______ of the sea.\n그 배는 해저 밑으로 가라 앉았다.",
      a: "bottom",
    },
  ];

  // -----------------------------
  // 2. 공통 함수: 셔플 및 보기 생성
  // -----------------------------
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const allAnswers = rawData.map((item) => item.a);

  // 최종 문제 배열 생성 (사지선다: 정답 1개 + 오답 3개)
  const questions = rawData.map((item) => {
    const wrongOptions = shuffle(allAnswers.filter((a) => a !== item.a)).slice(
      0,
      3
    );
    const options = shuffle([item.a, ...wrongOptions]);
    return {
      title: item.q,
      options: options,
      correctIndex: options.indexOf(item.a),
      img: null,
    };
  });

  // -----------------------------
  // 3. 정답 테이블 동적 생성 (결과창)
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
  // 4. 시험 상태 변수 및 타이머
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
    // .five는 사지선다에서 제외
  ];
  const timerSpan = document.getElementById("timer-sec");

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

  function finishExam() {
    if (countdownInterval) clearInterval(countdownInterval);
    document.querySelector(".quiz-container").style.display = "none";
    document.querySelector(".examOver").style.display = "block";
  }

  // -----------------------------
  // 5. 문제 렌더링 및 답안 처리
  // -----------------------------
  function renderQuestion() {
    const q = questions[currentQuestion];
    if (!q) return;

    selectedIndex = null;
    buttons.forEach((btn) => btn && btn.classList.remove("selected"));
    if (questionLabel) questionLabel.innerHTML = q.title.replace(/\n/g, "<br>");

    q.options.forEach((opt, idx) => {
      if (buttons[idx]) buttons[idx].textContent = idx + 1 + ". " + opt;
    });
    // 사지선다이므로 만약 HTML에 5번 버튼이 있다면 숨겨야 할 수도 있습니다.
    const btnFive = document.querySelector(".five");
    if (btnFive) btnFive.style.display = "none";

    startTimer();
  }

  function handleAnswer(choiceIndex) {
    const q = questions[currentQuestion];
    if (countdownInterval) clearInterval(countdownInterval);

    const qNum = currentQuestion + 1;
    const cell = document.getElementById("answer-q" + qNum);
    if (cell) cell.textContent = q.options[choiceIndex];

    if (choiceIndex === q.correctIndex) {
      correctCount++;
    } else {
      if (cell) cell.classList.add("wrong-cell");
    }

    currentQuestion++;
    currentQuestion < questions.length ? renderQuestion() : finishExam();
  }

  // -----------------------------
  // 6. 이벤트 리스너 (키보드 및 결과)
  // -----------------------------
  const keyToIndex = { 1: 0, 2: 1, 3: 2, 4: 3 }; // 5번 제외
  document.addEventListener("keydown", (e) => {
    if (currentQuestion >= questions.length) return;

    if (e.code === "Space") {
      e.preventDefault();
      if (selectedIndex === null) {
        alert("먼저 1~4 중 하나를 선택하세요.");
        return;
      }
      handleAnswer(selectedIndex);
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

  // 클릭 차단 경고 (시험 중)
  document.addEventListener("click", (e) => {
    if (currentQuestion >= questions.length || e.target.closest(".resultOk"))
      return;
    alert("⚠️ 경고: 키보드(1~4 및 Space)만 사용 가능합니다!");
  });

  window.resultOk = function () {
    const pw = prompt("결과를 보려면 비밀번호를 입력하세요.");
    if (pw !== "1234") {
      alert("비밀번호가 틀렸습니다.");
      return;
    }

    document.querySelector(".examOver").style.display = "none";
    document.querySelector(".answer-panel").style.display = "block";
    document.getElementById("result-name").textContent = studentNameValue;
    document.getElementById("result-correct").textContent = correctCount;
    document.getElementById("result-total").textContent = questions.length;

    // PDF 자동 저장
    setTimeout(() => {
      const element = document.querySelector(".answer-panel");
      html2canvas(element).then((canvas) => {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF("p", "mm", "a4");
        const imgData = canvas.toDataURL("image/png");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

        const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
        pdf.save(`${today}_${studentNameValue}_결과.pdf`);
      });
    }, 500);
  };

  renderQuestion(); // 첫 문제 시작
};
