/// <reference types="cypress" />
import { faker } from "@faker-js/faker";

describe("Checkout", () => {
  it("deve realizar o checkout com sucesso", () => {
    let nome = faker.person.firstName;
    let sobrenome = faker.person.lastName;
    let pais = faker.location.countryCode;
    let rua = faker.location.streetName;
    let cidade = faker.location.city;
    let estado = faker.location.countryCode;
    let cep = faker.location.zipCode;
    let fone = faker.phone.number;
    let email = faker.internet.email();
    cy.adicionaProduto();
    cy.checkout(nome, sobrenome, pais, rua, cidade, estado, cep, fone, email);
  });
});
