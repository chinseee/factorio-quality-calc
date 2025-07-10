import React, { useState } from 'react';
import ModuleDropdown, { type IconOption } from './ModuleDropdown.tsx';
import { Button } from 'react-bootstrap';

export type ModuleInfo = {
  id: number,
  module: IconOption | null,
  quality: IconOption | null
}

interface ModuleSelectFieldProps {
  moduleOptions: IconOption[],
  moduleCount: number,
  moduleRowCount?: number
}

const ModuleSelectField: React.FC<ModuleSelectFieldProps> = ({
  moduleOptions,
  moduleCount,
  moduleRowCount
}) => {
  const infoList: ModuleInfo[] = [];
  const setInfoList: React.Dispatch<React.SetStateAction<ModuleInfo>>[] = [];
  const updateInfoList: ((setter: (info: ModuleInfo) => ModuleInfo) => void)[] = [];

  const autoFill = (setter: (info: ModuleInfo) => ModuleInfo) => {
    if (infoList.every(info => !info.module || !info.quality)) {
      setInfoList.forEach((setInfo) => setInfo(setter));
    }
  }

  const clearAll = () => {
    setInfoList.forEach((setInfo) => setInfo((info) => ({...info, module: null, quality: null})));
  }

  for (let i = 0; i < moduleCount; i++) {
    const [info, setInfo] = useState<ModuleInfo>({
      id: i,
      module: null,
      quality: null
    })
    infoList.push(info);
    setInfoList.push(setInfo);

    updateInfoList.push(
      (setter: (info: ModuleInfo) => ModuleInfo) => {
        setInfo(setter);
        autoFill(setter);
      }
    )
  }

  if (!moduleRowCount)
    moduleRowCount = Math.ceil(moduleCount / 5);
  const modulesPerRow = Math.ceil(moduleCount / moduleRowCount);
  const moduleRows: ModuleInfo[][] = [];
  for (let i = 0; i < moduleRowCount; i++) {
    moduleRows.push(infoList.slice(i * modulesPerRow, (i + 1) * modulesPerRow));
  }

  return (
    <>
      <div className="module-grid">
        {moduleRows.map((row, i) => (
          <div className="module-grid-row" key={i}>
            {row.map((info, j) => (
              <ModuleDropdown
                key={j}
                options={moduleOptions}
                moduleInfo={info}
                updateInfo={updateInfoList[info.id]}
              />
            ))}
          </div>
        ))}
      </div>
      <Button variant='danger' onClick={clearAll} className='clear-btn'>
        Clear All
      </Button>
    </>
  )
}

export default ModuleSelectField;