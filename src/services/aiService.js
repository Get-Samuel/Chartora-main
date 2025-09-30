import { GoogleGenerativeAI } from '@google/generative-ai';
import { parseFile } from '../utils/fileParser';

// Reads env from Keep.env or use import.meta.env if configured
const API_KEY = (typeof import.meta !== 'undefined' ? import.meta.env?.VITE_GEMINI_API_KEY : undefined) || window?.ENV?.VITE_GEMINI_API_KEY;

let genAI = null;
if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
}

/**
 * Build a concise prompt for Gemini with user intent and small data sample.
 */
function buildPrompt(userPrompt, columns, sampleRows) {
    const sample = JSON.stringify({ columns, sample: sampleRows.slice(0, 10) }, null, 2);
    return (
`You are a charting assistant. Based on the user prompt and the provided tabular data sample, produce:
- chartSpec: a Chart.js JSON spec (type, labels, datasets with label and data),
- response: a short explanation of the chart,
- fieldsUsed: array of column names used.

Rules:
- Only output a valid JSON object with keys { chartSpec, response, fieldsUsed }.
- chartSpec.type must be one of: bar, line, pie, doughnut, scatter.
- Use numeric columns for data; derive labels appropriately.

User Prompt: ${userPrompt}
Data Sample (truncated):
${sample}
`);
}

/**
 * Generate a chart spec and explanation from a File + prompt.
 */
export async function generateChartFromFileAndPrompt(file, userPrompt) {
    if (!genAI) throw new Error('Gemini API key not set. Provide VITE_GEMINI_API_KEY');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const { rows, columns, meta } = await parseFile(file);
    if (meta.type === 'pdf') {
        return { chartSpec: null, response: 'PDFs are not supported for tabular charting.', fieldsUsed: [] };
    }
    if (!rows.length || !columns.length) {
        return { chartSpec: null, response: 'No tabular data detected. Please upload CSV/XLSX.', fieldsUsed: [] };
    }

    const prompt = buildPrompt(userPrompt, columns, rows);
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Try to extract JSON from possibly fenced blocks
    const jsonMatch = text.match(/\{[\s\S]*\}$/);
    const jsonText = jsonMatch ? jsonMatch[0] : text;
    let parsed;
    try { parsed = JSON.parse(jsonText); } catch (e) {
        throw new Error('AI returned invalid JSON.');
    }

    return parsed;
}


