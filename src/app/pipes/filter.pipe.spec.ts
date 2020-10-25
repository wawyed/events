import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  let pipe: FilterPipe<string>;

  function filterValue(value): Array<string> {
    return pipe.transform(value, 'a', (criteria: string, val: string) => val.includes(criteria));
  }

  beforeEach(() => {
    pipe = new FilterPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('when called transform with a nil value', () => {
    let result: Array<string>;

    beforeEach(() => {
      result = filterValue(null);
    });

    it('should return null', () => {
      expect(result).toBeNull();
    });
  });

  describe('when called transform with a value', () => {
    let result: Array<string>;

    beforeEach(() => {
      result = filterValue(['abc', 'bc']);
    });

    it('should filter the array based on the function provided', () => {
      expect(result).toEqual(['abc']);
    });
  });
});
