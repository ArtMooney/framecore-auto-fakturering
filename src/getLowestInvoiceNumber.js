export async function getLowestInvoiceNumber(items) {
	const fileNumbers = [];
	const newItems = [];

	for (const item of items) {
		fileNumbers.push(item.name.split(' ')[0]);
	}

	const minFileNumber = Math.ceil(Math.min(...fileNumbers));

	for (const item of items) {
		if (parseInt(item.name.split(' ')[0]) === minFileNumber) {
			newItems.push(item);
		}
	}
	
	return newItems[0];
}
