import { useEffect, useState } from 'react'
import './App.css'
import { useLoadDatabase } from './useDatabase';
import TypesWindow from './TypesWindow'
import AppContext from './AppContext';
import DisplayHeader from './DisplayHeader';
import DisplayWindow from './DisplayWindow';

function App() {

  const [ refresh, setRefresh ] = useState(true);
  const { databaseObject, loading } = useLoadDatabase(refresh, setRefresh);
  const [ databaseChanges, setDatabaseChanges ] = useState([]);
  const [ databaseAdditions, setDatabaseAdditions ] = useState([]);
  const [ databaseDeletions, setDatabaseDeletions ] = useState([]);
  const [currentTypeWindow, setCurrentTypeWindow] = useState("");
  const [selectedElement, setSelectedElement] = useState({});
  const [showNewPopup, setShowNewPopup] = useState(false);

  const valueObject = { 
    databaseObject,
    loading, 
    currentTypeWindow, 
    setCurrentTypeWindow, 
    databaseChanges, 
    setDatabaseChanges, 
    databaseAdditions,
    setDatabaseAdditions,
    databaseDeletions,
    setDatabaseDeletions,
    setRefresh, 
    selectedElement,
    setSelectedElement,
    showNewPopup,
    setShowNewPopup
  };

  return (
    <AppContext.Provider value={valueObject}>
      <div className="viewport">
        <DisplayHeader />
        <div className="main-view">
          <TypesWindow />
          <DisplayWindow />
        </div>
      </div>
    </AppContext.Provider>
  )
}

export default App
