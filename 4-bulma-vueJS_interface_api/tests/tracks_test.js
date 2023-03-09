Feature('tracks');

function login(I) {
    I.amOnPage('/login');
    I.fillField("input[type='email']", 'andrew@chinookcorp.com');
    I.fillField("input[type='password']", 'admin');
    I.click('Login');
    I.see("Dashboard");
}

Scenario('show tracks',  ({ I }) => {
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

Scenario('search tracks',  ({ I }) => {
    login(I);
    I.see("Items");
    I.click("Items");
    I.waitForText("items");
    I.fillField("input[placeholder='Item name, Composer…']", 'Concerto for V');
    I.pressKey(['Shift', 'Home']);
    // search for a track
    I.waitForText("Concerto for Violin", 5);
    I.pressKey(['Shift', 'Home']);
    // search for a track
    I.waitForText("Concerto for", 5);

});
Scenario('create track',  ({ I }) => {
    // first login
    login(I);
    I.see("Items");
    I.click("Items");
    I.waitForText("items");
    I.click("New");
    I.fillField("input[name='title']", 'testCreate');
    I.fillField("input[name='price']", '1');
    I.fillField("input[name='duration']", '1');
    I.fillField("input[name='composer']", 'testCompo');
    I.click("Create item");
    I.fillField("input[placeholder='Item name, Composer…']", 'testCreate');
    I.waitForText("testCreate", 5,".media-content");
});

Scenario('update track',  ({ I }) => {
    // first login
    login(I);
    I.say("I need create test to have been successful");
    I.see("Items");
    I.click("Items");
    I.waitForText("items");
    I.fillField("input[placeholder='Item name, Composer…']", 'testCreate');
    I.waitForText("testCreate", 5,".media-content");
    // update title
    I.click("Edit");
    I.fillField("input[name='title']", 'testUpdate');
    I.click("Update item");
    I.fillField("input[placeholder='Item name, Composer…']", 'testUpdate');
    I.waitForText("testUpdate", 5,".media-content");
    // update price
    I.click("Edit");
    I.fillField("input[name='price']", '2');
    I.click("Update item");
    I.fillField("input[placeholder='Item name, Composer…']", 'testUpdate');
    I.waitForText("$2", 5,".media-content");
    // update duration
    I.click("Edit");
    I.fillField("input[name='duration']", '2');
    I.click("Update item");
    I.fillField("input[placeholder='Item name, Composer…']", 'testUpdate');
    I.waitForText("2 min", 5,".media-content");
    // update composer
    I.click("Edit");
    I.fillField("input[name='composer']", 'testCompoUpdate');
    I.click("Update item");
    I.fillField("input[placeholder='Item name, Composer…']", 'testUpdate');
    I.waitForText("testCompoUpdate", 5,".media-content");
});

Scenario('delete old track',  ({ I }) => {
    // first login
    login(I);
    I.say("I need update test to have been successful");
    I.see("Items");
    I.click("Items");
    I.waitForText("items");
    I.fillField("input[placeholder='Item name, Composer…']", 'testUpdate');
    I.waitForText("testUpdate", 5,".media-content");
    I.click("Delete");
    I.dontSee("testUpdate");
});

Scenario('delete new track',  ({ I }) => {
    // first login
    login(I);
    I.see("Items");
    I.click("Items");
    I.waitForText("items");
    I.click("New");
    I.fillField("input[name='title']", 'testDelete');
    I.fillField("input[name='price']", '1');
    I.fillField("input[name='duration']", '1');
    I.fillField("input[name='composer']", 'testCompo');
    I.click("Create item");
    I.fillField("input[placeholder='Item name, Composer…']", 'testDelete');
    I.waitForText("testDelete", 5,".media-content");
    I.click("Delete");
    I.wait(2);
    I.dontSee("testDelete");
});

Scenario('Change page',  ({ I }) => {
    login(I);
    I.see("Items");
    I.click("Items");
    I.waitForText("items");
    I.click("2");
    I.makeApiRequest('GET', 'http://51.91.76.245:8000/api/tracks', (response) => {
        I.see(response.data[5].name);
        // check if the size is correct
        I.see(response.data.length);
    });
});