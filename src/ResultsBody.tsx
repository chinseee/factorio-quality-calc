import type React from "react";
import type { IconOption, moduleBonuses } from "./types";
import { Card } from "react-bootstrap";
import { qualityIcons } from "./constants";
import { simulate } from "./calculator";
import Sprite, { spritePositions } from "./Sprite";

interface ResultsBodyProps {
  startingQuality: IconOption | null,
  targetQuality: IconOption | null,
  craftingBonuses: moduleBonuses,
  recyclingBonuses: moduleBonuses,
}

const ResultsBody: React.FC<ResultsBodyProps> = ({
  startingQuality,
  targetQuality,
  craftingBonuses,
  recyclingBonuses
}) => {
  if (!startingQuality || !targetQuality) {
    return <Card.Body style={{ textAlign: 'left' }}>
      <b>⚠️ No Starting/Target Quality Given!</b><br />
      Please enter a starting and target quality.
    </Card.Body>;
  }

  const startingIndex = qualityIcons.indexOf(startingQuality);
  const targetIndex = qualityIcons.indexOf(targetQuality);

  if (startingIndex > targetIndex) {
    return <Card.Body style={{ textAlign: 'left' }}>
      <b>⚠️ Starting Quality Higher Than Target Quality!</b><br />
      Please change the starting or target quality.
    </Card.Body>;
  }

  if (craftingBonuses.quality <= 0.0 && recyclingBonuses.quality <= 0.0) {
    return <Card.Body style={{ textAlign: 'left' }}>
      <b>⚠️ No Quality Bonuses!</b><br />
      Please enter some quality bonuses.
    </Card.Body>;
  }

  const results = simulate(
    startingIndex,
    targetIndex,
    craftingBonuses.quality / 100.0,
    craftingBonuses.productivity / 100.0 + 1.0,
    recyclingBonuses.quality / 100.0
  );



  if (results) {
    const sideProducts = results.map((x, i) => {
      return (
        <span key={i} className='inline-sprite-text'>
          <span>{`• ${x.toPrecision(3)}`}</span>
          <Sprite
            {...spritePositions[qualityIcons[i].id]}
            scale={0.25}
            className="mx-1"
          />
          <span>{`${qualityIcons[i].name} `}</span>
          <span>{`(${(1 / results[i]).toFixed(2)}`}</span>
          <Sprite
            {...spritePositions[qualityIcons[startingIndex].id]}
            scale={0.25}
            className="mx-1"
          />
          <span>: 1</span>
          <Sprite
            {...spritePositions[qualityIcons[i].id]}
            scale={0.25}
            className="mx-1"
          />
          <span>{')'}</span>
          <br />
        </span>
      )
    }).slice(targetIndex + 1)

    return <Card.Body style={{ textAlign: 'left' }}>
      <b>✅ Calculation Successful</b><br />
      Crafting Quality: {craftingBonuses.quality.toFixed(1)}% <br />
      Crafting Productivity: {craftingBonuses.productivity.toFixed(1)}% <br />
      Recycling Quality: {recyclingBonuses.quality.toFixed(1)}% <br />
      <br />
      <span className='inline-sprite-text'>
        <span>{`You will receive ${results[targetIndex].toPrecision(3)}`}</span>
        <Sprite
          {...spritePositions[qualityIcons[targetIndex].id]}
          scale={0.25}
          className='mx-1' />
        <span>
          {`${qualityIcons[targetIndex].name} ingredients on average per set of`}
        </span>
        <Sprite
          {...spritePositions[qualityIcons[startingIndex].id]}
          scale={0.25}
          className='mx-1' />
        <span>
          {`${qualityIcons[startingIndex].name} ingredients, `}
        </span>
        <span>
          {`a ratio of ${(1 / results[targetIndex]).toFixed(2)}`}
        </span>
        <Sprite
          {...spritePositions[qualityIcons[startingIndex].id]}
          scale={0.25}
          className='mx-1' />
        <span>
          {`${qualityIcons[startingIndex].name} : 1`}
        </span>
        <Sprite
          {...spritePositions[qualityIcons[targetIndex].id]}
          scale={0.25}
          className='mx-1' />
        <span>
          {`${qualityIcons[targetIndex].name}.`}
        </span>
      </span>
      {
        sideProducts.length > 0 ? <>
          <br />
          <br />
          <span>Additionally, you will receive </span>
          <br />
          {sideProducts}
          <span className='inline-sprite-text'>
            <span>ingredients per set of</span>
            <Sprite
              {...spritePositions[qualityIcons[startingIndex].id]}
              scale={0.25}
              className='mx-1' />
            <span>{`${qualityIcons[startingIndex].name} ingredients as a byproduct of creating`}</span>
            <Sprite
              {...spritePositions[qualityIcons[targetIndex].id]}
              scale={0.25}
              className='mx-1' />
            <span>{`${qualityIcons[targetIndex].name} ingredients.`}</span>
          </span>
        </> : <></>
      }
    </Card.Body >;
  }

}

export default ResultsBody;