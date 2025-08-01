import React, { useId } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import type { moduleType } from './types';
import { maxBonuses } from './constants';

interface BonusInputFieldProps {
  allowedModules: Set<moduleType>,
  bonusValues: { [key in moduleType]: string },
  setExactBonuses: React.Dispatch<React.SetStateAction<{ [key in moduleType]: string }>>,
}

const BonusInputField: React.FC<BonusInputFieldProps> = ({
  allowedModules,
  bonusValues,
  setExactBonuses,
}) => {
  const id = useId();

  return (<Form
    style={{
      marginLeft: 'auto',
      display: 'block'
    }}>
    {[...allowedModules].map((type, i) => (
      <Form.Group className='mb-2' key={i}>
        <div className='d-flex align-items-center' style={{ gap: '12px' }}>
          <Form.Label
            htmlFor={type + id}
            style={{ marginBottom: 0, minWidth: '100px' }}
            key={i}
          >
            {`${type}`}
          </Form.Label>

          <InputGroup
            style={{
              width: '160px',
              height: '40px'
            }}
          >
            <Form.Control
              value={bonusValues[type]}
              id={type + id}
              type="number"
              min={0.0}
              max={maxBonuses[type]}
              step={0.1}
              className="no-spinner"
              onChange={(event) => {
                setExactBonuses((b) => ({
                  ...b,
                  [type]: event.target.value
                }));
              }
              }
            />
            <InputGroup.Text>%</InputGroup.Text>
          </InputGroup>
        </div>
      </Form.Group>
    ))}
  </Form>)
}

export default BonusInputField;