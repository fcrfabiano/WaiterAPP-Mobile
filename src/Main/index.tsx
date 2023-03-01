import {
  Container,
  CategoriesContainer,
  MenuContainer,
  Footer,
  FooterContainer,
} from './styles';

import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { Categories } from '../components/Categories';
import { Button } from '../components/Button';
import { TableModal } from '../components/TableModal';
import { useState } from 'react';
import { Cart } from '../Cart';
import { CartItem } from '../types/CartItem';
import { products } from '../mocks/products';
import { Product } from '../types/Product';

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // {
    //   quantity: 1,
    //   product: products[0]
    // },
    // {
    //   quantity: 2,
    //   product: products[1]
    // }
  ]);

  function handleSaveTable(tableNumber: string) {
    setSelectedTable(tableNumber);
  }

  function handleCancelOrder() {
    setSelectedTable('');
  }

  function handleAddToCart(product: Product) {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }

    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        (cartItem) => cartItem.product._id === product._id
      );

      if (itemIndex < 0) return prevState.concat({
        quantity: 1,
        product,
      });

      const newCartItems = [...prevState];
      const item = prevState[itemIndex];

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity + 1,
      };

      return newCartItems;
    });
  }

  return (
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleCancelOrder}
        />

        <CategoriesContainer>
          <Categories />
        </CategoriesContainer>

        <MenuContainer>
          <Menu onAddToCart={handleAddToCart} />
        </MenuContainer>
      </Container>

      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button onPress={() => setIsTableModalVisible(true)}>
              Novo Pedido
            </Button>
          )}

          {selectedTable && (
            <Cart cartItems={cartItems} onAddToCart={handleAddToCart} />
          )}
        </FooterContainer>
      </Footer>

      <TableModal
        visible={isTableModalVisible}
        onClose={() => setIsTableModalVisible(false)}
        onSave={handleSaveTable}
      />
    </>
  );
}
