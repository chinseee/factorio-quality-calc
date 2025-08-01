import { Card, Col, Row, Image } from 'react-bootstrap';
import './App.css';
import BuildingField from './BuildingField';
import IconDropdown from './IconDropdown';
import { buildingIcons, qualityIcons } from './constants';
import { useState } from 'react';
import type { buildingID, IconOption, moduleBonuses } from './types';
import buildings from './data/buildings.json';
import ResultsBody from './resultsBody';

import factorioLogo from './assets/factorio.png';

const App: React.FC = () => {
  const [startingQuality, setStartingQuality] = useState<IconOption | null>(null);
  const [targetQuality, setTargetQuality] = useState<IconOption | null>(null);

  const [building, setBuilding] = useState<IconOption | null>(null);

  const [craftingBonuses, setCraftingBonuses] = useState<moduleBonuses>({
    quality: 0.0,
    productivity: 0.0
  });
  const [recyclingBonuses, setRecyclingBonuses] = useState<moduleBonuses>({
    quality: 0.0,
    productivity: 0.0
  });


  return (
    <>
      <div className='mb-3' style={{ display: 'inline-flex', alignItems: 'center' }}>
        <Image src={factorioLogo} width={400} />
        <h1>Quality Calculator</h1>
      </div>
      <Row>
        <Col>
          <Card bg='light' className='mb-3' style={{ textAlign: 'left', minWidth: '640px' }}>
            <Card.Body as={Row} className='gx-4'>
              <Col sm={3}>
                <Card.Text className='mb-1 fw-bold'>Starting Quality</Card.Text>
                <IconDropdown options={qualityIcons} selection={startingQuality} setSelection={setStartingQuality} />
              </Col>
              <Col sm={3}>
                <Card.Text className='mb-1 fw-bold'>Target Quality</Card.Text>
                <IconDropdown options={qualityIcons} selection={targetQuality} setSelection={setTargetQuality} />
              </Col>
              <Col sm={6}>
                <Card.Text className='mb-1 fw-bold'>Crafting Machine</Card.Text>
                <IconDropdown options={buildingIcons} spriteScale={0.375} selection={building} setSelection={setBuilding} />
              </Col>
            </Card.Body>
          </Card>
          <Card bg='light' className='mb-3'>
            <Card.Title className='mt-2 fw-bold'>Crafting Process</Card.Title>
            <BuildingField
              allowedModules={new Set(['quality', 'productivity'])}
              buildingInfo={building ? buildings[building.id as buildingID] : null}
              setBonuses={setCraftingBonuses} />
          </Card>
          <Card bg='light' className='mb-3'>
            <Card.Title className='mt-2 fw-bold'>Recycling Process</Card.Title>
            <BuildingField
              allowedModules={new Set(['quality'])}
              buildingInfo={{ name: 'Recycler', moduleCount: 4 }}
              setBonuses={setRecyclingBonuses}
              moduleRowCount={2} />
          </Card>
        </Col>
        <Col>
          <Card bg='light' style={{ minWidth: '500px' }}>
            <Card.Title className='mt-2 fw-bold'>Calculation Results</Card.Title>
            <ResultsBody
              startingQuality={startingQuality}
              targetQuality={targetQuality}
              craftingBonuses={craftingBonuses}
              recyclingBonuses={recyclingBonuses}
            />
          </Card>
        </Col>
      </Row>
      <footer>
        <a href='https://github.com/chinseee/factorio-quality-calc'>GitHub</a>
      </footer>
    </>
  )
};

export default App;