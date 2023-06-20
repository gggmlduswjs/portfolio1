$(function(){

$(window).animate({"scrollTop":0},10);

const conts = $("#container >div");


let page = 0;
let last = false;


console.log(conts);



conts.on("mousewheel",function(event){

   event.preventDefault();
   page = $(this).index();

   console.log(page);   

   if(event.originalEvent.wheelDelta > 0) {
    console.log("휠 올림")

    


    if(page<=0){

      page=0;

    }

    else{
      if(last===true){
        page = 3;
        

        $("html,body").stop().animate({"scrollTop":conts.eq(page).offset().top},100)


        last = false;
      }
      else{
        page--;
      }
      
     
      

    }

    $("html,body").stop().animate({"scrollTop":conts.eq(page).offset().top},1000);
  
    





    // if(page<=0){

    //     page = 0;

    //     $("html,body").stop().animate({"scrollTop":conts.eq(page).offset().top},1000);
     
    // }

  

 
    // else {

    //     page--;

    //     $("html,body").stop().animate({"scrollTop":conts.eq(page).offset().top},1000);

    // }

    




    

    
   
    

     
  }







  else if(event.originalEvent.wheelDelta < 0){
   console.log("휠 내림")
   
    if(page>=4){
     page=4
    

    }



    else{

       page++;

       if(page === 4){
        last = true;
        page=4;
      


        console.log(last)
       }       

    }

    

    $("html,body").stop().animate({"scrollTop":conts.eq(page).offset().top},1000);

    
    
  }


})







});
