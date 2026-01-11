import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ZardIconComponent } from '@/shared/components/icon/icon.component';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardCardComponent } from '@/shared/components/card/card.component';
import { getFunctionBySlug, getAllFunctions, type FunctionInfo } from '../../core/models/function.model';
import { UseToggleDemoComponent } from './demos/use-toggle-demo.component';

@Component({
  selector: 'app-function-detail',
  standalone: true,
  imports: [RouterLink, ZardIconComponent, ZardButtonComponent, ZardCardComponent, UseToggleDemoComponent],
  template: `
    @if (functionInfo(); as fn) {
      <div class="space-y-8">
        <!-- Header -->
        <div class="space-y-4">
          <div class="flex items-center gap-2 text-sm text-muted-foreground">
            <a routerLink="/functions" class="hover:text-foreground">Functions</a>
            <z-icon zType="chevron-right" zSize="sm" />
            <span class="text-foreground">{{ fn.name }}</span>
          </div>

          <div class="space-y-2">
            <h1 class="scroll-m-20 text-3xl font-bold tracking-tight">{{ fn.name }}</h1>
            <p class="text-lg text-muted-foreground">{{ fn.description }}</p>
          </div>

          <div class="flex items-center gap-4 text-sm">
            <span class="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1">
              <z-icon zType="folder" zSize="sm" class="text-muted-foreground" />
              {{ fn.category }}
            </span>
            <a
              href="https://github.com/hensuu/nguse/blob/main/libs/core/src/lib/use-toggle/use-toggle.ts"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
            >
              <z-icon zType="code" zSize="sm" />
              Source
            </a>
          </div>
        </div>

        <!-- Demo section -->
        <section class="space-y-4">
          <h2 class="text-xl font-semibold">Demo</h2>
          <z-card class="p-0 overflow-hidden">
            <div class="p-6 border-b bg-muted/30">
              @switch (slug()) {
                @case ('use-toggle') {
                  <app-use-toggle-demo />
                }
                @default {
                  <p class="text-muted-foreground">No demo available.</p>
                }
              }
            </div>
          </z-card>
        </section>

        <!-- Usage section -->
        <section class="space-y-4">
          <h2 class="text-xl font-semibold">Usage</h2>
          <div class="rounded-lg border bg-muted/30 p-4 overflow-x-auto">
            <pre class="text-sm"><code class="language-typescript">{{ usageCode() }}</code></pre>
          </div>
        </section>

        <!-- Type Declarations section -->
        <section class="space-y-4">
          <h2 class="text-xl font-semibold">Type Declarations</h2>
          <div class="rounded-lg border bg-muted/30 p-4 overflow-x-auto">
            <pre class="text-sm"><code class="language-typescript">{{ typeDeclarations() }}</code></pre>
          </div>
        </section>

        <!-- Navigation -->
        <nav class="flex items-center justify-between border-t pt-6">
          @if (prevFunction(); as prev) {
            <a
              [routerLink]="['/functions', prev.slug]"
              class="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <z-icon zType="arrow-left" zSize="sm" />
              {{ prev.name }}
            </a>
          } @else {
            <div></div>
          }
          @if (nextFunction(); as next) {
            <a
              [routerLink]="['/functions', next.slug]"
              class="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              {{ next.name }}
              <z-icon zType="arrow-right" zSize="sm" />
            </a>
          }
        </nav>
      </div>
    } @else {
      <div class="flex flex-col items-center justify-center py-12 space-y-4">
        <z-icon zType="circle-alert" zSize="xl" class="text-muted-foreground" />
        <h2 class="text-xl font-semibold">Function not found</h2>
        <p class="text-muted-foreground">The function you're looking for doesn't exist.</p>
        <a routerLink="/functions" z-button zType="outline">
          <z-icon zType="arrow-left" zSize="sm" />
          Back to functions
        </a>
      </div>
    }
  `,
})
export class FunctionDetailComponent {
  readonly slug = input.required<string>();

  readonly functionInfo = computed(() => getFunctionBySlug(this.slug()));

  readonly prevFunction = computed((): FunctionInfo | undefined => {
    const functions = getAllFunctions();
    const currentIndex = functions.findIndex((fn) => fn.slug === this.slug());
    return currentIndex > 0 ? functions[currentIndex - 1] : undefined;
  });

  readonly nextFunction = computed((): FunctionInfo | undefined => {
    const functions = getAllFunctions();
    const currentIndex = functions.findIndex((fn) => fn.slug === this.slug());
    return currentIndex < functions.length - 1 ? functions[currentIndex + 1] : undefined;
  });

  readonly usageCode = computed(() => {
    switch (this.slug()) {
      case 'use-toggle':
        return `import { useToggle } from '@nguse/core';

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
}`;
      default:
        return '// Usage example not available';
    }
  });

  readonly typeDeclarations = computed(() => {
    switch (this.slug()) {
      case 'use-toggle':
        return `export interface UseToggleReturn {
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

export function useToggle(initialValue?: boolean): UseToggleReturn;`;
      default:
        return '// Type declarations not available';
    }
  });
}
