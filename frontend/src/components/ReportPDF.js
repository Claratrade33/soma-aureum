import jsPDF from 'jspdf';

export function generatePDF(users) {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Relatório SOMA AUREUM", 20, 20);

    let y = 30;
    users.forEach(u => {
        doc.setFontSize(12);
        doc.text(`${u.name} - Plano: ${u.plan} - Aporte: ${u.aporte} - Patrimônio Virtual: ${u.patrimonioVirtual.toFixed(2)}`, 20, y);
        y += 10;
    });

    doc.save("SOMA_AUREUM_Report.pdf");
}