import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JapaneseWordsComponent } from './JapaneseWords/japanese-words/japanese-words.component';
import { DictionaryComponent } from './dictionary/dictionary.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'japaneseWords', component: JapaneseWordsComponent },
  { path: 'dictionary', component: DictionaryComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
