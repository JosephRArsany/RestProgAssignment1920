async function postNewBird(){
    console.log(1);
    const Bird = getBirdFromForm();
    console.log(2);
    if (Bird === -1){
        return -1;
    }
    let response = await fetch('http://127.0.0.1:8080/addbird',
                                   {
                                       method: 'POST',
                                       body: "test",
                                       headers: {
                                           'Content-Type': 'application/json'
                                       },
                                       mode: 'no-cors',
                                   });
}

function getBirdFromForm(){
    let commonName = document.getElementById('new_cn').value;
    let imgUrl = document.getElementById('new_imgurl').value;
    if(commonName == ''){
        pError = document.getElementById('errormsg');
        pError.innerText = "Error: Please include a common name";
        return -1;
    }

    if(imgUrl == ''){
        pError = document.getElementById('errormsg');
        pError.innerText = "Error: Please include an image url";
        return -1;
    }

    pError = document.getElementById('errormsg');
    pError.innerText = '';

    const extra = document.getElementById('extra_info').value;
    let bird = {};
    bird['common_name'] = commonName;
    bird['bird_image'] = imgUrl;
    let attr = extra.split("\n")
    for (var i in attr){
        keyval = i.split(':');
        bird[keyval[0]] = keyval[1];
    }
    console.log(bird);
    return bird;
}
