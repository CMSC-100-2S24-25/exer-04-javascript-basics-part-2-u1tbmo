/* Tabamo, Euan Jed S.
2023-10822
February 25, 2025
CMSC 100 C1L
*/

import { v4 as uuidv4 } from "uuid";
import validator from "validator";
import { appendFileSync } from "node:fs";

/**
 * Generates a unique id
 * @param {string} firstName the first name of the user
 * @param {string} lastName the last name of the user
 * @returns {string | null} a unique id or null if the first name or last name is invalid
 */
export function generateUniqueId(firstName, lastName) {
	// Check for null or undefined parameters
	if (firstName == null || lastName == null) {
		return null;
	}

	// Check string lengths
	if (firstName.length <= 0 || lastName.length <= 0) {
		return null;
	}

	// Get the first 8 characters from the uuid
	const uniqueString = uuidv4().split("-")[0];

	// Return the unique id using the pattern:
	return `${firstName.toLowerCase().trim()[0]}${lastName.toLowerCase().trim()}${uniqueString}`;
}

/**
 * Creates and stores the account in users.txt
 * @param {string} firstName the first name of the user
 * @param {string} lastName the last name of the user
 * @param {string} email the email of the account
 * @param {number} age the age of the user in years
 * @returns {boolean} if the account was successfully added or not
 */
export function addAccount(firstName, lastName, email, age) {
	// Check for null/undefined parameters
	if (firstName == null || lastName == null || email == null || age == null) {
		return false;
	}

	// Check string lengths and value of age
	if (
		firstName.length <= 0 ||
		lastName.length <= 0 ||
		email.length <= 0 ||
		age < 18
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
		const data = `${firstName},${lastName},${email},${age},${uniqueId}\n`;
		appendFileSync("users.txt", data);
	} catch (err) {
		// If an error was encountered, return false
		return false;
	}

	// Return true to indicate success
	return true;
}
