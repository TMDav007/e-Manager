
$(window).load(function(){
    $(".modal_evtView").on("click", function(){
        document.getElementById("edit").style.display= "block";
    });

    $(".modal_delEvt").on("click", function(){
        document.getElementById("delEvent").style.display= "block";
    });

    $("#add_evt").on("click", function(){
        document.getElementById("addEvt").style.display= "block";
    });

    $(".close").on("click", function(){
        document.getElementById("edit").style.display = "none";
        document.getElementById("delEvent").style.display = "none";
        document.getElementById("addEvt").style.display = "none";
    });
     
});

$("#togglebtn").on("click", function(){
    toggleSideBar(this);
    if ($("#sidebar").css("display") === "none"){
     document.getElementById("sidebar").style.display= "block";
    }
    else{
     document.getElementById("sidebar").style.display= "none";
    }
 });

  //navBAr scroll effect
  $(window).scroll(
    {
        previousTop: 0
    },
function(){
    let currentTop = $(window). scrollTop();
    if (currentTop < this.previousTop && $(window).width()< 519){
        $("#navbar2, #branding2").show();
    } else{
        $("#navbar2, #branding2").hide();
       }
    
    this.previousTop=currentTop; 
});

//function
function toggleSideBar(ref){
    ref.classList.toggle('active');
    document.getElementById('sidebar_content').classList.toggle('active');
}