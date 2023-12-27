import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useQuery, gql } from "@apollo/client";

import "./App.scss";

import Table from "./components/table";
import Pie_Chart from "./components/pie_chart";
import Bar_Chart from "./components/bar_chart";

import download_pdf from "./utils/generate_pdf";

const ITEMS_QUERY = gql`
  {
    pDFItem2s {
      data
      id
      type
    }
  }
`;

function App() {
  const [items, setItems] = useState(null); // pdf items are fetched and put inside items
  //const [fetching, setFetching] = useState(false); // shows the current state of the fetching process

  const dragItem = useRef(0); // the item's index that is currently being dragged
  const draggedOverItem = useRef(0); // the item's index that we are currently dragging something else over it

  const { data, loading, error } = useQuery(ITEMS_QUERY);
  if (loading) return "Loading...";
  if (error) return <pre>{error}</pre>;
  const i = data.pDFItem2s;

  /*useEffect(() => {
    result = useQuery(ITEMS_QUERY);
    data = result.data;
    loading = result.loading;
    error = result.error;

    if (loading) {
    } else if (error) {
    } else {
      setItems(data.pDFItem2s);
    }
  }, []);*/

  function handleSort() {
    // function to handle the sorting where we flip between items
    if (!items) {
      let itemsClone = [...i];

      const removedItem = itemsClone.splice(dragItem.current, 1); // remove item from somewhere and
      itemsClone.splice(draggedOverItem.current, 0, removedItem[0]); // put it somewhere else

      setItems(itemsClone);
    } else {
      let itemsClone = [...items];

      const removedItem = itemsClone.splice(dragItem.current, 1); // remove item from somewhere and
      itemsClone.splice(draggedOverItem.current, 0, removedItem[0]); // put it somewhere else

      setItems(itemsClone);
    }
  }

  /*useEffect(() => {
    (async () => {
      // fetch from the server
      if (fetching) return;

      try {
        setFetching(true);

        const response = await axios.get("http://localhost:3000/pdf-generator");
        const receivedItems = response.data;

        for (let i = 0; i < receivedItems.length; i++) {
          if (receivedItems[i].type != "title") {
            receivedItems[i].data = JSON.parse(receivedItems[i].data);
          }
        }

        setItems(receivedItems);

        setFetching(false);
      } catch (error) {
        console.log("ERROR: " + error);
        setFetching(false);
      }
    })();
  }, []);*/

  return (
    <>
      {/*!items && <>Loading</>*/ !items && setItems(i)}
      {items && (
        <div className="container">
          <div className="pdf-container">
            {items.map((item, index) => {
              return (
                <div
                  key={item.type + " " + index}
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
                    <div className="title">{item.data.data}</div>
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
                      parts={item.data.parts}
                    />
                  )}
                  {item.type == "pies" && (
                    <div className="pie-charts">
                      {item.data.map((pie, index) => {
                        return (
                          <Pie_Chart
                            title={pie.name}
                            data={pie.value}
                            footer={pie.footer}
                            color={pie.color}
                            keyProp={"Pie: " + index}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <button className="pdf-button" onClick={download_pdf}>
            Generate
          </button>
        </div>
      )}
    </>
  );
}

export default App;
