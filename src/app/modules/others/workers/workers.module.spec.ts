import { WorkersModule } from './workers.module';

describe('WorkersModule', () => {
  let workersModule: WorkersModule;

  beforeEach(() => {
    workersModule = new WorkersModule();
  });

  it('should create an instance', () => {
    expect(workersModule).toBeTruthy();
  });
});
