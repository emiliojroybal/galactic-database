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

export const usePatchData = (setRefresh, setSelectedElement) => {
    const [patching, setPatching] = useState(false);
    const [newPatch, setNewPatch] = useState({});

    useEffect(() => {
        const patchDatabase = () => {
            setPatching(true);

            const key = newPatch.key;
            delete newPatch.key;
            if (newPatch.id) {
                fetch(`http://localhost:3000/${key}/${newPatch.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newPatch),
                })
                .then(data => data.json())
                .then(jsonData => {
                    console.log(jsonData.message);
                    setPatching(false);
                    setSelectedElement(jsonData.data);
                    setRefresh(true);
                })
                .catch(err => {
                    console.log(err);
                    setPatching(false);
                });
            }
        }

        if (newPatch.id) patchDatabase();
    }, [newPatch])

    return { patching, setNewPatch };
}

export const usePostData = (setRefresh) => {
    const [posting, setPosting] = useState(false);
    const [newPost, setNewPost] = useState({});

    useEffect(() => {
        const postDatabase = () => {
            setPosting(true);

            const type = newPost.key;
            delete newPost.key;

            const formData = new FormData();
            for (const [key, value] of Object.entries(newPost)) {
                formData.append(key, value);
            }

            console.log(formData);
            fetch(`http://localhost:3000/${type}/`, {
                method: 'POST',/*
                headers: {
                    'Content-Type': 'application/json',
                },*/
                body: formData,
            })
            .then(data => data.json())
            .then(jsonData => {
                console.log(jsonData.message);
                setPosting(false);
                setRefresh(true);
            })
            .catch(err => {
                console.log(err);
                setPosting(false);
            });
        }

        if (newPost.name) postDatabase();
    }, [newPost])

    return { posting, setNewPost };
}

export const useDeleteData = (setRefresh, setSelectedElement) => {
    const [deleting, setDeleting] = useState(false);
    const [newDelete, setNewDelete] = useState({});

    useEffect(() => {
        const deleteFromDatabase = () => {
            setDeleting(true);

            const key = newDelete.key;
            delete newDelete.key;
            fetch(`http://localhost:3000/${key}/${newDelete.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(data => data.json())
            .then(jsonData => {
                console.log(jsonData.message);
                setDeleting(false);
                setSelectedElement({});
                setRefresh(true);
            })
            .catch(err => {
                console.log(err);
                setDeleting(false);
            });
        }

        if (newDelete.id) deleteFromDatabase();
    }, [newDelete])

    return { deleting, setNewDelete };
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