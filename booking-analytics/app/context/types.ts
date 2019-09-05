export interface IContextState  {
    getInitialState(dispatch: any) 
    rootName?: string
}

export interface IContextStateConstructable  {
    new (): IContextState
    rootName: string
}

export interface IDispatch {
    rootStateName: string,
    payload: any
}