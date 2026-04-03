import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

const BRAND_COLOR = [127, 86, 218];   // #7f56da
const ACCENT_COLOR = [6, 182, 212];   // #06b6d4

/**
 * Export a data array to a styled PDF.
 * @param {string} title - Title shown at top of PDF
 * @param {Array<{id:string, label:string}>} columns - Column definitions
 * @param {Array<Object>} data - Row data objects keyed by column.id
 */
export const exportToPdf = (title, columns, data) => {
    const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });

    // --- Header bar ---
    doc.setFillColor(...BRAND_COLOR);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 52, 'F');

    // Brand dot
    doc.setFillColor(...ACCENT_COLOR);
    doc.roundedRect(20, 12, 28, 28, 4, 4, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('S', 34, 32, { align: 'center' });

    // Title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(title, 58, 32);

    // Date/time
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(220, 210, 255);
    const now = new Date().toLocaleString();
    doc.text(`Generated: ${now}`, doc.internal.pageSize.getWidth() - 20, 32, { align: 'right' });

    // --- Table ---
    const headRow = columns.map(col => col.label);
    const bodyRows = data.map(row => columns.map(col => String(row[col.id] ?? '')));

    autoTable(doc, {
        startY: 64,
        head: [headRow],
        body: bodyRows,
        styles: {
            fontSize: 10,
            cellPadding: 8,
        },
        headStyles: {
            fillColor: BRAND_COLOR,
            textColor: [255, 255, 255],
            fontStyle: 'bold',
            halign: 'left',
        },
        alternateRowStyles: {
            fillColor: [248, 245, 255],
        },
        rowStyles: {
            lineColor: [230, 225, 250],
            lineWidth: 0.3,
        },
        columnStyles: {
            0: { fontStyle: 'bold' },
        },
        margin: { left: 20, right: 20 },
        didDrawPage: (hookData) => {
            // Footer
            const pageCount = doc.internal.getNumberOfPages();
            doc.setFontSize(8);
            doc.setTextColor(120, 110, 160);
            doc.setFont('helvetica', 'normal');
            doc.text(
                `SchoolSync — Page ${hookData.pageNumber} of ${pageCount}`,
                doc.internal.pageSize.getWidth() / 2,
                doc.internal.pageSize.getHeight() - 12,
                { align: 'center' }
            );
        },
    });

    doc.save(`${title.replace(/\s+/g, '_')}_${Date.now()}.pdf`);
};

/**
 * Export a data array to an Excel (.xlsx) file.
 * @param {string} title - Filename base and sheet name
 * @param {Array<{id:string, label:string}>} columns - Column definitions
 * @param {Array<Object>} data - Row data objects keyed by column.id
 */
export const exportToExcel = (title, columns, data) => {
    const ws_data = [
        // Header row
        columns.map(col => col.label),
        // Data rows
        ...data.map(row => columns.map(col => row[col.id] ?? '')),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(ws_data);

    // Auto-fit column widths
    const colWidths = columns.map((col, i) => {
        const maxLen = Math.max(
            col.label.length,
            ...data.map(row => String(row[col.id] ?? '').length)
        );
        return { wch: Math.min(maxLen + 4, 40) };
    });
    worksheet['!cols'] = colWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, title.slice(0, 31));
    XLSX.writeFile(workbook, `${title.replace(/\s+/g, '_')}_${Date.now()}.xlsx`);
};
