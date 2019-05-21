/*
 ** Types
 */

export const Types = {
  SHOW: 'modal/SHOW',
  HIDE: 'modal/HIDE',
};

/*
 ** Reducers
 */

const INITIAL_STATE = {
  open: false,
  id: null,
};

export default function modal(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SHOW:
      return {
        open: true,
        id: action.payload.id,
      };
    case Types.HIDE:
      return {
        open: false,
        id: null,
      };
    default:
      return state;
  }
}

/**
 * Actions
 */

export const Creators = {
  showModal: id => ({
    type: Types.SHOW,
    payload: { id },
  }),

  hideModal: () => ({
    type: Types.HIDE,
  }),
};
