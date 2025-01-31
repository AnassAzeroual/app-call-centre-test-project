import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withDebugTracing } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideNzIcons } from './icons-provider';
import { fr_FR, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './shared/services/token-interceptor.service';

registerLocaleData(fr);

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideClientHydration(), provideNzIcons(),
  provideNzI18n(fr_FR), importProvidersFrom(FormsModule),
  provideAnimationsAsync(),provideHttpClient(withInterceptors([tokenInterceptor]))]
};
