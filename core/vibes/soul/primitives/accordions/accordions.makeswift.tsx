import { List, Select, Shape, Slot, Style, TextInput } from '@makeswift/runtime/controls';

import { runtime } from '~/lib/makeswift/runtime';

import { Accordion, Accordions } from '.';

type MSAccordion = {
  title: string;
  children: React.ReactNode;
};

interface MSAccordionsProps {
  className: string;
  accordions: MSAccordion[];
  type: 'single' | 'multiple';
}

runtime.registerComponent(
  function ({ className, accordions, type }: MSAccordionsProps) {
    return (
      <Accordions type={type} className={className}>
        {accordions.length < 1 && (
          <div className="p-4 text-center text-lg text-gray-400">Add accordions</div>
        )}
        {accordions.map(({ title, children }, index) => (
          <Accordion key={index} value={title} title={title}>
            {children}
          </Accordion>
        ))}
      </Accordions>
    );
  },
  {
    type: 'primitive-accordion',
    label: 'Primitives / Accordion',
    // icon: "accordion", TODO: (drew) add icon
    props: {
      className: Style(),
      accordions: List({
        type: Shape({
          type: {
            title: TextInput({ label: 'Title', defaultValue: 'Accordion Text' }),
            children: Slot(),
          },
        }),
        getItemLabel(accordion) {
          return accordion?.title || 'Accordion';
        },
      }),
      type: Select({
        label: 'Selection Type',
        options: [
          { value: 'single', label: 'Single' },
          { value: 'multiple', label: 'Multiple' },
        ],
        defaultValue: 'single',
      }),
    },
  },
);
