import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Test/Hello',
  component: () => <div>Hello Storybook!</div>,
};
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {};
