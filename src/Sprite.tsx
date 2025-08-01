import type { iconID } from "./types";
import sprites from './assets/sprites.png';
import React from "react";

export const spritePositions: { [key in iconID]: { 'row': number, 'col': number } } = {
  'chemical_plant': { 'row': 0, 'col': 2 },
  'epic_quality': { 'row': 5, 'col': 3 },
  'foundry': { 'row': 1, 'col': 0 },
  'productivity_module': { 'row': 3, 'col': 0 },
  'cryogenic_plant': { 'row': 1, 'col': 3 },
  'biochamber': { 'row': 1, 'col': 2 },
  'centrifuge': { 'row': 0, 'col': 3 },
  'legendary_quality': { 'row': 5, 'col': 4 },
  'quality_module_3': { 'row': 2, 'col': 2 },
  'quality_module_2': { 'row': 2, 'col': 1 },
  'rare_quality': { 'row': 5, 'col': 2 },
  'productivity_module_2': { 'row': 3, 'col': 1 },
  'productivity_module_3': { 'row': 3, 'col': 2 },
  'assembling_machine_3': { 'row': 0, 'col': 1 },
  'quality_module': { 'row': 2, 'col': 0 },
  'assembling_machine_2': { 'row': 0, 'col': 0 },
  'electromagnetic_plant': { 'row': 1, 'col': 1 },
  'empty_module': { 'row': 4, 'col': 0 },
  'normal_quality': { 'row': 5, 'col': 0 },
  'uncommon_quality': { 'row': 5, 'col': 1 }
}

type SpriteProps = {
  col: number;
  row: number;
  scale?: number;
  style?: React.CSSProperties;
  className?: string;
};

const Sprite: React.FC<SpriteProps> = ({
  col,
  row,
  scale = 1,
  style = {},
  className = undefined
}) => {
  const tileSize = 64;
  const sheetSize = 384;

  const size = tileSize * scale;
  const posX = -col * tileSize * scale;
  const posY = -row * tileSize * scale;
  const bgSize = sheetSize * scale;

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${sprites})`,
        backgroundSize: `${bgSize}px ${bgSize}px`,
        backgroundPosition: `${posX}px ${posY}px`,
        backgroundRepeat: 'no-repeat',
        display: 'inline-block',
        ...style
      }}
    />
  );
};

export default Sprite;