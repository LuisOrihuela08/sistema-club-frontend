import { ApplicationConfig, provideZoneChangeDetection, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideHttpClient(withFetch()), provideHttpClient(), provideApollo(() => {
    const httpLink = inject(HttpLink);

    return {
      link: httpLink.create({
        uri: 'http://localhost:8080/graphql',
      }),
      cache: new InMemoryCache(),
    };
  })
  ]
};

// Se utiliza provideHttpClient(withFetch()) para habilitar el uso del nuevo cliente HTTP basado en Fetch,
// que es más moderno, eficiente y compatible con Angular Standalone APIs.
//provideClientHydration()
