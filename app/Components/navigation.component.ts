import { Component, Input, ViewChild } from '@angular/core';
import { AddSongComponent } from '../Components/add_song.component';


@Component({
    selector: 'navigation-component',
  templateUrl: 'app/Components/navigation.component.html',
  styleUrls: ['app/Components/navigation.component.css'],
})
export class NavigationComponent {
      componentName:'NavigationComponent';
      @ViewChild(AddSongComponent) addSong: AddSongComponent;
      keyword = '';

      showAddSongModal(){
        if (this.keyword == undefined || this.keyword == ""){

        }
        else{
        this.addSong.showAddSongModal(this.keyword);
        }
      }
}