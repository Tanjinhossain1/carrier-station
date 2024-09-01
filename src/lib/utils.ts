// src/lib/utils.ts
export function cn(...classes: (string | Record<string, boolean> | undefined)[]): string {
    return classes
      .map((cls) =>
        typeof cls === 'string'
          ? cls
          : Object.entries(cls!)
              .filter(([_, value]) => value)
              .map(([key]) => key)
              .join(' ')
      )
      .join(' ');
  }
  