cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-sms-plugin.Sms",
        "file": "plugins/cordova-sms-plugin/www/sms.js",
        "pluginId": "cordova-sms-plugin",
        "clobbers": [
            "window.sms"
        ]
    },
    {
        "id": "cordova-plugin-camera.Camera",
        "file": "plugins/cordova-plugin-camera/www/CameraConstants.js",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "Camera"
        ]
    },
    {
        "id": "cordova-plugin-camera.CameraPopoverOptions",
        "file": "plugins/cordova-plugin-camera/www/CameraPopoverOptions.js",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "CameraPopoverOptions"
        ]
    },
    {
        "id": "cordova-plugin-camera.camera",
        "file": "plugins/cordova-plugin-camera/www/Camera.js",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "navigator.camera"
        ]
    },
    {
        "id": "cordova-plugin-camera.CameraPopoverHandle",
        "file": "plugins/cordova-plugin-camera/www/CameraPopoverHandle.js",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "CameraPopoverHandle"
        ]
    },
    {
        "id": "me.rahul.plugins.camerapicturebackground.CameraPictureBackground",
        "file": "plugins/me.rahul.plugins.camerapicturebackground/www/CameraPictureBackground.js",
        "pluginId": "me.rahul.plugins.camerapicturebackground",
        "clobbers": [
            "window.plugins.CameraPictureBackground"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-sms-plugin": "0.1.11",
    "cordova-plugin-compat": "1.1.0",
    "cordova-plugin-camera": "2.3.0",
    "me.rahul.plugins.camerapicturebackground": "0.0.2"
};
// BOTTOM OF METADATA
});