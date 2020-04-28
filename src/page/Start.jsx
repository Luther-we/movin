import React, { useEffect, useState } from 'react'
import { Container, Row , Button} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import { Transition } from 'react-transition-group'

const colors = ['#3EAEFF', '#FF2405']

const styles = {
  mainContainer : {
    height: '100vh',
    backgroundColor: colors[1]
  },
}

const defaultStyle = {
  transition: `transform 200ms, opacity 200ms ease`,
  opacity: 1
};

const transitionStyles = {
  entering: { transform: 'scale(0.5)', opacity: 0 }, 
  entered: { transform: 'scale(2.0)', opacity: 1},
  exiting: { opacity: 0 },
  exited: { opacity: 0 }
};


const AComponent = ({ in: inProp }) => (
  <Transition
    in={inProp}
    timeout={{
      appear: 100,   
      enter: 300,
      exit: 300
    }}
    appear
    unmountOnExit
  >
    {state => (
      <div
        style={{
          ...defaultStyle,
          ...transitionStyles[state]
        }}
      >
        I am {state}
      </div>
    )}
  </Transition>
);

const ButtonAnimate = () => {
  const [entered, setEntered] = useState(false);
  return (
    <div
>
      <AComponent in={entered} />
        <Button
          onClick={() => {
            setEntered(!entered);
          }}
        >
          Toggle Entered
        </Button>
    </div>
  );
}

const Start = () => {
  const history = useHistory()
  useEffect(() => {
    setTimeout(() => {
      return history.push('/home')
    }, 3000)
  })

  return (
    <>
      <Container style={styles.mainContainer}>
        <Row style={{justifyContent: "center"}}>
          
          <h1
            className="display-1"
            style={{marginTop: "50%", }}
          >
            Movin'
          </h1>
          <ButtonAnimate />
        </Row>
      </Container>
    </>
  )
}

export default Start