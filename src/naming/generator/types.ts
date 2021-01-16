export type NextTokenMap = Record<string, Array<string>> & {
  start: Array<string>;
};

export type NextTokens = Record<string, Array<Token>> & {
  start: Array<Token>;
};

export type Token = {
  character: string;
  weight: number;
};

export type SeparatorToken = Token & {
  character: "'" | '-' | ' ';
};

export type SinglePart = {
  count: 1;
  weight: number;
};

export type MultiPart = {
  count: 2 | 3 | 4;
  weight: number;
  separators: Array<SeparatorToken>;
  partLengthMinimum: number;
};

export type NameDataset = {
  lengthRange: [min: number, max: number];
  nextTokens: NextTokens;
  parts?: Array<SinglePart | MultiPart>; // exclude if all names have one part
};
