var apiKey = "229a7c5983784781b4278ba8c3802747";
var countStop = -1;
var count = 0;
var currentlySelected = 0;

function getKillCount(itemInstanceid, itemId){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `https://www.bungie.net/Platform/Destiny2/3/Profile/4611686018467190848/Item/${itemInstanceid}/?components=309`, true);
    xhr.setRequestHeader("X-API-Key", apiKey);
    xhr.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            var json = JSON.parse(this.responseText);
            switch(itemId){
                case 1833195496: //ager
                countStop = json.Response.plugObjectives.data.objectivesPerPlug["2302094943"][0].progress;
                break;
                case 19024058: //prometheus
                countStop = json.Response.plugObjectives.data.objectivesPerPlug["905869860"][0].progress;
                break;
                case 1345867571: //coldheart
                countStop = json.Response.plugObjectives.data.objectivesPerPlug["905869860"][0].progress;
                break;
                case 1852863732: //wavesplitter
                countStop = json.Response.plugObjectives.data.objectivesPerPlug["905869860"][0].progress;
                break;
            }
        }
    }
    xhr.send();
}

var delay = 1;
function countUp(){
    if(countStop == -1){
        count++;
    }
    else{
        if(count < countStop){
            count += 1;
        }
        
        if(count < countStop-100){
            count += 10;
        }
        
        if(count < countStop-1000){
            count += 100;
        }
        
        if(count > countStop-20){
            delay+= 7;
        }
        
        if(count >= countStop){
            count = countStop;
        }
    }
    
    document.getElementById("killCounter").innerHTML = count;
    if(count != countStop){
        setTimeout(countUp, delay);
    }
    else{
        return;
    }
}

function refresh(){
    countStop = -1;
    count = 0;
    delay = 1;

    document.getElementById("agerSelect").style["border-style"] = "none"; 
    document.getElementById("promSelect").style["border-style"] = "none";
    document.getElementById("coldSelect").style["border-style"] = "none";
    document.getElementById("waveSelect").style["border-style"] = "none";

    switch(currentlySelected){
        case 0: //ager
        findItem(1833195496);
        document.getElementById("agerSelect").style["border-style"] = "solid"; 
        document.getElementById("nameText").innerHTML = "Ager's Scepter";
        document.getElementById("backgroundColor").style["background-color"] = "rgba(71, 102, 151, 0.3)";
        document.getElementById("backgroundImage").style["background-image"] = "url('https://www.bungie.net/common/destiny2_content/screenshots/1833195496.jpg')";
        break;
        case 1: //prometheus
        findItem(19024058);
        document.getElementById("promSelect").style["border-style"] = "solid";
        document.getElementById("nameText").innerHTML = "Prometheus Lens";
        document.getElementById("backgroundColor").style["background-color"] = "rgba(240, 99, 30, 0.3)";
        document.getElementById("backgroundImage").style["background-image"] = "url('https://www.bungie.net/common/destiny2_content/screenshots/19024058.jpg')";
        break;
        case 2: //coldheart
        findItem(1345867571);
        document.getElementById("coldSelect").style["border-style"] = "solid";
        document.getElementById("nameText").innerHTML = "Coldheart";
        document.getElementById("backgroundColor").style["background-color"] = "rgba(120, 187, 232, 0.3)";
        document.getElementById("backgroundImage").style["background-image"] = "url('https://www.bungie.net/common/destiny2_content/screenshots/1345867571.jpg')";
        break;
        case 3: //wavesplitter
        findItem(1852863732);
        document.getElementById("waveSelect").style["border-style"] = "solid";
        document.getElementById("nameText").innerHTML = "Wavesplitter";
        document.getElementById("backgroundColor").style["background-color"] = "rgba(177, 132, 197, 0.3)";
        document.getElementById("backgroundImage").style["background-image"] = "url('https://www.bungie.net/common/destiny2_content/screenshots/1852863732.jpg')";
        break;
    }

    countUp();


}


function findItem(itemId){
    var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://www.bungie.net/Platform/Destiny2/3/Profile/4611686018467190848/?components=102,201,205", true);
        xhr.setRequestHeader("X-API-Key", apiKey);
        xhr.onreadystatechange = function(){
            if(this.readyState === 4 && this.status === 200){
                var json = JSON.parse(this.responseText);
                var vaultList = json.Response.profileInventory.data.items;
                var inventoryList = json.Response.characterInventories.data["2305843009299708028"].items;
                var equippedList = json.Response.characterEquipment.data["2305843009299708028"].items;
                for(i=0; i<vaultList.length; i++){
                    if(vaultList[i].itemHash == itemId){
                        getKillCount(vaultList[i].itemInstanceId, itemId);
                    }
                }
                for(i=0; i<inventoryList.length; i++){
                    if(inventoryList[i].itemHash == itemId){
                        getKillCount(inventoryList[i].itemInstanceId, itemId);
                    }
                }
                for(i=0; i<equippedList.length; i++){
                    if(equippedList[i].itemHash == itemId){
                        getKillCount(equippedList[i].itemInstanceId, itemId);
                    }
                }
            }
        }
     xhr.send();
}

//ager id:          1833195496
//prometheus id:    19024058
//coldheart id:     1345867571
//wavesplitter id:  1852863732