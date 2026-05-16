import jsPDF from "jspdf";

export interface PdfChapter {
  title: string;
  body: string;
}

export function generateBookPdf(opts: {
  title: string;
  author: string;
  year: number;
  chapters: PdfChapter[];
}) {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 56;
  const contentW = pageW - margin * 2;

  // Cover
  doc.setFillColor(10, 14, 22);
  doc.rect(0, 0, pageW, pageH, "F");
  doc.setTextColor(0, 255, 178);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("CYBERSEC UPDATES // OPEN LIBRARY", margin, 80);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  const titleLines = doc.splitTextToSize(opts.title, contentW);
  doc.text(titleLines, margin, 160);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);
  doc.setTextColor(180, 200, 215);
  doc.text(`by ${opts.author}`, margin, 160 + titleLines.length * 32 + 20);
  doc.text(`Edition: ${opts.year}`, margin, 160 + titleLines.length * 32 + 42);

  // Chapters
  opts.chapters.forEach((ch) => {
    doc.addPage();
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    const chTitle = doc.splitTextToSize(ch.title, contentW);
    doc.text(chTitle, margin, margin + 16);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const bodyLines = doc.splitTextToSize(ch.body, contentW);
    let y = margin + 16 + chTitle.length * 20 + 16;
    const lineH = 16;
    for (const line of bodyLines) {
      if (y > pageH - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += lineH;
    }
  });

  // Footer page numbers
  const total = doc.getNumberOfPages();
  for (let i = 1; i <= total; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text(`Page ${i} of ${total}  ·  CyberSec Updates`, margin, pageH - 24);
  }

  const safe = opts.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  doc.save(`${safe}.pdf`);
}
