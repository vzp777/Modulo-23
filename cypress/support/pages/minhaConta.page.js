/// <reference types="Cypress" />

class MinhaConta {
  preencheEmailSenha(email, senha) {
    cy.get("#reg_email").type(email);
    cy.get("#reg_password").type(senha, { log: false });
    cy.get(".button").contains("Register").click();
  }

  preencheEmail(email) {
    cy.get("#reg_email").type(email);
    cy.get(".button").contains("Register").click();
  }

  verificaSucesso() {
    cy.get(".woocommerce-MyAccount-navigation-link--dashboard > a").should(
      "be.visible"
    );
  }

  verificaFalha() {
    cy.get(".button").contains("Register").should("be.visible");
  }

  mensagemDeErro() {
    cy.get(".woocommerce-error").should("be.visible");
  }
}
export default new MinhaConta();
