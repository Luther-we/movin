import React from "react";
import {
  Container
} from "react-bootstrap";
import { useTheme } from "../utils/theme/ThemeProvider";
import subRoutesHome from "../utils/routes/subRoutesHome";
import { CreateRoutes } from '../utils/routes/routesUtils'
import NavigationBar from './NavigationBar'
import {withAuth} from '../utils/auth/withAuth'

const colors = ["#3EAEFF", "#FF2405", '#E7E3E5'];

const styles = {
  mainContainer: {
    height: "100vh",
    backgroundColor: colors[2],
    padding: 0,
  },
};

const getThemeVariant = ({ dark }) => {
  if (dark) {
    return "dark";
  }
  return "light";
};

const HomeMO = (props) => {
  console.log('RENDER TWICE')
  const themeState = useTheme();
  const themeMode = getThemeVariant(themeState);

  return (
    <>
      <Container style={styles.mainContainer} variant={themeMode}>
        <NavigationBar />
            <CreateRoutes routes={subRoutesHome}/>
      </Container>
    </>
  );
};

const Home = withAuth(HomeMO)
export default Home;


