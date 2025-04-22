import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Animalia',
  webDir: 'www',
  
  plugins:{
    SplashScreen:{
      launchShowDuration: 2000,
      backgroundColor:"#ffffff",
      splashFullScreen: true,
      splashImmersive: true,
      showSpinner: false,
      androidSpinnerStyle: "small",
    },
  },
};

export default config;
