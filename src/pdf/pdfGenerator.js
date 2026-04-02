import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const generatePDF = (answers, t) => {
  const docDefinition = {
    info: {
      title: 'Business Plan Report',
      author: answers.name,
    },
    content: [
      { text: t('pdf_cover_title') + ' ' + answers.bankName, style: 'header', alignment: 'center', margin: [0, 40, 0, 20] },
      { text: answers.name, fontSize: 16, alignment: 'center', margin: [0, 10] },
      { text: t('date') + ': ' + answers.date, alignment: 'center', margin: [0, 20] },
      { text: t('pdf_thankyou'), alignment: 'center', margin: [0, 40], italics: true },
      { text: t('pdf_section1'), style: 'sectionHeader', margin: [0, 20, 0, 10] },
      {
        ul: [
          `${t('legal_structure')}: ${t(answers.legalStructure || '')}`,
          `${t('capital_source')}: ${t(answers.capitalSource || '')}`,
          ...(answers.capitalSource === 'bank_loan' ? [
            `${t('loan_amount')}: €${answers.loanAmount || 0}`,
            `${t('loan_term')}: ${answers.loanTerm || 0} months`,
          ] : []),
          `${t('mission')}: ${answers.mission || ''}`,
          `${t('vision')}: ${answers.vision || ''}`,
        ]
      },
      { text: t('pdf_section2'), style: 'sectionHeader', margin: [0, 20, 0, 10] },
      {
        ul: [
          `${t('pestel_political')}: ${answers.pestelPolitical || ''}`,
          `${t('swot_strength')}: ${answers.swotStrength || ''}`,
        ]
      },
      { text: t('pdf_section3'), style: 'sectionHeader', margin: [0, 20, 0, 10] },
      {
        ul: [
          `${t('revenue_projection')}: €${answers.revenueProjection || 0}`,
          `${t('investment')}: €${answers.investment || 0}`,
        ]
      },
      { text: 'Based on IAPMEI, ANIET, and AIMMP guidelines.', style: 'note', margin: [0, 40] },
    ],
    styles: {
      header: { fontSize: 22, bold: true, color: '#0f3b3f' },
      sectionHeader: { fontSize: 16, bold: true, color: '#d68c3c' },
      note: { fontSize: 10, italics: true, color: 'gray' },
    },
  };
  pdfMake.createPdf(docDefinition).download('business_plan_report.pdf');
};
