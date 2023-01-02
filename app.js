import {argv} from 'node:process';
import {log} from 'node:console';
import {readFileSync as read} from 'node:fs';

const staff = readData('./data/staff.json');
const avail = readData('./data/availability.json');
const shifts = readData('./data/shifts.json');

const viewCommand = argv[2];

//helper functions

function readData(path) {
	return JSON.parse(read(path, 'utf8'));
}

function renderMember(id, name, age) {
	return `#${id} ${name} ${age}`;
}

function renderAvailability(day, start, end) {
	return `${day} ${start} - ${end}`;
}

function renderShift(day, shifts) {
	return `${day}: ${ shifts.map(({start, end}) => `${start} - ${end}`).join("; ")}`;
}

function renderAvailabilities(id, name, availabilities) {
	return `#${id} ${name} \n${availabilities.map(({day, start, end}) => renderAvailability(day, start, end)).join("\n")}\n`;
}

if (viewCommand === "staff") {
	for (const {id, name, age} of staff) {
		log(renderMember(id, name, age));
	}
} else if (viewCommand === "avail") {
	for (const {id, availability} of avail) {
		log(renderAvailabilities(id, staff.find(({id: identifier}) => id === identifier).name, availability));
	}
} else if (viewCommand === "shifts") {
	const grouped = {};
	for (const {day, start, end} of shifts) {
		if (!grouped[day]) {
			grouped[day] = [];
		}
		grouped[day].push({
			"start": start,
			"end": end
		});
	}
	for (const [day, shifts] of Object.entries(grouped)) {
		log(renderShift(day, shifts));
	}
} else if (viewCommand === "rota") {
	for (const shift of shifts) {
		const availableStaff = avail.filter(({availability}) => {
			// homework
			//find() returns the first element in the provided array that satisfies the provided testing function
			availability.find(({day, start, end}) => {

			})
			// availability is an array of objects {day, start, end}
			// in other words, we need to FIND an element of availability which satisifies:
			// the day matches the shift's day, as well as start and end "OVERLAP" with the shift's start and end times
		});
	}
}
