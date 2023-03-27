
export enum InputType {
  YESNO = 'Yes/No',
  NUMERIC = 'Numeric',
  STRING = 'String'
}

export interface InputModel {
  question: string;
  type: InputType;
  indent: number;
  subinputs: InputModel[];
}