import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { InputModel, InputType } from './input/input.model';
import { InputService } from './input/input.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  
  inputs$: Observable<InputModel[]>;
  

  constructor(
    private inputService: InputService
  ) {}

  ngOnInit(): void {
    this.inputs$ = this.inputService.inputs$;
  }

  ngOnDestroy(): void {
    
  }

  addSubinputClick(input: InputModel) {
    this.inputService.addSubinput(input);
  }

  deleteInputClick(input: InputModel) {
    this.inputService.deleteInput(input);
  }

  addInputClick() {
    this.inputService.addInput();
  }

}
