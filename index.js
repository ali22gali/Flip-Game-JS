const cards = document.querySelectorAll(".card"),
timeTag = document.querySelector(".time b"),
flipTag = document.querySelector(".flips b"),
refreshBtn = document.querySelector(".details button");

let maxtime=20
let timeleft = maxtime;
let flips = 0;
let matchedCards = 0;
let disabledeck = false
let isplaying = false;
let cardone, cardtwo, timer;

function initTimer(){
    if(timeleft <= 0){
        return clearInterval(timer);
    }
    timeleft--;
    timeTag.innerText = timeleft;
}

function flipcard({target: clickedCard}){
    if(!isplaying){
        isplaying = true;
        timer = setInterval(initTimer, 1000);
    }
    if(clickedCard !== cardone && !disabledeck && timeleft > 0){
        flips++;
        flipTag.innerText = flips;
        clickedCard.classList.add("flip");
        if(!cardone){
            return cardone = clickedCard;
        }
        cardtwo = clickedCard;
        disabledeck = true;
        let cardoneicon = cardone.querySelector(".back-view i").classList.value;
        cardtwoicon = cardtwo.querySelector(".back-view i").classList.value;
        matchCards(cardoneicon,cardtwoicon);
    }
}

function matchCards(icon1, icon2){
    if(icon1 === icon2){
        matchedCards++;
        if(matchedCards == 6 && timeleft > 0)
            {
                return clearInterval(timer);
            }
            cardone.removeEventListener("click", flipcard);
            cardtwo.removeEventListener("click", flipcard);
            cardone = cardtwo = "";
            return disabledeck = false;
    }
    setTimeout(() => {
        cardone.classList.add("shake");
        cardtwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardone.classList.remove("shake", "flip");
        cardtwo.classList.remove("shake", "flip");
        cardone = cardtwo = "";
        disabledeck = false;
    }, 1200);
}

function shuffleCards(){
    timeleft = maxtime;
    flips = matchedCards = 0;
    cardone = cardtwo = "";
    clearInterval(timer);
    timeTag.innerText = timeleft;
    flipTag.innerText = flips;
    disabledeck = isplaying = false;

    let arr = ["bx bxl-upwork","bxl-gmail","bxl-instagram-alt","bxl-twitter","bxl-linkedin-square","bxl-facebook-square","bx bxl-upwork","bxl-gmail","bxl-instagram-alt","bxl-twitter","bxl-linkedin-square","bxl-facebook-square"];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let iconTag = card.querySelector(".back-view i");
        setTimeout(() =>{
            iconTag.classList.value = `bx ${arr[index]}`;
        }, 500);
        card.addEventListener("click", flipcard); 
    });
}


shuffleCards();

refreshBtn.addEventListener("click", shuffleCards);

cards.forEach(card => {
    card.addEventListener("click", flipcard);
}); 