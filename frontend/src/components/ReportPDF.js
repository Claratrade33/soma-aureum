import { jsPDF } from "jspdf";

export const generatePDF = (users) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Relatório SOMA AUREUM', 14, 22);
    doc.setFontSize(12);
    users.forEach((u, i) => {
        doc.text(
            `${i + 1}. ${u.name} - Plano: ${u.plan} - Aporte: ${u.aporte} - Patrimônio: ${u.patrimonioVirtual.toFixed(2)}`,
            14,
            30 + i * 10
        );
    });
    doc.save('relatorio_soma_aureum.pdf');
};