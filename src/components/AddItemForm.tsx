// src/features/items/AddItemForm.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectItems, addItem } from '../features/items/itemsSlice';
import { AppDispatch } from '../app/store';

export const AddItemForm = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const items = useSelector(selectItems);
    const dispatch = useDispatch<AppDispatch>(); // Type dispatch as AppDispatch

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const maxId = Math.max(...items.map(item => item.id));
        const newId = maxId + 1;
        dispatch(addItem({ id: newId, title, body, userId: 1 }));
        setTitle('');
        setBody('');
    };

    return (
        <div className="bg-gray-200 border border-gray-300 p-2 mb-2 rounded h-[40vh] sm:h-[50vh] sticky top-0">
            <h2 className="text-black text-l font-bold mb-2">Add Post</h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <label htmlFor="title" className="mb-2 text-black">
                    <div>Title</div>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border text-black border-gray-300 p-2 rounded mt-1"
                    />
                </label>
                <label htmlFor="body" className="mb-2 text-black">
                    <div>Body</div>
                    <textarea
                        id="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className="border text-black border-gray-300 p-2 rounded mt-1"
                    />
                </label>
                <button type="submit" className="bg-green-500 text-white rounded p-2 mt-2">
                    Add
                </button>
            </form>
        </div>
    );
};