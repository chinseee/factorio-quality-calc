import React, { useEffect, useState } from 'react';
import ModuleSelectField from './ModuleSelectField';
import BonusInputField from './BonusInputField';
import type { moduleType, moduleBonuses, ModuleInfo, IconOption, moduleID, qualityID, BuildingInfo } from './types';
import { allModules, maxBonuses } from './constants';
import { Card, Col, Row } from 'react-bootstrap';
import module_stats from './data/module_stats.json';

interface BuildingFieldProps {
  allowedModules: Set<moduleType>,
  buildingInfo: BuildingInfo | null,
  setBonuses: React.Dispatch<React.SetStateAction<moduleBonuses>>,
  moduleRowCount?: number
}

const parseInput = (input: { [key in moduleType]: string }): moduleBonuses => {
  const bonuses: moduleBonuses = {
    quality: 0.0,
    productivity: 0.0
  }
  Object.entries(input).forEach(([key, value]) => {
    let val = Number.isNaN(parseFloat(value)) ? 0.0 : parseFloat(value);
    bonuses[key as moduleType] = Math.min(Math.max(0.0, val), maxBonuses[key as moduleType]);
  });
  return bonuses;
}

const BuildingField: React.FC<BuildingFieldProps> = ({
  allowedModules,
  buildingInfo,
  setBonuses,
  moduleRowCount,
}) => {
  const moduleOptions: IconOption[] = [];
  for (const key in allModules) {
    if (allowedModules.has(key as moduleType)) {
      moduleOptions.push(...allModules[key as moduleType]);
    }
  }

  const emptyInfoList: ModuleInfo[] = Array.from(
    { length: buildingInfo?.moduleCount ?? 0 }, (_, i) => ({ index: i, module: null, quality: null })
  );

  const [infoList, setInfoList] = useState<ModuleInfo[]>(emptyInfoList);
  if (buildingInfo && infoList.length !== buildingInfo.moduleCount)
    setInfoList(emptyInfoList);

  const [exactBonuses, setExactBonuses] = useState<{ [key in moduleType]: string }>({
    quality: '0.0',
    productivity: '0.0'
  });

  const [selected, setSelected] = useState<'modules' | 'exact' | null>(null);

  const calculateBonuses = () => {
    const bonusCalc: moduleBonuses = { 'quality': 0.0, 'productivity': 0.0 };
    infoList.forEach((info) => {
      if (info.module && info.quality) {
        const data = module_stats[info.module.id as moduleID][info.quality.id as qualityID];
        if ('quality' in data) {
          bonusCalc.quality += data.quality;
        }
        if ('productivity' in data) {
          bonusCalc.productivity += data.productivity;
        }
      }
    })
    bonusCalc.productivity += buildingInfo?.baseProductivity ?? 0;
    return bonusCalc;
  }

  useEffect(() => {
    if (selected === 'exact') {
      setBonuses(parseInput(exactBonuses));
    }
    if (selected === 'modules') {
      setBonuses(calculateBonuses());
    }
  }, [selected, infoList, exactBonuses]);

  const bonuses = calculateBonuses();
  const exactFormValues = selected === 'exact' ? exactBonuses : {
    quality: bonuses.quality.toFixed(1),
    productivity: bonuses.productivity.toFixed(1)
  }


  if (!buildingInfo) {
    return (
      <Card.Subtitle className='m-2 fst-italic'>No Machine Selected...</Card.Subtitle>
    )
  }

  return (
    <>
      <Row>
        <Col>
          <Card.Subtitle className='mt-2'>Enter Modules</Card.Subtitle>
          <Card.Body
            className={'field-card-body' + (selected == 'modules' ? ' selected' : '')}
            onClick={() => setSelected('modules')}
          >
            <ModuleSelectField
              moduleOptions={moduleOptions}
              infoList={infoList}
              setInfoList={setInfoList}
              moduleCount={buildingInfo.moduleCount}
              moduleRowCount={moduleRowCount}>
            </ModuleSelectField>
          </Card.Body>
        </Col>
        <Col>
          <Card.Subtitle className='mt-2'>Or, Enter Exact Bonuses</Card.Subtitle>
          <Card.Body
            className={'field-card-body' + (selected == 'exact' ? ' selected' : '')}
            onClick={() => {
              if (selected !== 'exact') {
                setSelected('exact');
                setExactBonuses(exactFormValues);
              }
            }}
          >
            <BonusInputField
              allowedModules={allowedModules}
              setExactBonuses={setExactBonuses}
              bonusValues={exactFormValues} />
          </Card.Body>
        </Col>
      </Row>
    </>
  );
}

export default BuildingField;