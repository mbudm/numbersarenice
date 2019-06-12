import * as React from "react";
import ReactGA from "react-ga"
import { ITimesTableSpeedState } from "./reducer";

export const effects = (state: ITimesTableSpeedState, props) => {
  const stateRef = React.useRef(state);
  React.useEffect(() => {
    handleEffects(state,  stateRef.current, props)
    stateRef.current = state
  }, [state]);
}

const handleEffects = (currentState: ITimesTableSpeedState, previousState, props) => {
  if(currentState.status !== previousState.status){
     ReactGA.pageview(`${props.location.pathname}${currentState.status.toLowerCase()}`)
  }
}
