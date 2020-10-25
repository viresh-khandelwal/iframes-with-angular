import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'iframes-with-angular';
  iframeOpen = true;
  @HostListener('window:message', ['$event'])
  iframeMessageHandler(event) {
    console.log(event);
    if(event.data === "closeIframe"){
      this.iframeOpen = false;
    }
  }
}
