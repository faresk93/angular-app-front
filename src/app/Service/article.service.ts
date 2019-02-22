import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Article} from '../Model/article/article.model';
import {pipe, Subject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  articles: Article[] = [];
  articlesSubject = new Subject<Article[]>();
  articles_url = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient, private notifier: ToastrService) {
  }

  emitArticles() {
    this.articlesSubject.next(this.articles.slice());
  }

  getArticles() {
    const uri = 'api/articles';
    const url = this.articles_url + uri;
    this.http.get<any[]>(url)
      .subscribe(
        (response) => {
          this.articles = response;
          this.emitArticles();
        });
  }

  updateArticle(row) {
    const uri = 'api/articles/' + row.id;
    const url = this.articles_url + uri;
    this.http.put(url, row)
      .subscribe(
        () => {
          this.notifier.success('Update complete !', 'Row Updated');
        },
        (error) => {
          this.notifier.error(error, 'Error');
        }
      );
  }

  getCars() {
    return this.http.get('https://api.myjson.com/bins/15psn9');
  }
}

