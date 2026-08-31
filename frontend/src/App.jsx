import { useEffect, useState } from 'react'
import './App.css'
import { useDeleteData, useLoadDatabase, usePatchData, usePostData } from './useDatabase';
import TypesWindow from './TypesWindow'
import AppContext from './AppContext';
import DisplayHeader from './DisplayHeader';
import DisplayWindow from './DisplayWindow';

function App() {

  const [ refresh, setRefresh ] = useState(true);
  const [currentTypeWindow, setCurrentTypeWindow] = useState("android");
  const [selectedElement, setSelectedElement] = useState({});
  const [showNewPopup, setShowNewPopup] = useState(false);
  const { databaseObject, loading } = useLoadDatabase(refresh, setRefresh);
  const { patching, setNewPatch } = usePatchData(setRefresh, setSelectedElement);
  const { posting, setNewPost } = usePostData(setRefresh);
  const { deleting, setNewDelete } = useDeleteData(setRefresh, setSelectedElement);

  const valueObject = { 
    databaseObject,
    loading, 
    patching,
    setNewPatch,
    posting,
    setNewPost,
    deleting,
    setNewDelete,
    currentTypeWindow, 
    setCurrentTypeWindow,
    setRefresh, 
    selectedElement,
    setSelectedElement,
    showNewPopup,
    setShowNewPopup
  };

  return (
    <AppContext.Provider value={valueObject}>
      {loading || patching || posting || deleting ? 
        <>
          <div className="overlay">
            <div className="popup">
              <h1>Loading...</h1>  
            </div>  
          </div>    
        </>  
      : ""}
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
