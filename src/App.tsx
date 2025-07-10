import './App.css';
import BuildingField from './BuildingField';


const App: React.FC = () => {
  return (
    <BuildingField allowedModules={['quality', 'productivity']}/>
  )
};

export default App;