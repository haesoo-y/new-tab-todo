(() => {
  const forms = document.querySelectorAll(".search-section form");
  
  // 검색창에서 엔터 시 실행
  const onSubmit = (e) => {
    e.preventDefault();
    const submitEngine = e.target.id
    const submitInput = e.target.querySelector("input")
    const text = submitInput.value;
    console.log(submitEngine)
    console.log(text)

    if (submitEngine == "naver") {
      location.href = `https://search.naver.com/search.naver?query=${text}`
    } else if (submitEngine == "google") {
      location.href = `https://www.google.co.kr/search?q=${text}`
    } else if (submitEngine == "daum") {
      location.href = `https://search.daum.net/search?q=${text}`
    }

    submitInput.value = '';
  }
  
  // 각각 검색엔진에 이벤트 리스너 삽입
  for (let i = 0; i < forms.length; i++) {
    forms[i].addEventListener('submit', onSubmit)
  }
})()

