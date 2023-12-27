import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import DomToImage from "dom-to-image";

async function download_pdf() {
  const captures = document.querySelectorAll(".pdf-item");

  const pdf = new jsPDF("p", "px", "a4");

  let y = 0;
  for (let i = 0; i < captures.length; i++) {
    // Generate pdf from each individual item
    const canvas = await html2canvas(captures[i]);

    const imgData = await DomToImage.toPng(captures[i]);

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    const ratio = pdfWidth / imgWidth;

    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    let imgY = y;
    y += imgHeight * ratio;

    if (y > pdfHeight) {
      // if the item's height + position exceeds that of the page, a new page is created and the item is appended there
      // otherwise, the item is just appended to the current page
      pdf.addPage("a4", "portrait");
      y = imgHeight * ratio;
      imgY = 0;
    }

    pdf.addImage(imgData, "PNG", imgX, imgY, pdfWidth, imgHeight * ratio);
  }

  pdf.save("data.pdf");
}

export default download_pdf;
