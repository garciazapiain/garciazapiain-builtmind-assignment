import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchItems } from './itemsApi';

interface Item {
  userId: number;
  id: number;
  title: string;
  body: string;
  // Add other properties as needed
}

interface ItemsState {
  items: Item[];
}

const initialState: ItemsState = {
  items: [],
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
    updateItem: (state, action: PayloadAction<Item>) => {
      const { id, title, body } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.title = title;
        item.body = body;
      }
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.fulfilled, (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
    });
  },
});

export const { addItem, updateItem, deleteItem } = itemsSlice.actions;

export const selectItems = (state: RootState) =>
  [...state.items.items].sort((a, b) => b.id - a.id);

export default itemsSlice.reducer;