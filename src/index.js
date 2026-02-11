import { corsHeaders, handleCors } from './cors.js';
import { runApp } from './runApp';

export default {
	async fetch(request, env, ctx) {
		const corsResponse = await handleCors(request, env);
		if (corsResponse) return corsResponse;

		const url = new URL(request.url);

		if (request.method === 'GET' && url.pathname === '/') {
			const result = await runApp(env);
			return new Response(JSON.stringify(result, null, 2), {
				headers: { ...corsHeaders, 'Content-Type': 'application/json' },
			});
		}

		return new Response('Not found', { status: 404, headers: corsHeaders });
	},

	async scheduled(event, env, ctx) {
		switch (event.cron) {
			case '0 7 1 * *':
				await runApp(env);
				break;
		}
	},
};
