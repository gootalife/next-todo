import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import Link from 'next/link'
import { path } from 'utils/path'

export const Header = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
        <Container>
          <Link href={path.top} passHref>
            <Navbar.Brand href={path.top}>ToDoApp</Navbar.Brand>
          </Link>
        </Container>
      </Navbar>
    </>
  )
}
