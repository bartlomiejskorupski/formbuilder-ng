import { Component, Input, OnInit } from '@angular/core';
import { InputModel } from './input.model';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit{

  @Input() input: InputModel;

  marginLeft: string;

  constructor() {}

  ngOnInit(): void {
    this.marginLeft = (this.input.indent + 1)+'rem';
  }

}
