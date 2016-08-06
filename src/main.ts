import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment, appRouterProviders } from './app/';
import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

if (environment.production) {
    enableProdMode();
}

bootstrap(AppComponent ,[
    appRouterProviders,
    disableDeprecatedForms(),
    provideForms(),
    HTTP_PROVIDERS,
])
.catch(err => console.error(err));;
