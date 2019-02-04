import React, { useEffect, useState } from 'react';
import './App.css';
import useMachine from './useMachine';
import { Machine } from 'xstate';

function App() {
    return (
        <div className='container'>
            <StopLight />
        </div>
    )
}

const stopLightMachine = Machine({
  id: 'stoplight',
  initial: 'green',
  states: {
    green: {
      onEntry: 'onTransitionedToGreen',
      on: {
          TIMER: 'yellow'
      }
    },
    yellow: {
      onEntry: 'onTransitionedToYellow',
      on: {
        TIMER: 'red'
      }
    },
    red: {
      onEntry: 'onTransitionedToRed',
      on: {
        TIMER: 'green'
      }
    }
  }
})

function StopLight() {
    const [machine, send] = useMachine(stopLightMachine.withConfig({
      actions: {
        onTransitionedToGreen,
        onTransitionedToYellow,
        onTransitionedToRed
      }
    }));
    useEffect(() => {
      const interval = setInterval(() => send('TIMER'), 2e3)
      return () => clearInterval(interval);
    });
    console.log('render. state is:', machine.value);
    function onTransitionedToGreen() {
      console.log('onTransitionedToGreen')
    }
    function onTransitionedToYellow() {
      console.log('onTransitionedToYellow')
    }
    function onTransitionedToRed() {
      console.log('onTransitionedToRed')
    }
    return (
        <div>
            <div style={{color: machine.value.toString()}} className='lighttext'>
              {machine.value.toString()}
            </div>
        </div>
    )
}

export default App;
