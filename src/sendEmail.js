export async function sendEmail(apiKey, fromEmail, toEmails, subject, message, binaryFile, fileName) {
	let headersList = {
		Accept: '*/*',
		Authorization: 'Basic ' + btoa('api' + ':' + apiKey),
	};

	let bodyContent = new FormData();
	bodyContent.append('from', fromEmail);
	bodyContent.append('to', toEmails);
	bodyContent.append('subject', subject);
	bodyContent.append('html', message);

	if (binaryFile && fileName) {
		bodyContent.append('attachment', binaryFile, fileName);
	}

	let response = await fetch('https://api.eu.mailgun.net/v3/mg.framecore.se/messages', {
		method: 'POST',
		body: bodyContent,
		headers: headersList,
	});

	return await response.text();
}
