"use strict";

/*----------Reviews-----------*/
//js for profile image upload
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
      $('#imagePreview').hide();
      $('#imagePreview').fadeIn(800);
    }
    reader.readAsDataURL(input.files[0]);
  }
}
$("#imageUpload").change(function () {
  readURL(this);
});


//js for dropdown-menu submenu expand
$('.dropdown-menu .dropdown-toggle').on('click', function (e) {
  if (!$(this).next().hasClass('show')) {
    $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
  }
  var $subMenu = $(this).next(".dropdown-menu");
  $subMenu.toggleClass('show');

  $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
    $('.dropdown-submenu .show').removeClass("show");
  });
  return false;
});

$('.filters-menu .dropdown-menu').on('click', function (e) {
  if ($(this).hasClass('dropdown-menu')) {
    e.stopPropagation();
  }
});

/*----------Reviews-----------*/

//js for Search-input
const cmsAddBtn = document.querySelector(".cms-add-btn");
const addCategoryBtn = document.querySelector(".add-category");
const addAttributesBtn = document.querySelector(".add-attribute");
const searchInput = document.querySelector(".search-input");
const hideSearch = document.querySelector(".hide-search");
const addCategory = document.querySelector(".category-add");

//js for show Input
const showInput = (e) => {
  e.preventDefault();
  searchInput.classList.add("show");
  hideSearch.classList.remove("hidden");
  document.querySelector(".search-input input").focus();
};

//js for hide Input
const hideInput = () => {
  searchInput.classList.remove("show");
  hideSearch.classList.add("hidden");
};

//js for cmsAddBtn
(() => {
  if (!cmsAddBtn) return;
  cmsAddBtn.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-category")) {
      addCategoryBtn.addEventListener("click", showInput);
    }
    if (e.target.classList.contains("add-attribute")) {
      addAttributesBtn.addEventListener("click", showInput);
    }
  });
})();

if (hideSearch) {
  hideSearch.addEventListener("click", hideInput);
}

//js for inline add category
if (addCategory) addCategory.addEventListener("click", showInput);

//js for Show Modal
const addCategoryModal = document.getElementById("addCategoryModal");
const addAttributesModal = document.getElementById("addAttributesModal");
const newTextSnippetsModal = document.getElementById("newTextSnippetModal");
const newSellingChannelsModal = document.getElementById("newSellingChannelsModal");
const newTeamModal = document.getElementById("newTeamModal");
const newReviewModal = document.getElementById("newReviewModal");
const newPriceList = document.getElementById("newPriceList");

if (searchInput) {
  searchInput.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    if (e.key === "Enter") {
      e.preventDefault();
      //show editCategoryModal
      if (e.target.classList.contains("category")) {
        $(addCategoryModal).modal("show");
      }

      //show editAttributesModal
      if (e.target.classList.contains("attributes")) {
        $(addAttributesModal).modal("show");
      }

      //show newTextSnippetModal
      if (e.target.classList.contains("textSnippet")) {
        $(newTextSnippetsModal).modal("show");
      }

      //show newSellingChannelsModal
      if (e.target.classList.contains("sellingChannels")) {
        $(newSellingChannelsModal).modal("show");
      }

      //show newTeamModal
      if (e.target.classList.contains("team")) {
        $(newTeamModal).modal("show");
      }

      //show newReviewModal
      if (e.target.classList.contains("review")) {
        $(newReviewModal).modal("show");
      }

      //show newPriceList
      if (e.target.classList.contains("price-list")) {
        $(newPriceList).modal("show");
      }

      //show searchInput
      searchInput.classList.remove("show");
    }
  });
}

//js for Convert byte to size
function bytesToSize(bytes) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "n/a";
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  if (i === 0) return `${bytes} ${sizes[i]})`;
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
}

