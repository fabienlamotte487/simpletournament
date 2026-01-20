export type InputTextType = {
  value: string;
  label?: string;
  name: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  deletable?: boolean;
}

export type InputNumberType = {
  icon?: any;
  value: number;
  name: string;
  setInput: React.Dispatch<React.SetStateAction<number>>;
  range: number;
  min?: number;
  max?: number;
}