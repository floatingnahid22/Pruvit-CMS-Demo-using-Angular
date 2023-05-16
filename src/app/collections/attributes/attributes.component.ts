import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AttributeService } from 'src/app/services/attribute.service';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.css'],
})
export class AttributesComponent implements OnInit {
  attributes: any = [];
  selectedAttributeName: string | undefined;
  selectedAttributeId: string | undefined;
  selectedDeletingAttribute: string | undefined;
  selectedEditingAttribute: string | undefined;
  hasChoices: boolean = false;

  addAttributeForm!: FormGroup;
  saveButtonText: string = 'Save';

  choices: any = [];
  selectedEditingChoice: any;
  addChoiceForm!: FormGroup;

  editing: boolean = false;
  editedChoice: { name: string; suffix: string } = { name: '', suffix: '' };

  // to find attributes name for form title
  onAttributeClick(attributeName: string, attributeId: string) {
    this.addAttributeForm.reset();
    this.selectedAttributeName = attributeName;
    this.selectedAttributeId = attributeId;

    this.addChoiceForm.controls['attribute'].setValue(attributeId);
    console.log(attributeId);
    this.addAttributeForm.controls['name'].setValue(attributeName);
  }

  constructor(private attributeService: AttributeService) {}

  ngOnInit(): void {
    this.addAttributeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      choices: new FormControl([]),
    });

    this.addChoiceForm = new FormGroup({
      name: new FormControl(''),
      suffix: new FormControl(''),
      attribute: new FormControl(''),
    });

    // to show attributes on View
    this.attributeService.getAttributes().subscribe((res: any) => {
      console.log(res);
      this.attributes = res.result;
      console.log(this.attributes);
    });

    // to show choices on View
    this.attributeService.getChoices().subscribe((res: any) => {
      console.log(res);
      this.choices = res.result;
      console.log(this.choices);
    });
  }

  // to add attrubtes
  addAttributes() {
    this.saveButtonText = 'Saving';
    const formData = this.addAttributeForm.value;

    this.attributeService.addAttributes(formData).subscribe((res: any) => {
      console.log(res);
      // update attributes after adding new atrribute
      this.attributes.push(res.result[0]);

      this.saveButtonText = 'Saved';
      setTimeout(() => {
        this.saveButtonText = 'Save';
      }, 1000);
      this.addAttributeForm.reset();
    });
  }

  // to get id of deleting attribute
  deletingAttribute(attributeId: string) {
    this.selectedDeletingAttribute = attributeId;
  }

  // to delete attributes
  deleteAttribute(attributeId: any) {
    this.attributeService.deleteAttribute(attributeId).subscribe((res: any) => {
      console.log(res);
      const index = this.attributes.findIndex(
        (attribute: any) => attribute.id === attributeId
      );
      if (index >= 0) {
        this.attributes.splice(index, 1);
      }
    });
  }

  // to get id of deleting attribute
  editingAttribute(attributeId: string) {
    this.selectedEditingAttribute = attributeId;

    const attribute = this.attributes.find((c: any) => c.id === attributeId);
    if (attribute) {
      this.addAttributeForm.patchValue({
        name: attribute.name,
      });
    }
    this.hasChoices = attribute.choices.length > 0;
  }

  // to update attributes
  updateAttribute(attributeId: any) {
    this.saveButtonText = 'Saving';
    const formData = this.addAttributeForm.value;

    this.attributeService
      .editAttribute(attributeId, formData)
      .subscribe((res: any) => {
        console.log(res);

        // update the attribute in the attributes list
        const editedAttributeIndex = this.attributes.findIndex(
          (attribute: any) => attribute.id === attributeId
        );
        this.attributes[editedAttributeIndex] = res.result;

        // fetch the updated attribute data from the server
        this.attributeService.getAttributes().subscribe((res: any) => {
          this.attributes = res.result;

          this.saveButtonText = 'Saved';
          this.addAttributeForm.reset();
          setTimeout(() => {
            this.saveButtonText = 'Save';
          }, 1000);
        });
      });
  }

  // to add choices
  addChoices() {
    this.saveButtonText = 'Saving';
    const formData = this.addChoiceForm.value;

    const inputParts = formData.name.split(',' || ', ');
    const name = inputParts[0].trim();
    const suffix = inputParts[1] ? inputParts[1].trim() : '';

    const newData = { name, suffix, attribute: formData.attribute };

    this.attributeService.addChoices(newData).subscribe((res: any) => {
      console.log(res);
      // Update corresponding attribute's choices array in attributes array
      const attributeIndex = this.attributes.findIndex(
        (a: any) => a.id === formData.attribute
      );
      this.attributes[attributeIndex].choices.push(newData);

      this.saveButtonText = 'Saved';
      setTimeout(() => {
        this.saveButtonText = 'Save';
      }, 1000);
      this.addChoiceForm.reset();
    });
  }

  // add multiple choices at once
  addBulkChoices(attributeId: any) {
    this.saveButtonText = 'Saving';
    const formData = this.addAttributeForm.value;

    // create array of choice objects
    const choices = formData.choices
      .split('\n')
      .map((choice: string) => ({ name: choice }));

    // add choices for the specific attribute
    this.attributeService
      .addBulkChoices(attributeId, { name: formData.name, choices })
      .subscribe((res: any) => {
        console.log(res);

        // update choices array
        const newChoices = res.result[0].choices;
        this.choices.push(...newChoices);

        // update corresponding attribute's choices array in attributes array
        const attributeIndex = this.attributes.findIndex(
          (a: any) => a.id === attributeId
        );
        this.attributes[attributeIndex].choices.push(...newChoices);

        this.saveButtonText = 'Saved';
        setTimeout(() => {
          this.saveButtonText = 'Save';
        }, 1000);
        this.addAttributeForm.reset();
      });
  }

  // to delete choices
  deleteChoice(choiceId: string, i: number) {
    // find the specific choice id in atrributes array
    const index = this.attributes[i].choices.findIndex(
      (choice: any) => choice.id === choiceId
    );

    this.attributes[i].choices.splice(index, 1);
    this.attributeService.deleteChoice(choiceId).subscribe((res: any) => {
      console.log(res);
    });
  }

  // to get id of editing attribute
  edit(choiceId: string) {
    this.editing = true;
    this.selectedEditingChoice = choiceId;
    console.log(choiceId);
    this.editedChoice.name = this.choices.name;
    this.editedChoice.suffix = this.choices.suffix;
  }

  // to save edited informatrion
  updateChoice() {
    this.choices.name = this.editedChoice.name;
    this.choices.suffix = this.editedChoice.suffix;
    this.attributeService
      .editChoice(this.selectedEditingChoice, this.editedChoice)
      .subscribe(() => {
        this.editing = false;
      });
  }

  cancel() {
    this.editing = false;
    this.editedChoice = { name: '', suffix: '' };
  }

  // to get name from user input
  onNameInput(event: any) {
    // split the input value into choice name and SKU suffix
    const inputParts = event.target.textContent.split(', ' || ',');
    this.editedChoice.name = inputParts[0].trim();
    this.editedChoice.suffix = inputParts[1] ? inputParts[1].trim() : '';
  }

  // to get suffix from user input
  onSuffixInput(event: any) {
    // update the edited choice's suffix
    this.editedChoice.suffix = event.target.textContent.trim();
  }
}
