/// <reference types="cypress" />

const { expect } = require("chai");

const openAIUtils = require("../utils/OpenAI.util");
const { default: axios } = require("axios");

const { GooglePage, WikipediaPage } = require("../pages");

const googlePage = new GooglePage();

const wikipediaPage = new WikipediaPage();

let googleFixtures = {};

describe("hiberus", () => {
  before(async () => {
    googleFixtures = await cy.fixture("google.json");
  });

  it("Busquedad en google", async () => {
    await googlePage.goto();

    await googlePage.searchInput({
      value: googleFixtures.searches.automatizacion,
    });

    const wikipediaUrl = await googlePage.getHrefOfTitleResult({
      value: googleFixtures.searches.wikipediaTitle,
    });

    await axios.post("http://localhost:3000/link", {
      value: wikipediaUrl,
    });
  });

  it("Chequear en wikipedia cual fue el primer proceso automatizado.", async () => {
    const link = await axios
      .get("http://localhost:3000/link")
      .then((r) => r?.data?.value);

    await wikipediaPage.goto({ value: link });

    await cy.get("p").each(async ($p, index, $list) => {
      if ($p.text().includes("el primer proceso")) {
        const wikipediaText = $p.text();

        const completion = await openAIUtils.sendQuestion([
          {
            role: "user",
            content: wikipediaText,
          },
          {
            role: "user",
            content:
              "segun el texto anterior en que año paso el primer proceso automatico pero responde solo con el numero del año",
          },
        ]);

        expect(
          completion.choices[0]?.message?.content,
          "La primera automatizacion en el texto sea 1785"
        ).to.equal("1785");

        await cy.wrap($p).screenshot("seccion", { overwrite: true });
      }
    });
  });
});
