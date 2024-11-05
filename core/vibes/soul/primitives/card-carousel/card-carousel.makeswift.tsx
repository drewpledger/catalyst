import {
  List,
  Select,
  Shape,
  Image,
  Style,
  TextInput,
  Link,
  Number,
} from '@makeswift/runtime/controls';

import { runtime } from '~/lib/makeswift/runtime';

import { CardCarousel } from '.';

type Card = {
  title?: string;
  imageSrc?: string;
  imageAlt?: string;
  link?: { href?: string; target?: string };
};

interface MSCardCarouselProps {
  className: string;
  textContrast: 'light' | 'dark';
  cards: Card[];
}

runtime.registerComponent(
  function ({ className, textContrast, cards }: MSCardCarouselProps) {
    return (
      <CardCarousel
        className={className}
        cards={cards.map(({ title, imageSrc, imageAlt, link }, index) => {
          return {
            id: title ?? index.toString(),
            title: title ?? '',
            image: { src: imageSrc ?? '', alt: imageAlt ?? '' },
            href: link?.href ?? '',
            textContrast,
          };
        })}
      />
    );
  },
  {
    type: 'primitive-card-carousel',
    label: 'Primitives / Card Carousel',
    icon: 'carousel',
    props: {
      className: Style(),
      textContrast: Select({
        options: [
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark' },
        ],
        defaultValue: 'dark',
      }),
      cards: List({
        type: Shape({
          type: {
            title: TextInput({ label: 'Title', defaultValue: 'Card Title' }),
            imageSrc: Image({ label: 'Image' }),
            imageAlt: TextInput({ label: 'Image Alt', defaultValue: 'Card Image' }),
            link: Link({ label: 'Link' }),
          },
        }),
        getItemLabel(card) {
          return card?.title || 'Card';
        },
      }),
    },
  },
);
