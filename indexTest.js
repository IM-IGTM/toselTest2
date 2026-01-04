function startTest() {
  // 입력한 이름 가져오기
  const input = document.getElementById("studentName");
  const name = input.value.trim();

  if (!name) {
    alert("이름을 입력해 주세요.");
    input.focus();
    return;
  }

  // URL에 이름을 쿼리스트링으로 붙여서 이동
  const encodedName = encodeURIComponent(name);
  window.location.href = `wmBasic/startTest.html?studentName=${encodedName}`;
}

function preStartTest() {
  // 입력한 이름 가져오기
  const input = document.getElementById("studentName");
  const name = input.value.trim();

  if (!name) {
    alert("이름을 입력해 주세요.");
    input.focus();
    return;
  }

  // URL에 이름을 쿼리스트링으로 붙여서 이동
  const encodedName = encodeURIComponent(name);
  window.location.href = `preStarter/preStarter.html?studentName=${encodedName}`;
}

function basic() {
  // 입력한 이름 가져오기
  const input = document.getElementById("studentName");
  const name = input.value.trim();

  if (!name) {
    alert("이름을 입력해 주세요.");
    input.focus();
    return;
  }

  // URL에 이름을 쿼리스트링으로 붙여서 이동
  const encodedName = encodeURIComponent(name);
  window.location.href = `basic/basicTest.html?studentName=${encodedName}`;
}

function starter() {
  // 입력한 이름 가져오기
  const input = document.getElementById("studentName");
  const name = input.value.trim();

  if (!name) {
    alert("이름을 입력해 주세요.");
    input.focus();
    return;
  }

  // URL에 이름을 쿼리스트링으로 붙여서 이동
  const encodedName = encodeURIComponent(name);
  window.location.href = `starter/starter.html?studentName=${encodedName}`;
}
