let modal = document.getElementById("login_box");
let btn= document.getElementById("modal_login");
let span = document.getElementsByClassName("close")[0];
let dropdownbtn= document.getElementsByClassName("modifyEvtDrop");
const toggleBtn = document.getElementById("togglebtn");

/* Modal */
$("#modal_login").on("click", function(){
    modal.style.display = "block";
});

$(".close").on("click", function(){
    modal.style.display = "none";
});

//toggle button for nav bar
$("#togglebtn").on("click", function(){
   toggleSideBar(this);
   if ($("#sidebar").css("display") === "none"){
    document.getElementById("sidebar").style.display= "block";
   }
   else{
    document.getElementById("sidebar").style.display= "none";
   }
});

//onclick
window.onclick = function(event){
    if (event.target == modal){
        modal.style.display = "none";
    }
}

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


//readmore 
    $(document).ready(function(){
        let readMoreHtml = $(".read-more").html();
        let lessText = readMoreHtml.substr(0,1000);

        if (readMoreHtml.length>1000){
            $(".read-more").html(lessText).append("<a href='' class='read-more-link fa'> show more...&#xf067 </a>")
        } else {
            $(".read-more").html(readMoreHtml);
        }

        $("body").on("click", ".read-more-link", function(event){
            event.preventDefault();
            $(this).parent(".read-more").html(readMoreHtml).append("<a href='' class='show-less-link fa'>show less &#xf068</a>")
        });
        $("body").on("click", ".show-less-link", function(event){
           event.preventDefault();
            $(this).parent(".read-more").html(readMoreHtml.substr(0,1000)).append("<a href='' class='read-more-link fa'>show more &#xf067 </a>")
        });

        if ($(window).width()< 519){
           //$("#branding2").show()
        }else {
            //$("#branding2").hide()
        }
    })

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

function toggleSideBar(ref){
    ref.classList.toggle('active');
    document.getElementById('sidebar_content').classList.toggle('active');
}
