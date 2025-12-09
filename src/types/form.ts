export type InputTextType = {
  value: string;
  label?: string;
  name: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

export type InputNumberType = {
  addClass?: string;
  value: number;
  label?: string;
  name: string;
  setInput: React.Dispatch<React.SetStateAction<number>>;
  range: number;
  min?: number;
  max?: number;
  description?: string;
}