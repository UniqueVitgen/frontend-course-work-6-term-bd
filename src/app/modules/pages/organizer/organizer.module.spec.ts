import { OrganizerModule } from './organizer.module';

describe('OrganizerModule', () => {
  let organizerModule: OrganizerModule;

  beforeEach(() => {
    organizerModule = new OrganizerModule();
  });

  it('should create an instance', () => {
    expect(organizerModule).toBeTruthy();
  });
});
