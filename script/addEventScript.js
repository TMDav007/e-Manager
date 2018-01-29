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