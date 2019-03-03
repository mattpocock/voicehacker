const initialState: GlobalStateSection = {
  isInPracticeMode: true,
  practiceAccent: 'general-american',
  accentDisplayName: 'General American',
  practiceSound: 'TH',
  soundDisplayName: 'Think, Teeth',
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
  action: string;
  sound: string;
  accentDisplayName: string;
  soundDisplayName: string;
}): Action => ({
  type: BEGIN_PRACTICE_MODE,
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
