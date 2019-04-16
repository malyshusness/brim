/* @flow */

import Chart from "../Chart"
import * as d3 from "d3"

export default function() {
  function mount(chart: Chart) {
    d3.select(chart.svg)
      .append("g")
      .attr("class", "y-axis")
      .attr(
        "transform",
        `translate(${chart.margins.left}, ${chart.margins.top})`
      )
  }

  function draw(chart: Chart) {
    if (chart.data.data.length === 0) {
      d3.select(chart.svg)
        .select(".y-axis")
        .style("opacity", "0")
      return
    }

    d3.select(chart.svg)
      .select(".y-axis")
      .style("opacity", "1")
      .call(
        d3
          .axisRight(chart.scales.yScale)
          .ticks(1)
          .tickValues(chart.scales.yScale.domain().map(d3.format("d")))
      )
      .selectAll(".tick")
      .each(function() {
        let {width, height, x, y} = this.querySelector("text").getBBox()
        width += x + 4
        height += 4
        y -= 2

        d3.select(this)
          .selectAll("polygon")
          .remove()

        d3.select(this)
          .selectAll("line")
          .attr("x2", chart.dimens.innerWidth)

        d3.select(this)
          .select("text")
          .attr("transform", "translate(6)")

        d3.select(this)
          .insert("polygon", "text")
          .attr("class", "tick-bg")
          .attr("transform", `translate(6, ${y})`)
          .attr(
            "points",
            [[5, 0], [width, 0], [width, height], [5, height]]
              .map((a) => a.join(","))
              .join(" ")
          )
      })
  }

  return {mount, draw}
}