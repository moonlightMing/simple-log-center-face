const defaultState = {
    isGrid: false,
    grid: null
}

export default (state = defaultState, action) => {

    const newState = JSON.parse(JSON.stringify(state));

    if (action.type === 'CHANGE_LIST_STYLE') {
        newState.isGrid = !state.isGrid;
        if (newState.isGrid) {
            newState.grid = {
                gutter: 12,
                column: 10
            }
        } else {
            newState.grid = null
        }
        return newState
    }

    return state;
}