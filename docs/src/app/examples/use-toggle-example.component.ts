import { Component } from '@angular/core';
import { useToggle } from '@nguse/core';

@Component({
  selector: 'app-use-toggle-example',
  standalone: true,
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div class="max-w-4xl mx-auto">
        <header class="mb-12">
          <h1 class="text-4xl font-bold text-slate-900 mb-2">useToggle</h1>
          <p class="text-lg text-slate-600">
            A composable function for managing boolean toggle state in Angular
          </p>
        </header>

        <div class="space-y-8">
          <!-- Basic Toggle Example -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-semibold text-slate-800 mb-4">Basic Toggle</h2>
            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <div class="flex-1">
                  <div class="inline-flex items-center gap-2 px-4 py-2 rounded-lg"
                       [class]="isOpen() ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                    <span class="font-medium">Status:</span>
                    <span>{{ isOpen() ? 'Open' : 'Closed' }}</span>
                  </div>
                </div>
              </div>
              <div class="flex gap-2">
                <button
                  (click)="toggleState.toggle()"
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Toggle
                </button>
                <button
                  (click)="toggleState.setTrue()"
                  class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Open
                </button>
                <button
                  (click)="toggleState.setFalse()"
                  class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Close
                </button>
              </div>
            </div>
          </div>

          <!-- Visibility Toggle Example -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-semibold text-slate-800 mb-4">Visibility Toggle</h2>
            <div class="space-y-4">
              @if (isVisible()) {
                <div class="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                  <p class="text-blue-900 font-medium">
                    🎉 This content is now visible!
                  </p>
                  <p class="text-blue-700 text-sm mt-1">
                    Click the button below to hide this message.
                  </p>
                </div>
              }
              <button
                (click)="visibilityToggle.toggle()"
                class="px-4 py-2 rounded-lg transition-colors"
                [class]="isVisible() ? 'bg-slate-600 text-white hover:bg-slate-700' : 'bg-blue-600 text-white hover:bg-blue-700'">
                {{ isVisible() ? 'Hide' : 'Show' }} Content
              </button>
            </div>
          </div>

          <!-- Dark Mode Toggle Example -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-semibold text-slate-800 mb-4">Dark Mode Toggle</h2>
            <div class="space-y-4">
              <div
                class="p-6 rounded-lg transition-all duration-300"
                [class]="isDarkMode() ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-900'">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <p class="text-lg font-medium mb-1">
                      Current theme: {{ isDarkMode() ? '🌙 Dark' : '☀️ Light' }}
                    </p>
                    <p class="text-sm opacity-75">
                      {{ isDarkMode() ? 'Easy on the eyes' : 'Bright and clear' }}
                    </p>
                  </div>
                  <button
                    (click)="darkModeToggle.toggle()"
                    class="px-4 py-2 rounded-lg transition-colors"
                    [class]="isDarkMode() ? 'bg-white text-slate-900 hover:bg-slate-100' : 'bg-slate-900 text-white hover:bg-slate-800'">
                    Switch to {{ isDarkMode() ? 'Light' : 'Dark' }} Mode
                  </button>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div class="p-3 rounded" [class]="isDarkMode() ? 'bg-slate-800' : 'bg-white'">
                    <p class="font-medium">Card 1</p>
                    <p class="text-sm opacity-75">Sample content</p>
                  </div>
                  <div class="p-3 rounded" [class]="isDarkMode() ? 'bg-slate-800' : 'bg-white'">
                    <p class="font-medium">Card 2</p>
                    <p class="text-sm opacity-75">Sample content</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Toggle Example -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-semibold text-slate-800 mb-4">Modal Toggle</h2>
            <div class="space-y-4">
              <button
                (click)="modalToggle.setTrue()"
                class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Open Modal
              </button>

              @if (isModalOpen()) {
                <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                     (click)="modalToggle.setFalse()">
                  <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl"
                       (click)="$event.stopPropagation()">
                    <h3 class="text-2xl font-bold text-slate-900 mb-4">Modal Title</h3>
                    <p class="text-slate-600 mb-6">
                      This is a modal dialog. Click outside or press the close button to dismiss it.
                    </p>
                    <div class="flex gap-2 justify-end">
                      <button
                        (click)="modalToggle.setFalse()"
                        class="px-4 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition-colors">
                        Cancel
                      </button>
                      <button
                        (click)="modalToggle.setFalse()"
                        class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Code Example -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-semibold text-slate-800 mb-4">Usage</h2>
            <pre class="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm"><code>import {{ '{' }} Component {{ '}' }} from '@angular/core';
import {{ '{' }} useToggle {{ '}' }} from '@nguse/core';

@Component({{ '{' }}
  selector: 'app-example',
  template: \`
    &lt;p&gt;Status: {{ '{{' }} isOpen() ? 'Open' : 'Closed' {{ '}}' }}&lt;/p&gt;
    &lt;button (click)="toggleState.toggle()"&gt;Toggle&lt;/button&gt;
    &lt;button (click)="toggleState.setTrue()"&gt;Open&lt;/button&gt;
    &lt;button (click)="toggleState.setFalse()"&gt;Close&lt;/button&gt;
  \`
{{ '}' }})
export class ExampleComponent {{ '{' }}
  toggleState = useToggle(false);
  isOpen = this.toggleState.value;
{{ '}' }}</code></pre>
          </div>

          <!-- API Reference -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-semibold text-slate-800 mb-4">API Reference</h2>
            <div class="space-y-4">
              <div>
                <h3 class="font-mono text-sm text-purple-600 mb-2">useToggle(initialValue?: boolean)</h3>
                <p class="text-slate-600 text-sm mb-2">Returns an object with:</p>
                <ul class="space-y-2 text-sm text-slate-700">
                  <li class="flex items-start gap-2">
                    <code class="bg-slate-100 px-2 py-1 rounded text-xs font-mono">value</code>
                    <span>- Readonly Signal&lt;boolean&gt; for reactive state</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <code class="bg-slate-100 px-2 py-1 rounded text-xs font-mono">toggle(value?)</code>
                    <span>- Toggle state or set to specific boolean value</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <code class="bg-slate-100 px-2 py-1 rounded text-xs font-mono">setTrue()</code>
                    <span>- Set state to true</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <code class="bg-slate-100 px-2 py-1 rounded text-xs font-mono">setFalse()</code>
                    <span>- Set state to false</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})

export class UseToggleExampleComponent {
  toggleState = useToggle(false);
  visibilityToggle = useToggle(false);
  darkModeToggle = useToggle(false);
  modalToggle = useToggle(false);

  isOpen = this.toggleState.value;
  isVisible = this.visibilityToggle.value;
  isDarkMode = this.darkModeToggle.value;
  isModalOpen = this.modalToggle.value;
}
