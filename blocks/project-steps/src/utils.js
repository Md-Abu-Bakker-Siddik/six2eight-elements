/**
 * Strip soft line breaks from RichText stored as HTML (e.g. inside headings).
 * Gutenberg RichText often inserts <br> on Shift+Enter or paste.
 *
 * @param {string} html Raw RichText string.
 * @return {string}
 */
export function stripRichTextSoftBreaks(html) {
	if (!html || typeof html !== 'string') {
		return html;
	}
	let out = html.replace(/<br\s*\/?>/gi, ' ').replace(/&nbsp;/g, ' ');
	out = out.replace(/\s{2,}/g, ' ').trim();
	return out;
}
