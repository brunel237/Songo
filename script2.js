let songo = new Songo
let PLY2=0
let AI=0
function change_level(){
    if (confirm("MOVE TO NEXT LEVEL ??")) init()
}
function init(){
    if (confirm("AI LEVEL 1")) {
        document.getElementById('player1').innerHTML = "lenovo-amd9-ai"
        document.getElementById('player2').innerHTML = "YOU"
    }
    else {
        document.getElementById('player1').innerHTML = "Challenger"
        document.getElementById('player2').innerHTML = "YOU"
    }

    songo.coteJoueur1 = document.querySelectorAll('#upper_row .score');
    songo.coteJoueur2 = document.querySelectorAll('#lower_row .score');
    songo.pointJoueur1  = document.getElementById("a8")
    songo.pointJoueur2  = document.getElementById("b8")

    for (i in songo.coteJoueur1){
        songo.coteJoueur1[i].innerHTML = 5
        songo.coteJoueur2[i].innerHTML = 5
        score_background_change(1, i, true)
        score_background_change(2, i, true)
    }
    songo.pointJoueur1.innerHTML = 0
    songo.pointJoueur2.innerHTML = 0
    document.getElementById("player1").style.backgroundColor = "white";
    document.getElementById("player2").style.backgroundColor = "white";
    document.getElementById('message_box1').innerHTML = ""
    document.getElementById('message_box2').innerHTML = ""
}
function stop(){

    for (i in songo.coteJoueur1){
        songo.coteJoueur1[i].innerHTML = ""
        songo.coteJoueur2[i].innerHTML = ""
        score_background_change(1, i, true)
        score_background_change(2, i, true)
    }
    songo.pointJoueur1.innerHTML = ""
    songo.pointJoueur2.innerHTML = ""
    document.getElementById("player1").style.backgroundColor = "white";
    document.getElementById("player2").style.backgroundColor = "white";
    document.getElementById('player1').innerHTML = "-"
    document.getElementById('player2').innerHTML = "-"
    delete(songo)
}

function ai_activation(){
   AI = 1
}
function ply2_activation(){
   PLY2 = 1
    x = XMLHttpRequest()
}
function activation(i){
    if (i == 1) ai_activation()
    else ply2_activation()
}
function ai_decision(){
    return ( (Math.floor(Math.random()*100 +1))%7  )
}
let ai_move =0
let ply_move =0

function score_background_change(id, i, reset){
    if (reset){
        songo.coteJoueur1[i].style.backgroundColor = "rgb(139, 63, 0)"
        songo.coteJoueur2[i].style.backgroundColor = "rgb(139, 63, 0)"
    }
    else if (id == 1){
        if (songo.coteJoueur1[i].style.backgroundColor == "gray")
            songo.coteJoueur1[i].style.backgroundColor = "rgb(139, 63, 0)"
        else songo.coteJoueur1[i].style.backgroundColor = "gray"
        songo.coteJoueur2[ply_move].style.backgroundColor = "rgb(139, 63, 0)"
    }
    else {
        if (songo.coteJoueur2[i].style.backgroundColor == "gray")
        songo.coteJoueur2[i].style.backgroundColor = "rgb(139, 63, 0)"
        else songo.coteJoueur2[i].style.backgroundColor = "gray"
        songo.coteJoueur1[ai_move].style.backgroundColor = "rgb(139, 63, 0)"
    }
}

function turns_color_change(id){
    if (id == 1){
        document.getElementById("player1").style.backgroundColor = "red";
        document.getElementById("player2").style.backgroundColor = "lightgreen";
        document.getElementById("message_box2").innerHTML =""
    }
    else {
        document.getElementById("player2").style.backgroundColor = "red";
        document.getElementById("player1").style.backgroundColor = "lightgreen";
        document.getElementById("message_box1").innerHTML =""
    }
}
function is_playable(id, i){
    if ((id==1 && i==6)|| (id==2 && i==0)){
        if (id == 1){
            if (Number(songo.coteJoueur1[i].innerHTML)>2) return false
            if (Number(songo.coteJoueur1[i].innerHTML)==1) return true
            if (Number(songo.coteJoueur1[i].innerHTML)==2){
                if (songo.nbPoints(1)-Number(songo.pointJoueur1.innerHTML) == 2) return true
                if ((Number(songo.coteJoueur2[6].innerHTML)&&Number(songo.coteJoueur2[6].innerHTML)<3)||
                (Number(songo.coteJoueur2[5].innerHTML)&&Number(songo.coteJoueur2[5].innerHTML)<3))
                    return true
                return false
            }
        }
        else{
            if (Number(songo.coteJoueur2[i].innerHTML)>2) return false
            if (Number(songo.coteJoueur2[i].innerHTML)==1) return true
            if (Number(songo.coteJoueur2[i].innerHTML)==2){
                if (songo.nbPoints(2)-Number(songo.pointJoueur2.innerHTML) == 2) return true
                if ((Number(songo.coteJoueur1[0].innerHTML)&&Number(songo.coteJoueur1[0].innerHTML)<3)||
                (Number(songo.coteJoueur1[1].innerHTML)&&Number(songo.coteJoueur1[1].innerHTML)<3))
                    return true
                return false
            }
        }
    }
    else return true
}
function ai_plays(){
    do{
        i = ai_decision()
        if (Number(songo.coteJoueur1[i].innerHTML)!=0 && is_playable(1, i)) break
    }while(1)
    ai_move = i
    score_background_change(1, i)
    window.setTimeout("no()",1000)
    songo.distribution(1, i)
    //score_background_change(1, i)
    turns_color_change(1)
    game_check()
}
function your_play(i){
    score_background_change(2, i)
    window.setTimeout("no()",1000)
    songo.distribution(2, i)
    //score_background_change(2, i)
    turns_color_change(2)
    game_check()
}
function game_check(){
    let c = songo.poursuiteJeu()
    if (c==1) {
        if (confirm("Sorry!  AI WONS!\nWanna Restart ?")) init()
        else delete(songo)
    }
    else if (c==2){
        if (confirm("Congrats!  You WON!\nWanna Restart ?")) init()
        else delete(songo)
    }
}

function game_flow(i){
    if (is_playable(2, i-8)){
        if (songo.coteJoueur2[i-8].innerHTML == 0)
            document.getElementById('message_box2').innerHTML = "You can't play at B"+(i-7)+"!"
        else if (document.getElementById("player2").style.backgroundColor == "red")
            document.getElementById('message_box2').innerHTML = "Not Your Turn !"
        else{
            ply_move = i-8
            your_play(i-8)
            window.setTimeout("ai_plays()", 3000)
        }
    }
    else document.getElementById('message_box2').innerHTML = "move rejected !"
}
