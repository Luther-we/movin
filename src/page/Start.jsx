import React, { useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import {useHistory} from 'react-router-dom'

const colors = ['#3EAEFF', '#FF2405']

const styles = {
  mainContainer : {
    height: '100vh',
    backgroundColor: colors[1]
  },
}

const Start = props => {
  console.log(props)
  const history = useHistory()
  useEffect(() => {
    setTimeout(() => {
      return history.push('/home/login')
    }, 1000)
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
        </Row>
      </Container>
    </>
  )
}

export default Start