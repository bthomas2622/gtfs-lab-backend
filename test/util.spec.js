import { expect } from 'chai';
import { describe, it } from 'mocha';
import parseCSVtoArray from '../src/util/parseCSVtoArray';

describe('parseCSVtoArray', () => {
  const csvInfo = { filePath: './test/data/exampleCsv.csv', agency: 'marta' };
  it('should output csv in array format', async () => {
    const arrayOutput = await parseCSVtoArray(csvInfo);
    expect(arrayOutput).to.deep.equal([['example', 'csv', 'to', 'parse']]);
  });
});
