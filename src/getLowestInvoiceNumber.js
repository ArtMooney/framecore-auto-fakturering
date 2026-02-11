export function getLowestInvoiceNumber(files) {
	let lowestInvoice = null;
	let lowestNumber = Infinity;

	for (const invoice of files) {
		const num = parseInt(invoice.name.split(' ')[0], 10);

		if (!isNaN(num) && num < lowestNumber) {
			lowestNumber = num;
			lowestInvoice = invoice;
		}
	}

	return lowestInvoice;
}
