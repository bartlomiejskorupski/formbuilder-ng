import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { InputModel, InputType, POSSIBLE_EXPRESSIONS } from './input.model';
import { InputService } from './input.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit{
  @Input() input: InputModel;
  @Output() addSubinput = new EventEmitter<InputModel>();
  @Output() deleteInput = new EventEmitter<InputModel>();

  options: string[] = Object.values(InputType);
  marginLeft: string;
  
  parent: InputModel;
  possible_expressions: {[type:string]:string[]};

  constructor(
    private inputService: InputService
  ) {}

  ngOnInit(): void {
    this.marginLeft = (this.input.indent)*30+'px';

    this.possible_expressions = POSSIBLE_EXPRESSIONS;
    if(this.input.parentId)
      this.parent = this.inputService.getInput(this.input.parentId);
  }

  addSubinputClick() {
    this.addSubinput.emit(this.input);
  }

  deleteCLick() {
    this.deleteInput.emit(this.input);
  }

  inputChange() {
    this.inputService.inputsChanged();
  }

}
