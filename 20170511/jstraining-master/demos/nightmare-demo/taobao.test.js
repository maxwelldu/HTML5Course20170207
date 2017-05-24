var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true });

nightmare
  .goto('https://www.taobao.com/')
  .type('#q', '上衣')
  .click('form[action*="/search"] [type=submit]')
  // .wait(5000)
  // .exists('#mainsrp-itemlist')
   .wait('#mainsrp-itemlist')
  .evaluate(function () {
    return document.querySelector('#mainsrp-itemlist')
      .textContent.trim();
  })
  .end()
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });
