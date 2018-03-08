$(window).load(function(){
    $("#add_center").on("click", function(){
        document.getElementById("addCenter").style.display= "block";
    });

    $(".modal_editCenter").on("click", function(){
        document.getElementById("editCenter").style.display= "block";
    });

    $(".modal_delCenter").on("click", function(){
        document.getElementById("delCenter").style.display= "block";
    });
     

    $(".close").on("click", function(){
        document.getElementById("addCenter").style.display = "none";
        document.getElementById("editCenter").style.display = "none";
        document.getElementById("delCenter").style.display= "none";
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