import { Container, Nav, Navbar } from 'react-bootstrap'
import { path } from 'utils/path'
import Link from 'next/link'

export const Footer = () => {
  return (
    <Navbar bg="dark" variant="dark" fixed="bottom">
      <Container>
        <Nav>
          <Link href={path.top} passHref>
            <Nav.Link>トップページ</Nav.Link>
          </Link>
        </Nav>
      </Container>
    </Navbar>
  )
}
