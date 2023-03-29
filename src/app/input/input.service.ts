import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { InputModel, InputType, POSSIBLE_EXPRESSIONS } from "./input.model";

@Injectable({ providedIn: 'root' })
export class InputService {
  
  private inputs: InputModel[] = [];
  private inputsSubject = new BehaviorSubject<InputModel[]>([]);
  inputs$ = this.inputsSubject.asObservable();

  private lastId: number;

  constructor() {
    const itemsStr = localStorage.getItem('inputs');
    if(itemsStr) {
      this.inputs = JSON.parse(itemsStr);
      this.inputsSubject.next([...this.inputs]);
    }

    this.lastId = 0;
    this.inputs.forEach((input) => {
      if(input.id > this.lastId) {
        this.lastId = input.id;
      }
    });
  }

  inputsChanged() {
    localStorage.setItem('inputs', JSON.stringify(this.inputs));
  }

  addInput() {
    let input: InputModel = {
      id: ++this.lastId,
      question: '',
      type: InputType.YESNO,
      indent: 0,
      subinputs: []
    };
    this.inputs.push(input);
    this.inputsSubject.next([...this.inputs]);
    this.inputsChanged();
  }
  
  private getIndexOfInput(input: InputModel) {
    return this.inputs.findIndex(val => val.id === input.id);
  }

  getInput(id: number): InputModel {
    return this.inputs.filter(inp => inp.id === id)[0];
  }

  addSubinput(parent: InputModel) {
    let id = this.getIndexOfInput(parent);
    if(id === -1)
      return;

    let subinput: InputModel = {
      id: ++this.lastId,
      question: '',
      type: parent.type,
      indent: parent.indent + 1,
      subinputs: [],
      parentId: parent.id,
      expression: POSSIBLE_EXPRESSIONS[parent.type][0],
      condition: ''
    };
    parent.subinputs.push(subinput.id);
    
    this.inputs.splice(id + 1, 0, subinput);
    this.inputsSubject.next([...this.inputs]);
    this.inputsChanged()
  }

  deleteInput(input: InputModel) {
    this.deleteInputRecursive(input);
    this.inputsSubject.next([...this.inputs]);
    this.inputsChanged()
  }

  private deleteInputRecursive(input: InputModel) {
    if(!input)
      return;
    for(let id of input.subinputs) {
      let inp = this.getInput(id);
      this.deleteInputRecursive(inp);
    }
    let id = this.getIndexOfInput(input);
    if(id === -1)
      return;
    
    this.inputs.splice(id, 1);
  }

}