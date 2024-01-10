/*
 * THESE ARE THE TRIANGLES WE WANT...
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
 */
