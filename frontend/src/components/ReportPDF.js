import jsPDF from 'jspdf';

export function generatePDF(user) {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setTextColor(212,175,55); // dourado
    doc.text("SOMA AUREUM - Relatório VIP", 20, 20);

    doc.setFontSize(16);
    doc.setTextColor(0,0,0);
    doc.text(`Nome: ${user.name}`, 20, 40);
    doc.text(`Plano atual: ${user.plan || "Nenhum"}`, 20, 50);
    doc.text(`Saldo total: ${user.balance}`, 20, 60);
    doc.text("Aportes:", 20, 70);

    user.aportes.forEach((value, i) => {
        doc.text(`Aporte ${i+1}: ${value}`, 25, 80 + i*10);
    });

    doc.save(`${user.name}_SOMA_AUREUM.pdf`);
}