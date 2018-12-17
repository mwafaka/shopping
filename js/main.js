var cartContentArray = [];

$(document).ready(() => {
  //scrolling window
  function smoothScroll(targetSelector, duration) {
    var targetContainer = document.querySelector(targetSelector);

    var targetPosition = targetContainer.offsetTop;

    // console.log(targetSelector, targetContainer, targetPosition)
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });
  }
  var scroll1 = document.querySelector(".scroll1");
  var scroll2 = document.querySelector(".scroll2");
  var scroll3 = document.querySelector(".scroll3");
  var scroll4 = document.querySelector(".scroll4");
  scroll1.addEventListener("click", function() {
    smoothScroll("#showcase", 1000);
  });
  scroll2.addEventListener("click", function() {
    smoothScroll("#new", 1000);
  });
  scroll3.addEventListener("click", function() {
    smoothScroll("#feature", 1000);
  });
  scroll4.addEventListener("click", function() {
    smoothScroll("#acc", 1000);
  });
  //item Objects
  const items = [
    {
      id: 1,
      imgUrl: "images/white1.jpeg",
      price: 200,
      type: "Beige Dress",
      title: "Beige Fashion"
    },
    {
      id: 2,
      imgUrl: "images/white2.jpeg",
      price: 200,
      type: "Beige Dress",
      title: "Beige Fashion"
    },
    {
      id: 3,
      imgUrl: "images/white3.jpeg",
      price: 250,
      type: "Beige Dress",
      title: "Beige Fashion"
    },
    {
      id: 4,
      imgUrl: "images/white4.jpeg",
      price: 300,
      type: "Beige Dress",
      title: "Beige Fashion"
    },
    {
      id: 5,
      imgUrl: "images/red1.jpeg",
      price: 250,
      type: "Red Dress",
      title: "New Collection"
    },
    {
      id: 6,
      imgUrl: "images/red2.jpeg",
      price: 200,
      type: "Red Dress",
      title: "New Collection"
    },
    {
      id: 7,
      imgUrl: "images/red3.jpeg",
      price: 150,
      type: "Red Dress",
      title: "New Collection"
    },
    {
      id: 8,
      imgUrl: "images/red4.jpeg",
      price: 200,
      type: "Red Dress",
      title: "New Collection"
    },
    {
      id: 9,
      imgUrl: "images/new.jpeg",
      price: 300,
      type: "Full fit",
      title: "Summer Collection"
    },
    {
      id: 10,
      imgUrl: "images/new1.jpeg",
      price: 150,
      type: "Full fit",
      title: "Summer Collection"
    },
    {
      id: 11,
      imgUrl: "images/new4.jpeg",
      price: 300,
      type: "Full fit",
      title: "Summer Collection"
    },
    {
      id: 12,
      imgUrl: "images/new3.jpeg",
      price: 200,
      type: "Full fit",
      title: "Summer Collection"
    }
  ];
  //create DOM of the Objects
  items.map(item => {
    let itemObj = ` 
                  <div class="col-md-3 card-con mt-5">
                    <div class="card">
                      <img src="${item.imgUrl}" class="card-img-top" alt="">
                      <div class="card-body">
                          <h5>${item.type}</h5>
                          <h5 class="cart-price">$ ${item.price}</h5>
                          <button  id="${
                            item.id
                          }"  class="add-to-cart btn pink  "><i class="fa fa-cart-plus" aria-hidden="true"></i> Add to
                              Cart</button>
                      </div>
                </div>`;
    $(".item-container").append(itemObj);
  });

  //click event to ADD to CART
  $(".add-to-cart").on("click", function(e) {
    e.preventDefault();
    var id = e.target.id;
    //console.log(id)
    let itemIndex = cartContentArray.findIndex(item => item.id == id);
    //console.log(itemIndex)
    if (itemIndex !== -1) {
      cartContentArray[itemIndex].qty += 1;
      cartContentArray[itemIndex].price += items[id - 1].price;
      //console.log("if ran")
    } else {
      //console.log("else ran")
      items.forEach((item, i) => {
        if (item.id == id) {
          cartContentArray.push({
            id: item.id,
            imgUrl: item.imgUrl,
            price: item.price,
            type: item.type,
            title: item.title,
            qty: 1
          });
        }
      });
    }
    console.log(cartContentArray);
    //
    var cart = $("#cart-qty-id").html(cartContentArray.length);

    var imgToDrag = $(this)
      .parent()
      .parent(".card")
      .find("img")
      .eq(0);
    if (imgToDrag) {
      var imgClone = imgToDrag
        .clone()
        .offset({
          top: imgToDrag.offset().top,
          left: imgToDrag.offset().left
        })
        .css({
          opacity: "0.5",
          position: "absolute",
          height: "400px",
          width: "200px",
          "z-index": "100"
        })
        .appendTo($("body"))
        .animate(
          {
            top: cart.offset().top + 10,
            left: cart.offset().left + 10,
            width: 75,
            height: 75
          },
          1000,
          "easeInOutExpo"
        );
      imgClone.animate({
        width: 0,
        height: 0
      });
    }
  });
});
//click event
$("div").on("click", "#cartIcon", function() {
  generateCart();
});
//click event to remove item from the cart
$(".cart").on("click", ".remove-item", function(e) {
  let id = e.target.id;
  let index = cartContentArray.findIndex(item => item.id == id);
  console.log(index);
  cartContentArray.splice(index, 1);
  generateCart();
});
// create the cart
function generateCart() {
  $(".cart").html("");
  if (cartContentArray.length == 0) {
    $(".cart").html(
      "<h5>Your cart is empty, please add to cart some product </h5>"
    );
  } else {
    cartContentArray.forEach((item, id) => {
      let itemObj = "";
      itemObj = `<div>
          <table class="table">
          <thead>
        <tr>
          <td><img
          class="cart-image "
          src="${item.imgUrl}"/></td>
          <td>${item.type}</td>
          <td>$${item.price}</td>
          <td>${item.qty}</td>
          <td> <i class="fas fa-trash-alt remove-item" />
          </td>
        </tr>
      </thead>
          </table>
          </div>`;
      $(".cart").append(itemObj);
    });
    //add total append
    let totalDiv = "";
    totalDiv = `<div> ${getTotal(cartContentArray)} </div>`;
    $(".cart").append(totalDiv);
  }
  // TOTAL
  function getTotal(cartContentArray) {
    let total = 0;
    //let prices = items.price;

    cartContentArray.forEach(function(item) {
      let priceNumber = item.price;
      total += priceNumber;
    });
    return total;
    //return total;
    /*
const totalPrice = total.reduce(function(total,items){
  console.log(typeof((items.price)));
  total += items.price ;
   return total
}, 0);
console.log(totalPrice);*/
  }
}
//GET NEWS API

