/// <reference types="Cypress" />
import {faker} from "@faker-js/faker";
import homePagePage from "../support/pages/homePage.page";
import minhaContaPage from "../support/pages/minhaConta.page";

let dados;
let emailJaCadastrado;

describe("Cadastro de conta", () => {
  beforeEach(() => {
    cy.visit("/");
    homePagePage.selecionaMinhaConta();
    cy.fixture("data.json").then((p) => {
      dados = p;
    });
  });

  it("deve cadastrar uma conta com sucesso", () => {
    let email = faker.internet.email();
    emailJaCadastrado = email;
    minhaContaPage.preencheEmailSenha(email, dados.senha);
    minhaContaPage.verificaSucesso();
  });

  it("não deve cadastrar uma conta usando email já cadastrado", () => {
    minhaContaPage.preencheEmailSenha(emailJaCadastrado, dados.senha);
    minhaContaPage.mensagemDeErro();
  });

  it("não deve cadastrar uma conta com email inválido", () => {
    let email = "teste";
    minhaContaPage.preencheEmailSenha(email, dados.senha);
    minhaContaPage.verificaFalha();
  });

  it("não deve cadastrar uma conta com senha em branco", () => {
    let email = faker.internet.email();
    minhaContaPage.preencheEmail(email);
    minhaContaPage.mensagemDeErro();
  });
});
