class AdminHeader extends React.Component {

  render () {
    return (
    <div>
      <Navbar
        fixedTop={true}
        className="header">
        <Navbar.Header>
            <Navbar.Brand>
              <a className="header__logo" href="/">
                <img src={ImageConstants.logos.orange} />
              </a>
            </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullLeft>
            <NavDropdown title="MATCHING">
              {/* TO-DO: add href={} for all items*/}
              <MenuItem href={RouteConstants.admin.matched}>Matched</MenuItem>
              <MenuItem href={RouteConstants.admin.unmatched}>Not Matched</MenuItem>
            </NavDropdown>
            <NavItem href={RouteConstants.admin.lessons}>LESSONS</NavItem>
            <NavItem href={RouteConstants.admin.roster}>ROSTER</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem>Log Out</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
    );
  }
}
