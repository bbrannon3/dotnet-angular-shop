import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCount = 0;
  constructor(private spinner: NgxSpinnerService) { }

  busy(){
    this.busyRequestCount +=1;
    this.spinner.show(undefined,{
      type: 'timer',
      bdColor: 'rgba(255,255,255,0.7)',
      color: '#fdfdfd'
    } )
  }


idle(){
  this.busyRequestCount--;
  if(this.busyRequestCount <= 0){
    this.busyRequestCount = 0;
    this.spinner.hide()
  }
}
}
