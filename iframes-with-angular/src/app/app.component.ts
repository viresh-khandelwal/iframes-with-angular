import { Component, HostListener, ViewChild, ElementRef, ComponentRef, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { InnerComponent } from './inner/inner.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'iframes-with-angular';
  iframeOpen = true;
  firstInput = 5;
  iframe2doc;
  compRef: ComponentRef<InnerComponent>;
  @ViewChild('iframe2', { static: false }) iframe2: ElementRef;
  @HostListener('window:message', ['$event'])
  iframeMessageHandler(event) {
    console.log(event);
    if (event.data === "closeIframe") {
      this.iframeOpen = false;
    }
  }

  constructor(private resolver: ComponentFactoryResolver,private vcref: ViewContainerRef){}

  handleIframe2OnLoad(iframe): void{
    this.iframe2doc = iframe.contentDocument || iframe.contentWindow;
    this.createComponent();
  }

  createComponent(){
    const innerCompFactory = this.resolver.resolveComponentFactory(InnerComponent);
    this.compRef = this.vcref.createComponent(innerCompFactory);
    this.compRef.location.nativeElement.id = 'innerComp';
    (<InnerComponent>this.compRef.instance).firstInput = this.firstInput;
    (<InnerComponent>this.compRef.instance).emitOutput.subscribe((data) => {
      console.log(data);
    })
    this.iframe2doc.body.appendChild(this.compRef.location.nativeElement);
  }




}
