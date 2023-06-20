$(function(){

    const carousel1 = $(".carousel1");
    const carousel1Child = $(".carousel1 > div");

    const carousel2 = $(".carousel2");
    const carousel2Child = $(".carousel2 > div");

    const slide_top = $(".slide_top");

    const prev = $(".btn .prev");
    const next = $(".btn .next");

    let gageUp = 12.5; //늘어날 수치값    
    let sNumber = 0; // 순번값

    next.on("click",function(){

        $(".carousel1").stop().animate({"margin-left":"0%"},1000,function(){
            
            $(".carousel1 > div").eq(-1).prependTo(".carousel1");
            $(".carousel1").css({"margin-left":"-100%"});
        });


        $(".carousel2").stop().animate({"margin-left":"0%"},1000,function(){

            $(".carousel2 > div").eq(-1).prependTo(".carousel2");
            $(".carousel2").css({"margin-left":"-25%"});




        });





        if(sNumber === carousel1Child.length-1){
            sNumber = 0;
            gageUp = 12.5;
            slide_top.css({"width":gageUp + "%" })
        }
        else{
            sNumber++;
            gageUp += 12.5;
            slide_top.css({"width":gageUp + "%" })
        }
       

    });

    prev.on("click",function(){

        $(".carousel1").stop().animate({"margin-left":"-200%"},1000,function(){
            
            $(".carousel1 > div").eq(0).appendTo(".carousel1");
            $(".carousel1").css({"margin-left":"-100%"});
        });


        $(".carousel2").stop().animate({"margin-left":"-50%"},1000,function(){

            $(".carousel2 > div").eq(0).appendTo(".carousel2");
            $(".carousel2").css({"margin-left":"-25%"});




        });


        if(sNumber === 0){
            sNumber = carousel1Child.length-1;
            gageUp = 100;
            slide_top.css({"width":gageUp + "%" })
        }
        else{
            sNumber--;
            gageUp -= 12.5;
            slide_top.css({"width":gageUp + "%" })
        }
       

    });
})