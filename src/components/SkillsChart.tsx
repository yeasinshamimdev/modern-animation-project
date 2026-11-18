"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
// The "d3" barrel is marked side-effect free, so bundlers drop d3-transition
// (which patches selection.prototype.transition) unless it is imported directly.
import "d3-transition";
import { skills } from "@/data/site";

const colors: Record<string, string> = {
  Core: "#7c5cff",
  Data: "#19e6c1",
  Motion: "#ff7a59",
};

export default function SkillsChart() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const size = 520;
    const inner = 70;
    const outer = size / 2 - 60;
    svg.attr("viewBox", `0 0 ${size} ${size}`);

    const g = svg.append("g").attr("transform", `translate(${size / 2},${size / 2})`);

    const x = d3
      .scaleBand<string>()
      .domain(skills.map((d) => d.name))
      .range([0, 2 * Math.PI])
      .align(0)
      .padding(0.12);

    const y = d3.scaleRadial().domain([0, 100]).range([inner, outer]);

    // guide rings
    g.append("g")
      .selectAll("circle")
      .data([25, 50, 75, 100])
      .join("circle")
      .attr("r", (d) => y(d))
      .attr("fill", "none")
      .attr("stroke", "rgba(255,255,255,0.08)")
      .attr("stroke-dasharray", "2 4");

    const arc = d3
      .arc<(typeof skills)[number]>()
      .innerRadius(inner)
      .outerRadius((d) => y(d.level))
      .startAngle((d) => x(d.name)!)
      .endAngle((d) => x(d.name)! + x.bandwidth())
      .padAngle(0.02)
      .padRadius(inner)
      .cornerRadius(6);

    const arcZero = d3
      .arc<(typeof skills)[number]>()
      .innerRadius(inner)
      .outerRadius(inner + 1)
      .startAngle((d) => x(d.name)!)
      .endAngle((d) => x(d.name)! + x.bandwidth())
      .padAngle(0.02)
      .padRadius(inner)
      .cornerRadius(6);

    const bars = g
      .append("g")
      .selectAll("path")
      .data(skills)
      .join("path")
      .attr("fill", (d) => colors[d.group])
      .attr("fill-opacity", 0.85)
      .attr("d", (d) => arcZero(d)!)
      .style("cursor", "pointer");

    bars
      .transition()
      .duration(1100)
      .delay((_, i) => i * 70)
      .ease(d3.easeCubicOut)
      .attr("d", (d) => arc(d)!);

    // labels
    const label = g
      .append("g")
      .selectAll("g")
      .data(skills)
      .join("g")
      .attr("text-anchor", (d) =>
        ((x(d.name)! + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI)) < Math.PI ? "end" : "start"
      )
      .attr("transform", (d) => {
        const a = ((x(d.name)! + x.bandwidth() / 2) * 180) / Math.PI - 90;
        return `rotate(${a}) translate(${outer + 14},0)`;
      })
      .style("opacity", 0);

    label
      .append("text")
      .attr("transform", (d) =>
        ((x(d.name)! + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI)) < Math.PI ? "rotate(180)" : "rotate(0)"
      )
      .attr("dy", "0.35em")
      .attr("fill", "#9b9ab3")
      .attr("font-size", 12)
      .attr("font-family", "var(--font-jetbrains), monospace")
      .text((d) => d.name);

    label.transition().delay((_, i) => 600 + i * 70).duration(600).style("opacity", 1);

    // center value
    const center = g.append("g").attr("text-anchor", "middle");
    const big = center
      .append("text")
      .attr("dy", "0.1em")
      .attr("fill", "#f4f3ff")
      .attr("font-size", 40)
      .attr("font-weight", 700)
      .attr("font-family", "var(--font-syne), sans-serif")
      .text("—");
    const small = center
      .append("text")
      .attr("dy", "2.2em")
      .attr("fill", "#9b9ab3")
      .attr("font-size", 12)
      .attr("font-family", "var(--font-jetbrains), monospace")
      .text("hover a skill");

    bars
      .on("mouseenter", function (_, d) {
        bars.transition().duration(200).attr("fill-opacity", (o) => (o === d ? 1 : 0.25));
        big.text(`${d.level}%`);
        small.text(`${d.name} · ${d.group}`);
      })
      .on("mouseleave", () => {
        bars.transition().duration(300).attr("fill-opacity", 0.85);
        big.text("—");
        small.text("hover a skill");
      });
  }, []);

  return (
    <div className="relative">
      <svg ref={ref} className="h-auto w-full max-w-[520px]" role="img" aria-label="Skill proficiency radial chart" />
      <ul className="mt-2 flex justify-center gap-5 font-mono text-xs text-muted">
        {Object.entries(colors).map(([k, c]) => (
          <li key={k} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: c }} />
            {k}
          </li>
        ))}
      </ul>
    </div>
  );
}
