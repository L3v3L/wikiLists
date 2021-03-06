//get important objects
var list = document.getElementById("list");
var savedList = document.getElementById("savedList");
var searchQuery = document.getElementById("searchQuery");
var listNameChange = document.getElementById("listNameChange");
var debug = document.getElementById("debug");

//set default state
debug.innerHTML = "";
searchQuery.value = "";
listSelected = "General";
$("#listTitle").text(listSelected);

//set enter key to search
searchQuery.onkeypress = function (e) {
    if (e.keyCode == 13) {
        SearchWiki();
    }
};

//create and open new database
var db = new Dexie("wikiLists");
db.version(1).stores({
    wikis: '&id, &name',
    wikiInList: '++id,wikiId,listName,&[wikiId+listName]'
});
db.open()
    .then(refreshView(listSelected));


/**
 * Searches for parent wikis
 * @param {String} titleToEnhace - Title wiki to search where mentioned
 */
function enhace(titleToEnhace){
    getWikiPagesRelated(titleToEnhace, QueryWikiRelated);
}

/**
 * Change the list currently being viewed to listNameChange.value
 */
function changeList() {
    $('#listChooser').hide();
    listSelected = s.capitalize(listNameChange.value, true);
    //cancel if trying to change to currently viewed list
    if(listSelected === $("#listTitle").text())
        return;
    refreshView(listSelected);
}

/**
 * Change the list currently being viewed to input
 * @param {String} nameOfList - name of list to change to
 */
function changeListButton(nameOfList) {
    $('#listChooser').hide();
    listSelected = s.capitalize(nameOfList, true);
    //cancel if trying to change to currently viewed list
    if(listSelected === $("#listTitle").text())
        return;
    refreshView(listSelected);
}



