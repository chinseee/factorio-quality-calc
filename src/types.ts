import buildings from './data/buildings.json'
import module_stats from './data/module_stats.json'

export type buildingID = keyof typeof buildings;
export type moduleID = keyof typeof module_stats;
export type qualityID = 'normal_quality' | 'uncommon_quality' | 'rare_quality' | 'epic_quality' | 'legendary_quality';
export type iconID = buildingID | moduleID | qualityID | 'empty_module';

export type moduleType = 'quality' | 'productivity';

export type moduleBonuses = { [key in moduleType]: number };

export type IconOption = {
  id: iconID;
  name: string;
};

export type ModuleInfo = {
  index: number,
  module: IconOption | null,
  quality: IconOption | null
};

export type BuildingInfo = {
  name: string,
  moduleCount: number,
  baseProductivity?: number
}
