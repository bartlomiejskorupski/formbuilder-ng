import { Component, OnInit } from '@angular/core';
import { InputModel, InputType } from './input/input.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  inputs: InputModel[] = [];

  constructor() {}

  ngOnInit(): void {
    this.inputs = [
      {
        question: 'Yes/no question',
        type: InputType.YESNO,
        indent: 0
      },
      {
        question: 'Numeric type question',
        type: InputType.NUMERIC,
        indent: 1
      },
      {
        question: 'Standard question',
        type: InputType.STRING,
        indent: 2
      },
    ]
  }

}
