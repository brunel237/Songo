function ai_distributes(ai, me, tot, index){
    var i=index+1; var j=6; var opv=0; 
    while (tot>0){
        opv = i
        if (i > 6){
            me[j].innerHTML = Number(me[j].innerHTML)+1
            opv = j
            j--
            if (j<0) {i=0; j=6}
        }
        else{
            if (i != index) {ai[i].innerHTML = Number(ai[i].innerHTML)+1 }
            else {
                tot += 1
                ai[index].innerHTML = Number(ai[index].innerHTML) +1
            }
            i++
        }
        ai[index].innerHTML = Number(ai[index].innerHTML) -1
        tot--
    }
    return opv
}
function player_distributes(me, ai, tot, index){
    var i=index-1; var j=0;var opv=0;
    while ( tot>0){
        opv = i
        if (i < 0){
            ai[j].innerHTML = Number(ai[j].innerHTML)+1
            opv = j
            j++
            if (j>6) {i=6; j=0}
        }
        else{
            if (i != index) {me[i].innerHTML =  Number(me[i].innerHTML)+1}
            else {
                tot += 1
                me[index].innerHTML =  Number(me[index].innerHTML)+1
            }
            i--
        }
        me[index].innerHTML =  Number(me[index].innerHTML)-1
        tot--
    }
    return opv
}
function eat(tab, opv, pts, id){
    pts.innerHTML = Number(pts.innerHTML)+ Number(tab[opv].innerHTML)
    tab[opv].innerHTML = 0
    if (id == 1) document.getElementById("message_box1").innerHTML = document.getElementById("message_box1").innerHTML+" | took pieces at B"+(opv+1)+".."
    else document.getElementById("message_box2").innerHTML = document.getElementById("message_box2").innerHTML+" | took pieces at A"+(opv+1)+"..."

}
class Songo{
    constructor(){};
    opponent = ""
    coteJoueur1 = []
    coteJoueur2 = []
    pointJoueur1 = 0
    pointJoueur2 = 0

    nbPoints(idJ) {
        var total =0
        if (id==1)
            for (i=0; i<7; i++)
                total += Number(this.coteJoueur1[i].innerHTML)
        else{
            for (i=0; i<7; i++)
                total += Number(this.coteJoueur1[i].innerHTML)
        }
        if (idJ == 1) return Number(this.pointJoueur1.innerHTML)+total
        else return Number(this.pointJoueur2.innerHTML)+total
    };

    prise(id, opv){
        let can_eat = 0
        if (id == 1){
            if (Number(this.coteJoueur2[opv].innerHTML) == 2 || Number(this.coteJoueur2[opv].innerHTML == 3)){
                if (opv == 0){
                    for (i=0; i< 7; i++){
                        if (Number(this.coteJoueur2[i].innerHTML) == 2 || Number(this.coteJoueur2[i].innerHTML == 3))
                            can_eat++
                        else break;
                    }
                    if (can_eat == 7) return
                }
                do{
                    eat(this.coteJoueur2, opv, this.pointJoueur1, 1)
                    opv++
                    if (Number(this.coteJoueur2[opv].innerHTML) != 2 && Number(this.coteJoueur2[opv].innerHTML != 3)) break
                }while(opv< 7)
            }
        }
        else{
            if (Number(this.coteJoueur1[opv].innerHTML) == 2 || Number(this.coteJoueur1[opv].innerHTML == 3)){
                if (opv == 6){
                    for (i=6; i>=0; i--){
                        if (Number(this.coteJoueur1[i].innerHTML) == 2 || Number(this.coteJoueur1[i].innerHTML == 3))
                            can_eat++
                        else break;
                    }
                    if (can_eat == 7) return
                }
                do{
                    eat(this.coteJoueur1, opv, this.pointJoueur2, 2)
                    opv--
                    if (Number(this.coteJoueur1[opv].innerHTML) != 2 && Number(this.coteJoueur1[opv].innerHTML != 3)) break
                }while(opv< 7)
            }
        }

    };

    distribution(idJ, index){
        if (idJ==1){
            var tot = Number(this.coteJoueur1[index].innerHTML)
            let ret = ai_distributes(this.coteJoueur1, this.coteJoueur2, tot, index)
            if (ai_can_capture(tot, index)) this.prise(1, ret)
        }
        else{
            var tot = Number(this.coteJoueur2[index].innerHTML)
            let ret = player_distributes(this.coteJoueur2, this.coteJoueur1, tot, index)
            if (player_can_capture(tot, index)) this.prise(2, ret)
        }
    };

    estBloque(){
        if (Number(this.pointJoueur1.innerHTML)+Number(this.pointJoueur2.innerHTML) > 60)
            return true
        else return false
    };

    poursuiteJeu(){
        if (this.estBloque()){
            if (this.nbPoints(1) > 35) return 1
            else return 2
        }
        if (Number(this.pointJoueur1.innerHTML)>35 ) return 1
        else if (Number(this.pointJoueur2.innerHTML)>35 ) return 2
        else return 0
    };

};
function player_can_capture(tot, i){
    if (tot-i <=0) return false
    let temp = Math.floor((tot-i)/7)
    if (temp%2 == 0) return true
    else return false
}
function ai_can_capture(tot, i){
    if (tot+i <=6) return false
    let temp = Math.floor(tot/7)
    if (temp%2 == 0) return true
    else return false
}
function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    document.getElementById("demo").innerHTML = this.responseText;
    }
    };
    xhttp.open("GET", "ajax_info.txt", true);
    xhttp.send();
}

function getResult(){
    xhttp = new XMLHttpRequest();
    //xhttp.onreadystatechange = function() {
    //     if (this.readyState == 4 && this.status == 200){
    //         document.getElementById('sql').innerHTML = this.responseText;
    //     }
    // };
    xhttp.open("POST", "test.php", true);
    xhttp.send();
    alert('ok');
}

function fetchMe(){
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("result").innerHTML = this.responseText;
    }
    };
    xhttp.open("GET", "test2.php", true);
    xhttp.send();
}