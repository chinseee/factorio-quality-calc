import React from 'react';
import ModuleSelectField from './ModuleSelectField';
import { type IconOption } from './ModuleDropdown.tsx';

import QualityModule from './assets/Quality_module.png';
import QualityModule2 from './assets/Quality_module_2.png';
import QualityModule3 from './assets/Quality_module_3.png';

import ProductivityModule from './assets/Productivity_module.png';
import ProductivityModule2 from './assets/Productivity_module_2.png';
import ProductivityModule3 from './assets/Productivity_module_3.png';

type moduleType = 'quality' | 'productivity'

const qualityModules: IconOption[] = [
  { id: 0, name: 'Quality Module', src: QualityModule },
  { id: 1, name: 'Quality Module 2', src: QualityModule2 },
  { id: 2, name: 'Quality Module 3', src: QualityModule3 },
];

const productivityModules: IconOption[] = [
  { id: 4, name: 'Productivity Module', src: ProductivityModule },
  { id: 5, name: 'Productivity Module 2', src: ProductivityModule2 },
  { id: 6, name: 'Productivity Module 3', src: ProductivityModule3 },
];

const allModules: {[key in moduleType]: IconOption[]} = {
  'quality': qualityModules,
  'productivity': productivityModules
}

interface BuildingFieldProps {
  allowedModules: moduleType[],
}

const BuildingField: React.FC<BuildingFieldProps> = ({
  allowedModules
}) => {
  const moduleOptions: IconOption[] = [];
  for (const key in allModules) {
    if (allowedModules.includes(key as moduleType)) {
      moduleOptions.push(...allModules[key as moduleType]);
    }
  }


  return (<>
    <ModuleSelectField
      moduleOptions={moduleOptions}
      moduleCount={4}
      moduleRowCount={2}>
    </ModuleSelectField>



  </>);
}

export default BuildingField;