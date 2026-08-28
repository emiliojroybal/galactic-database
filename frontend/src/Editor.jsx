import { useState, useContext, useEffect } from "react";
import EditorAndroid from "./EditorAndroid";
import EditorContext from "./EditorContext";
import AppContext from "./AppContext";
import crypto from 'crypto';

export default function Editor() {

    const { setDatabaseChanges, currentTypeWindow, setShowNewPopup, selectedElement, databaseChanges, databaseAdditions,
        setDatabaseAdditions, setDatabaseDeletions, databaseObject, setDatabaseObject } = useContext(AppContext);
    const [ formData, setFormData ] = useState(selectedElement || {});

    useEffect(() => {
        setFormData(selectedElement);
    }, [selectedElement]);

    const handleSubmit = (e) => {
        e.preventDefault();
        formData.key = currentTypeWindow;
        if (formData.id) {
            setDatabaseChanges(prev => [...prev, formData]);
            console.log(databaseChanges);
        } else {
            formData.tempID = Math.floor(Math.random() * (999999999999 - 100000000000 + 1)) + 100000000000;
            setDatabaseAdditions(prev => [...prev, formData]);
            console.log(databaseAdditions);
            setShowNewPopup(false)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value}));
    }

    const valueObject = {handleChange, handleSubmit, setShowNewPopup, formData};

    return (
        <EditorContext.Provider value={valueObject}>
            <form onSubmit={handleSubmit}>
                {currentTypeWindow == "android" ? <EditorAndroid /> : ""}
                <button type="submit">Submit</button>
            </form>
        </EditorContext.Provider>
    )
}