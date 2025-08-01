import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import type { IconOption, ModuleInfo } from './types';
import { qualityIcons } from './constants';
import Sprite, { spritePositions } from './Sprite';

interface ModuleDropdownProps {
  options: IconOption[],
  moduleInfo: ModuleInfo,
  updateInfo: (setter: (info: ModuleInfo) => ModuleInfo) => void
}

const ModuleDropdown: React.FC<ModuleDropdownProps> = ({ options, moduleInfo, updateInfo }) => {
  const mod = moduleInfo.module;
  const quality = moduleInfo.quality;

  return (
    <Dropdown>
      <Dropdown.Toggle variant='light' className='module-dropdown-toggle'>
        {mod && quality ? (
          <>
            <div style={{ position: 'relative', width: '32px', height: '32px', margin: 'auto' }}>
              <Sprite {...spritePositions[mod.id]} scale={0.5} />

              {quality.name != 'Normal' ?
                <Sprite {
                  ...spritePositions[quality.id]}
                  scale={0.25}
                  style={{ position: 'absolute', bottom: '0px', left: '0px' }}
                /> : <></>}
            </div>
          </>
        ) : (
          <Sprite {...spritePositions['empty_module']} scale={0.5} style={{ margin: 'auto' }} />
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu variant='light' className='module-dropdown-menu'>
        <div
          className="d-grid mb-2"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
          }}
        >
          {options.map((icon, index) => (
            <Button
              variant='outline-light'
              key={index}
              onClick={() => {
                updateInfo((info) => ({ ...info, module: icon }));
              }}
              className={'module-icon' + (icon.name == mod?.name ? ' selected' : '')}
            >

              <Sprite {...spritePositions[icon.id]} scale={0.75} style={{ margin: 'auto' }} />
              <div style={{ color: 'black', fontSize: '0.75rem' }}>{icon.name}</div>
            </Button>
          ))}
        </div>
        <Dropdown.Divider />
        <div
          className="d-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '10px',
            padding: '4px',
          }}
        >
          {qualityIcons.map((icon, index) => (
            <Button
              variant='outline-light'
              key={index}
              onClick={() => {
                updateInfo((info) => ({ ...info, quality: icon }));
              }}
              className={'module-icon' + (icon.name == quality?.name ? ' selected' : '')}
              style={{
                padding: '0',
                width: '48px',
                height: '48px'
              }}
            >
              <Sprite {...spritePositions[icon.id]} scale={0.5} style={{ margin: 'auto' }} />
            </Button>
          ))}
        </div>
        <Dropdown.Divider />
        <Button variant='danger' onClick={() => {
          updateInfo((info) => ({ ...info, module: null, quality: null }));
        }}>Clear</Button>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ModuleDropdown;