import { Component } from '@angular/core';
import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { ZardIconComponent } from '@/shared/components/icon/icon.component';
import { useToggle } from '@nguse/core';

@Component({
  selector: 'app-use-toggle-demo',
  standalone: true,
  imports: [ZardButtonComponent, ZardIconComponent],
  template: `
    <div class="space-y-6">
      <!-- Basic toggle demo -->
      <div class="space-y-3">
        <div class="flex items-center gap-4">
          <span class="text-sm font-medium min-w-24">Value:</span>
          <span
            class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
            [class]="basicToggle.value() ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'"
          >
            {{ basicToggle.value() ? 'ON' : 'OFF' }}
          </span>
        </div>
        <div class="flex items-center gap-2">
          <button z-button zType="outline" zSize="sm" (click)="basicToggle.toggle()">
            Toggle
          </button>
          <button z-button zType="secondary" zSize="sm" (click)="basicToggle.setTrue()">
            Set ON
          </button>
          <button z-button zType="secondary" zSize="sm" (click)="basicToggle.setFalse()">
            Set OFF
          </button>
        </div>
      </div>

      <!-- Dark mode example -->
      <div class="space-y-3 pt-4 border-t">
        <div class="flex items-center gap-4">
          <span class="text-sm font-medium min-w-24">Dark Mode:</span>
          <button
            z-button
            zType="outline"
            zShape="square"
            zSize="sm"
            (click)="darkMode.toggle()"
            class="h-9 w-9"
          >
            @if (darkMode.value()) {
              <z-icon zType="moon" zSize="default" />
            } @else {
              <z-icon zType="sun" zSize="default" />
            }
          </button>
          <span class="text-sm text-muted-foreground">
            {{ darkMode.value() ? 'Dark mode enabled' : 'Light mode enabled' }}
          </span>
        </div>
      </div>

      <!-- Visibility example -->
      <div class="space-y-3 pt-4 border-t">
        <div class="flex items-center gap-4">
          <span class="text-sm font-medium min-w-24">Visibility:</span>
          <button z-button zType="outline" zSize="sm" (click)="visibility.toggle()">
            <z-icon [zType]="visibility.value() ? 'eye' : 'lightbulb-off'" zSize="sm" />
            {{ visibility.value() ? 'Hide' : 'Show' }} Content
          </button>
        </div>
        @if (visibility.value()) {
          <div class="p-4 rounded-md bg-muted/50 text-sm">
            This content is now visible! Click the button to hide it.
          </div>
        }
      </div>

      <!-- Modal example -->
      <div class="space-y-3 pt-4 border-t">
        <div class="flex items-center gap-4">
          <span class="text-sm font-medium min-w-24">Modal:</span>
          <button z-button zType="default" zSize="sm" (click)="modal.setTrue()">
            Open Modal
          </button>
        </div>
        @if (modal.value()) {
          <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" (click)="modal.setFalse()">
            <div class="bg-background rounded-lg p-6 shadow-lg max-w-sm w-full mx-4" (click)="$event.stopPropagation()">
              <h3 class="text-lg font-semibold mb-2">Modal Title</h3>
              <p class="text-sm text-muted-foreground mb-4">
                This modal is controlled by useToggle. Click the button or outside to close.
              </p>
              <div class="flex justify-end gap-2">
                <button z-button zType="outline" zSize="sm" (click)="modal.setFalse()">
                  Cancel
                </button>
                <button z-button zType="default" zSize="sm" (click)="modal.setFalse()">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class UseToggleDemoComponent {
  readonly basicToggle = useToggle(false);
  readonly darkMode = useToggle(false);
  readonly visibility = useToggle(true);
  readonly modal = useToggle(false);
}
