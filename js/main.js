var cartContentArray = [];

$(document).ready(() => {
  function smoothScroll(target, duration) {
    var target = document.querySelector(target);
    var targetPosition = target.getBoundingClientRect().top;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      var timeElapsed = currentTime - startTime;
      var run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }
    requestAnimationFrame(animation);
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
  //////////////////////////////////////////////////////////////////////////////////////
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
  items.map(item => {
    let itemObj = ` 
                  <div class="col-md-3 card-con mt-5">
                    <div class="card">
                      <img src="${item.imgUrl}" class="card-img-top" alt="">
                      <div class="card-body">
                          <h5>${item.type}</h5>
                          <h5>${item.price}</h5>
                          <button  id="${
                            item.id
                          }"  class="add-to-cart btn pink btn-danger "><i class="fa fa-cart-plus" aria-hidden="true"></i> Add to
                              Cart</button>
                      </div>
                </div>`;
    $(".item-container").append(itemObj);
  });
  $(".add-to-cart").on("click", function(e) {
    e.preventDefault();
    var id = e.target.id;
    let itemIndex = cartContentArray.findIndex(item => item.id == id);
    if (itemIndex !== -1) {
      cartContentArray[itemIndex].qty += 1;
      cartContentArray[itemIndex].price += cartContentArray[itemIndex].price;
    } else {
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
    //****************************************************************************** */
    var cart = $("#cart-qty-id").html(cartContentArray.length);

    var imgtodrag = $(this)
      .parent()
      .parent(".card")
      .find("img")
      .eq(0);
    if (imgtodrag) {
      var imgclone = imgtodrag
        .clone()
        .offset({
          top: imgtodrag.offset().top,
          left: imgtodrag.offset().left
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
      imgclone.animate({
        width: 0,
        height: 0
      });
    }
  });
});
////////////////////////////////////////////////////////
$("div").on("click", "#cartIcon", function() {
  generateCart();
});

$(".cart").on("click", ".remove-item", function(e) {
  let id = e.target.id;
  let index = cartContentArray.findIndex(item => item.id == id);
  console.log(index);
  cartContentArray.splice(index, 1);
  generateCart();
});

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
          <td>${item.price}</td>
          <td>${item.qty}</td>
          <td> <i class="fas fa-trash-alt remove-item" />
          </td>
        </tr>
      </thead>
          </table>
          </div>`;
      $(".cart").append(itemObj);
    });
  }
}
