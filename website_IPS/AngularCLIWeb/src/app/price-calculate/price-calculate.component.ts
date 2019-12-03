import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PriceCalculateService } from './price-calculate.service';
import {ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-price-calculate',
  templateUrl: './price-calculate.component.html',
  styleUrls: ['./price-calculate.component.scss'],
  providers: [PriceCalculateService],
  encapsulation: ViewEncapsulation.None
})
export class PriceCalculateComponent implements OnInit {
  sum = 0;
  a = 0;
  b = 0;
  formPrice: FormGroup;
  platformOptions = [];
  webOptions = [];
  applicationOptions = [];
  automationOptions = [];

  constructor(private fb: FormBuilder,
    private priceCalculateService: PriceCalculateService) { }

  ngOnInit() {
    this.formPrice = this.fb.group({
      platform: ['', Validators.required],
      web: ['', Validators.required],
      application: ['', Validators.required],
      automation: ['', Validators],
      cv_ml: this.fb.group({
        opencv: false,
        machinelearing: false,
        nvidia: false
      }),
    });

    this.platformOptions = this.getPlatforms();
  }

  onSubmit(){

  }

  sum_calculate(){
    console.log('changing');
    this.sum = +this.a + +this.b;
  }

  getPlatforms() {
    return [
      { id: '1', name: 'order 1' },
      { id: '2', name: 'order 2' },
      { id: '3', name: 'order 3' },
      { id: '4', name: 'order 4' }
    ];
  }

  getWeb(){
    return [
      { id: '1', name: 'order 1' },
      { id: '2', name: 'order 2' },
      { id: '3', name: 'order 3' },
      { id: '4', name: 'order 4' }
    ];
  }

  getApplication(){
    return [
      { id: '1', name: 'order 1' },
      { id: '2', name: 'order 2' },
      { id: '3', name: 'order 3' },
      { id: '4', name: 'order 4' }
    ];
  }

  getAutomation(){
    return [
      { id: '1', name: 'order 1' },
      { id: '2', name: 'order 2' },
      { id: '3', name: 'order 3' },
      { id: '4', name: 'order 4' }
    ];
  }

  onSelectChange(){
    console.log(this.formPrice.controls['platform'].value);
  }
}
