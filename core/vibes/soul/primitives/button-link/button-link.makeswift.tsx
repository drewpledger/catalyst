import { Link, Select, Style, TextInput } from '@makeswift/runtime/controls';

import { runtime } from '~/lib/makeswift/runtime';

import { MakeswiftComponentType } from '@makeswift/runtime';

import { ButtonLink, Props } from '.';

interface MSButtonLinkProps extends Omit<Props, 'href'> {
  link: { href?: string; target?: string };
  text: string;
}

runtime.registerComponent(
  function ({ link, text, ...props }: MSButtonLinkProps) {
    return (
      <ButtonLink href={link?.href ?? ''} target={link?.target ?? ''} {...props}>
        {text}
      </ButtonLink>
    );
  },
  {
    type: MakeswiftComponentType.Button,
    label: 'Button',
    props: {
      className: Style({ properties: [Style.Margin] }),
      link: Link({ label: 'Link' }),
      text: TextInput({ label: 'Button Text', defaultValue: 'Button Text' }),
      variant: Select({
        label: 'Variant',
        options: [
          { value: 'primary', label: 'Primary' },
          { value: 'secondary', label: 'Secondary' },
          { value: 'tertiary', label: 'Tertiary' },
        ],
        defaultValue: 'primary',
      }),
      size: Select({
        label: 'Size',
        options: [
          { value: 'icon', label: 'Icon' },
          { value: 'small', label: 'Small' },
          { value: 'medium', label: 'Medium' },
          { value: 'large', label: 'Large' },
        ],
        defaultValue: 'large',
      }),
    },
  },
);
