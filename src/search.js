(() => {
  const forms = document.querySelectorAll(".search-section form");
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
  
  for (let i = 0; i < forms.length; i++) {
    forms[i].addEventListener('submit', onSubmit)
  }
})()

