import type { ReactNode } from "react";

export interface SupportQuery {
  id: string;
  title: string;
  isExpanded: boolean;
  description?: string;
}

export interface ContactOption {
  type: 'call' | 'chat' | 'write';
  title: string;
  subtitle: string;
  icon: ReactNode;
}
