import { isEmpty } from '@wordpress/rich-text';

/**
 * Coerce block attribute values to a string so RichText / isEmpty never see undefined.
 *
 * @param {*} value Attribute from saved post (may be missing or wrong type).
 * @return {string}
 */
export function normalizeRichTextValue(value) {
	return typeof value === 'string' ? value : '';
}

/**
 * Safe wrapper: @wordpress/rich-text `isEmpty` assumes a string; non-strings can crash (.length).
 * try/catch: malformed saved HTML should not white-screen the editor.
 *
 * @param {*} value Raw attribute from saved post.
 * @return {boolean}
 */
export function isRichTextEmpty(value) {
	const s = normalizeRichTextValue(value);
	try {
		return isEmpty(s);
	} catch (e) {
		return s.replace(/<[^>]*>/g, '').replace(/&nbsp;/gi, ' ').trim() === '';
	}
}

/**
 * Merge a saved step row with safe defaults (partial or null rows from old content).
 *
 * @param {*} raw Step object from attributes.steps.
 * @return {{ number: string, title: string, description: string, active: boolean }}
 */
export function normalizeStep(raw) {
	const base = {
		number: '',
		title: '',
		description: '',
		active: true,
	};
	if (!raw || typeof raw !== 'object') {
		return base;
	}
	return {
		...base,
		...raw,
		number: raw.number != null ? String(raw.number) : '',
		title: normalizeRichTextValue(raw.title),
		description: normalizeRichTextValue(raw.description),
		active: raw.active !== false,
	};
}

/**
 * Strip soft line breaks from RichText stored as HTML (e.g. inside headings).
 * Gutenberg RichText often inserts <br> on Shift+Enter or paste.
 *
 * @param {string} [html] Raw RichText string.
 * @return {string} Always a string (empty when input is missing or not a string).
 */
export function stripRichTextSoftBreaks(html) {
	if (!html || typeof html !== 'string') {
		return '';
	}
	let out = html.replace(/<br\s*\/?>/gi, ' ').replace(/&nbsp;/g, ' ');
	out = out.replace(/\s{2,}/g, ' ').trim();
	return out;
}
