import React, { useEffect, useRef } from 'react'; // Import useRef
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../features/items/itemsApi';
import { selectItems } from '../features/items/itemsSlice';
import { AppDispatch } from '..//app/store'; // Import AppDispatch
import { ListItem } from './ListItem';
import { AddItemForm } from './AddItemForm'; // Import CreatePost component

export const List = () => {
    const dispatch = useDispatch<AppDispatch>(); // Type dispatch as AppDispatch
    const items = useSelector(selectItems);
    const formRef = useRef<HTMLDivElement>(null); // Create a ref for the form

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    const handleAddPost = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' }); // Scroll to the form
    };

    return (
        <div className="flex flex-col items-center p-5">
            <h1 className="text-6xl font-bold mb-5 text-gray-200">Blog Posts</h1>
            <button onClick={handleAddPost} className="bg-green-500 text-white rounded p-2 sm:hidden m-1 sticky top-0">Add Post</button> {/* Add Post button */}
            <div className="flex flex-col sm:flex-row justify-between w-full max-w-6xl">
                <div className='my-1 mx-0 lg:mx-5 sm:order-last'>
                    {items.map((item) => (
                        <ListItem key={item.id} id={item.id} userId={item.userId} title={item.title} body={item.body} />
                    ))}
                </div>
                <div className='my-1' ref={formRef}> {/* Attach the ref to the form */}
                    <AddItemForm/>
                </div>
            </div>
        </div>
    );
};