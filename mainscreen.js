let atout = document.getElementById("atout");
let competence = document.getElementById("competence");
let num = 0;

function hophop(id, callback) {
    let texte = document.getElementById(id);
    let contenu = texte.innerHTML;
    texte.innerHTML = '';
    
    let index = 0;
    let timer = setInterval(function() {
        if (index < contenu.length) {
            texte.innerHTML += contenu.charAt(index);
            index++;
            num++;
            console.log(num);
        } else {
            clearInterval(timer);
            if (callback) callback();
        }
    }, 150);
}

function chain() {
    hophop("test", function() {
        atout.style.opacity = '1';
        atout.style.transition = " 0.2s";
        hophop("test2", function() {
            competence.style.opacity = '1';
            competence.style.transition = " 0.2s";
            
            hophop("test3", function() {
                experience.style.opacity = '1';
                experience.style.transition = "0.2s";
                 hophop("test4", function() {
                    formation.style.opacity = '1';
                    formation.style.transition = "0.2s";
                    hophop("test5", function() {
                        travaux.style.opacity = '1';
                        travaux.style.transition = "0.2s";
                   });
                });
            });
        });
    });
}

chain();