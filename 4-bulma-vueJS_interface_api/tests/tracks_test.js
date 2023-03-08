Feature('tracks');

function login(I) {
    I.amOnPage('/login');
    I.fillField("input[type='email']", 'andrew@chinookcorp.com');
    I.fillField("input[type='password']", 'admin');
    I.click('Login');
    I.see("Dashboard");
}

Scenario('login',  ({ I }) => {
    // first login
    login(I);
});

Scenario('tracks',  ({ I }) => {
    // first login
    login(I);
    I.see("Items");
    I.click("Items");
    I.waitForText("items");
    I.makeApiRequest('GET', 'http://51.91.76.245:8000/api/tracks', (response) => {
        I.see(response.data[0].name);
        // check if the size is correct
        I.see(response.data.length);
    });
});

Scenario('create track',  ({ I }) => {
    // first login
    login(I);
    I.see("Items");
    I.click("Items");
    I.waitForText("items");
    I.click("New");
    I.fillField("input[name='title']", 'test');
    I.fillField("input[name='price']", '1');
    I.fillField("input[name='duration']", '1');
    I.fillField("input[name='composer']", 'test');
    I.click("Create item");
    pause();
});