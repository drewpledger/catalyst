import { runtime } from '~/lib/makeswift/runtime';
import { Image, Link, Select, Style, TextInput } from '@makeswift/runtime/controls';
import { Card, CardProps } from '.';

interface MSCardProps extends Omit<CardProps, 'href' | 'image'> {
  link?: { href?: string; target?: string };
  imageSrc?: string;
  imageAlt?: string;
}

runtime.registerComponent(
  function ({ link, imageSrc, imageAlt, ...props }: MSCardProps) {
    return (
      <Card
        {...props}
        image={{ src: imageSrc ?? '', alt: imageAlt ?? '' }}
        href={link?.href ?? ''}
      />
    );
  },
  {
    type: 'primitive-card',
    label: 'Primitives / Card',
    icon: 'layout',
    props: {
      className: Style(),
      title: TextInput({ label: 'Title', defaultValue: 'Card' }),
      imageSrc: Image({ label: 'Image' }),
      imageAlt: TextInput({ label: 'Image Alt', defaultValue: 'Card Image' }),
      link: Link({ label: 'Link' }),
      textContrast: Select({
        options: [
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark' },
        ],
        defaultValue: 'dark',
      }),
    },
  },
);
