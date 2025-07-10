import React from 'react';
import { Dropdown } from 'react-bootstrap';
import type { ModuleInfo } from './ModuleSelectField';


import NormalIcon from './assets/Quality_normal.png';
import UncommonIcon from './assets/Quality_uncommon.png';
import RareIcon from './assets/Quality_rare.png';
import EpicIcon from './assets/Quality_epic.png';
import LegendaryIcon from './assets/Quality_legendary.png';
import EmptyModuleSlot from './assets/empty-module-slot.png';

export type IconOption = {
  id: number;
  name: string;
  src: string;
};

const qualityIcons: IconOption[] = [
  { id: 0, name: 'Normal', src: NormalIcon },
  { id: 1, name: 'Uncommon', src: UncommonIcon },
  { id: 2, name: 'Rare', src: RareIcon },
  { id: 3, name: 'Epic', src: EpicIcon },
  { id: 4, name: 'Legendary', src: LegendaryIcon }
]

interface ModuleDropdownProps {
  options: IconOption[],
  moduleInfo: ModuleInfo,
  updateInfo: (setter: (info: ModuleInfo) => ModuleInfo) => void
}

const ModuleDropdown: React.FC<ModuleDropdownProps> = ({options, moduleInfo, updateInfo}) => {
  const module = moduleInfo.module;
  const quality = moduleInfo.quality;

  return (
    <Dropdown>
      <Dropdown.Toggle variant='dark' className='module-dropdown-toggle'>
        {module && quality ? (
          <>
            <div style={{ position: 'relative', width: '32px', height: '32px', margin: 'auto'}}>
              <img
                src={module.src}
                alt={module.name}
                style={{ width: '32px', height: '32px' }}
              />
              {quality.name != 'Normal' ? (<img
                src={quality.src}
                alt={quality.name}
                style={{ width: '16px', height: '16px', position: 'absolute', bottom: 0, left: 0 }}
              />) : (<></>)}
            </div>
          </>
        ) : (
          <div>
            <img
              src={ EmptyModuleSlot }
              alt={'Select Module'}
              style={{ width: '32px', height: '32px' }}
            />
          </div>
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu variant='dark' className='module-dropdown-menu'>
        {/* First Category */}
        <div
          className="d-grid mb-2"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
          }}
        >
          {options.map((icon) => (
            <div
              key={icon.id}
              onClick={() => {
                  updateInfo((info) => ({...info, module: icon}));
                }}
              className={'module-icon' + (icon.name == module?.name ? ' selected' : '')}
            >
              <img src={icon.src} alt={icon.name} style={{ width: '48px', height: '48px' }} />
              <div style={{ fontSize: '0.75rem' }}>{icon.name}</div>
            </div>
          ))}
        </div>

        <Dropdown.Divider />

        {/* Second Category */}
        <div
          className="d-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '10px',
            padding: '4px',
          }}
        >
          {qualityIcons.map((icon) => (
            <div
              key={icon.id}
              onClick={() => {
                  updateInfo((info) => ({...info, quality: icon}));
                }}
              className={'module-icon' + (icon.name == quality?.name ? ' selected' : '')}
            >
              <img src={icon.src} alt={icon.name} style={{ width: '32px', height: '32px' }} />
            </div>
          ))}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ModuleDropdown;