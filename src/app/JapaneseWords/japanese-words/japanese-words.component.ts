import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { JapaneseWordService } from '../../services/japanese-word.service';
import { JapaneseWord } from '../../models/japaneseWord';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { JapaneseWordFormModalComponent } from '../../modals/japanese-word-form-modal/japanese-word-form-modal.component';

@Component({
  selector: 'app-japanese-words',
  templateUrl: './japanese-words.component.html',
  styleUrls: ['./japanese-words.component.scss']
})
export class JapaneseWordsComponent implements OnInit {
  japaneseWords$: Observable<JapaneseWord[]>;
  japaneseWords: JapaneseWord[];

  constructor(private japaneseWordService: JapaneseWordService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.loadJapaneseWords();
    this.japaneseWords$.subscribe(words => {
      this.japaneseWords = words as JapaneseWord[];
    });
  }

  loadJapaneseWords(): void {
    this.japaneseWords$ = this.japaneseWordService.getJapaneseWords();
  }

  getFirstDefinition(id: number): string {
    const jWords = this.filterJWordById(id);
    return jWords[0].englishDefinitions[0];
  }

  getFirstReading(id: number): string {
    const jWords = this.filterJWordById(id);
    return jWords[0].readings[0];
  }

  filterJWordById(id: number): Array<JapaneseWord> {
    return this.japaneseWords.filter(jWord => jWord.id === id);
  }

  delete(jWord: JapaneseWord): void {
    const ans = confirm('Do you want to delete the japanese word: ' + jWord.japaneseName);
    if (ans) {
      this.japaneseWordService.deleteJapaneseWord(jWord.id).subscribe((data) => {
        this.loadJapaneseWords();
      });
    }
  }

  openFormModal(jWord?: JapaneseWord): void {
    const ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false
    };

    const modalRef = this.modalService.open(JapaneseWordFormModalComponent, ngbModalOptions);
    modalRef.componentInstance.id = jWord.id;
    modalRef.componentInstance.name = jWord.japaneseName;

    modalRef.result.then((data) => {
      this.submitJWord(data);

      console.log(data);
    }).catch((error) => {
      console.log(error);
    });
  }

  submitJWord(jWord: JapaneseWord): void {
    if (jWord.id === undefined || jWord.id === null) {
      this.japaneseWordService.addJapaneseWord(jWord).subscribe(() => {
        this.loadJapaneseWords();
      });
    } else {
      this.japaneseWordService.updateJapaneseWord(jWord.id, jWord).subscribe(() => {
        this.loadJapaneseWords();
      });
    }
  }
}
