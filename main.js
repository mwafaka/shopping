"use strict";
$(document).ready(() => {
  var cartContentArray = [];

  const items = [
    {
      id: 1,
      imgUrl:
        "https://images-na.ssl-images-amazon.com/images/I/71lwphN2-TL._SL1500_.jpg",
      price: 445,
      type: "laptop",
      title: "Dell"
    },
    {
      id: 2,
      imgUrl:
        "https://www.asus.com/Microsite/No1-Gaming-Monitor-Brand/uploads/se/data/22.png",
      price: 400,
      type: "laptop",
      title: "Asus"
    },
    {
      id: 3,
      imgUrl: "https://www.scan.co.uk/images/products/2754250-a.jpg",
      price: 449,
      type: "laptop",
      title: "Dell"
    },
    {
      id: 4,
      imgUrl:
        "https://s.aolcdn.com/hss/storage/midas/7d59d6eb0cc8f3dc4ea7bba5fab1226f/206201360/SAMSUNG-Galaxy-S8-64-GB-Midnight-Black-.png",
      price: 449,
      type: "smartphone",
      title: "Dell"
    },
    {
      id: 5,
      imgUrl:
        "https://i.kinja-img.com/gawker-media/image/upload/s--pQjKNCHs--/c_scale,f_auto,fl_progressive,q_80,w_800/vrvdlwb8gkrgpnc8aspc.jpg",
      price: 400,
      type: "smartphone",
      title: "Asus"
    },
    {
      id: 6,
      imgUrl: "https://etimg.etb2bimg.com/photo/63427797.cms",
      price: 150,
      type: "smartphone",
      title: "Dell"
    }
  ];

  items.map(item => {
    let itemObj = `<div class="col-12 col-sm-6 col-md-3 col-lg-3 item">
              <img
                class="col-12"
                src="${item.imgUrl}"
                alt="item"
              />
              <h2>${item.title}</h2>
              <p>Price: <em>${item.price}</em></p>
              <button id="${item.id}" class="add-to-cart btn" type="button">
                Add to cart
              </button>
          </div>`;
    $(".item-container").append(itemObj);
  });

  $(".add-to-cart").on("click", function(e) {
    e.preventDefault();
    var id = e.target.id;
    // cartQty++;
    // let itemFounded = false;
    // let itemIndex = null;

    // cartContentArray.forEach((item, i) => {
    //   if (item.id == id) {
    //     itemFounded = true;
    //     itemIndex = i;
    //     alert(itemIndex);
    //   }
    // });
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
    //$(".shopping-cart");
    var cart = $("#cart-qty-id").html(cartContentArray.length);
    // var imgtodrag = $(this)
    //   .parent(".item")
    //   .find("img")
    //   .eq(0);
    // if (imgtodrag) {
    //   var imgclone = imgtodrag
    //     .clone()
    //     .offset({
    //       top: imgtodrag.offset().top,
    //       left: imgtodrag.offset().left
    //     })
    //     .css({
    //       opacity: "0.5",
    //       position: "absolute",
    //       height: "150px",
    //       width: "150px",
    //       "z-index": "100"
    //     })
    //     .appendTo($("body"))
    //     .animate(
    //       {
    //         top: cart.offset().top + 10,
    //         left: cart.offset().left + 10,
    //         width: 75,
    //         height: 75
    //       },
    //       1000,
    //       "easeInOutExpo"
    //     );
    //   imgclone.animate({
    //     width: 0,
    //     height: 0
    //   });
    // }
    //**************************************************** */
    // var cartDom = document.querySelector(".cart");
    // const addToCard = document.querySelectorAll(".item");
    // addToCard.forEach(addTo => {
    //   const productDom = addTo.parentNode;
    //   const product = {
    //     image: productDom.querySelector("img").getAttribute("src"),
    //     name: productDom.querySelector("h2").innerText,
    //     price: productDom.querySelector("p").innerText
    //   };
  });

  //$(".cart").hide();

  $(".cartIcon").on("click", function() {
    //$(".items").css("opacity", "0.5");
    //$(".cart").show();

    $(".cart").html("");

    cartContentArray.forEach((item, id) => {
      let itemObj = "";
      itemObj = `<div>
                    <img
                      class="cart-image"
                      src="${item.imgUrl}"/>
                     <button class="remove-item" id="${item.id}">D</button>
                    <h5>Type:${item.title}</h5>
                    <h5>Price:${item.price}</h5>
                    <h5>Qty:${item.qty}</h5>
                    </div>`;
      $(".cart").append(itemObj);
    });
  });

  $(".cart").on("click", ".remove-item", function(e) {
    let id = e.target.id;
    cartContentArray.forEach((item, i) => {
      if (item.id == i) {
        cartContentArray.splice(i, 1);

        // $(".items").css("opacity", "1");
        //$(`#myId-${id}`).html("");
        return;
      }
      //console.log(i);
    });
    //});

    // $(".cart").on("click", function() {
    //   $(".items").css("opacity", "1");
    //   $(".cart").hide();
  });
});
/*
                $(".cart").on("click", ".delete-cart", function() {
                  $(".cart").hide();
                  $(".items").css("opacity", "1");
                });
                */

//<i class="fas fa-trash-alt remove-item" />;
