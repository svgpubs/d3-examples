import React, { useState, useEffect, useRef } from "react";
import { select, shuffle } from "d3";

export function randomArrayOfLettersObjects() {
  return shuffle("abcdefg".split(""))
    .map((d) => ({ letter: d }))
    .slice(0, Math.floor(1 + Math.random() * 3))
    .sort();
  // ex: [{letter:"a"}, {letter:"e"}, {letter:"g"}]
}

const Letters = () => {
  let svgRef = useRef(null);
  const [data, setData] = useState([]);
  const [hist, setHist] = useState([]);

  useEffect(() => {
    setHist([data, ...hist]);
  }, [data]);

  useEffect(() => {
    let svg = select(svgRef.current)
      .attr("width", 500)
      .attr("height", 100)
      .attr("viewBox", `0 -20 ${500} 33`);

    svg
      .selectAll("g.gtext")
      .data(data, (d) => d.letter)
      .join(
        (enter) => {
          let enterSelection = enter.append("g").attr("class", "gtext");

          enterSelection
            .append("text")
            .attr("class", "uppercase")
            .attr("opacity", 0)
            .transition()
            .duration(250)
            .attr("x", (d, i) => i * 16)
            .text((d) => d.letter.toUpperCase())
            .attr("opacity", 1);
          return enterSelection;
        },
        (update) => {
          let selectionUpdate = update.transition().duration(250);
          selectionUpdate
            .select("text.uppercase")
            .attr("x", (d, i) => i * 16)
            .transition()
            .attr("fill", "dodgerblue");
          return selectionUpdate;
        },
        (exit) => {
          let exitSelection = exit.transition().duration(250);
          exitSelection
            .select("text.uppercase")
            .attr("fill", "red")
            .attr("y", (d, i) => 40)
            .attr("x", (d, i) => 100 + i * 16)
            .remove();
          exitSelection.remove();
        }
      );
  }, [data]);

  return (
    <div style={{ margin: "1em", fontSize: 20 }}>
      <div onClick={() => setData(randomArrayOfLettersObjects())}>Click New Data</div>
      {hist.length > 1 && <div>Prev Letters : {hist[1].map((d) => d.letter).join(" ")}</div>}
      <div>Curr Letters : {data.map((d) => d.letter).join(" ")}</div>

      <div style={{ border: "1px solid black" }}>
        <div>SVG</div>
        <svg ref={svgRef}></svg>
      </div>
      <div>Once a letter has exited, it cannot enter again?</div>
    </div>
  );
};

export default Letters;
