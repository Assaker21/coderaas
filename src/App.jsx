import { useEffect, useRef, useState } from "react";
import "./App.scss";

import Table from "./table";

import axios from "axios";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function App() {
  const pdfRef = useRef();

  const downloadPDF = async () => {
    const captures = document.querySelectorAll(".pdf-item");

    const pdf = new jsPDF("p", "mm", "a4");
    var margins = {
      top: 20,
      bottom: 20,
      left: 20,
      right: 20,
    };
    pdf.margin = { horiz: 15, vert: 20 };

    let y = 0;
    for (let i = 0; i < captures.length; i++) {
      const canvas = await html2canvas(captures[i]);
      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      let imgY = y;
      y += imgHeight * ratio;

      if (y > pdfHeight) {
        pdf.addPage("a4", "portrait");
        y = 0;
        imgY = 0;
      }

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
    }
    pdf.save("data.pdf");
  };

  const [items, setItems] = useState(null);

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3000/pdf-generator");
      const receivedItems = response.data;
      console.log(receivedItems);
      for (let i = 0; i < receivedItems.length; i++) {
        if (receivedItems[i].type != "title") {
          receivedItems[i].data = JSON.parse(receivedItems[i].data);
        }
      }
      setItems(receivedItems);
      console.log(receivedItems);
    } catch (error) {
      console.log("ERROR: " + error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const dragItem = useRef(0);
  const draggedOverItem = useRef(0);

  function handleSort() {
    let itemsClone = [...items];

    const removedItem = itemsClone.splice(dragItem.current, 1);
    itemsClone.splice(draggedOverItem.current, 0, removedItem[0]);

    setItems(itemsClone);
  }

  return (
    <>
      {!items && <>Loading</>}
      {items && (
        <div className="container">
          <div className="pdf-container" ref={pdfRef}>
            {items.map((item, index) => {
              return (
                <div
                  key={item.type}
                  draggable
                  onDragStart={() => {
                    dragItem.current = index;
                  }}
                  onDragEnter={() => {
                    draggedOverItem.current = index;
                  }}
                  onDragEnd={handleSort}
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  className="pdf-item"
                >
                  {item.type == "title" && (
                    <div className="title">{item.data}</div>
                  )}
                  {item.type == "table" && (
                    <div className="table">
                      <Table
                        theads={item.data.table.theads}
                        rows={item.data.table.rows}
                      />
                    </div>
                  )}
                  {item.type == "risk-analysis-table" && (
                    <>
                      <div className="subtitle">
                        <div className="line"></div>
                        {item.data.subtitle}
                        <div className="line"></div>
                      </div>
                      <div className="risk-analysis-table">
                        <Table
                          theads={item.data.table.theads}
                          rows={item.data.table.rows}
                        />
                      </div>
                    </>
                  )}
                  {item.type == "perf" && (
                    <>
                      <div className="subtitle">
                        <div className="line"></div>
                        {item.data.subtitle}
                        <div className="line"></div>
                      </div>
                      <div className="perf-ratings">
                        <div className="perfs">
                          {item.data.items.map((perf, index) => {
                            return (
                              <div className="perf" key={"Perf: " + index}>
                                <span>{perf.title}</span>
                                <div className="arrow">
                                  <div className="arrow-tail"></div>
                                  <div className="arrow-head"></div>
                                </div>
                                <span>{perf.value}%</span>
                                <i
                                  className={"flag bx bxs-flag " + perf.color}
                                ></i>
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
                    </>
                  )}
                </div>
              );
            })}
          </div>
          <button className="pdf-button" onClick={downloadPDF}>
            Generate
          </button>
        </div>
      )}
    </>
  );
}

export default App;
