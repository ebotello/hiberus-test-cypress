describe('Ṕrueba de Api hiberus', () => {
    it('Crear un nuevo usuario', () => {
      const userData = {
        id: 123456,
        username: 'QAtest',
        firstName: 'Eilyn',
        lastName: 'Botello',
        email: 'pruebas@example.com',
        password: 'QApruebas2023 ',
        phone: '123456789',
        userStatus: 1
      };
  
      cy.request('POST', 'https://petstore.swagger.io/v2/user', userData)
        .should((response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.deep.equal(userData);
        });
    });
  });
