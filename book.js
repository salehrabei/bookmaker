var bookmarks = [];
var Bdelete = [];
var inputs = document.querySelectorAll('input');
var alerts = document.querySelectorAll("p.alert");
var drawn = [];
function submit() {
    var Namesite = document.querySelector("#Name").value;
    var Urlsite = document.querySelector("#Url").value;
    if (NameCh(Namesite) && UrlCh(Urlsite)) {
        var bookmark = { name: Namesite, url: Urlsite };
        bookmarks.push(bookmark);
        localStorage.setItem("bookarks", JSON.stringify(bookmarks));
        hideAlerts();
        displayData();
        Delete();
        AddDelete();
        Clear();} 
}
function hideAlerts() {
    for (var i = 0; i < alerts.length; i++)
        alerts[i].style.display = "none";
}
function Clear() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}
function Drawn(bookmark) {
    for (var i = 0; i < drawn.length; i++)
        if (bookmark == drawn[i])
            return true;
    return false;
}
function displayData() {
    for (var i = 0; i < bookmarks.length; i++) {
        if (!Drawn(bookmarks[i]))
            creat(bookmarks[i]); }
}
function creat(bookmark) {
    var div = document.getElementById('List');
    div.innerHTML += "<div class=\"neww row\" id=\"" + bookmark.name + "\"></div> "; 
    var link = "<a class=\"btn btn-primary\" href=\"" + bookmark.url + "\" target=\"_blank\">visit</a>"; 
    var btndelete = "<button class=\"btn btn-danger btndelete\">Delete</button>"; 
    var h4 = "<h3>" + bookmark.name + "</h3>";
    var neww = document.getElementById(bookmark.name); 
    neww.innerHTML = h4 + link + btndelete; 
    drawn.push(bookmark);
}
function deleteE(bookmark) {
    drawn.splice(drawn.indexOf(bookmark), 1);
    var neww = document.getElementById(bookmark.name); 
    var div = document.getElementById('List'); 	
    var Case = "<div class=\"neww row\" id=\"" + bookmark.name + "\">" + neww.innerHTML + "</div>";
    div.innerHTML = div.innerHTML.replace(Case, "");
    Delete();
    AddDelete();
}
function Delete() {
    Bdelete = document.querySelectorAll(".btndelete");
}
function NameCh(name) {
    if (name == "" ||name == null) {
        return false;
    }
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].name === name)
            return false;
    }
    return true;
}
function UrlCh(url) {
    if (url == ""||url == null) {
        return false;
    }
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url === url)
            return false;
    }
    return true;
}
function AddDelete() {
    for (var i = 0; i < Bdelete.length; i++) {
        Bdelete[i].addEventListener("click", function(e) {
            console.log(e);
            var item = e.target.parentElement;
            for (var i = 0; i < bookmarks.length; i++) {
                if (item.id == bookmarks[i].name) {
                    deleteE(bookmarks[i]);
                    bookmarks.splice(i, 1);
                    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
                }
            }
        })
    }
}