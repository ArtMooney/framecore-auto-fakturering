export async function getFileBinary(pcloudToken, invoiceFileLink) {
	let headersList = {
		Accept: '*/*',
		Authorization: 'Bearer ' + pcloudToken,
	};

	let response = await fetch(`https://${invoiceFileLink.hosts[0]}${decodeURIComponent(invoiceFileLink.path)}`, {
		method: 'GET',
		headers: headersList,
	});

	return await response.blob();
}
