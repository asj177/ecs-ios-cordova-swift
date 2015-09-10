/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
//var app = {
//    // Application Constructor
//    initialize: function() {
//        this.bindEvents();
//    },
//    // Bind Event Listeners
//    //
//    // Bind any events that are required on startup. Common events are:
//    // 'load', 'deviceready', 'offline', and 'online'.
//    bindEvents: function() {
//        document.addEventListener('deviceready', this.onDeviceReady, false);
//    },
//    // deviceready Event Handler
//    //
//    // The scope of 'this' is the event. In order to call the 'receivedEvent'
//    // function, we must explicitly call 'app.receivedEvent(...);'
//    onDeviceReady: function() {
//        app.receivedEvent('deviceready');
//    },
//    // Update DOM on a Received Event
//    receivedEvent: function(id) {
//        var parentElement = document.getElementById(id);
//        var listeningElement = parentElement.querySelector('.listening');
//        var receivedElement = parentElement.querySelector('.received');
//
//        listeningElement.setAttribute('style', 'display:none;');
//        receivedElement.setAttribute('style', 'display:block;');
//
//        console.log('Received Event: ' + id);
//    }
//};
//
//app.initialize();
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
        content+="<tr><td> Hello "+list[i].name+"</tr></td>";
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