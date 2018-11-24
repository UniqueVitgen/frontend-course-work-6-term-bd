import { LectorModule } from './lector.module';

describe('LectorModule', () => {
  let lectorModule: LectorModule;

  beforeEach(() => {
    lectorModule = new LectorModule();
  });

  it('should create an instance', () => {
    expect(lectorModule).toBeTruthy();
  });
});
