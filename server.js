import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { createServer as createViteServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
	const app = express();

	// Create Vite server in middleware mode
	const vite = await createViteServer({
		server: { middlewareMode: true },
		appType: "custom",
		define: {
			global: "globalThis",
		},
		ssr: {
			noExternal: ["react-router-dom", "@sanity/client"],
			target: "node",
			format: "esm",
		},
		optimizeDeps: {
			include: ["react-router-dom"],
		},
	});

	app.use(vite.middlewares);

	app.use("*", async (req, res, next) => {
		const url = req.originalUrl;

		try {
			// Read index.html
			let template = fs.readFileSync(
				path.resolve(__dirname, "index.html"),
				"utf-8"
			);

			// Apply Vite HTML transforms
			template = await vite.transformIndexHtml(url, template);

			let appHtml = "";
			let metaHtml = "";

			try {
				// Try to load the server entry
				const { render } = await vite.ssrLoadModule(
					"/src/EntryServer.jsx"
				);
				const renderResult = await render(url); // Make sure to await this

				appHtml = renderResult.html;
				metaHtml = renderResult.metaHtml || "";
			} catch (ssrError) {
				console.warn(
					"SSR failed, falling back to client-side rendering:",
					ssrError.message
				);
				console.error("Full SSR Error:", ssrError);
				// Fallback to client-side rendering
				appHtml = '<div id="ssr-fallback">Loading...</div>';
			}

			// Replace the default title and inject meta tags
			let finalHtml = template;

			// Replace the default title tag
			if (metaHtml.includes("<title>")) {
				const titleMatch = metaHtml.match(/<title>(.*?)<\/title>/);
				if (titleMatch) {
					finalHtml = finalHtml.replace(
						/<title>.*?<\/title>/,
						`<title>${titleMatch[1]}</title>`
					);
				}
			}

			// Inject meta tags before closing head tag
			if (metaHtml) {
				// Remove title from metaHtml since we handled it separately
				const metaWithoutTitle = metaHtml.replace(
					/<title>.*?<\/title>/,
					""
				);
				finalHtml = finalHtml.replace(
					"</head>",
					`    ${metaWithoutTitle}\n  </head>`
				);
			}

			// Inject the app HTML
			finalHtml = finalHtml.replace(`<!--ssr-outlet-->`, appHtml);

			// Send the rendered HTML back
			res
				.status(200)
				.set({ "Content-Type": "text/html" })
				.end(finalHtml);
		} catch (e) {
			vite.ssrFixStacktrace(e);
			console.error("Server error:", e);
			next(e);
		}
	});

	const port = 5173;
	app.listen(port, () => {
		console.log(`Server running on http://localhost:${port}`);
	});
}

createServer().catch(console.error);
