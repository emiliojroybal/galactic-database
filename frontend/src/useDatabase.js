import { useState, useEffect } from "react";

export const useLoadDatabase = (refresh, setRefresh) => {
    const [databaseObject, setDatabaseObject] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDatabase = async () => {
            setLoading(true);

            try {
                const databaseFetch = await fetch("http://localhost:3000/");
                setDatabaseObject(await databaseFetch.json());
            } catch (err) {
                console.log(err);
                setDatabaseObject({});
            } finally {
                setLoading(false);
            }
        }

        if (refresh) {
            fetchDatabase();
            setRefresh(false);
            console.log(databaseObject);
        };
    }, [refresh]);

    return { databaseObject, loading };
}

export const saveDatabase = (databaseChanges, databaseAdditions, databaseDeletions, setRefresh) => {
    console.log(databaseAdditions);
    const databaseChangesCopy = [...databaseChanges];
    const databaseAdditionsCopy = [...databaseAdditions];
    const databaseDeletionsCopy = [...databaseDeletions];
    databaseChanges.length = 0;
    databaseAdditions.length = 0;
    databaseDeletions.length = 0;
    for (const object of databaseAdditionsCopy) {
        console.log(object);
        const key = object.key;
        const tempID = object.tempID;
        delete object.key;
        delete object.tempID;
        fetch(`http://localhost:3000/${key}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([object]),
        })
        .then(data => data.json())
        .then(jsonData => {
            console.log(jsonData.message);
            setRefresh(true);
        })
        .catch(err => {
            object.key = key;
            object.tempID = tempID;
            databaseAdditions.push(object);
            console.log(err);
        });
    }
    for (const object of databaseChangesCopy) {
        const key = object.key;
        const id = object.id;
        delete object.key;
        fetch(`http://localhost:3000/${key}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([object]),
        })
        .then(data => data.json())
        .then(jsonData => {
            console.log(jsonData.message);
            setRefresh(true);
        })
        .catch(err => {
            object.key = key;
            databaseChanges.push(object);
            console.log(err);
        });
    }

};