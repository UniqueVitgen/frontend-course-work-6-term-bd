import { SecretaryModule } from './secretary.module';

describe('SecretaryModule', () => {
  let secretaryModule: SecretaryModule;

  beforeEach(() => {
    secretaryModule = new SecretaryModule();
  });

  it('should create an instance', () => {
    expect(secretaryModule).toBeTruthy();
  });
});