//js for drag & drop
function dragNdrop(event) {
  console.log('dragNdrop');
  const fileSrc = URL.createObjectURL(event.target.files[0]);
  const fileName = event.target.files[0].name;
  const fileSize = event.target.files[0].size;
  const preview = document.getElementById("preview");
  const html = `
          <div class="preview">
            <div class="preview-file-details">
              <img
                src="${fileSrc}"
                class="preview-img"
                alt="${fileName}"
              />
              <span class="preview-text">${fileName}</span>
              <span class="preview-size">${bytesToSize(fileSize)}</span>
            </div>
            <span class="preview-close">
              <i class="fal fa-times"></i>
            </span>
          </div>
          `;
  preview.insertAdjacentHTML("afterbegin", html);
}

function drag() {
  console.log('drag');
  document.getElementById("uploadFile").parentNode.className = "draging dragBox";
}

function drop() {
  console.log('drop');
  document.getElementById("uploadFile").parentNode.className = "dragBox";
}

//js for remove active class nav-tabs
$(".nav-tabs li").on("click", function () {
  $(".nav-tabs").find(".active").removeClass("active");
  $(this).addClass("active");
});

//js for tooltip
jQuery(function () {
  $(".expand-btn").on('click', function () {
    $(".pruvit-cms").toggleClass("expandSideMenu");
  });
  $('[data-toggle="tooltip"]').tooltip();
});

//js for body content positioning

const dynamicStyle = () => {
  const heading = document.querySelector(".cms-body-header");

  if (heading) {
    const headingHeight = heading.getBoundingClientRect().height;
    document.querySelector(".cms-body-content").style.height = `calc(100vh - ${headingHeight}px)`;
    document.querySelector(".cms-body-content").style.top = `${headingHeight}px`;

    if (document.querySelector(".cms-body-sidenav")) {
      document.querySelector(".cms-body-sidenav").style.top = `${headingHeight}px`;
      document.querySelector(".cms-body-sidenav").style.height = `calc(100vh - ${headingHeight}px)`;
    }

    if (document.querySelector(".cms-body-content.blank")) {
      document.querySelector(".cms-body-content.blank").style.height = `calc(100vh - ${headingHeight}px)`;
    }
  }
};
dynamicStyle();

//js for attributes drag & drop
// $(document).ready(function (e) {
//   $("#attributesDrag").sortable();
// });


jQuery(function () {

  // //js for attributes list edit
  const action = document.querySelectorAll(".action");
  const published = document.querySelectorAll(".published");
  const attributesItem = document.querySelectorAll(".attributes-item");
  const attributesEdit = document.querySelectorAll(".attributes-edit");
  const editAbles = document.querySelectorAll("#attributesItemTitle , #attributesItemNumber");
  const content = document.querySelectorAll(".editable-field");

  const editAttributes = function (e) {
    const edit = e.target.closest(".edit");
    if (edit) {
      attributesItem.forEach((ai) => {
        ai.classList.remove("bg");
      });
      e.target.closest(".attributes-item").classList.add("bg");

      e.target.closest(".action").classList.add("d-none");
      e.target.parentElement.parentElement.nextElementSibling.classList.remove("d-none");

      // js for contentEditable enable
      editAbles.forEach((ea, i) => {
        ea.contentEditable = "true";
      });
    }

    const check = e.target.closest(".check");
    if (check) {
      e.target.closest(".attributes-item").classList.remove("bg");
      e.target.closest(".published").classList.add("d-none");
      document.querySelectorAll(".action").forEach((ac) => {
        ac.classList.remove("d-none");
      });

      //js for contentEditable disable
      editAbles.forEach((ea) => {
        ea.contentEditable = "false";
      });
    }
  };
  attributesEdit.forEach((ed) => ed.addEventListener("click", editAttributes));
});
//js for show select
function checkMe(selected) {
  if (selected) {
    document.getElementById("custom-select").classList.remove("hide");
  } else {
    document.getElementById("custom-select").classList.add("hide");
  }
}

//js for from-check active background
const formCheck = document.querySelectorAll(".switch-bg-show");
formCheck.forEach((el) => {
  el.addEventListener("click", (e) => {
    const formCheckInput = e.target.closest(".form-check-input");
    if (formCheckInput && formCheckInput.checked) {
      e.target.closest(".form-check").classList.add("active");
    } else {
      e.target.closest(".form-check").classList.remove("active");
    }
  });
});

