// src/features/items/ListItem.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateItem, deleteItem } from '../features/items/itemsSlice';
import { AppDispatch } from '..//app/store'; // Import AppDispatch

interface ListItemProps {
    id: number;
    userId: number;
    title: string;
    body: string;
}

export const ListItem: React.FC<ListItemProps> = ({ id, userId, title, body }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newBody, setNewBody] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch<AppDispatch>(); // Type dispatch as AppDispatch

    const handleSave = (event: React.FormEvent) => {
        event.preventDefault();
        if (newTitle === "" || newBody === "") {
            setErrorMessage("Title and body cannot be empty");
            setTimeout(() => {
                setErrorMessage("");
            }, 4000);
            return;
        }
        dispatch(updateItem({ id, userId, title: newTitle, body: newBody }));
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleDelete = () => {
        dispatch(deleteItem(id)); // Dispatch deleteItem action with the item's id
    };

    return (
        <div className="bg-gray-200 border border-gray-300 p-2 mb-2 w-full max-w-md rounded">
            {isEditing ? (
                <form>
                    <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="mb-2 w-full rounded border border-gray-300 p-2 text-black" />
                    <textarea value={newBody} onChange={(e) => setNewBody(e.target.value)} className="mb-2 w-full rounded border border-gray-300 p-2 text-black" />
                    <button onClick={handleSave} className="bg-blue-500 text-white rounded p-2">Save</button>
                    <button onClick={handleCancel} className="bg-red-500 text-white rounded p-2 ml-2">Cancel</button>
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                </form>
            ) : (
                <div>
                    <h2 className="text-black text-l font-bold mb-2">{title}</h2>
                    <p className="text-sm text-black mb-2">{body}</p>
                    <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white rounded p-2">Edit</button>
                    <button onClick={handleDelete} className="bg-red-500 text-white rounded p-2 ml-2">Delete</button> {/* Add delete button */}
                </div>
            )}
        </div>
    ); 
};