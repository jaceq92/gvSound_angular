import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './Components/app';
import { DND_PROVIDERS } from 'ng2-dnd/ng2-dnd';
import { HTTP_PROVIDERS } from '@angular/http';

bootstrap(AppComponent, [HTTP_PROVIDERS, DND_PROVIDERS]);