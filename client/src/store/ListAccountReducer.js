import { createSlice } from '@reduxjs/toolkit'


const slice = createSlice({
    name: 'acc',
    initialState: {
        datait: [],
        columnit: [],
        databuilding: [],
        columbuilding: [],
    },
    reducers: {
        setDatait: (state, action) => {
            state.datait = action.payload;
        },
        setDatabuilding: (state, action) => {
            state.databuilding = action.payload;
        },
        setColumnit: (state, action) => {
            state.columnit = action.payload;
        },
        setColumnbuilding: (state, action) => {
            state.columbuilding = action.payload;
        },
    }
})
export default slice.reducer
export const { setDatait, setDatabuilding, setColumnit, setColumnbuilding } = slice.actions