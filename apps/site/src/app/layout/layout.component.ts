import { Component, signal, computed } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardIconComponent } from '@/shared/components/icon/icon.component';
import { ZardInputGroupComponent } from '@/shared/components/input-group/input-group.component';
import { ZardInputDirective } from '@/shared/components/input/input.directive';
import { FUNCTION_CATEGORIES, type FunctionCategory } from '../core/models/function.model';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ZardButtonComponent, ZardIconComponent, ZardInputGroupComponent, ZardInputDirective],
  template: `
    <div class="min-h-screen bg-background">
      <!-- Header -->
      <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div class="container flex h-14 items-center px-4 md:px-8">
          <a routerLink="/" class="flex items-center gap-2 font-semibold">
            <div class="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-bold">
              ng
            </div>
            <span class="text-lg">nguse</span>
          </a>

          <nav class="ml-6 hidden md:flex items-center gap-6 text-sm">
            <a
              routerLink="/functions"
              routerLinkActive="text-foreground"
              [routerLinkActiveOptions]="{ exact: false }"
              class="text-muted-foreground hover:text-foreground transition-colors"
            >
              Functions
            </a>
            <a
              href="https://github.com/hensuu/nguse"
              target="_blank"
              rel="noopener noreferrer"
              class="text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </nav>

          <div class="ml-auto flex items-center gap-2">
            <button
              z-button
              zType="ghost"
              zShape="square"
              zSize="sm"
              (click)="toggleTheme()"
              class="h-9 w-9"
            >
              @if (isDark()) {
                <z-icon zType="sun" zSize="default" />
              } @else {
                <z-icon zType="moon" zSize="default" />
              }
            </button>
            <a
              href="https://github.com/hensuu/nguse"
              target="_blank"
              rel="noopener noreferrer"
              z-button
              zType="ghost"
              zShape="square"
              zSize="sm"
              class="h-9 w-9"
            >
              <svg viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      <div class="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)] md:gap-6 lg:gap-10 px-4 md:px-8">
        <!-- Sidebar -->
        <aside class="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <div class="h-full py-6 pr-6 lg:py-8 overflow-y-auto">
            <!-- Search -->
            <div class="relative mb-4">
              <z-input-group [zAddonBefore]="search" class="mb-4">
                <input
                  z-input
                  type="text"
                  placeholder="Search functions..."
                  class="w-full rounded-md border border-input bg-background px-9 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  [value]="searchQuery()"
                  (input)="onSearchInput($event)"
                />
              </z-input-group>
            </div>
            <ng-template #search><z-icon zType="search" /></ng-template>

            <!-- Categories -->
            <div class="space-y-4">
              @for (category of filteredCategories(); track category.slug) {
                <div>
                  <h4 class="mb-1 rounded-md px-2 py-1 text-sm font-semibold text-foreground">
                    {{ category.name }}
                  </h4>
                  <div class="grid grid-flow-row auto-rows-max text-sm">
                    @for (fn of category.functions; track fn.slug) {
                      <a
                        [routerLink]="['/functions', fn.slug]"
                        routerLinkActive="bg-muted font-medium text-foreground"
                        class="group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      >
                        {{ fn.name }}
                      </a>
                    }
                  </div>
                </div>
              }
            </div>
          </div>
        </aside>

        <!-- Main content -->
        <main class="relative py-6 lg:gap-10 lg:py-8">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
})
export class LayoutComponent {
  readonly categories = signal<FunctionCategory[]>(FUNCTION_CATEGORIES);
  readonly searchQuery = signal('');
  readonly isDark = signal(false);

  readonly filteredCategories = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) {
      return this.categories();
    }
    return this.categories()
      .map((cat) => ({
        ...cat,
        functions: cat.functions.filter(
          (fn) =>
            fn.name.toLowerCase().includes(query) ||
            fn.description.toLowerCase().includes(query)
        ),
      }))
      .filter((cat) => cat.functions.length > 0);
  });

  constructor() {
    if (typeof window !== 'undefined') {
      this.isDark.set(document.documentElement.classList.contains('dark'));
    }
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  toggleTheme(): void {
    if (typeof document !== 'undefined') {
      const isDark = document.documentElement.classList.toggle('dark');
      this.isDark.set(isDark);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
  }
}
