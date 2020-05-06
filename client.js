async function getFirstBird(){
    let response = await fetch('http://127.0.0.1:8080/birds/0');
    let body = await response.text();
    let results = JSON.parse(body);
    LoadBird(results);
}

function LoadBird(BirdJson){
    let h = document.getElementById('commonName');
    h.innerText = BirdJson['common_name'];
    let i = document.getElementById('bird_image');
    i.src = BirdJson['bird_image'];
}