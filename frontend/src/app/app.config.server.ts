import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config'; // Remove provideServerRouting import

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(), // Remove provideServerRouting()
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);