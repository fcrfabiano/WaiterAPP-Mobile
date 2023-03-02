import { useState } from 'react';
import { Alert, FlatList, TouchableOpacity } from 'react-native';
import { Button } from '../components/Button';
import { MinusCircle } from '../components/Icons/MinusCircle';
import { PlusCircle } from '../components/Icons/PlusCircle';
import { Text } from '../components/Text';
import { OrderConfirmedModal } from '../OrderConfirmedModal';
import { api } from '../services/api';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';
import { formatPrice } from '../utils/format';
import {
  Actions,
  Image,
  Item,
  ProductContainer,
  ProductDetails,
  QuantityContainer,
  Summary,
  TotalContainer,
} from './styles';

interface CartProps {
  cartItems: CartItem[];
  onAddToCart: (product: Product) => void;
  onDecrement: (product: Product) => void;
  onConfirmOrder: () => void;
  selectedTable: string;
}

export function Cart({
  cartItems,
  onAddToCart,
  onDecrement,
  onConfirmOrder,
  selectedTable,
}: CartProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOrderConfirmedModalVisible, setIsOrderConfirmedModalVisible] =
    useState(false);

  const total = cartItems.reduce(
    (acc, curr) => acc + curr.quantity * curr.product.price,
    0
  );

  function handleConfirmOrder() {
    Alert.alert(
      'Confirmar',
      'Confirmar Pedido?',
      [
        {
          text: 'Confirmar',
          onPress: () => handleOk(),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        onDismiss: () => setIsOrderConfirmedModalVisible(false),
      }
    );
  }

  async function handleOk() {
    setIsLoading(true);

    const payload = {
      table: selectedTable,
      products: cartItems.map((cartItem) => ({
        product: cartItem.product._id,
        quantity: cartItem.quantity,
      }))
    };

    await api.post('/orders', payload);

    setIsLoading(false);
    setIsOrderConfirmedModalVisible(true);
  }

  return (
    <>
      <OrderConfirmedModal
        visible={isOrderConfirmedModalVisible}
        onOk={() => onConfirmOrder()}
      />

      {cartItems.length > 0 && (
        <FlatList
          data={cartItems}
          keyExtractor={(cartItem) => cartItem.product._id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 150 }}
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
                <TouchableOpacity
                  style={{ marginRight: 24 }}
                  onPress={() => onAddToCart(cartItem.product)}
                >
                  <PlusCircle />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onDecrement(cartItem.product)}>
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />
      )}

      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color="#666">Total</Text>
              <Text size={20} weight="600">
                {formatPrice(total)}
              </Text>
            </>
          ) : (
            <Text size={16} color="#999">
              Seu carrinho está vazio
            </Text>
          )}
        </TotalContainer>
        <Button
          onPress={handleConfirmOrder}
          disabled={cartItems.length === 0}
          loading={isLoading}
        >
          Confirmar Pedido
        </Button>
      </Summary>
    </>
  );
}
