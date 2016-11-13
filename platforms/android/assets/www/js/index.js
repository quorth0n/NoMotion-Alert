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
 function sleepFor( sleepDuration ){
     var now = new Date().getTime();
     while(new Date().getTime() < now + sleepDuration){ /* do nothing */ }
 }
var base = [];
var d1 = new Date();
var d2 = new Date();
var hasChanged = false;
var app = {
  sendSms: function(date) {
    var number = localStorage.phone;

    //CONFIGURATION
    var options = {
        replaceLineBreaks: false, // true to replace \n by a new line, false by default
        android: {
            intent: ''  // send SMS with the native android SMS messaging
        }
    };

    var success = function () { alert('Message sent successfully'); };
    var error = function (e) { alert('Message Failed:' + e); };
    sms.send(number, 'No motion detected in ' + localStorage.hname + ' since ' + date.toDateString() + ' ' + date.toLocaleTimeString(), options, success, error);
  },
  pic: function() {
    var options =   {   quality: 50,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Album
                    encodingType: 0,     // 0=JPG 1=PNG
                    allowEdit: false
                };
    navigator.camera.getPicture(
    function(imgData) {
        var ctx = document.getElementById("c"+(base.length+1)).getContext("2d");
        var image = new Image();
        image.onload = function() {
            ctx.drawImage(image, 0, 0, 612, 816);
        };
        image.src = "data:image/jpeg;base64,"+imgData;
        base.push('test');
        console.log(hasChanged);
        console.log(base.length);
        if (base.length == 2) {
          app.compare();
        }
    },
    function() {
        alert('Error taking picture', 'Error');
    },
    options);
  },
  pic2: function () {
    var options = {
        name: "Image", //image suffix
        dirName: "CameraPictureBackground", //foldername
        orientation: "portrait", //or portrait
        type: "front" //or front
    };

    window.plugins.CameraPictureBackground.takePicture(success, error, options);

    function success(imgurl) {
        $('img').attr("src", imgurl);
    }

    function error(err) {
        alert(error);
    }
  },
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        if (localStorage.phone == undefined) {
          window.location.replace('./setup.html');
        }
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    compare: function() {
        console.log('comparing...');
        sleepFor(2000);
        d2 = new Date();
        var width = 612;
        var height = 816;
        var img1 = document.getElementById('c1').getContext('2d').getImageData(0, 0, width, height);
        var img2 = document.getElementById('c2').getContext('2d').getImageData(0, 0, width, height);
        var diff = document.getElementById('cd').getContext('2d').createImageData(width, height);
        var x = pixelmatch(img1.data, img2.data, diff.data, width, height, {threshold: 0.1});

        if ((x / (width*height) * 100).toFixed(0) < 10) {
            console.log('same, difference percent: ' + (x / (width*height) * 100).toFixed(0));
        } else {
            console.log('diff, difference percent: ' + (x / (width*height) * 100).toFixed(0));
            hasChanged = true;
        }

        if (!hasChanged && d2.getTime() - d1.getTime() >= 30000) {
          alert('grandpa has died');
          app.sendSms(d1);
        }

        if (base.length == 2) {
            base.splice(0,1);
        }
    }
};
setInterval(app.pic, 15000);

app.initialize();
