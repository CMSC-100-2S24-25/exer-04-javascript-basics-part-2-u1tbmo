/* Tabamo, Euan Jed S.
2023-10822
February 25, 2025
CMSC 100 C1L
*/

import { generateUniqueId, addAccount } from "./index.js";
import { open } from "node:fs/promises";
import { unlinkSync } from "node:fs";

const functions = [
	uniqueIdGeneratesCorrectly,
	idIsUnique,
	firstNameCannotBeEmpty,
	lastNameCannotBeEmpty,
	accountCanBeCreated,
	emailMustBeValid,
	ageMustBeValid,
	createMultipleAccounts,
];

// Run all functions
for (const fn of functions) {
	console.log(`${fn.name}: ${fn() ? "PASS" : "FAIL"}`);
}

// Check if the id generates the name portion in lowercase and has the correct length
function uniqueIdGeneratesCorrectly() {
	const firstName = "Alan";
	const lastName = "Turing";
	const result = generateUniqueId(firstName, lastName);

	// Check for invalid uppercase letters
	for (let i = 0; i < 1 + lastName.length; i++) {
		if (result[i].toUpperCase === result[i]) {
			return false;
		}
	}

	// Check for correct length
	return result.length === 1 + lastName.length + 8;
}

// Check if the id is truly unique, despite same information
function idIsUnique() {
	const firstName = "Alan";
	const lastName = "Turing";
	const result1 = generateUniqueId(firstName, lastName);
	const result2 = generateUniqueId(firstName, lastName);

	// Check if the ids are unique
	return result1 !== result2;
}

// Check if the id can't be generated without a valid first name
function firstNameCannotBeEmpty() {
	return generateUniqueId("", "Last Name") === null;
}

// Check if the id can't be generated without a valid last name
function lastNameCannotBeEmpty() {
	return generateUniqueId("First Name", "") === null;
}

// Check if an account can be created and exists in users.txt
async function accountCanBeCreated() {
	const firstName = "Alan";
	const lastName = "Turing";
	const email = "aturing@w3c.com";
	const age = 41;

	// Delete the file first
	try {
		unlinkSync("./users.txt");
	} catch (error) {}

	// Create the account
	const result = addAccount(firstName, lastName, email, age);
	// Check if successful
	if (!result) {
		return false;
	}

	// Check if file exists
	const fh = await open("./users.txt");
	if (fh == null) {
		return false;
	}

	// Check if file contains the correct string
	for await (const line of fh.readLines()) {
		const data = line.split(",");
		if (
			data[0] === firstName &&
			data[1] === lastName &&
			data[2] === email &&
			data[3] === age &&
			data[4].length !== 0
		) {
			fh.close();
			return true;
		}
	}
	fh.close();
	return false;
}

// Checks if the account is not created when the email is invalid
function emailMustBeValid() {
	return !addAccount("First Name", "Second Name", "This is not an email", 18);
}

// Checks if the account is not created when the age is invalid
function ageMustBeValid() {
	// Account should be at least 18
	for (let i = 0; i < 18; i++) {
		if (addAccount("First Name", "Last Name", "email@gmail.com", i)) {
			return false;
		}
	}

	return addAccount("First Name", "Last Name", "email@gmail.com", 18);
}

// Checks if multiple accounts exist in users.txt
async function createMultipleAccounts() {
	const accounts = [
		["Euan Jed", "Tabamo", "testemail@gmail.com", 20],
		["Marco Jed", "Tabamo", "testemail@gmail.com", 18],
		["Alan", "Turing", "aturing@w3c.com", 41],
	];

	// Delete the file first
	try {
		unlinkSync("./users.txt");
	} catch (error) {}

	// Create all accounts
	for (const account of accounts) {
		const result = addAccount(account[0], account[1], account[2], account[3]);
		// Check if successful
		if (!result) {
			return false;
		}
	}

	// Check if file exists
	const fh = await open("./users.txt");
	if (fh == null) {
		return false;
	}

	// Check if file contains the correct strings
	let i = 0;
	for await (const line of fh.readLines()) {
		const data = line.split(",");
		if (
			!(
				data[0] === accounts[i][0] &&
				data[1] === accounts[i][1] &&
				data[2] === accounts[i][2] &&
				data[3] === accounts[i][3] &&
				data[4].length !== 0
			)
		) {
			fh.close();
			return false;
		}
		i++;
	}
	return true;
}
