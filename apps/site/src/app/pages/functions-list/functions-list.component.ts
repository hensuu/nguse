import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { FUNCTION_CATEGORIES, getAllFunctions, type FunctionCategory } from '../../core/models/function.model';

type SortOption = 'category' | 'name';

@Component({
  selector: 'app-functions-list',
  standalone: true,
  imports: [RouterLink, ZardButtonComponent],
  template: `
    <div class="space-y-6">
      <!-- Page header -->
      <div class="space-y-2">
        <h1 class="scroll-m-20 text-3xl font-bold tracking-tight">Functions</h1>
        <p class="text-lg text-muted-foreground">
          A collection of {{ totalFunctions() }} essential Angular composables built with Signals.
        </p>
      </div>

      <!-- Sort controls -->
      <div class="flex items-center gap-4 pb-4 border-b">
        <span class="text-sm text-muted-foreground">Sort by:</span>
        <div class="flex items-center gap-1">
          <button
            z-button
            [zType]="sortBy() === 'category' ? 'secondary' : 'ghost'"
            zSize="sm"
            (click)="setSortBy('category')"
          >
            Category
          </button>
          <button
            z-button
            [zType]="sortBy() === 'name' ? 'secondary' : 'ghost'"
            zSize="sm"
            (click)="setSortBy('name')"
          >
            Name
          </button>
        </div>
      </div>

      <!-- Functions grid -->
      @if (sortBy() === 'category') {
        <div class="space-y-8">
          @for (category of categories(); track category.slug) {
            <div>
              <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
                <span class="inline-flex items-center justify-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium">
                  {{ category.functions.length }}
                </span>
                {{ category.name }}
              </h2>
              <div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                @for (fn of category.functions; track fn.slug) {
                  <a
                    [routerLink]="['/functions', fn.slug]"
                    class="group flex flex-col gap-1 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                  >
                    <div class="flex items-center gap-2">
                      <span class="font-medium text-foreground group-hover:text-primary">{{ fn.name }}</span>
                      @if (fn.deprecated) {
                        <span class="text-xs bg-destructive/10 text-destructive px-1.5 py-0.5 rounded">
                          Deprecated
                        </span>
                      }
                    </div>
                    <span class="text-sm text-muted-foreground line-clamp-2">{{ fn.description }}</span>
                  </a>
                }
              </div>
            </div>
          }
        </div>
      } @else {
        <div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          @for (fn of sortedFunctions(); track fn.slug) {
            <a
              [routerLink]="['/functions', fn.slug]"
              class="group flex flex-col gap-1 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
            >
              <div class="flex items-center gap-2">
                <span class="font-medium text-foreground group-hover:text-primary">{{ fn.name }}</span>
                <span class="text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded">
                  {{ fn.category }}
                </span>
              </div>
              <span class="text-sm text-muted-foreground line-clamp-2">{{ fn.description }}</span>
            </a>
          }
        </div>
      }
    </div>
  `,
})
export class FunctionsListComponent {
  readonly categories = signal<FunctionCategory[]>(FUNCTION_CATEGORIES);
  readonly sortBy = signal<SortOption>('category');

  readonly totalFunctions = computed(() => getAllFunctions().length);

  readonly sortedFunctions = computed(() => {
    const functions = getAllFunctions();
    return [...functions].sort((a, b) => a.name.localeCompare(b.name));
  });

  setSortBy(option: SortOption): void {
    this.sortBy.set(option);
  }
}
