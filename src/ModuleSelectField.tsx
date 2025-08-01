import React from 'react';
import ModuleDropdown from './ModuleDropdown.tsx';
import { Button } from 'react-bootstrap';
import type { IconOption, ModuleInfo, } from './types.ts';

interface ModuleSelectFieldProps {
  moduleOptions: IconOption[],
  infoList: ModuleInfo[],
  setInfoList: React.Dispatch<React.SetStateAction<ModuleInfo[]>>
  moduleCount: number,
  moduleRowCount?: number
}

const ModuleSelectField: React.FC<ModuleSelectFieldProps> = ({
  moduleOptions,
  infoList,
  setInfoList,
  moduleCount,
  moduleRowCount
}) => {
  const emptyInfoList: ModuleInfo[] = Array.from({ length: moduleCount }, (_, i) => ({ index: i, module: null, quality: null }));



  const autoFill = (i: number, setter: (info: ModuleInfo) => ModuleInfo) => {
    if ([...infoList.slice(0, i), ...infoList.slice(i + 1)].every(info => !info.module || !info.quality)) {
      setInfoList(Array.from({ length: moduleCount }, (_, index) => ({ ...setter(infoList[i]), index: index })));
    };
  }

  const clearAll = () => {
    setInfoList(emptyInfoList);
  }

  if (!moduleRowCount)
    moduleRowCount = Math.ceil(moduleCount / 5);
  const modulesPerRow = Math.ceil(moduleCount / moduleRowCount);
  const moduleRows: ModuleInfo[][] = [];

  for (let i = 0; i < moduleRowCount; i++) {
    moduleRows.push(infoList.slice(i * modulesPerRow, (i + 1) * modulesPerRow));
  }

  return (
    <div className='module-select-field'>
      <div className="module-grid">
        {moduleRows.map((row, i) => (
          <div className="module-grid-row" key={i}>
            {row.map((info, j) => (
              <ModuleDropdown
                key={j}
                options={moduleOptions}
                moduleInfo={info}
                updateInfo={(setter) => {
                  setInfoList((list: Array<ModuleInfo>) => {
                    return [
                      ...list.slice(0, info.index),
                      setter(list[info.index]),
                      ...list.slice(info.index + 1)
                    ]
                  });
                  autoFill(info.index, setter);
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <Button variant='danger' onClick={() => clearAll()} className='mt-2'>
        Clear All
      </Button>
    </div>
  )
}

export default ModuleSelectField;