function login(){
    
    
    var userId=$("#uid").val();
    var endPoint=$("#endPoint").val();
    var password=$("#password").val();
    var client = new XMLHttpRequest();
    client.open("GET", endPoint, false);
    client.setRequestHeader("X-Auth-User", "130788542221063063@ecstestdrive.emc.com");
    client.setRequestHeader("X-Auth-Key", "Password123");
    client.setRequestHeader("Accept", "application/json");
    client.setRequestHeader("Access-Control-Allow-Origin", "*");
    client.send();
    console.log(client.getResponseHeader("X-Auth-Token"));
    console.log(client.getResponseHeader("X-Storage-Url"));
    window.localStorage.setItem("swift-token", client.getResponseHeader("X-Auth-Token"));
    window.localStorage.setItem("api", client.getResponseHeader("X-Storage-Url"));
    
    $("#config").hide();
    $( '#menu' ).show();
    var inputElement = document.getElementById("upload");
    inputElement.addEventListener("change", uploadFile, false);
    
}

function list(){
    $("#function").hide();
    var endPoint=window.localStorage.getItem("api");
    var authtoken=window.localStorage.getItem("swift-token");
    var client = new XMLHttpRequest();
    client.open("GET", endPoint, false);
    client.setRequestHeader("Accept", "application/json");
    client.setRequestHeader("X-Auth-Token", authtoken);
    client.send();
    var list=JSON.parse(client.responseText);
    console.log(list[0].name);
    var content="<table>";
    for( var i=0;i<list.length;i++){
        content+="<tr><td> "+list[i].name+"</tr></td>";
    }
    content += "</table>";
    $("#function").show();
    $('#function').append(content);
    
}


function showUpload(){
    
    
    $("#function").hide();
    $("#uploadFile").show();
    
}

function uploadFile(fileslist){
    
    var file;
    for(var i=0;i<fileslist.length;i++){
        
        file=fileslist[i];
        console.log(fileslist[i]);
        console.log(fileslist[i].size);
        console.log(fileslist[i].lastModified);
        console.log(fileslist[i].lastModifiedDate);
    }
    
    console.log(file.name);
    $("#function").hide();
    
    var endPoint=window.localStorage.getItem("api");
    var authtoken=window.localStorage.getItem("swift-token");
    var fileName=file.name;
    console.log(endPoint+"/sample/"+file.name);
    var client = new XMLHttpRequest();
    client.open("PUT", endPoint+"/sample/"+fileName, false);
    client.setRequestHeader("Accept", "application/json");
    client.setRequestHeader("X-Auth-Token", authtoken);
    client.send(file);
    console.log(client.responseText);
    console.log(client.status);
    
    
}