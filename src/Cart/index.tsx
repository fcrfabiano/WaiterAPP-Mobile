import { FlatList, TouchableOpacity } from 'react-native';
import { MinusCircle } from '../components/Icons/MinusCircle';
import { PlusCircle } from '../components/Icons/PlusCircle';
import { Text } from '../components/Text';
import { CartItem } from '../types/CartItem';
import { formatPrice } from '../utils/format';
import { Actions, Image, Item, ProductContainer, ProductDetails, QuantityContainer } from './styles';

interface CartProps {
  cartItems: CartItem[];
}

export function Cart({ cartItems }: CartProps) {
  return (
    <FlatList
      data={cartItems}
      keyExtractor={(cartItem) => cartItem.product._id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item: cartItem }) => (
        <Item>
          <ProductContainer>
            <Image
              source={{
                uri: `http://192.168.0.13:3001/images/${cartItem.product.imagePath}`,
              }}
            />
            <QuantityContainer>
              <Text size={14} color="#666">
                {cartItem.quantity}x
              </Text>
            </QuantityContainer>

            <ProductDetails>
              <Text size={14} weight="600">
                {cartItem.product.name}
              </Text>
              <Text size={14} color="#666" style={{ marginTop: 4 }}>
                {formatPrice(cartItem.product.price * cartItem.quantity)}
              </Text>
            </ProductDetails>
          </ProductContainer>

          <Actions>
            <TouchableOpacity style={{ marginRight: 24 }}>
              <PlusCircle />
            </TouchableOpacity>

            <TouchableOpacity>
              <MinusCircle />
            </TouchableOpacity>
          </Actions>
        </Item>
      )}
    />
  );
}