
export enum InputType {
  YESNO = 'Yes/No',
  NUMERIC = 'Numeric',
  STRING = 'String'
}

export const POSSIBLE_EXPRESSIONS = {
  'Yes/No': ['Equals'],
  'Numeric': ['Equal', "Not equal", 'Less than', 'Greater than'],
  'String': ['Equal', 'Not equal']  
}

export interface InputModel {
  id: number;
  type: InputType;
  question: string;
  indent: number;
  expression?: string;
  condition?: string;
  subinputs: number[];
  parentId?: number;
}