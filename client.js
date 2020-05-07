let id = 0

async function getFirstBird(){
    try{
        let response = await fetch('http://127.0.0.1:8080/birds/0');
        let body = await response.text();
        let results = JSON.parse(body);
        LoadBird(results);
        id = 0
    }
    catch(e){
        console.log("Bird could not be retrived: " + e);
        return -1
    }

}

async function getNextBird(){
    try{
        let response = await fetch('http://127.0.0.1:8080/birds/' + id + '/next');
        let body = await response.text();
        let results = JSON.parse(body);
        LoadBird(results);
        id = results['id'];
    }
    catch(e){
        console.log("Bird could not be retrived: " + e);
        return -1
    
    }
}

async function getPrevBird(){
    try{
        let response = await fetch('http://127.0.0.1:8080/birds/' + id + '/prev');
        let body = await response.text();
        let results = JSON.parse(body);
        LoadBird(results);
        id = results['id'];
    }
    catch(e){
        console.log("Bird could not be retrived: " + e);
        return -1
    }
}

async function removeCurrentBird(){
    try{
        let response = await fetch('http://127.0.0.1:8080/removebird/' + id);
        getFirstBird()
    }
    catch(e){
        console.log("Bird could not be removed: " + e);
        return -1
    }
}

function LoadBird(BirdJson){
    let h = document.getElementById('commonName');
    h.innerText = BirdJson['common_name'];
    let i = document.getElementById('bird_image');
    i.src = BirdJson['bird_image'];
    info_div = document.getElementById('bird_info');

    while(info_div.firstChild){
        info_div.removeChild(info_div.firstChild);
    }

    for (var key in BirdJson){
        if (key != 'common_name' && key != 'bird_image' && key != 'id'){
            var info = document.createElement("p");
            var text = document.createTextNode(key + " : " + BirdJson[key]);
            info.className = "b_info"
            info.appendChild(text);
            info_div.appendChild(info)
        }

    }
}