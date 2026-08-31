import { useState, useContext, useEffect } from "react";
import EditorAndroid from "./EditorAndroid";
import EditorContext from "./EditorContext";
import AppContext from "./AppContext";
import EditorFaction from "./EditorFaction";
import EditorSpecies from "./EditorSpecies";
import EditorCharacter from "./EditorCharacter";
import EditorItem from "./EditorItem";
import EditorLocation from "./EditorLocation";
import EditorShipSystem from "./EditorShipSystem";
import EditorShip from "./EditorShip";

export default function Editor() {

    const { currentTypeWindow, setShowNewPopup, selectedElement, setNewPatch, setNewPost, setNewDelete } = useContext(AppContext);
    const [ formData, setFormData ] = useState(selectedElement || {});

    useEffect(() => {
        setFormData(selectedElement);
    }, [selectedElement]);

    const handleSubmit = (e) => {
        e.preventDefault();
        formData.key = currentTypeWindow;
        if (formData.id) {
            setNewPatch(formData);
        } else {
            setNewPost(formData);
            setShowNewPopup(false);
        }
    }

    const handleDelete = (e) => {
        formData.key = currentTypeWindow;
        if (formData.id) setNewDelete(formData);
    }

    const handleChange = async (e) => {
        let { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value}));
    }

    const valueObject = {handleChange, handleSubmit, setShowNewPopup, formData};

    return (
        <EditorContext.Provider value={valueObject}>
            {selectedElement ? <button className="editor-delete-button" onClick={handleDelete}>Delete</button> : ""}
            <form className="editor" onSubmit={handleSubmit}>
                {currentTypeWindow == "android" ? <EditorAndroid /> : ""}
                {currentTypeWindow == "character" ? <EditorCharacter /> : ""}
                {currentTypeWindow == "faction" ? <EditorFaction /> : ""}
                {currentTypeWindow == "item" ? <EditorItem /> : ""}
                {currentTypeWindow == "location" ? <EditorLocation /> : ""}
                {currentTypeWindow == "ship" ? <EditorShip /> : ""}
                {currentTypeWindow == "ship_system" ? <EditorShipSystem /> : ""}
                {currentTypeWindow == "species" ? <EditorSpecies /> : ""}
                <button className="editor-submit-button" type="submit">Submit</button>
            </form>
        </EditorContext.Provider>
    )
}