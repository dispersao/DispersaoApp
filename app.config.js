export default {
  "expo": {
    "owner": "dispersao",
    "name": "Dispersão",
    "description": "Aplicativo do filme Dispersão",
    "slug": "snack-db27b3e3-a2d5-4324-abd4-efd904fac69c",
    "privacy": "unlisted",
    "platforms": [
      "ios",
      "android",
      "web"
    ],
    "version": "1.0.11",
    "orientation": "default",
    "primaryColor": "#cccccc",
    "icon": "./assets/images/app_icon.png",
    "notification": {
      "color": "#cccccc",
      "icon": "./assets/images/notification_icon.png",
      "iosDisplayInForeground": true
    },
    "packagerOpts": {},
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "net.dispersao.filmeapp",
      "requireFullScreen": true
    },
    "android": {
      "package": "net.dispersao.filmeapp",
      "googleServicesFile": process.env.GOOGLE_SERVICES_JSON,
      "versionCode": 10,
      "permissions": [
        "VIBRATE"
      ],
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/app_icon.png",
        "backgroundColor": "#d96235"
      }
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "splash": {
      "image": "./assets/images/dispersao_splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#000000"
    },
    "assetBundlePatterns": [
      "./assets/*"
    ],
    "extra": {
      "eas": {
        "projectId": "1c855d35-046b-47b6-98e1-3e4858b67177"
      }
    }
  }
}