import { listFolder } from './listFolder';
import { sendEmail } from './sendEmail';
import { getLowestInvoiceNumber } from './getLowestInvoiceNumber';
import { getFileLink } from './getFileLink';
import { getFileBinary } from './getFileBinary';
import { uploadFile } from './uploadFile';
import { deleteFile } from './deleteFile';
import { getEmailSignature } from './getEmailSignature';

export async function runApp(env) {
	const invoices = env.INVOICES_ID;
	const invoicesFolder = env.INVOICES_FOLDER_ID;
	const list = await listFolder(env.PCLOUD_TOKEN, invoices);

	if (!list.length) {
		await sendEmail(
			env.MAILGUN_API_KEY,
			env.EMAIL_FROM,
			env.EMAIL_DEV,
			'Fakturor fattas',
			'Skapa fler fakturor till Kinna Husvagnsservice',
		);
	}

	const invoice = await getLowestInvoiceNumber(list);
	const invoiceFileLink = await getFileLink(env.PCLOUD_TOKEN, invoice);
	const invoiceFileBinary = await getFileBinary(env.PCLOUD_TOKEN, invoiceFileLink);
	const fileUploaded = await uploadFile(env.PCLOUD_TOKEN, invoice, invoiceFileBinary, invoicesFolder);
	const deleteOldInvoice = await deleteFile(env.PCLOUD_TOKEN, invoice.fileid);

	await sendEmail(
		env.MAILGUN_API_KEY,
		env.EMAIL_FROM,
		env.EMAIL_TO,
		'Faktura webbhotell',
		await getEmailSignature(),
		invoiceFileBinary,
		invoice.name,
	);

	return 'Ok';
}
