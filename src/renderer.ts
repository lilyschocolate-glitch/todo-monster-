
export function renderMonster(monster: any, size = 128): string {
    const pixelSize = size / 16;
    let svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">`;
    
    for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
            const colorIdx = monster.data[y][x];
            if (colorIdx === 0) continue;
            const color = monster.palette[colorIdx];
            svg += `<rect x="${x * pixelSize}" y="${y * pixelSize}" width="${pixelSize}" height="${pixelSize}" fill="${color}" shape-rendering="crispEdges" />`;
        }
    }
    
    svg += `</svg>`;
    return svg;
}
