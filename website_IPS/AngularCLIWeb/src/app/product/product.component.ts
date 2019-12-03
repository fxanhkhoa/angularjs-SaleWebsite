import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { IMasonryGalleryImage } from 'ngx-masonry-gallery';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
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
    ])
  ]
})
export class ProductComponent implements OnInit {

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
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

  ngOnInit(): void {
    this.galleryOptions = [
      { "imageAnimation": "rotate" },
      // { "imageAutoPlay": true, "imageAutoPlayPauseOnHover": true, "previewAutoPlay": true, "previewAutoPlayPauseOnHover": true },
      { "breakpoint": 500, "width": "300px", "height": "300px", "thumbnailsColumns": 3 },
      { "breakpoint": 300, "width": "100%", "height": "200px", "thumbnailsColumns": 2 }
    ];

    this.galleryImages = [
      {
          small: '../assets/images/product/biensoxe.png',
          medium: '../assets/images/product/biensoxe.png',
          big: '../assets/images/product/biensoxe.png'
      },
      {
          small: '../assets/images/product/ControlDeviceWithVoiceAssistant1.png',
          medium: '../assets/images/product/ControlDeviceWithVoiceAssistant1.png',
          big: '../assets/images/product/ControlDeviceWithVoiceAssistant1.png'
      },
      {
          small: '../assets/images/product/ControlDeviceWithVoiceAssistant.jpg',
          medium: '../assets/images/product/ControlDeviceWithVoiceAssistant.jpg',
          big: '../assets/images/product/ControlDeviceWithVoiceAssistant.jpg'
      },
      {
        small: '../assets/images/product/ControlDeviceWithVoiceAssistant2.png',
        medium: '../assets/images/product/ControlDeviceWithVoiceAssistant2.png',
        big: '../assets/images/product/ControlDeviceWithVoiceAssistant2.png'
      },
      {
        small: '../assets/images/product/DongHoDienTu.jpg',
        medium: '../assets/images/product/DongHoDienTu.jpg',
        big: '../assets/images/product/DongHoDienTu.jpg'
      },    
      {
        small: '../assets/images/product/mabanphimsangHEX.jpg',
        medium: '../assets/images/product/mabanphimsangHEX.jpg',
        big: '../assets/images/product/mabanphimsangHEX.jpg'
      }          
    ];
    this.galleryImages = shuffle(this.galleryImages);
  } 

  // private urls: string[] = [
  //   'https://www.ogttx.org/wp-content/themes/ogt/media/_frontend/img/bkg.jpg',
  //   'http://www.magicalkenya.com/wp-content/uploads/2014/08/homebannerimg4.jpg',
  //   'https://media.gadventures.com/media-server/cache/12/59/12591a5497a563245d0255824103842e.jpg',
  //   'https://i.pinimg.com/originals/1c/aa/c5/1caac55143e3e11461c6ae5962403deb.jpg',
  //   'http://littleguyintheeye.com/wp-content/uploads/2014/08/nature-3.jpg',
  // ];

  // public get images(): IMasonryGalleryImage[] {
  //     return this.urls.map(m => <IMasonryGalleryImage>{
  //         imageUrl: m
  //     });
  // }

}

function shuffle(arr) {
  var i,
      j,
      temp;
  for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
  }
  return arr;    
};
