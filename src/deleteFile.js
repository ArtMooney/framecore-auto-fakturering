export async function deleteFile(pcloudToken, fileid) {
	let headersList = {
		Accept: '*/*',
		Authorization: 'Bearer ' + pcloudToken,
	};

	let response = await fetch(`https://api.pcloud.com/deletefile?fileid=${fileid}`, {
		method: 'GET',
		headers: headersList,
	});

	return JSON.parse(await response.text());
}
