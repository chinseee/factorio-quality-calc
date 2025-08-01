import * as types from './types.ts';
import buildings from './data/buildings.json';


export const qualityModules: types.IconOption[] = [
  { id: 'quality_module', name: 'Quality Module' },
  { id: 'quality_module_2', name: 'Quality Module 2' },
  { id: 'quality_module_3', name: 'Quality Module 3' },
];

export const productivityModules: types.IconOption[] = [
  { id: 'productivity_module', name: 'Productivity Module' },
  { id: 'productivity_module_2', name: 'Productivity Module 2' },
  { id: 'productivity_module_3', name: 'Productivity Module 3' },
];

export const allModules: { [key in types.moduleType]: types.IconOption[] } = {
  'quality': qualityModules,
  'productivity': productivityModules
};

export const qualityIcons: types.IconOption[] = [
  { id: 'normal_quality', name: 'Normal' },
  { id: 'uncommon_quality', name: 'Uncommon' },
  { id: 'rare_quality', name: 'Rare' },
  { id: 'epic_quality', name: 'Epic' },
  { id: 'legendary_quality', name: 'Legendary' }
];

export const buildingIcons: types.IconOption[] = Object.entries(buildings).map(
  ([key, value]) => ({ id: key as types.buildingID, name: value.name })
);

export const maxBonuses: { [key in types.moduleType]: number } = {
  'quality': 99.9,
  'productivity': 300
}