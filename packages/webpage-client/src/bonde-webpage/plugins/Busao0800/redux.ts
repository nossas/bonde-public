export const initialState = {
    loading: false,
    data: undefined,
    errors: []
}

export const SUCCESS = 'success'

export const FETCHING = 'fetching'

export const FAILED = 'failed'

export const reducer = (state: any, action: any) => {
    switch (action.type) {
      case FETCHING:
        return { ...state, loading: true, data: undefined, errors: [] };
      case SUCCESS:
        return { ...state, loading: false, data: action.payload, errors: [] };
      case FAILED:
        return {
          ...state,
          loading: false,
          errors: action.payload,
          data: undefined,
        };
      default:
        throw new Error('action.type not found');
    }
};