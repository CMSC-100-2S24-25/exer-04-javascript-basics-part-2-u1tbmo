/* Tabamo, Euan Jed S.
2023-10822
February 25, 2025
CMSC 100 C1L
*/

import { v7 as uuidv7 } from "uuid";

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
