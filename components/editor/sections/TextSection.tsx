'use client';

import * as React from 'react';
import { SectionWrapper } from './SectionWrapper';
import { TextOverlayControls } from '@/components/text-overlay/text-overlay-controls';

export function TextSection() {
  return (
    <SectionWrapper title="添加文字" defaultOpen={true}>
      <TextOverlayControls />
    </SectionWrapper>
  );
}
