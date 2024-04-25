export async function getFileLink(pcloudToken, fileObject) {
	let headersList = {
		Accept: '*/*',
		Authorization: 'Bearer ' + pcloudToken,
	};

	let response = await fetch(`https://api.pcloud.com/getfilelink?fileid=${fileObject.fileid}&folderid=${fileObject.parentfolderid}`, {
		method: 'GET',
		headers: headersList,
	});

	return JSON.parse(await response.text());
}
