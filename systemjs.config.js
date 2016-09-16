(function(global) {
	System.config({
  map: {
    app:                        'dist', // 'dist',
	'@angular/core': 						'node_modules/@angular/core/bundles/core.umd.js',
    '@angular/common': 						'node_modules/@angular/common/bundles/common.umd.js',
    '@angular/compiler': 					'node_modules/@angular/compiler/bundles/compiler.umd.js',
    '@angular/platform-browser': 			'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 	'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/http': 						'node_modules/@angular/http/bundles/http.umd.js',
    '@angular/router': 						'node_modules/@angular/router/bundles/router.umd.js',
    '@angular/forms': 						'node_modules/@angular/forms/bundles/forms.umd.js',
    '@angular/upgrade': 					'node_modules/@angular/upgrade/bundles/upgrade.umd.js',
	
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'rxjs':                       'node_modules/rxjs',
	'ng2-dnd':					  'node_modules/ng2-dnd',
	'ng2-toasty':				  'node_modules/ng2-toasty',
	'angular2-contextmenu':		  'node_modules/angular2-contextmenu'
  },
  // packages tells the System loader how to load when no filename and/or no extension
  packages: {
    'app':                        { main: '../dist/main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
	"ng2-dnd": 					  { main: 'index.js', defaultExtension: 'js' },
	"ng2-toasty": 				  { main: 'index.js', defaultExtension: 'js' },
	"angular2-contextmenu":		  { main: 'index.js', defaultExtension: 'js' },
  }
	});
})(this);
