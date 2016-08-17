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
var add_song_component_1 = require('../Components/add_song.component');
var NavigationComponent = (function () {
    function NavigationComponent() {
        this.keyword = '';
    }
    NavigationComponent.prototype.showAddSongModal = function () {
        this.addSong.showAddSongModal(this.keyword);
    };
    __decorate([
        core_1.ViewChild(add_song_component_1.AddSongComponent), 
        __metadata('design:type', add_song_component_1.AddSongComponent)
    ], NavigationComponent.prototype, "addSong", void 0);
    NavigationComponent = __decorate([
        core_1.Component({
            selector: 'navigation-component',
            templateUrl: 'app/Components/navigation.component.html',
            styleUrls: ['app/Components/navigation.component.css'],
            directives: [add_song_component_1.AddSongComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], NavigationComponent);
    return NavigationComponent;
}());
exports.NavigationComponent = NavigationComponent;
//# sourceMappingURL=navigation.component.js.map