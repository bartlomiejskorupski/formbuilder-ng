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
        indent: 0,
        subinputs: []
      },
      {
        question: 'Numeric type question',
        type: InputType.NUMERIC,
        indent: 0,
        subinputs: []
      },
      {
        question: 'Standard question',
        type: InputType.STRING,
        indent: 0,
        subinputs: []
      },
    ]
  }

  addSubinputClick(input: InputModel) {
    let id = this.inputs.findIndex(value => value === input);
    if(id === -1) {
      return;
    }

    let subinput: InputModel = {
      question: '',
      type: input.type,
      indent: input.indent + 1,
      subinputs: []
    };
    input.subinputs.push(subinput);
    
    this.inputs.splice(id + 1, 0, subinput);
  }

  deleteInputClick(input: InputModel) {
    this.deleteInputRecursive(input);
  }

  deleteInputRecursive(input: InputModel) {
    for(let subinput of input.subinputs) {
      this.deleteInputRecursive(subinput);
    }
    let id = this.inputs.findIndex(value => value === input);
    if(id === -1) {
      return;
    }
    this.inputs.splice(id, 1);
  }

  addInputClick() {
    let input: InputModel = {
      question: '',
      type: InputType.YESNO,
      indent: 0,
      subinputs: []
    };
    this.inputs.push(input);
  }

}
