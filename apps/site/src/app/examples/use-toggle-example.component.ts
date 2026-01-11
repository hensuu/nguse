import { Component } from '@angular/core';
import { useToggle } from '@nguse/core';
import { ZardButtonComponent } from '@/shared/components/button/button.component';

@Component({
  selector: 'app-use-toggle-example',
  standalone: true,
  imports: [ZardButtonComponent],
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

  exampleCode = `import { Component } from '@angular/core';
import { useToggle } from '@nguse/core';

@Component({
  selector: 'app-example',
  template: \`
    <p>Status: {{ isOpen() ? 'Open' : 'Closed' }}</p>
    <button (click)="toggleState.toggle()">Toggle</button>
    <button (click)="toggleState.setTrue()">Open</button>
    <button (click)="toggleState.setFalse()">Close</button>
  \`
})
export class ExampleComponent {
  toggleState = useToggle(false);
  isOpen = this.toggleState.value;
}`;
}
