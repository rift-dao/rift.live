export const ADD_LOG = 'ADD_LOG';
function addLog(state, action) {
  const { id, message, data, ...rest } = action.data;
  const indexOfItem = state.pile.findIndex((log) => log.id === action.data.id);

  let newPile = [...state.pile];

  if (indexOfItem === -1) {
    newPile = [...state.pile, { id, status: action.status, data, ...rest }];
  } else {
    newPile[indexOfItem] = { id, status: action.status, data, ...rest };
  }

  const active = { ...state.active };

  if (
    action.status === 'initiated' ||
    action.status === 'error' ||
    state.active?.id === id
  ) {
    active.id = id;
    active.status = action.status;
    active.message = message;
    active.data = data;
  }

  return { ...state, active, pile: newPile };
}

export const REMOVE_LOG = 'REMOVE_LOG';
function removeLog(state, action) {
  const index = state.pile.findIndex((log) => log.id === action.data.id);

  const newPile = [...state.pile];
  if (index !== -1) {
    newPile.splice(index, 1);
    return { ...state, pile: newPile };
  }
  return state;
}

export function guidGenerator() {
  const S4 = function s4() {
    // eslint-disable-next-line
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return `${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
}

export const generateLog = (type, data) => {
  return { id: guidGenerator(), type, data };
};

export const initialState = {
  pile: [],
  history: [],
  active: {},
};

export default function reducer(state, action) {
  switch (action.type) {
    case 'reset':
      return initialState;
    case ADD_LOG:
      return addLog(state, action);
    case 'resetActive':
      return { ...state, active: {} };
    case REMOVE_LOG:
      return removeLog(state, action);
    default:
      return state;
  }
}
