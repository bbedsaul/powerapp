import {  ViewChild, Directive, OnInit } from '@angular/core';
import { Keyboard } from 'ionic-native';

@Directive({
  selector: '[autofocus]'
})
export class FocusInput implements OnInit {
  @ViewChild('myinput') input
  private focused: boolean
  ngOnInit(){
    this.focused = true
  }
  ionViewDidLoad() {
    if (this.focused) {
      setTimeout(()=>{
        this.input.setFocus()
        this.focused = false
        Keyboard.show()
      }, 300)
    }
  }
}