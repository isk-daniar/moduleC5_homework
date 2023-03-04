function useRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
      if (xhr.status != 200) {
        console.log('Статус ответа: ', xhr.status);
      } else {
        const result = JSON.parse(xhr.response);
        if (callback) {
          callback(result);
        }
      }
    };
    xhr.onerror = function() {
      console.log('Ошибка! Статус ответа: ', xhr.status);
    };
    xhr.send();
  };
  const resultNode = document.querySelector('.result');
  const btnNode = document.querySelector('.btn');

  function displayResult(apiData) {
    let images = '';
    apiData.forEach(item => {
      const imgBlock = `
        <div class="image">
          <img src="${item.download_url}">
          <p>${item.author}</p>
        </div>`;
        images = images + imgBlock;
    });
    resultNode.innerHTML = images;
  }

  btnNode.addEventListener('click', () => {
    let num = document.querySelector('input').value;
    if (num >= 1 && num <= 10 ) {
      let setUrl = `https://picsum.photos/v2/list/?limit=${num}`
      useRequest(setUrl, displayResult);
    }else{
      resultNode.innerHTML ='«число вне диапазона от 1 до 10»'
    }
  })
