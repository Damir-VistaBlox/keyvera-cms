import type { Block } from 'payload'

export const PricingBlock: Block = {
  slug: 'pricingBlock',
  labels: {
    singular: 'Pricing Table',
    plural: 'Pricing Tables',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Flexible access for every stage of growth.',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      defaultValue:
        'Start with the plan that fits your current workload, then expand model access and operational controls as your application grows.',
    },
    {
      name: 'tiers',
      type: 'array',
      label: 'Pricing Tiers',
      minRows: 1,
      maxRows: 5,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'price',
          type: 'text',
          required: true,
          admin: {
            description: 'e.g. "Free", "$49/mo", "Custom"',
          },
        },
        {
          name: 'description',
          type: 'text',
          admin: {
            description: 'Short tagline under the price',
          },
        },
        {
          name: 'highlight',
          type: 'checkbox',
          defaultValue: false,
          label: 'Recommended plan',
          admin: {
            description: 'Visually elevates this tier (border + shadow)',
          },
        },
        {
          name: 'features',
          type: 'array',
          label: 'Features',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
            {
              name: 'included',
              type: 'checkbox',
              defaultValue: true,
              label: 'Included',
            },
          ],
        },
        {
          name: 'cta',
          type: 'group',
          label: 'Call to Action',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
            {
              name: 'variant',
              type: 'select',
              options: [
                { label: 'Primary (blue)', value: 'default' },
                { label: 'Outline', value: 'outline' },
                { label: 'Navy CTA', value: 'cta' },
              ],
              defaultValue: 'default',
            },
          ],
        },
      ],
    },
    {
      name: 'trustBadges',
      type: 'array',
      label: 'Trust Badges (below tiers)',
      maxRows: 4,
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            description: 'e.g. "100T+"',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'e.g. "Tokens Served"',
          },
        },
      ],
    },
  ],
}
