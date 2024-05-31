
function open(){

    top2.style.visibility='visible'
}

open()

const cross = document.getElementById('cross');
cross.addEventListener('click', () => {
  window.location.href = 'index.html';
  window.scrollTo(0, document.body.scrollHeight);
});