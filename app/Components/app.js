"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var single_playlist_component_1 = require('../Components/single_playlist.component');
var all_playlists_component_1 = require('../Components/all_playlists.component');
var navigation_component_1 = require('../Components/navigation.component');
var youtube_service_1 = require('../Services/youtube.service');
var media_control_component_1 = require('../Components/media_control.component');
var AppComponent = (function () {
    function AppComponent(youtubeService) {
        this.youtubeService = youtubeService;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.youtubeService.setupPlayer();
    };
    AppComponent.prototype.playlistChanged = function (val) {
        this.currentPlaylist = val;
    };
    AppComponent.prototype.playerVisibilityChanged = function (val) {
        this.playerVisible = val;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/Components/app.html',
            styleUrls: ['app/Components/app.css'],
            directives: [single_playlist_component_1.PlaylistComponent, all_playlists_component_1.PlaylistsComponent, media_control_component_1.MediaControlComponent, navigation_component_1.NavigationComponent],
            providers: [youtube_service_1.YoutubeService]
        }), 
        __metadata('design:paramtypes', [youtube_service_1.YoutubeService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.js.map