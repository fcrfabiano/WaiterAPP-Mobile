import { useState } from 'react';
import { FlatList } from 'react-native';
import { Product } from '../../types/Product';
import { formatPrice } from '../../utils/format';
import { PlusCircle } from '../Icons/PlusCircle';
import { ProductModal } from '../ProductModal';
import { Text } from '../Text';
import {
  ProductContainer,
  ProductImage,
  ProductDetails,
  Separator,
  AddToCartButton,
} from './styles';

interface MenuProps {
  onAddToCart: (product: Product) => void;
  products: Product[];
}

export function Menu({ onAddToCart, products }: MenuProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  function handleOpenModal(product: Product) {
    setIsModalVisible(true);
    setSelectedProduct(product);
  }

  return (
    <>
      <ProductModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        product={selectedProduct}
        onAddToCart={onAddToCart}
      />
      <FlatList
        data={products}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        keyExtractor={(product) => product._id}
        ItemSeparatorComponent={Separator}
        renderItem={({ item: product }) => (
          <ProductContainer onPress={() => handleOpenModal(product)}>
            <ProductImage
              source={{
                uri: `http://192.168.0.13:3001/images/${product.imagePath}`,
              }}
            />

            <ProductDetails>
              <Text weight="600">{product.name}</Text>
              <Text size={14} color="#666666" style={{ marginVertical: 8 }}>
                {product.description}
              </Text>
              <Text weight="600" size={14}>
                {formatPrice(product.price)}
              </Text>
            </ProductDetails>

            <AddToCartButton onPress={() => onAddToCart(product)}>
              <PlusCircle />
            </AddToCartButton>
          </ProductContainer>
        )}
      />
    </>
  );
}
