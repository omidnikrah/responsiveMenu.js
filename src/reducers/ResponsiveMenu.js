import * as constants from "../constants/actionTypes";

const responsiveMenu = (state = [], action) => {
    switch (action.type) {
		case constants.RESPONSIVE_MENU_FORM_UPDATE:
            return {...state, data: action.data};

        default:
            return state;
    }
}

export default responsiveMenu;