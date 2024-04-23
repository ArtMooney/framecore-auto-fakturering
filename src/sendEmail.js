export async function sendEmail(from, to, subject, message, apiKey) {
	let headersList = {
		Accept: "*/*",
		Authorization: "Basic " + btoa("api" + ":" + apiKey),
	};

	let bodyContent = new FormData();
	bodyContent.append("from", from);
	bodyContent.append("to", to);
	bodyContent.append("subject", subject);
	bodyContent.append("text", message);

	let response = await fetch(
		"https://api.eu.mailgun.net/v3/mg.framecore.se/messages",
		{
			method: "POST",
			body: bodyContent,
			headers: headersList,
		},
	);

	return await response.text();
}