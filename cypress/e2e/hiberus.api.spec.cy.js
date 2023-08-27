class SoldPets {
  pets = []

  constructor(pets) {
    if(!pets) {
      throw new Error('need pets data');
    }

    if(pets && !Array.isArray(pets)) {
      throw new Error('pets data must be a array of objects [{}. {}]');
    }

    pets.forEach(pet => {
      if(pet.hasOwnProperty('id') && pet.hasOwnProperty('name')) {
        return true;
      } else {
        throw new Error('pets object must have this structure { id, name }');
      }
    });

    this.pets = pets;
  }

  getCountSoldReport() {
    let data = {};

    this.pets.forEach((pet) => {
      if(!data[pet.name]) {
        data[pet.name] = 1;
      } else {
        data[pet.name]++;
      }
    })

    return data;
  }
}




describe('Pet Store Automation', () => {
  it('Create and Retrieve User', () => {
    const user = {
      "id": 0,
      "username": "eilynb",
      "firstName": "eilyn",
      "lastName": "botello",
      "email": "botelloeilyn@gmail.com",
      "password": "passQA",
      "phone": "123466",
      "userStatus": 0
    };

    cy.request('POST', 'https://petstore.swagger.io/v2/user', user).then(response => {
      cy.log(response)
      expect(response.status).to.equal(200)

      cy.request('GET',`https://petstore.swagger.io/v2/user/${user.username}`).then(response => {
        cy.log("usuario", response)
        expect(response.body.username).to.equal(user.username)
      })
      
    });

})
it('List Sold Pet Names', () => {
    cy.request('GET', 'https://petstore.swagger.io/v2/pet/findByStatus?status=sold').then(response => {
      cy.log("nombreMacotas",response.body)
      expect(response.status).to.equal(200);
    
      const soldPetData = response.body.map(pet => {
         return {
          id: pet.id,
          name:pet.name
         }
      });

      const soldPets = new SoldPets(soldPetData)

      cy.log('Nombres de mascotas vendidas:', soldPets.getCountSoldReport());
    });
})
})
