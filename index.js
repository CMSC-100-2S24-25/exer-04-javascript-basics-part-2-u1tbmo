/* Tabamo, Euan Jed S.
2023-10822
February 25, 2025
CMSC 100 C1L
*/

import { v7 as uuidv7 } from "uuid";
import validator from "validator";
import { appendFileSync } from "node:fs";

function generateUniqueId(firstName, lastName) {
	// Check string lengths
	if (firstName.length <= 0 || lastName.length <= 0) {
		return null;
	}

	// Get the first 8 characters from the uuid
	const uniqueString = uuidv7().split("-")[0];

	// Return the unique id using the pattern:
	return `${firstName.toLowerCase().trim()[0]}${lastName.toLowerCase().trim()}${uniqueString}`;
}

function addAccount(firstName, lastName, email, age) {
	// Check string lengths and value of age
	if (
		firstName.length <= 0 ||
		lastName.length <= 0 ||
		email.length <= 0 ||
		age <= 18
	) {
		return false;
	}

	// Check if the email is valid
	if (!validator.isEmail(email)) {
		return false;
	}

	// Generate the unique id
	const uniqueId = generateUniqueId(firstName, lastName);

	// Save the data into users.txt
	try {
		const data = `${firstName},${lastName},${email},${age},${uniqueId}`;
		appendFileSync("users.txt", data);
	} catch (err) {
		// If an error was encountered, return false
		return false;
	}

	// Return true to indicate success
	return true;
}
