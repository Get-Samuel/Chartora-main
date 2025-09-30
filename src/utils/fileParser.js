import Papa from 'papaparse';
import * as XLSX from 'xlsx';

/**
 * Parse a File (CSV/XLSX) into structured data.
 * Returns { rows: Array<Object>, columns: Array<string>, meta }
 */
export async function parseFile(file) {
    if (!file) throw new Error('No file provided');

    if (file.type === 'text/csv' || file.name?.toLowerCase().endsWith('.csv')) {
        const text = await file.text();
        const result = Papa.parse(text, { header: true, skipEmptyLines: true });
        const rows = result.data || [];
        const columns = result.meta?.fields || (rows[0] ? Object.keys(rows[0]) : []);
        return { rows, columns, meta: { type: 'csv' } };
    }

    if (
        file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.type === 'application/vnd.ms-excel' ||
        file.name?.toLowerCase().endsWith('.xlsx') ||
        file.name?.toLowerCase().endsWith('.xls')
    ) {
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const rows = XLSX.utils.sheet_to_json(worksheet, { defval: null });
        const columns = rows[0] ? Object.keys(rows[0]) : [];
        return { rows, columns, meta: { type: 'xlsx', sheet: firstSheetName } };
    }

    if (file.type === 'application/pdf' || file.name?.toLowerCase().endsWith('.pdf')) {
        // For MVP: we do not parse PDFs into tabular data.
        // Upstream should handle gracefully and inform the user.
        return { rows: [], columns: [], meta: { type: 'pdf', note: 'PDF parsing not supported for tabular charts' } };
    }

    return { rows: [], columns: [], meta: { type: 'unknown' } };
}


