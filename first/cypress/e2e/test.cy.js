describe('testing https://www.saucedemo.com/', () => {
  beforeEach(() => {
    cy.visit('https://sweetshop.netlify.app/');
  });

  // Авторизация
  it('login', () => {
    const login = 'andrey.pozdeev1818@gmail.com';
    const pass = 'password';

    cy.visit('https://sweetshop.netlify.app/login');

    cy.get('#exampleInputEmail').type(login);
    cy.get('#exampleInputPassword').type(pass);

    cy.get('.btn').click();

    cy.get('.lead>a').each(($myEmail) => {
      expect($myEmail.text()).to.equal(login);
    });
  });

  // Добавление в корзину
  it('add to basket', () => {
    cy.get('.addItem').then((elements) => {
      elements.each((index, element) => {
        cy.wrap(element).click();
      });
    });

    cy.visit('https://sweetshop.netlify.app/basket');

    cy.get('.badge.badge-secondary.badge-pill').should('have.text', '4');
  });

  // Проверка кол-ва карточек
  it('check qty goods', () => {
    cy.get('.btn.btn-primary.btn-lg.sweets').click();

    cy.get('.card').should('have.length', '16');
  });

  // Проверка валидности изображений
  it('check images', () => {
    cy.get('.btn.btn-primary.btn-lg.sweets').click();

    cy.get('img').each(($img) => {
      cy.request('GET', $img.attr('src')).then((response) => {
        expect(response.status).to.equal(200);
      });
    });
  });

  // Проверка текущего года в футере
  it('check year', () => {
    cy.get('footer')
      .find('.m-0.text-center')
      .each(($year) => {
        const year = $year.text().slice(-4);
        expect(+year).to.be.at.least(new Date().getFullYear());
      });
  });

  // Удаление из корзины
  it('delete goods', () => {
    cy.get('.btn.btn-primary.btn-lg.sweets').click();

    cy.get('.addItem').then((elements) => {
      elements.each((index, element) => {
        cy.wrap(element).click();
      });
    });

    cy.visit('https://sweetshop.netlify.app/basket');

    cy.get('.list-group-item a.small').first().click();

    cy.get('.badge.badge-secondary.badge-pill').should('have.text', '15');
  });
});
