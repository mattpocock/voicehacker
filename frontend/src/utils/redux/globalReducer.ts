const initialState: GlobalStateSection = {
  isInPracticeMode: false,
  practiceAccent: null,
  accentDisplayName: null,
  practiceSound: null,
  soundDisplayName: null,
};

export interface GlobalStateSection {
  isInPracticeMode: boolean;
  practiceAccent: string;
  practiceSound: string;
  accentDisplayName: string;
  soundDisplayName: string;
}

const globalReducer = (
  state = initialState,
  action: Action,
): GlobalStateSection => {
  switch (action.type) {
    case BEGIN_PRACTICE_MODE:
      return {
        ...state,
        isInPracticeMode: true,
        practiceAccent: action.payload.accent,
        practiceSound: action.payload.sound || null,
        accentDisplayName: action.payload.accentDisplayName,
        soundDisplayName: action.payload.soundDisplayName || null,
      };
    case CHANGE_SOUND:
      return {
        ...state,
        isInPracticeMode: true,
        practiceSound: action.payload.sound,
        soundDisplayName: action.payload.soundDisplayName,
      };
    case END_PRACTICE_MODE:
      return {
        ...state,
        isInPracticeMode: false,
        practiceAccent: null,
        practiceSound: null,
      };
    default:
      return state;
  }
};

export const BEGIN_PRACTICE_MODE = 'BEGIN_PRACTICE_MODE';
export const beginPracticeMode = (payload: {
  accent: string;
  accentDisplayName: string;
  sound?: string;
  soundDisplayName?: string;
}): Action => ({
  type: BEGIN_PRACTICE_MODE,
  payload,
});

const CHANGE_SOUND = 'CHANGE_SOUND';
export const changeSound = (payload: {
  sound: string;
  soundDisplayName: string;
}) => ({
  type: CHANGE_SOUND,
  payload,
});

export const END_PRACTICE_MODE = 'END_PRACTICE_MODE';
export const endPracticeMode = (): Action => ({
  type: END_PRACTICE_MODE,
});

export default globalReducer;

export interface Action {
  type: string;
  payload?: any;
}
