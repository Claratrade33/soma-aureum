import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function generatePDF(users) {
    const doc = new jsPDF();

    doc.text('Relatório de Usuários - SOMA AUREUM', 14, 20);
    const tableColumn = ["Nome", "Plano", "Aporte", "Patrimônio Virtual"];
    const tableRows = [];

    users.forEach(u => {
        const userData = [
            u.name,
            u.plan,
            u.aporte,
            u.patrimonioVirtual.toFixed(2)
        ];
        tableRows.push(userData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 30 });
    doc.save('relatorio_usuarios.pdf');
}