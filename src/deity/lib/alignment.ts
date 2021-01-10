import mediator from '../../mediator';

export type Alignment = 'LG' | 'NG' | 'CG' | 'LN' | 'N' | 'CN' | 'LE' | 'NE' | 'CE';

export const pickAlignment = (): Alignment => {
  const col = mediator.call('pick', ['L', 'N', 'C']);
  const row = mediator.call('pick', ['G', 'N', 'E']);
  return col + row === 'NN' ? <Alignment>'N' : <Alignment>(col + row);
};
