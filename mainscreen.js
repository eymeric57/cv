let atout = document.getElementById("atout");
let competence = document.getElementById("competence");
let num = 0;

function hophop(id, callback) {
  let texte = document.getElementById(id);
  let contenu = texte.innerHTML;
  texte.innerHTML = "";

  let index = 0;
  let timer = setInterval(function () {
    if (index < contenu.length) {
      texte.innerHTML += contenu.charAt(index);
      index++;
      num++;
      console.log(num);
    } else {
      clearInterval(timer);
      if (callback) callback();
    }
  }, Math.random() * (150 - 70) + 70);
}

function chain() {
  hophop("test", function () {
    setTimeout(() => {
      atout.style.opacity = "1";
    }, "300");

    hophop("test2", function () {
      setTimeout(() => {
        competence.style.opacity = "1";
      }, "300");

      hophop("test3", function () {
        setTimeout(() => {
          experience.style.opacity = "1";
        }, "300");

        hophop("test4", function () {
          setTimeout(() => {
            formation.style.opacity = "1";
          }, "300");

          hophop("test5", function () {
            setTimeout(() => {
                contact.style.opacity = "1";
              }, "300");
          });
        });
      });
    });
  });
}

chain();


// retour a la scene
const cross = document.getElementById('cross');
cross.addEventListener('click', () => {
  window.location.href = 'index.html';
  window.scrollTo(0, document.body.scrollHeight);
})