import { get } from 'dot-prop';
import mediator from '../mediator';

const replace = (dictionary: Record<string, any>, data: Record<string, any>) => (x, key) => {
  const [entity, ...path] = key.trim().split('.');
  const dataPath = path.join('.');

  if (entity === '$') {
    return mediator.call('pick', get(dictionary, dataPath));
  }

  return get(data, key.trim());
};

const generateTextFromTemplate = (
  template: string,
  dictionary: Record<string, any>,
  data: Record<string, any>,
): string => {
  const templateRegexpr = /{(.*?)}/g;
  const replacer = replace(dictionary, data);

  const hasConditionals = template.includes('[end]');

  if (hasConditionals) {
    const templateTree = [];

    let string = '';
    let inConditionalStatement = false;
    let inConditionalBlock = false;
    let condition = null;

    for (const character of template.trim()) {
      if (character === '[' && !inConditionalStatement) {
        if (string) {
          if (inConditionalBlock) {
            const key = !!condition.then ? 'else' : 'then';
            condition[key] = string.trim();
          } else {
            templateTree.push(string);
          }
        }
        inConditionalStatement = true;
        string = '';
        continue;
      }

      if (character === ']' && inConditionalStatement && string !== 'end' && string !== 'else') {
        condition = {
          statement: string,
          then: null,
          else: null,
        };
        inConditionalBlock = true;
        inConditionalStatement = false;
        string = '';
        continue;
      }

      if (character === ']' && inConditionalStatement && string === 'else') {
        string = '';
        inConditionalStatement = false;
        continue;
      }

      if (character === ']' && inConditionalStatement && string === 'end') {
        string = '';
        inConditionalStatement = false;
        inConditionalBlock = false;
        templateTree.push(condition);
        continue;
      }

      string += character;
    }

    if (string && templateTree[templateTree.length - 1] !== string) {
      templateTree.push(string);
    }

    return templateTree.reduce((acc, item) => {
      if (typeof item === 'string') {
        acc += item.replace(templateRegexpr, replacer);
      } else {
        const [entity, ...rest] = item.statement.split(' ');
        const [obj, ...path] = entity.replace(/[!]/g, '').split('.');

        const bang = entity.replace(/[^!]/g, '');
        let value = get(data[obj], path.join('.'));
        value = typeof value === 'string' ? `"${value}"` : value;
        const isTruthy = eval(`${bang}${value} ${rest.join(' ')}`);

        const validBlock = isTruthy ? item.then : item.else;
        acc += validBlock.replace(templateRegexpr, replacer);
      }

      return acc;
    }, '');
  } else {
    return template.trim().replace(templateRegexpr, replacer);
  }
};

export default generateTextFromTemplate;
