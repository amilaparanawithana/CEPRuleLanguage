/**
 *  @author Chathura Widanage
 */
import {bootstrap} from 'angular2/platform/browser'
import {AppComponent} from './app.component'
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from "angular2/http";
import {JSONP_PROVIDERS} from "angular2/http";
import {HashLocationStrategy} from "angular2/router";
import {LocationStrategy} from "angular2/router";
import {provide} from "angular2/core";

//uncomment below line for production env
// enableProdMode();
bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS, JSONP_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy})]);