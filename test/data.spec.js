// Ejecuta tu test 
describe('data', () => {
  it('debería exponer socialNetwork como objeto global', () => {
    assert.isObject(socialNetwork);
  });
});
