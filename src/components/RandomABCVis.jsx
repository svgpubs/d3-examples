import React, { useState, useEffect, useRef } from "react";
import { randomLetters } from "../data/randomABCs";
import { select, selectAll } from "d3";

const svgContainerStyle = {
  border: "1px solid black",
  padding: "10px",
  width: "fit-content",
  height: "fit-content",
};
const RandomABC = () => {
  let ABCsRef = useRef(null);
  let ABCsRef2 = useRef(null);
  let ABCsRef3 = useRef(null);
  const [data, setData] = useState([]);

  const clickNewData = () => setData(randomLetters());

  useEffect(() => {
    // let svg2 = select(ABCsRef2.current)
    //   .attr("width", width)
    //   .attr("height", height)
    //   .attr("viewBox", `0 -20 ${width} 33`);

    // svg2
    //   .selectAll("text")
    //   .data(data, (d) => d)
    //   .join(
    //     (enter) => {
    //       let enterSelection = enter
    //         .append("text")
    //         .attr("x", (d, i) => i * 16)
    //         .text((d) => d);
    //       return enterSelection;
    //     },
    //     (update) => update.attr("x", (d, i) => i * 16).attr("fill", "red"),
    //     (exit) => exit.attr("fill", "blue").remove()
    //   );
    if (data.length) {
      let objData = data.map((d) => {
        return { letter: d, xrandom: Math.random() * 20, group: Math.random() < 0.5 ? "1" : "2" };
      });
      const [width, height] = [500, 100];
      let svg3 = select(ABCsRef3.current)
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 -20 ${width} 33`);

      svg3
        .selectAll("g.gtext")
        .data(objData, (d) => d.letter)
        .join(
          (enter) => {
            let enterSelection = enter.append("g").attr("class", "gtext");
            // console.log("enterSelection", enterSelection);
            // enterSelection
            //   .append("text")
            //   .attr("class", "lowercase")
            //   .attr("y", (d, i) => -10)
            //   .transition()
            //   .attr("x", (d, i) => i * 16)
            //   .text((d) => d.letter);
            enterSelection
              .append("text")
              .attr("class", "uppercase")
              .attr("y", (d, i) => 20)
              .transition()
              .attr("x", (d, i) => i * 16)
              .text((d) => d.letter.toUpperCase());
            console.log("enterSelection", enterSelection);
            debugger;
            return enterSelection;
          },
          (update) => {
            // update
            //   .select("text.lowercase")
            //   .transition()
            //   .attr("x", (d, i) => i * 16)
            //   .attr("fill", "red");

            update
              .select("text.uppercase")
              .transition()
              .attr("x", (d, i) => i * 16)
              .attr("fill", "green");
            debugger;

            console.log("update", update);

            return update;
          },
          (exit) => {
            exit
              .select("text.uppercase")
              .transition()
              .attr("fill", "dodgerblue")
              .attr("y", (d, i) => 40)
              .remove();
            debugger;

            console.log("exit", exit);
            return exit;
            // exit
            //   .select(".lowercase")
            //   .transition()
            //   .attr("fill", "dodgerblue")
            //   .attr("y", (d, i) => -30)
            //   .remove();
            // return exit;
          }
        );
    }
  }, [data]);

  return (
    <div
      style={{
        margin: "1em",
      }}
    >
      <div
        onClick={clickNewData}
        style={{
          border: "1px solid black",
          padding: "1rem",
          width: "fit-content",
          fontSize: "1.3rem",
          margin: "1em",
        }}
      >
        New Data
      </div>
      <div>{data.join(" ")}</div>
      {/* <div style={svgContainerStyle}>
        <svg ref={ABCsRef}></svg>
      </div> */}
      {/* <div style={svgContainerStyle}>
        <svg ref={ABCsRef2}></svg>
      </div> */}
      <div style={svgContainerStyle}>
        <svg ref={ABCsRef3}></svg>
      </div>
    </div>
  );
};

export default RandomABC;
