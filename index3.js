const cross = document.getElementById('cross');
cross.addEventListener('click', () => {
  window.location.href = 'index.html';
  window.scrollTo(0, document.body.scrollHeight);
})

const redir = document.getElementById('redirTravaux');
const top2 = document.getElementById('top2')

redir.addEventListener('click',() => {

  window.location.href = 'index4.html';
  top2.style.visibility = 'visible';

})

