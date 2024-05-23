let menu:any = document.getElementById("menu")



function hophop(id:string){

    let texte:any = document.getElementById(id);
    let contenu:string = texte.innerHTML;
    texte.innerHTML = '';
    
    let index:number = 0;
    let timer:number = setInterval(function(){
        let test = false
        if(index < contenu.length){
            texte.innerHTML += contenu.charAt(index);
            index++;
        }
        else {
            clearInterval(timer)
            test = true
            menu.style.visibility='visible';
        }
    },50)
    

}
function test(){    
    hophop("test")
setTimeout(()=>{
        hophop("test2")
}, 2000);


} 

test()









