import { useState } from 'react';
import { FlatList } from 'react-native';

import { Category } from '../../types/category';
import { Text } from '../Text';

import { CategoryContainer, Icon } from './styles';

interface CategoriesProps {
  categories: Category[];
}

export function Categories({ categories }: CategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState('');

  function handleSelectedCategory(categoryId: string) {
    setSelectedCategory((prevState) =>
      prevState === categoryId ? '' : categoryId
    );
  }

  return (
    <FlatList
      horizontal
      data={categories}
      contentContainerStyle={{ paddingRight: 24 }}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(category) => category._id}
      renderItem={({ item: category }) => {
        const isSelected = selectedCategory === category._id;
        return (
          <CategoryContainer onPress={() => handleSelectedCategoryContainer(category._id)}>
            <Icon>
              <Text opacity={isSelected ? 1 : 0.5}>{category.icon}</Text>
            </Icon>

            <Text size={14} weight="600" opacity={isSelected ? 1 : 0.5}>
              {category.name}
            </Text>
          </CategoryContainer>
        );
      }}
    />
  );
}
