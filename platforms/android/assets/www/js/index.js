var base = [];
var d1 = new Date();
var d2 = new Date();
var d3 = new Date()
var hasChanged = false;
var i = 0;
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
    sms.send(number, 'No motion detected in ' + localStorage.pname + '\'s house since ' + d3.toDateString() + ' ' + d3.toLocaleTimeString(), options, success, error);
  },
  pic: function() {
    var options =   {   quality: 50,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Album
                    encodingType: 1,     // 0=JPG 1=PNG
                    allowEdit: false
                };
    navigator.camera.getPicture(
    function(imgData) {
        i++;
        var ctx = document.getElementById("c"+i).getContext("2d");
        console.log(i);
        var image = new Image();
        image.onload = function() {
            ctx.drawImage(image, 0, 0, 1224, 1632);
        };
        image.src = "data:image/png;base64,"+imgData;
        base.push('test');
        console.log(hasChanged);
        if (base.length >= 2) {
          i = 0;
          console.log('comp:'+image.complete);
          if (image.complete) {
            setTimeout(function () {
              app.compare();
            }, 2000);
          }
        }
        setTimeout(app.pic, 20000);
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
    },

    compare: function() {
        console.log('comparing...');
        //sleepFor(2000);
        d2 = new Date();
        var width = 1224;
        var height = 1632;
        var img1 = document.getElementById('c1').getContext('2d').getImageData(0, 0, width, height);
        var img2 = document.getElementById('c2').getContext('2d').getImageData(0, 0, width, height);
        var x = pixelmatch(img1.data, img2.data, null, width, height, {threshold: 0.1});

        if ((x / (width*height) * 100).toFixed(0) < 20) {
            $('h2').text('same, difference percent: ' + (x / (width*height) * 100).toFixed(0));
        } else {
            $('h2').text('diff, difference percent: ' + (x / (width*height) * 100).toFixed(0));
            hasChanged = true;
        }

        console.log(d2.getTime());
        if (!hasChanged && new Date().getTime() - d1.getTime() >= 40000) {
          app.sendSms(d1);
        }

        if (base.length == 2) {
            base.splice(0,1);
        }
    }
};

app.initialize();

$('.app').click(function () {
    $('.app').attr('style', '-webkit-animation:fade 3000ms infinite;background:url(./img/recording.png) no-repeat center top !important;');
    $('h1').text('Monitoring...');
    $('h2').text('');
});
