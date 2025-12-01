import { corsHeaders, handleCors } from './cors.js';
import { runApp } from './runApp';

export default {
	async fetch(request, env, ctx) {
		const corsResponse = await handleCors(request, env);
		if (corsResponse) return corsResponse;

		const url = new URL(request.url);

		if (request.method === 'GET') {
			const params = new URLSearchParams(decodeURIComponent(url.search));

			switch (url.pathname) {
				case '/':
					return new Response(JSON.stringify(await runApp(env), null, 2), { headers: corsHeaders });
			}
		}
	},

	async scheduled(event, env, ctx) {
		switch (event.cron) {
			case '0 7 1 * *':
				await runApp(env);
				break;
		}
	},
};
