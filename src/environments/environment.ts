// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  baseDomain: 'ideaplan.io',
  s3BucketUrl: 'https://ideaplan.s3.us-east-2.amazonaws.com/',
  defaultMenuType: 'menu-default',
  subHiddenBreakpoint: 1440,
  menuHiddenBreakpoint: 768,
  themeColorStorageKey: 'vien-themecolor',
  isMultiColorActive: true,
  /*
  Color Options:
  'light.blueyale', 'light.blueolympic', 'light.bluenavy', 'light.greenmoss', 'light.greenlime', 'light.yellowgranola', 'light.greysteel', 'light.orangecarrot', 'light.redruby', 'light.purplemonster'
  'dark.blueyale', 'dark.blueolympic', 'dark.bluenavy', 'dark.greenmoss', 'dark.greenlime', 'dark.yellowgranola', 'dark.greysteel', 'dark.orangecarrot', 'dark.redruby', 'dark.purplemonster'
  */
  defaultColor: 'light.blueyale',
  isDarkSwitchActive: true,
  defaultDirection: 'ltr',
  themeRadiusStorageKey: 'vien-themeradius',
  isAuthGuardActive: true,
  firebase: {
    apiKey: 'AIzaSyCqoNLB_jTw4nncO12qR-eDH9gAeWiZVaw',
    authDomain: 'vien-angular-login.firebaseapp.com',
    databaseURL: 'https://vien-angular-login.firebaseio.com',
    projectId: 'vien-angular-login',
    storageBucket: 'vien-angular-login.appspot.com',
    messagingSenderId: '16217062888',
    appId: '1:16217062888:web:6b08232ca0c9662fedb85d',
    measurementId: 'G-8ETT79WRRN'
  },

  facebookAppId:'3554144754674563',
  googleClientId:'231773896593-claceh4rtjvpqjd6mmv4bf05k0ifd15v.apps.googleusercontent.com'

};
