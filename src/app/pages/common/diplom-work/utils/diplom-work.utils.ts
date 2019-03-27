export function generateLectorsStaff(diplomWork) {
  const lectors = [];
  const properties = ['leader', 'scienceConsultor', 'recensor', 'otConsultor', 'teoConsultor'];
  for (const property of properties) {
    const value = diplomWork[property];
    lectors.push(value);
  }
  const idPersons = Array.from(new Set(lectors.map((lector, index) => {
    return lector && lector.idPerson;
  })));
  const lectorsRight = [];
  for (const idPerson of idPersons) {
    for (const lector of lectors) {
      if (lector && lector.idPerson == idPerson) {
        lectorsRight.push(lector);
        break;
      }
    }
  }
  for (const property of properties) {
    lectorsRight.forEach(lector => {
      if (diplomWork[property] && lector.idPerson == diplomWork[property].idPerson) {
        lector['is' + property] = true;
      }
    });
  }
  return lectorsRight;
}
