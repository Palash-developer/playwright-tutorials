// @ts-check
import { test, expect } from '@playwright/test';

import { v4 as uuidv4 } from 'uuid';

let username;
let password;

test.beforeAll(async () => {
  username = `Palash_${uuidv4()}`;
  password = `Palash@123_${uuidv4()}`;
  console.log(`Generated username -> Password: ${username} -> ${password}`);
});

test.beforeEach(async ({page})=>{
  await page.goto("/");
});
test("Has title STORE", async ({page}) => {
  const pageTitle = await page.title();
  console.log(pageTitle);
  expect(pageTitle).toBe("STORE");
})

/*
    Interacting with locators in Playwright:
    There are 2 approaches to do this.
        Approach 1: 
          await page.locator('locator').click();
        Approach 2:
          await page.click('locator');
*/

test("Sign up for a new user", async ({page}) => {
  await page.click('#signin2');
  const signUpModalLabel =  page.locator('#signInModalLabel');
  expect(signUpModalLabel).toHaveText("Sign up");
  await page.fill('#sign-username', username);
  await page.fill('#sign-password', password);
  await page.locator('.btn-primary').filter({hasText: 'Sign up'}).click();
  page.on('dialog', async (dialog) => {
    console.log(`Alert message: ${dialog.message()}`);
    await dialog.accept(); // Accept the alert
  });
})


test("Login to the application", async({page}) =>{
  await page.click('#login2');
  const logInModalLabel =  page.locator('#logInModalLabel');
  expect(logInModalLabel).toHaveText("Log in");
  await page.fill('#loginusername', username);
  await page.fill('#loginpassword', password);
  await page.locator('.btn-primary').filter({hasText: 'Log in'}).click();
})                                                 
