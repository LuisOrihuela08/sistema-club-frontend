import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
              provideRouter(routes),
              provideHttpClient(withFetch())// Se utiliza provideHttpClient(withFetch()) para habilitar el uso del nuevo cliente HTTP basado en Fetch,
                                            // que es más moderno, eficiente y compatible con Angular Standalone APIs.
              //provideClientHydration()
              ]
};
