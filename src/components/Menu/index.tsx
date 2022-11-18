import { FlatList } from 'react-native';
import { products } from '../../mocks/products';
import { formatPrice } from '../../utils/format';
import { PlusCircle } from '../Icons/PlusCircle';
import { Text } from '../Text';
import {
  Product,
  ProductImage,
  ProductDetails,
  Separator,
  AddToCartButton,
} from './styles';

export function Menu() {
  return (
    <FlatList
      data={products}
      style={{ marginTop: 32 }}
      contentContainerStyle={{ paddingHorizontal: 24 }}
      keyExtractor={(product) => product._id}
      ItemSeparatorComponent={ Separator }
      renderItem={({ item: product }) => (
        <Product>
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

          <AddToCartButton>
            <PlusCircle />
          </AddToCartButton>
        </Product>
      )}
    />
  );
}
