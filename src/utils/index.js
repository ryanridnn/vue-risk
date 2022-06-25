export const genNumberWithRange = (min, range = 20) => {
	if (!min) {
		console.error("Min value is been not provided");
		return;
	} else if (min >= range) {
		console.error("Min exceeding range");
	}

	return Math.floor(min + Math.random() * (1 + range - min));
};

export const convertData = (message) => {
	return JSON.parse(message.data);
};
