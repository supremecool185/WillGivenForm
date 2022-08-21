var apiKey = "229a7c5983784781b4278ba8c3802747";
var countStop = -1;
var count = 0;

function locateAger(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.bungie.net/Platform/Destiny2/3/Profile/4611686018467190848/?components=102,205", true);
    xhr.setRequestHeader("X-API-Key", apiKey);
    xhr.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            var json = JSON.parse(this.responseText);
            var inventoryList = json.Response.profileInventory.data.items;
            var equippedList = json.Response.characterEquipment.data["2305843009299708028"].items;
            
            for(i=0; i<equippedList.length; i++){
                if(equippedList[i].itemInstanceId != undefined){
                    if(equippedList[i].itemHash == 1833195496){
                        getKillCount(equippedList[i].itemInstanceId);
                    }
                }
            }
            for(i=0; i<inventoryList.length; i++){
                if(inventoryList[i].itemInstanceId != undefined){
                    if(inventoryList[i].itemHash == 1833195496){
                        getKillCount(inventoryList[i].itemInstanceId);
                    }
                }
            }

        }
    }
    xhr.send();
}

function getKillCount(itemInstanceid){
    var xhr = new XMLHttpRequest();
     xhr.open("GET", `https://www.bungie.net/Platform/Destiny2/3/Profile/4611686018467190848/Item/${itemInstanceid}/?components=309`, true);
     xhr.setRequestHeader("X-API-Key", apiKey);
     xhr.onreadystatechange = function(){
         if(this.readyState === 4 && this.status === 200){
             var json = JSON.parse(this.responseText);
             countStop = json.Response.plugObjectives.data.objectivesPerPlug["2302094943"][0].progress;
             console.log(countStop);
         }
     }
     xhr.send();
}

var delay = 1;
function countUp(){
    if(countStop == -1){
        count+= 11;
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

countUp();

function refresh(){
    countStop = -1;
    count = 0;
    delay = 1;
    locateAger();
    countUp();
}