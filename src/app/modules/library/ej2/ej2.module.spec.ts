import { Ej2Module } from './ej2.module';

describe('Ej2Module', () => {
  let ej2Module: Ej2Module;

  beforeEach(() => {
    ej2Module = new Ej2Module();
  });

  it('should create an instance', () => {
    expect(ej2Module).toBeTruthy();
  });
});
