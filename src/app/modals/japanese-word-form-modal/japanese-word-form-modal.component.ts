import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { JapaneseWordService } from 'src/app/services/japanese-word.service';
import { JapaneseWord } from 'src/app/models/japaneseWord';
import { _DisposeViewRepeaterStrategy } from '@angular/cdk/collections';

@Component({
  selector: 'app-japanese-word-form-modal',
  templateUrl: './japanese-word-form-modal.component.html',
  styleUrls: ['./japanese-word-form-modal.component.scss']
})
export class JapaneseWordFormModalComponent implements OnInit {
  @Input() id: number;
  @Input() name: string;

  displayJapaneseWordName: string;
  jWordForm: FormGroup;
  submitted = false;
  duplicateDefinition = false;
  duplicateReading = false;

  actionType: string;

  formJapaneseName: string;
  formEnglishDefinitions: string;
  formReadings: string;
  formPartsOfSpeech: string;
  formNotes: string;

  partsOfSpeechOptions = ['Noun', 'Verb', 'Adverb', 'Na-adjective', 'I-Adjective', 'Other'];

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder,
              private japaneseWordService: JapaneseWordService) {
    this.formJapaneseName = 'japaneseName';
    this.formEnglishDefinitions = 'englishDefinitions';
    this.formReadings = 'readings';
    this.formPartsOfSpeech = 'partsOfSpeech';
    this.formNotes = 'notes';

    this.jWordForm = this.formBuilder.group(
      {
        id: null,
        japaneseName: ['', [Validators.required]],
        englishDefinitions: new FormArray([]),
        readings: new FormArray([]),
        partsOfSpeech: '',
        notes: ''
      }
    );
  }

  ngOnInit(): void {
    if (this.id !== undefined) {
      this.actionType = 'Edit';
      this.displayJapaneseWordName = this.name;

      this.japaneseWordService.getJapaneseWord(this.id)
        .subscribe(data => {
          this.japaneseName.setValue(data.japaneseName);
          data.englishDefinitions.forEach(definition => this.addDefinition(definition));
          data.readings.forEach(reading => this.addReading(reading));

          if (this.partsOfSpeechOptions.includes(data.partsOfSpeech)) {
            this.partsOfSpeech.setValue(data.partsOfSpeech);
          }

          this.notes.setValue(data.notes);
        });
    } else {
      this.actionType = 'Add';
    }
  }

  closeModal(): void {
    this.activeModal.dismiss('Modal Closed');
  }

  closeAndSubmitModal(data): void {
    this.activeModal.close(data);
  }

  initDefinitionOrReadingRow(word: string): FormGroup {
    return this.formBuilder.group({
      word: new FormControl(word),
      deleteBtn: [],
    });
  }

  getDefinitions(form): Array<any> {
    return form.controls.englishDefinitions.controls;
  }

  getReadings(form): Array<any> {
    return form.controls.readings.controls;
  }

  isDuplicateDefinition(definition: string): boolean {
    const addedDefinitions = this.getDefinitions(this.jWordForm);
    const matchingDefinitions = addedDefinitions.filter(data => data.controls.word.value === definition && definition != null);
    this.duplicateDefinition = matchingDefinitions.length > 0;
    return matchingDefinitions.length > 0;
  }

  isDuplicateReading(reading: string): boolean {
    const addedReadings = this.getReadings(this.jWordForm);
    const matchingReadings = addedReadings.filter(data => data.controls.word.value === reading && reading != null);
    this.duplicateReading = matchingReadings.length > 0;
    return matchingReadings.length > 0;
  }

  checkIfDefinitionsAreEmpty(): boolean {
    return this.englishDefinitions.length === 0;
  }

  checkIfReadingsAreEmpty(): boolean {
    return this.readings.length === 0;
  }

  checkIfPartsOfSpeechIsSelected(value: string): boolean {
    const a = this.partsOfSpeechOptions.includes(value);
    return a;
  }

  addDefinition(value): void {
    if (!this.isDuplicateDefinition(value) && value !== '') {
      this.englishDefinitions.push(this.initDefinitionOrReadingRow(value));
    }
  }

  addReading(value): void {
    if (!this.isDuplicateReading(value) && value !== '') {
      this.readings.push(this.initDefinitionOrReadingRow(value));
    }
  }

  removeDefinition(index: number): void {
    this.englishDefinitions.removeAt(index);
  }

  removeReading(index: number): void {
    this.readings.removeAt(index);
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.jWordForm.invalid || !this.partsOfSpeechOptions.includes(this.partsOfSpeech.value)) {
      return;
    }

    let englishDefinitions: string[] = [];
    this.englishDefinitions.controls.forEach(engDefControls => {
      englishDefinitions.push(engDefControls.value.word);
    });

    let readings: string[] = [];
    this.readings.controls.forEach(readingControls => {
      readings.push(readingControls.value.word);
    });

    const jWord: JapaneseWord = {
      id: this.id !== undefined ? this.id : null,
      japaneseName: this.japaneseName.value,
      englishDefinitions,
      readings,
      partsOfSpeech: this.partsOfSpeech.value,
      notes: this.notes.value
    };

    this.closeAndSubmitModal(jWord);
  }

  cancel(): void {
    this.closeModal();
  }

  get form() { return this.jWordForm.controls; }
  get japaneseName() { return this.jWordForm.get(this.formJapaneseName); }
  get englishDefinitions(): FormArray { return this.jWordForm.get(this.formEnglishDefinitions) as FormArray; }
  get readings(): FormArray { return this.jWordForm.get(this.formReadings) as FormArray; }
  get partsOfSpeech() { return this.jWordForm.get(this.formPartsOfSpeech); }
  get notes() { return this.jWordForm.get(this.formNotes); }
}
