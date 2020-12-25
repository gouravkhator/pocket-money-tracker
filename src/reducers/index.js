const initialState = {
    children: []
};

const reducer = (state = initialState, action) => {
    if (action.type === 'ADD_CHILD') {
        return {
            ...state,
            children: [{ ...action.child }, ...state.children],
        };
    } else if (action.type === 'UPDATE_CHILD') {
        let updatedList = [...state.children];
        updatedList = updatedList.map((value) => {
            if (value.childName === action.oldName) {
                return { ...action.newChild };
            }
            else
                return value;
        });
        return {
            ...state,
            children: [...updatedList]
        }
    } else if (action.type === 'DELETE_CHILD') {
        let updatedList = [...state.children];
        updatedList = updatedList.filter((value) => {
            if (value.childName !== action.childToDelete) {
                return value;
            }
        });

        return {
            ...state,
            children: [...updatedList]
        }
    }
    return { ...state };
}

export default reducer;