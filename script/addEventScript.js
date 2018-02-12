
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

//function
function toggleSideBar(ref){
    ref.classList.toggle('active');
    document.getElementById('sidebar_content').classList.toggle('active');
}