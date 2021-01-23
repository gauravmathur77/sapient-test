import { Component , ChangeDetectionStrategy, OnInit} from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent  implements OnInit{
  title = 'angular-starter';
  version = 'Angular version 10.0.9';

  constructor(private swUpdate: SwUpdate) {
  }
  ngOnInit() {

    if (this.swUpdate.isEnabled) {

        this.swUpdate.available.subscribe(() => {

            if(confirm("New version available. Load New Version?")) {

                window.location.reload();
            }
        });
    }        
}
}
