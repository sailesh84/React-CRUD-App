import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Calling post api - CREATE USER
export const createUser = createAsyncThunk("createUser", async (data, { rejectWithValue }) => {
    const response = await fetch("https://662a4b1167df268010a357b0.mockapi.io/crud", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    try {
        const result = await response.json();
        return result;
    }
    catch (error) {
        return rejectWithValue(error);
    }
});

//Calling put api - UPDATE USER
export const updateUser = createAsyncThunk("updateUser", async (data, { rejectWithValue }) => {
    const response = await fetch(`https://662a4b1167df268010a357b0.mockapi.io/crud/${data.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    try {
        const result = await response.json();
        return result;
    }
    catch (error) {
        return rejectWithValue(error);
    }
});

//Calling get api - READ USER
export const showAllUser = createAsyncThunk("showAllUser", async () => {
    const response = await fetch("https://662a4b1167df268010a357b0.mockapi.io/crud");
    try {
        const result = await response.json();
        return result;
    }
    catch (error) {
        // return rejectWithValue(error);
    }
});

//Calling get DELETE - DELETE USER
export const deleteUser = createAsyncThunk("deleteUser", async (id) => {
    const response = await fetch(`https://662a4b1167df268010a357b0.mockapi.io/crud/${id}`,
        { method: "DELETE" });

    try {
        const result = await response.json();
        return result;
    }
    catch (error) {
        // return rejectWithValue(error);
    }
});

export const userDetails = createSlice({
    name: "userDetails",
    initialState: {
        isLoading: false,
        data: null,
        isError: false,
        searchData: []
    },
    reducers: {
        searchUser: (state, action) => {
            state.searchData = action.payload;
        }
    },
    extraReducers: (builder) => {
        // CREATE USER
        builder.addCase(createUser.pending, (state, action) => {
            state.isLoading = true;
        });

        builder.addCase(createUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data.push(action.payload);
        });

        builder.addCase(createUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });

        // UPDATE USER
        builder.addCase(updateUser.pending, (state, action) => {
            state.isLoading = true;
        });

        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = state.data.map((elem) => (
                elem.id === action.payload.id ? action.payload : elem
            ))
        });

        builder.addCase(updateUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });

        // READ USER
        builder.addCase(showAllUser.pending, (state, action) => {
            state.isLoading = true;
        });

        builder.addCase(showAllUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });

        builder.addCase(showAllUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });

        // DELETE USER
        builder.addCase(deleteUser.pending, (state, action) => {
            state.isLoading = true;
        });

        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.isLoading = false;
            const { id } = action.payload;
            if (id) { state.data = state.data.filter((elem) => elem.id !== id) }
        });

        builder.addCase(deleteUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });
    }
});

export default userDetails.reducer;
export const {searchUser} = userDetails.actions;