
export enum InputType {
  YESNO = 'Yes/No',
  NUMERIC = 'Numeric',
  STRING = 'String'
}

export interface InputModel {
  id: number;
  question: string;
  type: InputType;
  indent: number;
  subinputs: number[];
}