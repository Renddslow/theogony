import fs from 'fs';
import path from 'path';
import { get } from 'dot-prop';
import { klona } from 'klona';
import Handlebars from 'handlebars';
import vm from 'vm';

import parse from './parse';
import dictionary from './dictionary';
import getPronouns from './utils/pronouns';
import godOrGoddess from './utils/godOrGoddess';
import series from './utils/series';
import possessive from './utils/possessive';
import capitalize from './utils/capitalize';

const parseWorkflowCondition = (data: Record<string, any>) => (cond: string) => {
  const [entity, ...rest] = cond.split(' ');

  const initialValue = get(data, entity.replace(/[!]/g, ''));
  let value = typeof initialValue === 'string' ? `"${initialValue}"` : initialValue;

  if (initialValue.toString() === '[object Object]') {
    value = true;
  }

  const bang = entity.replace(/[^!]/g, '');
  return vm.runInNewContext(`${bang}${value} ${rest.join(' ')}`);
};

const addPronouns = (data: Record<string, any>, list: string[]) => {
  const next = klona(data);
  list.forEach((k) => {
    if (Array.isArray(next[k])) {
      next[k] = next[k].map(({ gender, ...rest }) => ({
        ...rest,
        gender,
        pronouns: getPronouns(gender),
      }));
    } else {
      next[k].pronouns = getPronouns(next[k].gender);
    }
  });
  return next;
};

const createStory = (
  storyName: string,
  data: Record<string, any>,
  external: Record<string, any>,
): string => {
  const storyFile = fs
    .readFileSync(path.join(__dirname, './content', `${storyName}.story`))
    .toString();
  const { workflow, chapters } = parse(storyFile);

  return workflow
    .filter((job) => !job.condition || job.condition.every(parseWorkflowCondition(data)))
    .map((job) => {
      if (job.external) {
        return external[job.id];
      }

      Handlebars.registerHelper('series', series);
      Handlebars.registerHelper('godOrGoddess', godOrGoddess);
      Handlebars.registerHelper('possessive', possessive);
      Handlebars.registerHelper('capitalize', capitalize);

      Handlebars.registerHelper('gt', (a, b) => a > b);
      Handlebars.registerHelper('gte', (a, b) => a >= b);
      Handlebars.registerHelper('lt', (a, b) => a < b);
      Handlebars.registerHelper('lte', (a, b) => a <= b);
      Handlebars.registerHelper('between', (v, a, b) => a <= v && b >= v);

      const current = chapters[job.id];
      const template = Handlebars.compile(current);

      const mutatedData = job.add_pronouns ? addPronouns(data, job.add_pronouns) : data;
      const $ = job.dictionary_scope ? get(dictionary, job.dictionary_scope) : dictionary;

      return template({
        ...mutatedData,
        $,
      });
    })
    .join('\n')
    .split('\n')
    .filter((t) => t.trim())
    .join('\n');
};

export default createStory;
