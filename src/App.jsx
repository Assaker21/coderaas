import { useRef } from "react";
import "./App.scss";

import Table from "./table";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function App() {
  const pdfRef = useRef();
  function handleGenerateButtonClick() {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("data.pdf");
    });
  }

  return (
    <>
      <div className="container">
        <div className="pdf-container" ref={pdfRef}>
          <div className="title">Store Evaluation Dashboard</div>
          <div className="table">
            <Table
              theads={[
                "Ref.",
                "Category",
                "Weight",
                "Standard Points",
                "Deviations Points",
                "N/A Points",
                "Score %",
              ]}
              rows={[
                ["A", "Hospitality", "20", "11", "5", "4", "68.75%"],
                [
                  "B",
                  "Maintenance and General Safety",
                  "25",
                  "12",
                  "9",
                  "0",
                  "57.14%",
                ],
                [
                  "C",
                  "Cleanliness - Exterior and Interior",
                  "17",
                  "11",
                  "5",
                  "4",
                  "47.06%",
                ],
                ["D", "Personal Hygiene", "20", "11", "5", "4", "30.00%"],
                ["E", "Receiving and Storage", "30", "11", "5", "4", "14.81%"],
                ["F", "Food handling", "55", "11", "5", "4", "23.26%"],
                [
                  "G",
                  "Conformity to recipe book",
                  "3",
                  "11",
                  "5",
                  "4",
                  "0.00%",
                ],
                [
                  "H",
                  "Conformity to Legal requirements",
                  "10",
                  "11",
                  "5",
                  "4",
                  "0.00%",
                ],
                ["", "Total", "180", "51", "99", "30", "34.00%"],
                ["", "Total %", "100%", "28.33%", "55.00%", "16.67%", "34.00%"],
              ]}
            />
          </div>
          <div className="subtitle">
            <div className="line"></div>
            Risk Analysis
            <div className="line"></div>
          </div>
          <div className="risk-analysis-table">
            <Table
              theads={["Risk Range", "Weight"]}
              rows={[
                ["Low", 1],
                ["Moderate", 2],
                ["Critical", 3],
              ]}
            />
          </div>
          <div className="subtitle">
            <div className="line"></div>
            Performance Ratings
            <div className="line"></div>
          </div>
          <div className="perf-ratings">
            <div className="perfs">
              {[
                { title: "Unsatisfactory", value: 40, color: "red" },
                { title: "Needs improvement", value: 60, color: "orange" },
                { title: "Meets requirements", value: 80, color: "yellow" },
                {
                  title: "Exceeds requirements",
                  value: 90,
                  color: "yellowgreen",
                },
                { title: "Outstanding", value: 100, color: "green" },
              ].map((perf, index) => {
                return (
                  <div className="perf" key={"Perf: " + index}>
                    <span>{perf.title}</span>
                    <div className="arrow">
                      <div className="arrow-tail"></div>
                      <div className="arrow-head"></div>
                    </div>
                    <span>{perf.value}%</span>
                    <i className={"flag bx bxs-flag " + perf.color}></i>
                  </div>
                );
              })}
            </div>
            <div className="perf-levels">
              <span>Low</span>
              <div className="arrow vertical">
                <div className="arrow-tail"></div>
                <div className="arrow-head"></div>
              </div>
              <span>High</span>
            </div>
          </div>
        </div>
        <button className="pdf-button" onClick={handleGenerateButtonClick}>
          Generate
        </button>
      </div>
    </>
  );
}

export default App;
