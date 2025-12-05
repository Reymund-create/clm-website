export const metadata = {
	title: "Technical SEO — Test Route",
	description: "Test page to verify the /technical-seo route",
};

export default function TechnicalSeoPage() {
	return (
		<main style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem'}}>
			<div style={{textAlign: 'center'}}>
				<h1 style={{fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', margin: 0}}>Confluence AI Page — Route Working</h1>
				<p style={{opacity: 0.85, marginTop: '0.75rem'}}>This is <code>src/app/confluence-ai/page.tsx</code> — the route <code>/technical-seo</code> resolves.</p>
			</div>
		</main>
	);
}

