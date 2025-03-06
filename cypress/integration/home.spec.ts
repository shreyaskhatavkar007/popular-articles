// cypress/integration/home.spec.ts
describe("Home Page", () => {
  it("should display loading state initially", () => {
    cy.visit("http://localhost:3000/");
    cy.get(".animate-spin").should("be.visible");
  });

  it("should render articles correctly", () => {
    const mockArticles = [
      {
        id: 1,
        title: "Article 1",
        byline: "Author 1",
        media: [
          {
            type: "image",
            "media-metadata": [
              { url: "" },
              {
                url: "https://static01.nyt.com/images/2025/03/02/arts/02oscars-winners-list-combo/02oscars-winners-list-combo-mediumThreeByTwo210-v3.jpg",
              },
            ],
          },
        ],
        abstract: "Abstract 1",
        url: "http://example.com/1",
      },
      {
        id: 2,
        title: "Article 2",
        byline: "Author 2",
        abstract: "Abstract 2",
        url: "http://example.com/2",
      },
    ];

    cy.intercept(
      "GET",
      "https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json*",
      {
        statusCode: 200,
        body: { results: mockArticles },
      },
    ).as("getArticles");

    cy.visit("http://localhost:3000/");

    cy.wait("@getArticles");

    cy.contains("NY Times Most Popular Articles").should("be.visible");
    cy.contains(mockArticles[0].title).should("be.visible");
    cy.get("img").should("be.visible");
    cy.contains(mockArticles[1].title).should("be.visible");
    cy.contains("No preview available").should("be.visible");
    cy.get("a").contains("View Details →").should("be.visible");
  });

  it("should navigate to article details page", () => {
    const mockArticles = [
      {
        id: 1,
        title: "Article 1",
        byline: "Author 1",
        abstract: "Abstract 1",
        url: "http://example.com/1",
      },
    ];

    cy.intercept(
      "GET",
      "https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json*",
      {
        statusCode: 200,
        body: { results: mockArticles },
      },
    ).as("getArticles");

    cy.visit("http://localhost:3000/");

    cy.wait("@getArticles");

    cy.get("a").contains("View Details →").first().click();

    cy.url().should("include", `/article/${mockArticles[0].id}`);
    cy.contains(mockArticles[0].title).should("be.visible");
  });
});
