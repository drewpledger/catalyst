import {
  Image,
  Link,
  List,
  Number,
  Select,
  Shape,
  Slot,
  Style,
  TextInput,
} from '@makeswift/runtime/controls';

import { runtime } from '~/lib/makeswift/runtime';

import { ProductsCarousel } from '.';
import { Price, PriceRange, PriceSale } from '../price-label';

type Product = {
  title?: string;
  link?: { href?: string; target?: string };
  imageSrc?: string;
  imageAlt?: string;
  subtitle?: string;
  badge?: string;
  rating?: number;
  type: 'single' | 'range' | 'sale';
  priceOne?: number;
  priceTwo?: number;
};

interface MSProductsCarouselProps {
  className: string;
  products: Product[];
}

runtime.registerComponent(
  function ({ className, products }: MSProductsCarouselProps) {
    return (
      <ProductsCarousel
        className={className}
        products={products.map(
          ({
            title,
            link,
            imageSrc,
            imageAlt,
            subtitle,
            badge,
            rating,
            priceOne,
            priceTwo,
            type,
          }) => {
            let price: Price;
            switch (type) {
              case 'single':
                price = `$${priceOne?.toString() ?? ''}`;
                type;
                break;
              case 'range':
                price = {
                  minValue: `$${priceOne?.toString() ?? ''}`,
                  maxValue: `$${priceTwo?.toString() ?? ''}`,
                  type,
                } as PriceRange;
                break;
              case 'sale':
                price = {
                  previousValue: `$${priceOne?.toString() ?? ''}`,
                  currentValue: `$${priceTwo?.toString() ?? ''}`,
                  type,
                } as PriceSale;
                break;
              default:
                price = '0';
            }

            return {
              id: title ?? '',
              title: title ?? '',
              href: link?.href ?? '',
              image: { src: imageSrc ?? '', alt: imageAlt ?? '' },
              price: price,
              subtitle: subtitle ?? '',
              badge: badge ?? '',
              rating: rating ?? 0,
              type: type,
            };
          },
        )}
      />
    );
  },
  {
    type: 'primitive-products-carousel',
    label: 'Primitives / Products Carousel',
    icon: 'carousel',
    props: {
      className: Style(),
      products: List({
        type: Shape({
          type: {
            title: TextInput({ label: 'Title', defaultValue: 'Product Title' }),
            link: Link({ label: 'Link' }),
            imageSrc: Image({ label: 'Image' }),
            imageAlt: TextInput({ label: 'Image Alt', defaultValue: 'Product Image' }),
            subtitle: TextInput({ label: 'Subtitle', defaultValue: 'Product Subtitle' }),
            badge: TextInput({ label: 'Badge', defaultValue: 'New' }),
            rating: Number({ label: 'Rating', defaultValue: 5 }),
            type: Select({
              options: [
                { value: 'single', label: 'Single' },
                { value: 'range', label: 'Range' },
                { value: 'sale', label: 'Sale' },
              ],
              defaultValue: 'single',
            }),
            priceOne: Number({ label: 'Price One', defaultValue: 100 }),
            priceTwo: Number({ label: 'Price Two', defaultValue: 200 }),
          },
        }),
        getItemLabel(product) {
          return product?.title || 'Product';
        },
      }),
    },
  },
);
