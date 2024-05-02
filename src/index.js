import { sendEmail } from './sendEmail';
import { listFolder } from './listFolder';
import { getLowestInvoiceNumber } from './getLowestInvoiceNumber';
import { getFileLink } from './getFileLink';
import { getFileBinary } from './getFileBinary';
import { uploadFile } from './uploadFile';
import { deleteFile } from './deleteFile';
import { getEmailSignature } from './getEmailSignature';

export default {
	async scheduled(event, env, ctx) {
		// async fetch(request, env, ctx) {
		// 	let resp = await fetch('https://api.cloudflare.com/client/v4/ips');
		// 	let wasSuccessful = resp.ok ? 'success' : 'fail';

		const invoices = env.invoices;
		const invoicesFolder = env.invoicesFolder;
		const list = await listFolder(env.pcloudToken, invoices);

		if (!list.length) {
			await sendEmail(env.mailgunApiKey, env.fromEmail, env.devEmail, 'Fakturor fattas', 'Skapa fler fakturor till Kinna Husvagnsservice');
		}

		const invoice = await getLowestInvoiceNumber(list);
		const invoiceFileLink = await getFileLink(env.pcloudToken, invoice);
		const invoiceFileBinary = await getFileBinary(env.pcloudToken, invoiceFileLink);
		const fileUploaded = await uploadFile(env.pcloudToken, invoice, invoiceFileBinary, invoicesFolder);
		const deleteOldInvoice = await deleteFile(env.pcloudToken, invoice.fileid);

		await sendEmail(
			env.mailgunApiKey,
			env.fromEmail,
			env.toEmails, // !!! other email(s) on production
			'Faktura webbhotell',
			await getEmailSignature(),
			invoiceFileBinary,
			invoice.name,
		);

		return new Response(JSON.stringify('ok', null, 2));
	},
};
