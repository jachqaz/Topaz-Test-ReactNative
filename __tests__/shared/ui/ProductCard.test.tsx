/*
 * Copyright (c) 2026 Johan A. Hernández (jachqaz). Topaz ReactNative.
 * All rights reserved.
 */
import TestRenderer, { type ReactTestInstance } from 'react-test-renderer';
import { ProductCard } from '../../../src/shared/ui/ProductCard';
import type { Product } from '../../../src/types/product';

const product: Product = {
  id: 3,
  title: 'Powder Canister',
  description: 'desc',
  category: 'beauty',
  price: 14.99,
  discountPercentage: 0,
  rating: 4.64,
  stock: 89,
  brand: 'Velvet Touch',
  thumbnail: 't.webp',
  images: ['1.webp'],
};

/** Concatena todo el texto renderizado del árbol. */
function allText(instance: ReactTestInstance): string {
  const parts: string[] = [];
  const walk = (node: ReactTestInstance | string): void => {
    if (typeof node === 'string') {
      parts.push(node);
      return;
    }
    const children = node.children ?? [];
    children.forEach((child) => walk(child as ReactTestInstance | string));
  };
  walk(instance);
  return parts.join('');
}

/** Encuentra el primer nodo con un handler onPress (el Pressable envuelto). */
function findPressable(instance: ReactTestInstance): ReactTestInstance {
  return instance.find(
    (node) => node.props?.accessibilityRole === 'button' && typeof node.props?.onPress === 'function',
  );
}

describe('ProductCard', () => {
  it('muestra título y precio', () => {
    let renderer!: TestRenderer.ReactTestRenderer;
    TestRenderer.act(() => {
      renderer = TestRenderer.create(<ProductCard product={product} onPress={jest.fn()} />);
    });

    const text = allText(renderer.root);
    expect(text).toContain('Powder Canister');
    expect(text).toContain('$14.99');
  });

  it('notifica el id al pulsar', () => {
    const onPress = jest.fn();
    let renderer!: TestRenderer.ReactTestRenderer;
    TestRenderer.act(() => {
      renderer = TestRenderer.create(<ProductCard product={product} onPress={onPress} />);
    });

    TestRenderer.act(() => {
      findPressable(renderer.root).props.onPress();
    });

    expect(onPress).toHaveBeenCalledWith(3);
  });
});
