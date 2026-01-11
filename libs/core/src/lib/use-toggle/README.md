# useToggle

A boolean switcher with utility functions.

## Usage

```typescript
import { useToggle } from '@nguse/core';

@Component({
  // ...
})
export class MyComponent {
  private toggle = useToggle();        // default: false
  private toggle = useToggle(true);    // with initial value

  // Access the reactive value
  isOpen = this.toggle.value;          // Signal<boolean>

  // Toggle methods
  onToggle() {
    this.toggle.toggle();              // Toggle the value
  }

  onOpen() {
    this.toggle.setTrue();             // Set to true
  }

  onClose() {
    this.toggle.setFalse();            // Set to false
  }

  onSetSpecific() {
    this.toggle.toggle(true);          // Set to specific value
  }
}
```

## Type Declarations

```typescript
export interface UseToggleReturn {
  /**
   * The reactive boolean value as a readonly signal.
   */
  value: Signal<boolean>;

  /**
   * Toggle the value, or set it to a specific boolean.
   * @param value - Optional boolean to set directly
   */
  toggle: (value?: boolean) => void;

  /**
   * Set the value to true.
   */
  setTrue: () => void;

  /**
   * Set the value to false.
   */
  setFalse: () => void;
}

export function useToggle(initialValue?: boolean): UseToggleReturn;
```

## Source

[View source on GitHub](https://github.com/hensuu/nguse/blob/main/libs/core/src/lib/use-toggle/use-toggle.ts)
