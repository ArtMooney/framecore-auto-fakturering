/**
 * Welcome to Cloudflare Workers!
 *
 * This is a template for a Scheduled Worker: a Worker that can run on a
 * configurable interval:
 * https://developers.cloudflare.com/workers/platform/triggers/cron-triggers/
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { sendEmail } from './sendEmail';
import { listFolder } from './listFolder';

export default {
	// async fetch(request, env, ctx) {
		// const fakturor = 14198495358;
		// const list = await listFolder.js(env.pcloudToken, fakturor);

		// await sendEmail(
		// 	env.from,
		// 	env.to,
		// 	"Tack för att ni kontaktat FrameCore!",
		// 	"Meddelande",
		// 	env.mailgunApiKey
		// );

	// 	console.log("ok");
	//
	// 	return new Response(JSON.stringify("ok", null, 2));
	// },

	async scheduled(event, env, ctx) {
	// 	let resp = await fetch('https://api.cloudflare.com/client/v4/ips');
	// 	let wasSuccessful = resp.ok ? 'success' : 'fail';

		await sendEmail(
			env.from,
			env.to,
			"Tack för att ni kontaktat FrameCore!",
			"Meddelande",
			env.mailgunApiKey
		);
	},
};
