import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Globals } from '../globals';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeInOut', [  state('void', style({    opacity: 0  })),  transition('void <=> *', animate(1000)),]),
  ],
  providers: [ Globals ]
})
export class HomeComponent implements OnInit {

  state = 'hide'

  constructor(public el: ElementRef,
              private global: Globals) { }

  ngOnInit() {
    this.state = 'show'
  }

}
