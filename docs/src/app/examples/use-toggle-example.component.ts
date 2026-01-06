import { Component } from '@angular/core';
import { useToggle } from '@nguse/core';

@Component({
  selector: 'app-use-toggle-example',
  standalone: true,
  templateUrl: './use-toggle-example.component.html',
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

  exampleCode = `
  import { Component } from '@angular/core';
  import { useToggle } from '@nguse/core';

@Component({
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
{{ '}' }} `;
}
