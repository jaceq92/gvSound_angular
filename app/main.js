"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_1 = require('./Components/app');
var ng2_dnd_1 = require('ng2-dnd/ng2-dnd');
var http_1 = require('@angular/http');
platform_browser_dynamic_1.bootstrap(app_1.AppComponent, [http_1.HTTP_PROVIDERS, ng2_dnd_1.DND_PROVIDERS]);
//# sourceMappingURL=main.js.map