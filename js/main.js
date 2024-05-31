var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var submitBtn = document.getElementById("submitBtn");
var errorbox = document.getElementById("errorbox");
var closebox = document.getElementById("closebox");

var bookmarkslist = [];

if (localStorage.getItem("bookmarks") != null) {
  bookmarkslist = JSON.parse(localStorage.getItem("bookmarks"));
  display_bookmark();
}

function add_bookmark() {
  if (
    siteNameInput.classList.contains("is-valid") &&
    siteUrlInput.classList.contains("is-valid") &&
    validationName() == true &&
    validationurl() == true
  ) {
    var bookmark = {
      name: siteNameInput.value,
      url: siteUrlInput.value,
    };
    bookmarkslist.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkslist));
    display_bookmark();
    clear();
    siteNameInput.classList.remove("is-valid");
    siteUrlInput.classList.remove("is-valid");
  } else {
    errorbox.classList.remove("d-none");
  }
}

function clear() {
  siteNameInput.value = null;
  siteUrlInput.value = null;
}

function display_bookmark() {
  var bookmark_dispaly = "";
  for (var i = 0; i < bookmarkslist.length; i++) {
    bookmark_dispaly += `
      <tr>
      <td>${i + 1}</td>
      <td>${bookmarkslist[i].name}</td>
      <td>
        <button onclick="visititem(${i})" class="btn btn-visit">
          <i class="fa-solid fa-eye pe-2"></i>
          <span>Visit</span>
        </button>
      </td>
      <td>
        <button onclick="deleteitem(${i})" class="btn btn-delete">
          <i class="fa-solid fa-trash-can pe-2"></i>
          <span>Delete</span>
        </button>
      </td>
    </tr>`;
  }
  document.getElementById("tbody").innerHTML = bookmark_dispaly;
}

function deleteitem(indexofbookmark) {
  //button delete
  bookmarkslist.splice(indexofbookmark, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkslist));
  display_bookmark();
}

function visititem(indexofbookmark) {
  //button visit
  open(bookmarkslist[indexofbookmark].url);
}

function validationName() {
  // make validation to siteName input
  var text = siteNameInput.value;
  var regex = /^\w{3,}(\s+\w+)*$/;
  if (regex.test(text) == true) {
    siteNameInput.classList.add("is-valid");
    siteNameInput.classList.remove("is-invalid");
    errorbox.classList.add("d-none");
    return true;
  } else {
    siteNameInput.classList.add("is-invalid");
    siteNameInput.classList.remove("is-valid");
    return false;
  }
}

function validationurl() {
  // make validation to URL input
  var text = siteUrlInput.value;
  var regex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
  if (regex.test(text) == true) {
    siteUrlInput.classList.add("is-valid");
    siteUrlInput.classList.remove("is-invalid");
    errorbox.classList.add("d-none");
    return true;
  } else {
    siteUrlInput.classList.add("is-invalid");
    siteUrlInput.classList.remove("is-valid");
    return false;
  }
}

function close_error_box() {
  errorbox.classList.add("d-none");
}

closebox.addEventListener("click", close_error_box); // to delete the error box if press on x icon

document.addEventListener("click", function (e) {
  // to delete the error box if press on outside the error box
  if (e.target.classList.contains("main-page")) {
    close_error_box();
  }
});
