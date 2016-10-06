import { platformBrowserDynamic }    from '@angular/platform-browser-dynamic';
import { AppModule }                 from './modules/app.module';

//import { AppModuleNgFactory }        from '../aot/app/app.module.ngfactory';

platformBrowserDynamic().bootstrapModule(AppModule);

//platformBrowserDynamic().bootstrapModuleFactory(AppModuleNgFactory);