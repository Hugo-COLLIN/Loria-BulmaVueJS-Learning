Feature('tracks');

function login(I) {
    I.amOnPage('/login');
    // check if we are on the login page
    I.see("Login");
    I.fillField("input[type='email']", 'andrew@chinookcorp.com');
    I.fillField("input[type='password']", 'admin');
    I.click('Login');
    I.see("Dashboard");

}

Scenario('show tracks',  ({ I }) => {
    login(I);
    I.see("Items");
    I.click("Items");
    I.waitForText("tracks");
    I.see("40");
});

Scenario('search tracks',  ({ I }) => {
    login(I);
    I.see("Items");
    I.click("Items");
    I.waitForText("tracks");
    I.fillField("input[placeholder='Item name, Composer…']", 'Concerto for V');
    // search for a track
    I.waitForText("Concerto for Violin", 5);
    I.fillField("input[placeholder='Item name, Composer…']", 'Mozart');
    // search for a track
    I.waitForText("Concerto for", 5);

});
Scenario('create track',  ({ I }) => {
    // first login
    login(I);
    I.see("Items");
    I.click("Items");
    I.waitForText("tracks");
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
    I.waitForText("tracks");
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
    // bulk update
    I.click("Edit");
    I.fillField("input[name='title']", 'testUpdate');
    I.fillField("input[name='price']", '1');
    I.fillField("input[name='duration']", '1');
    I.fillField("input[name='composer']", 'testCompo2');
    I.click("Update item");
    I.fillField("input[placeholder='Item name, Composer…']", 'testUpdate');
    I.waitForText("testUpdate", 5,".media-content");
    I.see("$1");
    I.see("1 min");
    I.see("testCompo2");
});

Scenario('delete old track',  ({ I }) => {
    // first login
    login(I);
    I.say("I need update test to have been successful");
    I.see("Items");
    I.click("Items");
    I.waitForText("tracks");
    I.fillField("input[placeholder='Item name, Composer…']", 'testUpdate');
    I.waitForText("testUpdate", 5,".media-content");
    I.click("Delete");
    I.wait(2);
    I.dontSee("testUpdate");
});

Scenario('delete new track',  ({ I }) => {
    // first login
    login(I);
    I.see("Items");
    I.click("Items");
    I.waitForText("tracks");
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
    I.waitForText("tracks");
    I.click("2");
    I.see("Midnight")
});

Scenario('Change Order',  ({ I }) => {
    login(I);
    I.see("Items");
    I.click("Items");
    I.waitForText("tracks");
    // get the <select>
    let select = locate("select")
    I.selectOption(select,"Duration");
    I.see("1 sec",".media-content");
    I.selectOption(select,"Composer");
    I.see("Iron Man",".media-content");

    I.selectOption(select,"Unit Price");
    // select the next select
    select = locate("select").at(2)
    I.selectOption(select,"Descending");

    I.see("$1.99",".media-content");
});