export interface FunctionCategory {
  name: string;
  slug: string;
  functions: FunctionInfo[];
}

export interface FunctionInfo {
  name: string;
  slug: string;
  description: string;
  category: string;
  deprecated?: boolean;
}

export interface FunctionDoc {
  name: string;
  description: string;
  category: string;
  usage?: string;
  demo?: string;
  typeDeclarations?: string;
  source?: string;
}

export const FUNCTION_CATEGORIES: FunctionCategory[] = [
  {
    name: 'State',
    slug: 'state',
    functions: [
      {
        name: 'useToggle',
        slug: 'use-toggle',
        description: 'A boolean switcher with utility functions',
        category: 'State',
      },
    ],
  },
];

export function getAllFunctions(): FunctionInfo[] {
  return FUNCTION_CATEGORIES.flatMap((cat) => cat.functions);
}

export function getFunctionBySlug(slug: string): FunctionInfo | undefined {
  return getAllFunctions().find((fn) => fn.slug === slug);
}

export function getCategoryBySlug(slug: string): FunctionCategory | undefined {
  return FUNCTION_CATEGORIES.find((cat) => cat.slug === slug);
}
