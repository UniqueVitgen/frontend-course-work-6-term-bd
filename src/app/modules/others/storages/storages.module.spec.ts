import { StoragesModule } from './storages.module';

describe('StoragesModule', () => {
  let storagesModule: StoragesModule;

  beforeEach(() => {
    storagesModule = new StoragesModule();
  });

  it('should create an instance', () => {
    expect(storagesModule).toBeTruthy();
  });
});
