import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'hr',
    initialState: {
        data: null,
        column: null,
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
        setColumn: (state, action) => {
            state.column = action.payload;
        }
    },
});
export default slice.reducer
export const { setData, setColumn } = slice.actions