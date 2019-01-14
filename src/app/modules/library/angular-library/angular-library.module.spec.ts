import { AngularLibraryModule } from './angular-library.module';

describe('AngularLibraryModule', () => {
  let angularLibraryModule: AngularLibraryModule;

  beforeEach(() => {
    angularLibraryModule = new AngularLibraryModule();
  });

  it('should create an instance', () => {
    expect(angularLibraryModule).toBeTruthy();
  });
});
