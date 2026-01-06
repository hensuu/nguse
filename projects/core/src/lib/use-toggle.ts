import { signal, Signal, computed, WritableSignal } from '@angular/core';

export interface UseToggleReturn {
  value: Signal<boolean>;
  toggle: (value?: boolean) => void;
  setTrue: () => void;
  setFalse: () => void;
}

/**
 * A composable function for managing boolean toggle state in Angular.
 * Similar to VueUse's useToggle.
 *
 * @param initialValue - The initial boolean value (default: false)
 * @returns An object containing the reactive value signal and toggle functions
 *
 * @example
 * ```typescript
 * export class MyComponent {
 *   private toggleState = useToggle();
 *
 *   isOpen = this.toggleState.value;
 *
 *   toggle() {
 *     this.toggleState.toggle();
 *   }
 *
 *   open() {
 *     this.toggleState.setTrue();
 *   }
 *
 *   close() {
 *     this.toggleState.setFalse();
 *   }
 * }
 * ```
 */
export function useToggle(initialValue: boolean = false): UseToggleReturn {
  const state: WritableSignal<boolean> = signal(initialValue);

  const toggle = (value?: boolean): void => {
    if (typeof value === 'boolean') {
      state.set(value);
    } else {
      state.update(current => !current);
    }
  };

  const setTrue = (): void => {
    state.set(true);
  };

  const setFalse = (): void => {
    state.set(false);
  };

  return {
    value: state.asReadonly(),
    toggle,
    setTrue,
    setFalse,
  };
}
