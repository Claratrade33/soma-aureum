import jsPDF from 'jspdf';

export const generatePDF = (user) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Relatório SOMA AUREUM Demo', 20, 20);
    doc.setFontSize(14);
    doc.text(`Nome: ${user.name}`, 20, 40);
    doc.text(`Plano: ${user.plan}`, 20, 50);
    doc.text('Aportes:', 20, 60);
    user.aportes.forEach((valor, i) => {
        doc.text(`Aporte ${i + 1}: R$ ${valor}`, 25, 70 + i * 10);
    });
    doc.save('SOMA_AUREUM_demo.pdf');
};