export const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type,Authorization',
	'Access-Control-Max-Age': '86400',
};

export const handleCors = async (request, env) => {
	if (request.method === 'OPTIONS') {
		return new Response(null, {
			headers: corsHeaders,
		});
	}

	return null;
};
