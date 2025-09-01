import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function generatePDF(users) {
    const doc = new jsPDF();
    doc.text("Relatório SOMA AUREUM", 14, 20);
    const tableColumn = ["Nome", "Plano", "Aporte", "Patrimônio Virtual"];
    const tableRows = [];

    users.forEach(user => {
        const userData = [
            user.name,
            user.plan,
            user.aporte,
            user.patrimonioVirtual.toFixed(2)
        ];
        tableRows.push(userData);
    });

    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 30
    });
    doc.save('relatorio_soma_aureum.pdf');
}