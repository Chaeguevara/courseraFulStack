import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import {DISHES} from '../shared/dishes';

export const initialState = {
    dishes: DISHES,
    commnets : COMMENTS,
    promotions : PROMOTIONS,
    leaders : LEADERS
};

export const Reducer = (state, action) => {
    return state;
};