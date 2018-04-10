const add_center = $('#add_center');
const addCenter = document.getElementById("addCenter");
const modal_editCenter= $('.modal_editCenter');
const editCenter = document.getElementById("editCenter");
const modal_delCenter =   $(".modal_delCenter");
const delCenter = document.getElementById("delCenter");

$(window).load(function(){
    clickEffect(add_center,addCenter);
    clickEffect(modal_editCenter,editCenter);
    clickEffect(modal_delCenter, delCenter);

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

function clickEffect(source,target){
    source.on("click", function(){
        target.style.display= "block";
    });
}



