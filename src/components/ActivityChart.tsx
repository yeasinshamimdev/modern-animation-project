"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
// The "d3" barrel is marked side-effect free, so bundlers drop d3-transition
// (which patches selection.prototype.transition) unless it is imported directly.
import "d3-transition";

// Deterministic pseudo-random commit activity so SSR and client agree.
function seeded(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

export default function ActivityChart() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const rnd = seeded(42);
    const data = d3.range(52).map((w) => ({
      week: w,
      value: Math.round(8 + 30 * Math.pow(rnd(), 1.4) + 10 * Math.sin(w / 5)),
    }));

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    const W = 720;
    const H = 220;
    const m = { top: 16, right: 12, bottom: 24, left: 12 };
    svg.attr("viewBox", `0 0 ${W} ${H}`);

    const x = d3.scaleLinear().domain([0, 51]).range([m.left, W - m.right]);
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)! * 1.1])
      .range([H - m.bottom, m.top]);

    const defs = svg.append("defs");
    const grad = defs.append("linearGradient").attr("id", "area").attr("x1", 0).attr("x2", 0).attr("y1", 0).attr("y2", 1);
    grad.append("stop").attr("offset", "0%").attr("stop-color", "#7c5cff").attr("stop-opacity", 0.5);
    grad.append("stop").attr("offset", "100%").attr("stop-color", "#7c5cff").attr("stop-opacity", 0);

    const area = d3
      .area<{ week: number; value: number }>()
      .x((d) => x(d.week))
      .y0(H - m.bottom)
      .y1((d) => y(d.value))
      .curve(d3.curveCatmullRom.alpha(0.6));

    const line = d3
      .line<{ week: number; value: number }>()
      .x((d) => x(d.week))
      .y((d) => y(d.value))
      .curve(d3.curveCatmullRom.alpha(0.6));

    svg.append("path").datum(data).attr("fill", "url(#area)").attr("d", area).attr("opacity", 0).transition().delay(600).duration(800).attr("opacity", 1);

    const path = svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#c9c2ff")
      .attr("stroke-width", 2)
      .attr("stroke-linecap", "round")
      .attr("d", line);

    const len = (path.node() as SVGPathElement).getTotalLength();
    path
      .attr("stroke-dasharray", `${len} ${len}`)
      .attr("stroke-dashoffset", len)
      .transition()
      .duration(1600)
      .ease(d3.easeCubicInOut)
      .attr("stroke-dashoffset", 0);

    // axis months
    const months = ["Jan", "Mar", "May", "Jul", "Sep", "Nov"];
    svg
      .append("g")
      .selectAll("text")
      .data(months)
      .join("text")
      .attr("x", (_, i) => x(i * (52 / 6)))
      .attr("y", H - 6)
      .attr("fill", "#9b9ab3")
      .attr("font-size", 11)
      .attr("font-family", "var(--font-jetbrains), monospace")
      .text((d) => d);

    // hover
    const focus = svg.append("g").style("opacity", 0);
    focus.append("line").attr("y1", m.top).attr("y2", H - m.bottom).attr("stroke", "rgba(255,255,255,0.2)").attr("stroke-dasharray", "3 3");
    focus.append("circle").attr("r", 5).attr("fill", "#19e6c1").attr("stroke", "#07070b").attr("stroke-width", 2);
    const tip = focus.append("text").attr("fill", "#f4f3ff").attr("font-size", 12).attr("font-family", "var(--font-jetbrains), monospace").attr("text-anchor", "middle");

    svg
      .append("rect")
      .attr("width", W)
      .attr("height", H)
      .attr("fill", "transparent")
      .on("mousemove", (e: MouseEvent) => {
        const [mx] = d3.pointer(e);
        const w = Math.max(0, Math.min(51, Math.round(x.invert(mx))));
        const d = data[w];
        focus.style("opacity", 1);
        focus.select("line").attr("x1", x(w)).attr("x2", x(w));
        focus.select("circle").attr("cx", x(w)).attr("cy", y(d.value));
        tip.attr("x", x(w)).attr("y", y(d.value) - 14).text(`${d.value} commits`);
      })
      .on("mouseleave", () => focus.style("opacity", 0));
  }, []);

  return <svg ref={ref} className="h-auto w-full" role="img" aria-label="Weekly activity chart" />;
}
