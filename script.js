let wordList = ["dismiss","win","fetch","praise","sign","advertise","start","design","report","advance","guard","learn","restore","satisfy","round","hire","analyse","finish","colour","taste","highlight","age","shiver","recommend","accuse","comprise","promote","damage","subject","participate","commit","name","pick","suppose","glance","add","manage","decrease","connect","lose","tap","ring","kiss","appoint","embark","top","originate","deal","wrap","reject","conversation","reception","writing","drama","length","emphasis","independence","story","error","efficiency","attention","mode","library","diamond","sample","tradition","collection","celebration","warning","tension","piano","wealth","context","idea","article","anxiety","investment","painting","atmosphere","response","bread","charity","hat","climate","pollution","magazine","replacement","suggestion","baseball","connection","height","funeral","lake","hall","poet","equipment","girl","accident","penalty","insurance","establish","couple","greet","reach","adjust","debate","elect","fire","govern","charge","breathe","multiply","differ","dream","answer","impose","realise","live","extend","collapse","entitle","go","qualify","monitor","grin","smoke","perceive","sponsor","sink","undergo","expand","tend","protest","involve","examine","force","sentence","review","come","lead","burn","await","reflect","precede","indicate","light","look","contain","contrast","common","rustic","parallel","scintillating","untidy","industrious","foreign","berserk","hurried","staking","assorted","used","classy","nippy","dependent","sweet","adventurous","offbeat","absorbing","steadfast","wise","gullible","arrogant","brawny","rhetorical","yielding","proud","groovy","true","remarkable","dear","humorous","hilarious","elite","crazy","foamy","racial","lowly","abashed","comfortable","nifty","longing","secret","silent","fretful","depressed","aromatic","simplistic","gleaming"];
const wordArea = document.getElementById("word-area");
const typeArea = document.getElementById("type-area");
const scoreCont = document.getElementById("score");
const timerCont = document.getElementById("timer");
let scoreVal;
let timerVal;
let playing;

function startPlaying(){
    if(playing !== true){
        playing = true;
        typeArea.value="";
        wordArea.innerHTML="";
        scoreVal = 0;
        scoreCont.innerText=scoreVal;
        typeArea.readOnly = false;
        typeArea.placeholder = "";
        generateWord();
        startTimer();
    }
}

typeArea.addEventListener("click",startPlaying);
typeArea.addEventListener("input",wordChecker);

function generateWord(){
    let wordDiv = document.createElement("div");
    wordDiv.innerHTML = "<span></span>"+wordList[Math.floor(Math.random()*wordList.length-1)];
    wordArea.appendChild(wordDiv);
}

function startTimer(){
    let counter = 0;
    const timerId = setInterval(() => {
        counter++;
        timerCont.innerText = 60-counter;
        generateWord();
    }, 1000);

    setTimeout(() => {
        clearInterval(timerId);
        timerCont.innerText = "Times up!"
        playing = false;
        typeArea.readOnly = true;
        wordArea.innerHTML = "<strong>Well done!</strong><br>Final score: "+scoreVal;
        typeArea.placeholder = "Click here and start typing";
    }, 60000);
}
let remainingWord = [];
function wordChecker(){
    let finalWord = wordArea.querySelectorAll("div")[0].innerText;
    let correctWord = [];
    
    if(typeArea.value.replaceAll(" ","") == finalWord){
        wordArea.querySelectorAll("div")[0].style.color = "green";
        typeArea.value = "";
        scoreVal+=10;
        scoreCont.innerText=scoreVal;
        generateWord();
        setTimeout(() => {
            wordArea.querySelectorAll("div")[0].remove();
        }, 300);
    }
    if(typeArea.value.replaceAll(" ","").length>0 && typeArea.value.replaceAll(" ","") == finalWord.split("",typeArea.value.replaceAll(" ","").length).join("")){
        correctWord = finalWord.split("",typeArea.value.replaceAll(" ","").length);
        remainingWord = finalWord.split("").splice(correctWord.length);
        console.log(remainingWord);
        wordArea.querySelectorAll("div")[0].querySelector("span").innerText = correctWord.join("");
        wordArea.querySelectorAll("div")[0].childNodes[1].data = remainingWord.join("");
    }
}