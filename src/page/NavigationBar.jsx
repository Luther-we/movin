import React from "react";

import {useHistory} from 'react-router-dom'
import {
  Navbar,
  Nav,
  Dropdown,
  DropdownButton,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { IoIosStats } from "react-icons/io";
import { MdToday } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { logout } from "../utils/auth/authHelperMethods";
import { useTheme } from "../utils/theme/ThemeProvider";
import DropdownItem from "react-bootstrap/DropdownItem";
import { loggedIn } from "../utils/auth/authHelperMethods";

const getThemeVariant = ({ dark }) => {
  if (dark) {
    return "dark";
  }
  return "light";
};

const NavigationBar = (props) => {
  const themeState = useTheme();
  const themeMode = getThemeVariant(themeState);
  const history = useHistory()
  

  const handleLogout = () => {
    logout();
    history.push("/");
  };
return (
  <Navbar bg={themeMode} variant={themeMode} fixed="bottom">
          <DropdownButton
            id={"dropdown-toggle-up"}
            drop={"up"}
            variant={themeMode}
            title={""}
          >
            <Dropdown.Item eventkey="1">Action</Dropdown.Item>
            <Dropdown.Item eventkey="2">Another action</Dropdown.Item>
            <Dropdown.Item eventkey="3">Something else here</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventkey="4">Separated link</Dropdown.Item>
          </DropdownButton>
          <Nav className="mr-auto">
            <Nav.Link href="/today">
              <MdToday />
            </Nav.Link>
            <Nav.Link href="/stats">
              <IoIosStats />
            </Nav.Link>
            <DropdownButton variant={themeMode} eventkey={3} title={<FaUserCircle />} drop={"up"}>
              {loggedIn() ? (
                <Dropdown.Item onClick={() => handleLogout()}>
                  Se déconnecter
                </Dropdown.Item>
              ) : (
                <>
                <Dropdown.Item href="/login">Se connecter</Dropdown.Item>
                <Dropdown.Item href="/myaccount">Mon compte</Dropdown.Item>
                </>
              )}
              
              <DropdownItem onClick={() => themeState.toggle()} variant={themeMode}>
              <ToggleButtonGroup
                type="checkbox"
                value={themeMode}
                className="mb-2"
                >
                <ToggleButton value={'Primary'} variant={themeMode}>light</ToggleButton>
                <ToggleButton value={'dark'} variant={themeMode}>'dark'</ToggleButton>
              </ToggleButtonGroup>
              </DropdownItem>
              <DropdownItem onClick={() => themeState.toggle()} variant={themeMode}>
              <ToggleButtonGroup
                type="checkbox"
                value={themeMode}
                className="mb-2"
                >
                <Dropdown.Toggle value={'Primary'} variant={themeMode}>light</Dropdown.Toggle>
                <Dropdown.Toggle value={'dark'} variant={themeMode}>'dark'</Dropdown.Toggle>
              </ToggleButtonGroup>
              </DropdownItem>
            </DropdownButton>
          </Nav>
        </Navbar>
)
}

export default NavigationBar