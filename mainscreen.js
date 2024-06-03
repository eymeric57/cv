let atout = document.getElementById("atout");
let competence = document.getElementById("competence");
let num = 0;

function TextAnimation(id, callback) {
  let texte = document.getElementById(id);
  let contenu = texte.innerHTML;
  texte.innerHTML = "";

  let index = 0;
  let timer = setInterval(function () {
    if (index < contenu.length) {
      texte.innerHTML += contenu.charAt(index);
      index++;
      num++;
     
    } else {
      clearInterval(timer);
      if (callback) callback();
    }
  }, Math.random() * (150 - 70) + 70);
}

function chain() {
  TextAnimation("animation1", function () {
    setTimeout(() => {
      atout.style.opacity = "1";
    }, "300");

    TextAnimation("animation2", function () {
      setTimeout(() => {
        competence.style.opacity = "1";
      }, "300");

      TextAnimation("animation3", function () {
        setTimeout(() => {
          experience.style.opacity = "1";
        }, "300");

        TextAnimation("animation4", function () {
          setTimeout(() => {
            formation.style.opacity = "1";
          }, "300");

          TextAnimation("animation5", function () {
            setTimeout(() => {
                travaux.style.opacity = "1";
              }, "300");
              TextAnimation("animation6", function () {
                setTimeout(() => {
                    contact.style.opacity = "1";
                  }, "300");
                  
              });
              
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

const redir = document.getElementById('redirTravaux');
const top2 = document.getElementById('top2')

redir.addEventListener('click',() => {

  window.location.href = 'index4.html';
  top2.style.visibility = 'visible';

})


