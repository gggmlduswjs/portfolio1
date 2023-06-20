$(function(){

    // for(let i=0; i<$(".draw").length; i++){
    //     $(".draw").eq(i).css({"transition":`all 1s ease ${0.2 * i + "s"}`});
    // }
    


    // $(".text.first").animate({"margin-top":"-10%","opacity":"1"},1000,function(){
    //     $(".contents-wrap").addClass("line");
        
    //     setTimeout(function(){
    //         $(".contents-wrap").addClass("draw");
    //     },3000);

    //     $(".text.first").delay(4000).animate({"margin-top":"-10%","opacity":"0"},1000,function(){
            
    //         $(".text.second").delay(1000).addClass("on");
            
    //         setTimeout(function(){
    //             $(".contents-wrap").addClass("color");
    //         },3000);
            

    //     });





    // })


    setTimeout(function(){
        $(".text.first").addClass("on");
    },1000);

    setTimeout(function(){
        $(".contents-wrap").addClass("line");
    },2000);
    
    setTimeout(function(){
        $(".text.first").addClass("off");
    },3000);

    setTimeout(function(){
        $(".contents-wrap").addClass("draw");
    },4000);

    
    
    setTimeout(function(){
        $(".text.second").addClass("on");
    },5000);


    setTimeout(function(){
        $(".contents-wrap").addClass("color");
    },6000);









});