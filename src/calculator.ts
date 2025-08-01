const convolve = (a: Array<number>, b: Array<number>) => {
  const x = new Array<number>(a.length + b.length - 1).fill(0);
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      x[i + j] += a[i] * b[j];
    }
  }
  return x;
}

const applyQuality = (a: Array<number>, b: Array<number>) => {
  let x = convolve(a, b);
  x[4] = x.slice(4).reduce((a, b) => a + b);
  x = x.slice(0, 5);
  return x;
}

const qualityChances = (quality: number) => {
  const chances = [0, 0.9, 0.09, 0.009, 0.001].map((x) => x * quality);
  chances[0] = 1 - quality;
  return chances;
}

export const simulate = (
  startingQuality: number,
  targetQuality: number,
  craftingQuality: number,
  craftingProdMult: number,
  recyclingQuality: number,
) => {
  if (startingQuality > targetQuality)
    return null;

  let dist = new Array<number>(5).fill(0);
  dist[startingQuality] = 1;

  let cycleTransform = applyQuality(qualityChances(craftingQuality), qualityChances(recyclingQuality));
  cycleTransform = cycleTransform.map((x) => x * craftingProdMult / 4);

  for (let curQuality = startingQuality; curQuality < targetQuality; curQuality++) {
    let cycleResults = new Array<number>(5).fill(0);
    cycleResults[curQuality] = dist[curQuality];
    cycleResults = applyQuality(cycleResults, cycleTransform);

    let mult = dist[curQuality] / (dist[curQuality] - cycleResults[curQuality]);
    cycleResults = cycleResults.map((x) => x * mult);
    cycleResults[curQuality] = 0;

    dist = dist.map((x, i) => x + cycleResults[i]);
    dist[curQuality] = 0;
  }
  return dist;
}

