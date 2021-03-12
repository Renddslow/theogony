import { get } from 'dot-prop';

import mediator from '../../mediator';

const series = (data: Record<string, any>) => (setKey: string, key: string) => {
  const set = get(data, setKey, []);
  const joiner = mediator.call('pick', ['along with', 'together with', 'and']);
  const items = set.map((s) => get(s, key, ''));
  return `${items.slice(0, -1).join(', ')}, ${joiner} ${items[items.length - 1]}`;
};

export default series;
