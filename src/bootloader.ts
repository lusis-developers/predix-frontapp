import { createSSRApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

//Import principal components from Crush
import CrushTextField from '@nabux-crush/crush-text-field';
import CrushTextArea from '@nabux-crush/crush-text-area'
import CrushButton from '@nabux-crush/crush-button';
import CrushUpload from '@nabux-crush/crush-upload';
import CrushAlert from '@nabux-crush/crush-alert';


async function createVueApp() {
  const app = createSSRApp(App); 
  const pinia = createPinia();

  //setting pinia
  app.use(pinia);

  //setting router
  app.use(router);

  //components globally 
  app.component('CrushTextField', CrushTextField);
  app.component('CrushTextArea', CrushTextArea);
  app.component('CrushButton', CrushButton);
  app.component('CrushAlert', CrushAlert);
  app.component('CrushUpload', CrushUpload);

  return app;
}

export { createVueApp };