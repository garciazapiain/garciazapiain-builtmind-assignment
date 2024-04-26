// src/features/items/itemsApi.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/axios';

export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  const response = await api.get('/posts');
  return response.data;
});