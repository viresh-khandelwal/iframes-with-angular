import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-inner',
  templateUrl: './inner.component.html',
  styleUrls: ['./inner.component.css']
})
export class InnerComponent implements OnInit {
 @Input('firstInput') firstInput;
 @Output('emitOutput') emitOutput = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
