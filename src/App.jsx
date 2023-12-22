import { useEffect, useRef, useState } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import "./App.scss";

import Table from "./components/table";
import Pie_Chart from "./components/pie_chart";
import Bar_Chart from "./components/bar_chart";

function App() {
  const [items, setItems] = useState(null);

  const dragItem = useRef(0);
  const draggedOverItem = useRef(0);

  async function downloadPDF() {
    const captures = document.querySelectorAll(".pdf-item");

    const pdf = new jsPDF("p", "px", "a4");

    let y = 0;
    for (let i = 0; i < captures.length; i++) {
      const canvas = await html2canvas(captures[i]);
      console.log(canvas);
      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const ratio = pdfWidth / imgWidth;

      var pdfImageHeight = imgHeight * ratio;
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      let imgY = y;
      y += pdfImageHeight;

      if (y > pdfHeight) {
        pdf.addPage("a4", "portrait");
        y = pdfImageHeight;
        imgY = 0;
      }

      pdf.addImage(imgData, "PNG", imgX, imgY, pdfWidth, imgHeight * ratio);
    }
    pdf.save("data.pdf");
  }

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

  function handleSort() {
    let itemsClone = [...items];

    const removedItem = itemsClone.splice(dragItem.current, 1);
    itemsClone.splice(draggedOverItem.current, 0, removedItem[0]);

    setItems(itemsClone);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {!items && <>Loading</>}
      {items && (
        <div className="container">
          <div className="pdf-container">
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
                  {item.type == "hist" && (
                    <Bar_Chart
                      data={item.data.data}
                      max_value={item.data.max_value}
                      parts={item.data.parts} // ["Branch 1", "Branch 2", "Branch 3"]
                    />
                  )}
                  {item.type == "pies" && (
                    <div className="pie-charts">
                      {item.data.map((pie) => {
                        return (
                          <Pie_Chart
                            title={pie.name}
                            data={pie.value}
                            footer={pie.footer}
                            color={pie.color}
                          />
                        );
                      })}
                    </div>
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
