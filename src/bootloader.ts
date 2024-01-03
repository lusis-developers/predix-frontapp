import { createSSRApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

//Import principal components from Crush
import CrushPagination from '@nabux-crush/crush-pagination';
import CrushTextField from '@nabux-crush/crush-text-field';
import CrushTextArea from '@nabux-crush/crush-text-area'
import CrushEditor from '@nabux-crush/crush-editor';
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
  app.component('CrushPagination', CrushPagination);
  app.component('CrushTextField', CrushTextField);
  app.component('CrushTextArea', CrushTextArea);
  app.component('CrushEditor', CrushEditor);
  app.component('CrushButton', CrushButton);
  app.component('CrushUpload', CrushUpload);
  app.component('CrushAlert', CrushAlert);

  return app;
}

export { createVueApp };