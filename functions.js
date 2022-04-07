//Function to handle navbar active class

$(document).ready(function(){

    $(".navbar a").click(function(){
          $(".navbar a").removeClass('active');
          $(this).addClass('active');
    });

  });