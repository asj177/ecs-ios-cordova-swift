function login(){
    
    
    var userId=$("#uid").val();
    var endPoint=$("#endPoint").val();
    var password=$("#password").val();
    var client = new XMLHttpRequest();
    client.open("GET", endPoint, false);
    client.setRequestHeader("X-Auth-User", userId);
    client.setRequestHeader("X-Auth-Key", password);
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
    $("#listObjectsOption").hide();
    $("#uploadFile").hide();
    
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
    $("#listObjectsOption").hide();
    $("#uploadFile").show();
    
}

function showListObjects(){
    
    
    $("#function").hide();
    $("#uploadFile").hide();
    $("#listObjectsOption").show();
    
}


function uploadFile(fileslist){
    $("#function").empty();
    var file;
    var bucketName=$("#bucketName").val();
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
    console.log(endPoint+"/"+bucketName+"/"+file.name);
    
    var head= new XMLHttpRequest();
    
    head.open("HEAD", endPoint+"/"+bucketName, false);
    head.setRequestHeader("Accept", "application/json");
    head.setRequestHeader("X-Auth-Token", authtoken);
    head.send();
    var content="";
    if(head.status==204 || head.status==200){
        
        var client = new XMLHttpRequest();
        client.open("PUT", endPoint+"/"+bucketName+"/"+fileName, false);
        client.setRequestHeader("Accept", "application/json");
        client.setRequestHeader("X-Auth-Token", authtoken);
        client.send(file);
        content="<h1>Object Written Successfully</h1>";
        
        
    }else{
        content="<h1>Bucket Does not exist</h1>";
        
    }
    
    $("#function").show();
    $('#function').append(content);
    
}


function listObjects(){
    $("#function").empty();
    var endPoint=window.localStorage.getItem("api");
    var authtoken=window.localStorage.getItem("swift-token");
    
    var bucketName=$("#containerName").val();
    console.log(endPoint+"/"+bucketName);
    var client = new XMLHttpRequest();
    client.open("GET", endPoint+"/"+bucketName, false);
    client.setRequestHeader("Accept", "application/json");
    client.setRequestHeader("X-Auth-Token", authtoken);
    client.send();
    var content="";
    if(client.status>399){
        
        content="<h1>Bucket Not Found</h1>";
        
    }	else{
        var list=JSON.parse(client.responseText);
        var content="<table border=1 >  <tr><td>Name</td><td>File Type</td><td>Size in Bytes</td><td>Last Modified</td></tr>";
        for( var i=0;i<list.length;i++){
            content+="<tr><td>"+list[i].name+"</td><td>"+list[i].content_type+"</td><td>"+list[i].bytes+"</td><td>"+list[i].last_modified+"</td></tr>";
        }
        content += "</table>";
        
    }
    $("#function").show();
    $('#function').append(content);	
}
