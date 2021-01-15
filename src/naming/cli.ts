import sade from 'sade';
import fs from 'fs';
import { promisify } from 'util';
import path from 'path';

import createNameDataset from './createNameDataset';

const read = promisify(fs.readFile);
const write = promisify(fs.writeFile);

sade('nameday <filepath>', true)
  .option(
    '-o, --output',
    'Output of location for the dataset',
    path.join(process.cwd(), 'dataset.json'),
  )
  .describe('Parse a list (csv) of names to create a name dataset')
  .action(async (filepath, opts) => {
    const list = (await read(filepath)).toString();
    const dataset = createNameDataset(list.split('\n').filter((a) => a));
    await write(opts.o, JSON.stringify(dataset, null, 2));
  })
  .parse(process.argv);
