import React from 'react';
import { Dropdown } from 'react-bootstrap';
import type { IconOption } from './types';
import Sprite, { spritePositions } from './Sprite';

interface IconDropdownProps {
  options: IconOption[],
  selection: IconOption | null,
  setSelection: React.Dispatch<React.SetStateAction<IconOption | null>>;
  spriteScale?: number
}

const IconDropdown: React.FC<IconDropdownProps> = ({ options, selection, setSelection, spriteScale = 0.25 }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="light"
        style={{
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
        }}>
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          {
            selection ? (
              <span className='inline-sprite-text'>
                <Sprite
                  {...spritePositions[selection.id]}
                  scale={spriteScale}
                  className="me-2"
                  style={{ display: 'inline-block', verticalAlign: 'middle' }}
                />
                <span>{selection.name}</span>
              </span>
            ) : (
              <span>Select...</span>
            )
          }
        </span>
      </Dropdown.Toggle>

      <Dropdown.Menu variant='light'>
        {options.map((option, idx) => (
          <Dropdown.Item
            key={idx}
            onClick={() => setSelection(option)}
          >
            <span className='inline-sprite-text'>
              <Sprite
                {...spritePositions[option.id]}
                scale={spriteScale}
                className="me-2"
              />
              <span>{option.name}</span>
            </span>
          </Dropdown.Item>
        ))}
        <Dropdown.Divider />
        <Dropdown.Item
          key={-1}
          onClick={() => setSelection(null)}
        >
          <span>None</span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default IconDropdown;