import { TestBed } from '@angular/core/testing';
import { useToggle } from './use-toggle';
import { effect } from '@angular/core';

describe('useToggle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should initialize with default false value', () => {
    TestBed.runInInjectionContext(() => {
      const toggle = useToggle();
      expect(toggle.value()).toBe(false);
    });
  });

  it('should initialize with provided initial value', () => {
    TestBed.runInInjectionContext(() => {
      const toggle = useToggle(true);
      expect(toggle.value()).toBe(true);
    });
  });

  it('should toggle the value when toggle() is called', () => {
    TestBed.runInInjectionContext(() => {
      const toggle = useToggle(false);

      expect(toggle.value()).toBe(false);

      toggle.toggle();
      expect(toggle.value()).toBe(true);

      toggle.toggle();
      expect(toggle.value()).toBe(false);
    });
  });

  it('should set specific value when toggle(value) is called', () => {
    TestBed.runInInjectionContext(() => {
      const toggle = useToggle(false);

      toggle.toggle(true);
      expect(toggle.value()).toBe(true);

      toggle.toggle(true);
      expect(toggle.value()).toBe(true);

      toggle.toggle(false);
      expect(toggle.value()).toBe(false);
    });
  });

  it('should set value to true when setTrue() is called', () => {
    TestBed.runInInjectionContext(() => {
      const toggle = useToggle(false);

      toggle.setTrue();
      expect(toggle.value()).toBe(true);

      toggle.setTrue();
      expect(toggle.value()).toBe(true);
    });
  });

  it('should set value to false when setFalse() is called', () => {
    TestBed.runInInjectionContext(() => {
      const toggle = useToggle(true);

      toggle.setFalse();
      expect(toggle.value()).toBe(false);

      toggle.setFalse();
      expect(toggle.value()).toBe(false);
    });
  });

  it('should work with effects', () => {
    TestBed.runInInjectionContext(() => {
      const toggle = useToggle(false);
      let effectCount = 0;
      let lastValue = false;

      effect(() => {
        lastValue = toggle.value();
        effectCount++;
      });

      TestBed.flushEffects();
      expect(effectCount).toBe(1);
      expect(lastValue).toBe(false);

      toggle.toggle();
      TestBed.flushEffects();
      expect(effectCount).toBe(2);
      expect(lastValue).toBe(true);
    });
  });

  it('should return readonly signal', () => {
    TestBed.runInInjectionContext(() => {
      const toggle = useToggle();

      expect(typeof toggle.value).toBe('function');
      expect((toggle.value as any).set).toBeUndefined();
      expect((toggle.value as any).update).toBeUndefined();
    });
  });

  it('should handle rapid toggling', () => {
    TestBed.runInInjectionContext(() => {
      const toggle = useToggle(false);

      for (let i = 0; i < 100; i++) {
        toggle.toggle();
      }

      expect(toggle.value()).toBe(false);
    });
  });

  it('should work independently when multiple instances are created', () => {
    TestBed.runInInjectionContext(() => {
      const toggle1 = useToggle(false);
      const toggle2 = useToggle(true);

      expect(toggle1.value()).toBe(false);
      expect(toggle2.value()).toBe(true);

      toggle1.toggle();
      expect(toggle1.value()).toBe(true);
      expect(toggle2.value()).toBe(true);

      toggle2.setFalse();
      expect(toggle1.value()).toBe(true);
      expect(toggle2.value()).toBe(false);
    });
  });
});
