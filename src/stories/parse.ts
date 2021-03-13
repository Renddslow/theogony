import { parse as blockdown } from '@saibotsivad/blockdown';
import yaml from 'yaml';

export type StoryTree = {
  workflow?: Array<{
    id: string;
    dictionary_scope?: string;
    add_pronouns?: string[];
    external?: boolean;
    condition?: string[];
  }>;
  chapters: {
    [key: string]: string;
  };
};

const parse = (content: string): StoryTree => {
  const { blocks } = blockdown(content.replace(/^\/\*\* Variables((?:.|\n)*)\*\//, ''));
  const tree: StoryTree = {
    chapters: blocks
      .filter(({ name }) => name === 'story')
      .reduce((acc, block) => {
        acc[block.id] = block.content.trim();
        return acc;
      }, {}),
  };

  if (blocks.filter(({ name }) => name === 'workflow').length > 0) {
    tree.workflow = blocks
      .filter(({ name }) => name === 'workflow')
      .reduce((acc, item) => {
        acc.push(
          ...yaml.parse(item.content).story.map((story) => {
            const key = Object.keys(story)[0];
            return { id: key, ...story[key] };
          }),
        );
        return acc;
      }, []);
  }

  return tree;
};

export default parse;