function changePage() {
  let url = `https://newsapi.org/v2/everything?q=fashion&apiKey=022b49c789a54234b5c034865f978dad`;

  async function getUsers() {
    let res = await fetch(url);
    let data = await res.json();
    //console.log('res.json', data);

    let articles = data.articles;
    let articlesToShow = Math.floor(Math.random() * articles.length - 6);
    //console.log(articles.length + ' ' + articlesToShow);

    articles = articles.slice(articlesToShow, articlesToShow + 6);
    renderOutput(articles);
  }
  getUsers();

  function renderOutput(data) {
    data.forEach(item => {
      //this is function of date after covert it from iso to normal date
      // let newDate = new Date();
      // let articleDate = new Date(item.publishedAt);
      // let minsAgo = Math.round((newDate.getTime() - articleDate.getTime()) / (1000 * 60));
      // let hoursAgo = Math.round(minsAgo / 60);

      // let dateToShow = "";
      // if (hoursAgo == 0) {
      //   if (minsAgo == 1) {
      //     dateToShow = minsAgo.toString() + " Minute Ago";
      //   } else {
      //     dateToShow = minsAgo.toString() + " Minutes Ago";
      //   }

      // } else {
      //   if (hoursAgo == 1) {
      //     dateToShow = hoursAgo.toString() + " Hour Ago";
      //   } else {
      //     dateToShow = hoursAgo.toString() + " Hours Ago";
      //   }

      // }

      // console.log(minsAgo, hoursAgo);

      let show = ` <div class="col-md-6">
      <div class="media mt-5">
          <img src="${item.urlToImage}" class="img-fluid mr-3" alt="">
          <div class="media-body">
            <a class="newsTitle" href="${item.url}" target="_blank"> <h3>${
        item.title
      }t</h3></a>
              <p> ${item.description.slice(0, 100)}..</p>
              <p><i class="fas fa-user-edit"></i> ${item.author}</p>
              
          </div>
      </div>
  </div>`;

      // div += show;
      document.getElementById("demo").innerHTML += show;
    });
  }
}

changePage();
