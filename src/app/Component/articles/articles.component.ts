import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ArticleService} from '../../Service/article.service';
import {Article} from '../../Model/article/article.model';
import {AgGridNg2} from 'ag-grid-angular';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, OnDestroy {

    @ViewChild('agGrid') agGrid: AgGridNg2;
    articles: any[];
    articlesSubscription = new Subscription();
    loading: string;
    gridApi: any;
    gridColumnApi: any;

    columnDefs = [
        {headerName: 'id', field: 'id', sortable: true, filter: true, checkboxSelection: true, resizable: true, suppressSizeToFit: true},
        {headerName: 'Title', field: 'title', sortable: true, editable: true, filter: true, resizable: true, suppressSizeToFit: true},
        {headerName: 'Content', field: 'content', sortable: true, editable: true, filter: true, resizable: true}
    ];

    rowData: any;

    constructor(private articleService: ArticleService) {
    }

    ngOnInit() {
        this.articleService.getArticles();
        this.articlesSubscription = this.articleService.articlesSubject.subscribe(
            (articles: any[]) => {
                this.articles = articles;
                this.rowData = articles;
            }
        );
        this.articleService.emitArticles();

        this.loading = '<div class="spinner-border text-info" role="status">\n' +
            '  <span class="sr-only">Loading...</span>\n' +
            '</div>';

        // this.rowData = this.articleService.getCars();
    }

    ngOnDestroy() {
        this.articlesSubscription.unsubscribe();
    }

    getSelectedRows() {
        const selectedNodes = this.agGrid.api.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);
        const selectedDataStringPresentation = selectedData.map(node => node.title + ' ' + node.content.substr(0, 10) + '...').join(', ');
        // Make the call to the backend instead of alert
        alert(`Selected nodes: ${selectedDataStringPresentation}`);
    }

    onCellChanged(params: any) {
        const row = params.data;
        this.articleService.updateArticle(row);
    }


    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit();
        window.onresize = () => {
            this.gridApi.sizeColumnsToFit();
        };
    }
}
