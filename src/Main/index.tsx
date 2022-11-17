import { Container, CategoriesContainer, MenuContainer, Footer, FooterContainer } from './styles';

import { Header } from '../components/Header';

export function Main() {
  return (
    <>
      <Container>
        <Header />

        <CategoriesContainer />

        <MenuContainer />

      </Container>
      <Footer>
        <FooterContainer>

        </FooterContainer>
      </Footer>
    </>
  );
}
