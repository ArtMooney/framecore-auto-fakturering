export async function uploadFile(pcloudToken, fileObject, fileBinary, folderId) {
	let headersList = {
		Accept: '*/*',
		Authorization: 'Bearer ' + pcloudToken,
	};

	let formData = new FormData();
	formData.append('file', fileBinary, fileObject.name);

	let response = await fetch(`https://api.pcloud.com/uploadfile?folderid=${folderId}`, {
		method: 'POST',
		headers: headersList,
		body: formData,
	});

	return JSON.parse(await response.text());
}
