export async function listFolder(pcloudToken, folderId) {
	let headersList = {
		Accept: "*/*",
		Authorization: "Bearer " + pcloudToken,
	};

	let response = await fetch(
		`https://api.pcloud.com/listfolder?folderid=${folderId}`,
		{
			method: "GET",
			headers: headersList,
		},
	);

	let list = JSON.parse(await response.text());
	list = list.metadata.contents;
	list = list.filter((obj) => obj.name !== ".DS_Store");

	return list;
}