let modal = document.getElementById("login_box");
let btn= document.getElementById("modal_login");
let span = document.getElementsByClassName("close")[0];
let dropdownbtn= document.getElementsByClassName("modifyEvtDrop");

/* Modal */
//btn.onclick = function(){ modal.style.display = "block";
//}
$("#modal_login").on("click", function(){
    modal.style.display = "block";
});

//span.onclick = function(){
  //  modal.style.display = "none";
//}
$(".close").on("click", function(){
    modal.style.display = "none";
});


window.onclick = function(event){
    if (event.target == modal){
        modal.style.display = "none";
    }
}



/* Background Animation  */
let backgroundImages = [
    {
        "id" : 0,
        "word" : "Our Lovely Reception is lit",
        "img": "image/background_pix/reception.jpg"
    },
    {
        "id" : 1,
        "word" : "Our Environment is word class",
        "img": "image/background_pix/img2.jpg"
    },
    {
        "id" : 2,
        "word" : "A classy decorated hall",
        "img": "image/background_pix/backg.jpg"
    },
    {
        "id" : 3,
        "word" : "Pleasing your is what we do and we do it well",
        "img": "image/background_pix/back.jpg"
    }
];

$(window).load(function(){
    background(backgroundImages);
});

function background(backgroundImages){
   // let count = Math.floor(Math.random() * backgroundImages.length);
    let myInterval = setInterval (function(){
        let count = Math.floor(Math.random() * backgroundImages.length);
        document.getElementById("intro").style.backgroundImage = "url("+backgroundImages[count].img+")";
       // console.log(backgroundImages[count].img);
    },7000);
}
