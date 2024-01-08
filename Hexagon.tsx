import React from 'react';
import {Vector} from './types';
import {toRadian} from './utils';

type SVGHexagonProps = {
  start: Vector,
  length: number,
  angle: number
};
const SVGHexagon = ({
  start,
  length,
  angle,
}: SVGHexagonProps): HTMLElement => {
  let curStart = start;

  return (
    <g>
      {[0,1,2,3,4,5].map((i) => {
        const end: Vector = {
          x: (Math.cos(angle + toRadian(60 * i)) * length) + curStart.x,
          y: (Math.sin(angle + toRadian(60 * i)) * length) + curStart.y,
        };
        const line = (
        <g>
            <line
              x1={curStart.x}
              y1={curStart.y}
              x2={end.x}
              y2={end.y}
              stroke="black"
              stroke-width=".1"
              key={i}
            />
            <polygon points={`
              ${curStart.x + length/3}, ${curStart.y}
              ${curStart.x + length/2}, ${curStart.y + (length/3 * Math.sqrt(3)/2)}
              ${curStart.x + (length * 2/3)}, ${curStart.y}
            `}
              fill="grey" stroke-width=".1"
              transform={`rotate(${60 * i} ${curStart.x} ${curStart.y})`}
            />
            <polygon points={`
              ${curStart.x + length/2}, ${curStart.y + (length/3 * Math.sqrt(3)/2)}
              ${curStart.x + length/3}, ${curStart.y + 2 * (length/3 * Math.sqrt(3)/2)}
              ${curStart.x + length * 2/3}, ${curStart.y + 2 * (length/3 * Math.sqrt(3)/2)}
            `}
              fill="grey" stroke-width=".1"
              transform={`rotate(${60 * i} ${curStart.x} ${curStart.y})`}
            />
          </g>
        );

        curStart = end;
        return line;
      })}
    </g>
  );
  // x = r cosθ and y = r sinθ
};

export default SVGHexagon;
