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

//function
function toggleSideBar(ref){
    ref.classList.toggle('active');
    document.getElementById('sidebar_content').classList.toggle('active');
}