const gnbWrap = document.querySelector(".gnbWrap");
const sub =document.querySelectorAll(".sub");
const gnbBg = document.querySelector(".gnbBg");


//gnbWrap에 마우스를 올렸을 때
gnbWrap.onmouseenter = function(){
    for(let i=0; i<sub.length; i++){
       // depth2[i].style.display = "block";
       sub[i].style.height = "120px";
    }
   //  gnbBg.style.display = "block";
   gnbBg.style.height = "120px";
}

//gnbWrap에 마우스를 내렸을 때
gnbWrap.onmouseleave = function(){
   for(let i=0; i<sub.length; i++){
       // depth2[i].style.display = "none";
       sub[i].style.height = "0px";
    }
   //  gnbBg.style.display = "none";
    gnbBg.style.height = "0px";
}

