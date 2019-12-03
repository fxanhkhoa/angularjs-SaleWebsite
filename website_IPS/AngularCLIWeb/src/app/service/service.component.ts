import { Component, OnInit, ElementRef, HostListener, Inject } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PageScrollConfig, PageScrollService, NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
  animations: [
    trigger('fadeInOut', [  state('void', style({    opacity: 0  })),  transition('void <=> *', animate(1000)),]),
    trigger('scrollAnimation', [
      state('show', style({
        opacity: 1,
        transform: "translateX(0)"
      })),
      state('hide',   style({
        opacity: 0,
        transform: "translateX(-100%)"
      })),
      transition('show => hide', animate('700ms ease-out')),
      transition('hide => show', animate('700ms ease-in'))
    ]),
  ]
})
export class ServiceComponent implements OnInit {
  
  ngOnInit(): void {
    
  }

  

  state = 'hide'

  constructor(public el: ElementRef) { }

  @HostListener('window:scroll', ['$event'])
    checkScroll() {
      const componentPosition = this.el.nativeElement.offsetTop
      const scrollPosition = window.pageYOffset

      if (scrollPosition >= componentPosition - 300) {
        this.state = 'show'
      } else {
        this.state = 'hide'
      }

    }
}
