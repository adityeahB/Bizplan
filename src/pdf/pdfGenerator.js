import pdfMake from 'pdfmake';

export const generatePDF = (answers, t) => {
  try {
    const docDefinition = {
      info: { title: 'Business Plan Report', author: answers.name || 'User' },
      content: [
        { text: `${t('pdf_cover_title')} ${answers.bankName || 'Bank'}`, style: 'header', alignment: 'center', margin: [0, 40, 0, 20] },
        { text: answers.name || 'Your Name', fontSize: 16, alignment: 'center', margin: [0, 10] },
        { text: `${t('date')}: ${answers.date || new Date().toISOString().split('T')[0]}`, alignment: 'center', margin: [0, 20] },
        { text: t('pdf_thankyou'), alignment: 'center', margin: [0, 40], italics: true },
        ...Object.keys(answers).filter(k => answers[k] && typeof answers[k] !== 'object').map(k => ({ text: `${t(k)}: ${answers[k]}`, margin: [0, 5] }))
      ],
      styles: { header: { fontSize: 22, bold: true, color: '#0f3b3f' } },
      defaultStyle: { font: 'Roboto' }
    };
    pdfMake.createPdf(docDefinition).download('business_plan_report.pdf');
  } catch (error) {
    console.error('PDF error:', error);
    alert('PDF generation failed. Please try again.');
  }
};
