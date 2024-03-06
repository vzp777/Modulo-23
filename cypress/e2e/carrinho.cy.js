/// <reference types="cypress" />
import productPage from "../support/pages/product.page.js";
import carrinhoPage from "../support/pages/carrinho.page.js";
const fragments = require("../fixtures/fragments.json");
const fragments1 = require("../fixtures/fragments1.json");

describe("Operações no carrinho", () => {
  before(() => {
    cy.intercept(
      {
        method: "POST",
        url: "/?wc-ajax=get_refreshed_fragments",
      },
      (req) => {
        req.reply({
          statusCode: 200,
          body: JSON.stringify(fragments),
        });
      }
    );

    cy.intercept(
      {
        method: "POST",
        url: "/wp-admin/admin-ajax.php",
      },
      (req) => {
        req.reply({
          statusCode: 200,
          body: JSON.stringify(fragments1),
        });
      }
    );

    cy.intercept(
      {
        method: "POST",
        url: "/product/augusta-pullover-jacket/",
      },
      { fixture: "produtoAdicionado.html" }
    );

    cy.intercept(
      {
        method: "POST",
        url: "/carrinho/",
      },
      { fixture: "produtoAtualizado.html" }
    );

    cy.intercept(
      {
        method: "GET",
        url: "/carrinho/",
      },
      { fixture: "carrinho.html" }
    );

    cy.intercept(
      {
        method: "GET",
        url: "/carrinho/?remove_item=3cde1a1d01117e44bc8b2fa597e9acef&_wpnonce=a6aa9a715e",
      },
      { fixture: "produtoRemovido.html" }
    );
  });

  beforeEach(() => {
    cy.visit("/product/augusta-pullover-jacket/");
    productPage.compraProduto();
  });

  it("deve adicionar produto no carrinho com sucesso", () => {
    let mensagem = "\n                      Ver carrinho\n                      “Augusta Pullover Jacket” foi adicionado no\n                      seu carrinho.\n                    ";
    productPage.validaMensagemAdicionado(mensagem);
  });

  it("deve atualizar produto no carrinho com sucesso", () => {
    let mensagem = "Carrinho atualizado.";
    let quantidade = Math.floor(Math.random() * 10);
    productPage.irParaCarrinho();
    carrinhoPage.atualizaCarrinho(quantidade);
    carrinhoPage.validaMensagemAdicionado(mensagem);
  });

  it("deve remover um produto do carrinho com sucesso", () => {
    let mensagem =
      "“Augusta Pullover Jacket” removido.";
    productPage.irParaCarrinho();
    carrinhoPage.removeItem();
    carrinhoPage.validaMensagemAdicionado(mensagem);
  });
});
