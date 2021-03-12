import { get } from 'dot-prop';
import mediator from '../mediator';
import utils from './utils';

const safeSplit = (str: string) => {
  const segments = [];

  let inString = false;
  let string = '';

  for (const char of str) {
    if (/[\s\r\n]/.test(char) && !inString) {
      segments.push(string);
      string = '';
      continue;
    }

    if (char === '"' && !inString) {
      inString = true;
      continue;
    }

    if (char === '"' && inString) {
      inString = false;
      segments.push(string);
      string = '';
      continue;
    }

    string += char;
  }

  return segments;
};

const replace = (dictionary: Record<string, any>, data: Record<string, any>) => (x, key) => {
  const [entity, ...path] = key.trim().split('.');
  const dataPath = path.join('.');

  if (entity === '$') {
    return mediator.call('pick', get(dictionary, dataPath));
  }

  if (key.startsWith('@')) {
    const [func, ...args] = safeSplit(key.replace('@', ''));
    if (!utils[func]) {
      throw new Error(`@${func} is not a valid template function`);
    }
    return utils[func](data)(...args);
  }

  return get(data, key.trim());
};

const conditionalReplace = (data: Record<string, any>, rgx: RegExp) => (x, condition, block) => {
  const [entity, ...rest] = condition.split(' ');
  const [param, ...path] = entity.replace(/[!]/g, '').split('.');

  const initialValue = get(data[param], path.join('.'));
  const value = typeof initialValue === 'string' ? `"${initialValue}"` : initialValue;
  const bang = entity.replace(/[^!]/g, '');

  const isTruthy = eval(`${bang}${value} ${rest.join(' ')}`);

  const [thenBlock, ...elseBlock] = block.split('[else]').map((t) => t.trim());
  const actualElse = elseBlock[elseBlock.length - 1]; // Theoretically this would be the else most immediately preceding the END
  const actualThen =
    elseBlock.length === 1 ? thenBlock : [thenBlock, ...elseBlock.slice(-1)].join('[else]');

  const validBlock = isTruthy ? actualThen : actualElse;

  return validBlock.includes('[end]')
    ? validBlock.replace(rgx, conditionalReplace(data, rgx))
    : validBlock;
};

const generateTextFromTemplate = (
  template: string,
  dictionary: Record<string, any>,
  data: Record<string, any>,
): string => {
  const templateRegexpr = /{(.*?)}/g;
  const conditonalRegexpr = /\[(.*)]((?:.|\n)*)?\[end]/g;
  const replacer = replace(dictionary, data);

  const hasConditionals = template.includes('[end]');

  if (hasConditionals) {
    const updatedTemplate = template
      .trim()
      .replace(conditonalRegexpr, conditionalReplace(data, conditonalRegexpr));
    return updatedTemplate.trim().replace(templateRegexpr, replacer);
  } else {
    return template.trim().replace(templateRegexpr, replacer);
  }
};

export default generateTextFromTemplate;
