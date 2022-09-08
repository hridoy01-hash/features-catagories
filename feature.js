
(async function () {
    const BUSINESS_ID = "6304aa113cb8eba9248eac8d";
    const Catagories = `6304ac0b7c41d3abab7e2286,6304abf87c41d3abab7e2271,6304acb21b2dd5af60940b54,63070c926aa739c3c181b89c`;
    let CURRENCY = "BDT";
    const fetauredCatagoriesTitle = `New Arriaval`;
    const showZeroReview = true;
    const DisplayBoxShadow = false;
    const boxShadowColor = `10px 20px 30px blue`;
    const showCartButton = true;
    const showWishlistButton = true;
    const displayRating = true;
    const itemImageBackgroundColor = false;
    const itemNameColor = `#1E272E`;
    const itemVariationColor = `grey`;
    const regularPriceColor = `#BD8448`;
    const oldPriceColor = `grey`;
    const itemOverlayColor = `rgba(30,39,46,80%)`;
    const sectionTitleTextColor = `orange`;
    const sectionBackgroundColor = false;
    const sectionBgColorCode = `rgba(30,39,46,10%)`;
    const addSectionBgImage = false;
    const backgroundimgURL = `url('https://wallpaperaccess.com/full/3430.jpg')`;
    const BackgroundImgOverlay = false;
    const overlayColor = `rgba(30,39,46)`;
    const overlayOpacity = `0.3`;
    let skeletonSingleDiv = document.getElementById("fc001_featured_catagories_all_product_id");
    let skeletonWrapper = document.getElementById("fc001_feature_catagories_skeleton_template_id");
    const fc001_section_title = document.querySelector(".fc001_section_title");
    const fc001_tab_btn_group_id = document.getElementById('fc001_tab_btn_group_id');
    const productBottomAlignmentLeft = `fc001_product_content_left`;
    const productBottomAlignmentCenter = `fc001_product_content_center`;
    const productBottomAlignmentRight = `fc001_product_content_right`;
    const sectionTitleCenter = `fc001_featured_heading_center`;
    const sectionTitleBetween = `fc001_featured_heading_between`;
    const sectionTitleReverse = `fc001_featured_heading_reverse`;
    const showCatagoriesItemSlide = `fc001_tab_content_slide`;
    const showCatagoriesItemGrid = `fc001_tab_content_grid`;
    let screenWidth;
    let slideProductMaxNumber;

    for (let i = 0; i < 10; i++) {
        skeletonSingleDiv.append(skeletonWrapper.content.cloneNode(true));
    };

    window.addEventListener('resize', function (event) {
        screenWidth = document.body.clientWidth;
    }, true);


    // show section title

    const LoadDataFunction = async (url) => { try { let response = await fetch(url, { method: "get", headers: { "businessid": `${BUSINESS_ID}`, "categories": `${Catagories}` } }); response = await response.json(); if (response.Error) { return console.log(response.Error) }; return response; } catch (e) { return }; };

    async function displayFeatureTitle(fetauredCatagoriesTitle) {
        fc001_section_title.innerText = fetauredCatagoriesTitle;
    };
    await displayFeatureTitle(fetauredCatagoriesTitle);

    // section title alignment
    function sectionTitleAlignment() {
        document.getElementById("fc001_featured_heading_id").classList.add(`${sectionTitleCenter}`);
        fc001_section_title.style.color = `${sectionTitleTextColor}`;
    }
    sectionTitleAlignment();
    // show catagories item grid or slide
    function showCatagoriesItemStyle() {
        document.getElementById("fc001_featured_category_items_id").classList.add(`${showCatagoriesItemSlide}`);
    }
    showCatagoriesItemStyle();

    // section bg color 
    function sectionbgColor() {
        if (sectionBackgroundColor == true) {
            document.querySelector(".fc001_featured_category_section").style.backgroundColor = `${sectionBgColorCode}`;
        }
    };
    sectionbgColor();
    // section img color
    function addSectionImage() {
        if (addSectionBgImage == true) {
            document.querySelector(".fc001_featured_category_section").style.backgroundImage = `${backgroundimgURL}`;
        }
    };
    addSectionImage();

    // img or bg
    function showImageOrBgColor() {
        if (sectionBackgroundColor == true && addSectionBgImage == true) {
            document.querySelector(".fc001_featured_category_section").style.backgroundImage = `${backgroundimgURL}`;
        }
    };
    showImageOrBgColor();

    // add img overlay
    function addImageOverlay() {
        if (BackgroundImgOverlay == true) {
            const fc001_bg_overlay = elementMaker("div", ["fc001_bg_overlay"]);
            fc001_bg_overlay.style.backgroundColor = `${overlayColor}`;
            fc001_bg_overlay.style.opacity = `${overlayOpacity}`;
            document.querySelector(".fc001_featured_category_section").appendChild(fc001_bg_overlay);
        }
    };
    addImageOverlay();

    // show catagories btn
    const getCatagoriesName = await LoadDataFunction(`https://api.soppiya.com/v2.1/widget/category/cuscatInfo`);
    let storeCatagoriesData = {};
    async function showCatagoriesbtn(getCatagoriesName) {
        console.log("catNumber", getCatagoriesName);

        const firstId = getCatagoriesName[0]?._id;

        let indexNumber = 0;
        await showCatagoriesItem(firstId, indexNumber);

        viewAllBtnHandle(firstId);

        for (let i = 0; i < getCatagoriesName.length; i++) {
            const element = getCatagoriesName[i];

            let catagoriesTabButton = elementMaker("button", ["fc001_tab_btn"]);
            catagoriesTabButton.innerText = element.name;
            fc001_tab_btn_group_id.appendChild(catagoriesTabButton);
            let CatagiresId = element?._id;
            catagoriesTabButton.addEventListener("click", async function (e) {
                document.getElementById("fc001_featured_catagories_all_product_id").style.minHeight = `339px`;
                let indexNumber = i;
                document.getElementById("fc001_featured_catagories_all_product_id").textContent = " ";
                await showCatagoriesItem(CatagiresId, indexNumber);
                viewAllBtnHandle(CatagiresId);
            });
        }
    };
    await showCatagoriesbtn(getCatagoriesName);

    function activeCatagories() {
        const allTabBtn = document.querySelectorAll(".fc001_tab_btn");
        const firstTabBtn = allTabBtn[0];
        firstTabBtn.classList.add("fc001_active_category");
        for (let i = 0; i < allTabBtn.length; i++) {
            const element = allTabBtn[i];
            element.addEventListener("click", function () {
                RemoveActiveCatagories();
                element.classList.add("fc001_active_category");
            });
        };
    };
    activeCatagories();

    function RemoveActiveCatagories() {
        const allTabBtn = document.querySelectorAll(".fc001_tab_btn");
        for (singleItem of allTabBtn) {
            singleItem.classList.contains("fc001_active_category") && singleItem.classList.remove("fc001_active_category");
        };
    };

    // get catagories all item
    async function showCatagoriesItem(CatagiresId, indexNumber) {

        let getCatagoriesId = CatagiresId;
        let LoadCatagoriesItem;
        const objectKeys = Object.keys(storeCatagoriesData);
        const objectValues = Object.values(storeCatagoriesData);

        async function keyInitialization(getCatagoriesId, LoadCatagoriesItem) {
            storeCatagoriesData[`${getCatagoriesId}`] = LoadCatagoriesItem;
        }

        const foundID = objectKeys.includes(getCatagoriesId);

        if (foundID == false) {
            LoadCatagoriesItem = await LoadDataFunction(`https://api.soppiya.com/v2.1/widget/category/items/${CatagiresId}`);
            await keyInitialization(getCatagoriesId, LoadCatagoriesItem);

        } else if (foundID == true) {
            LoadCatagoriesItem = storeCatagoriesData[`${getCatagoriesId}`];
        }

        console.log("data by id", storeCatagoriesData[`${getCatagoriesId}`]);
        console.log("storeCatagoriesData", storeCatagoriesData);
        showProductSlide(LoadCatagoriesItem);

        if (LoadCatagoriesItem?.length) {
            for (let i = 0; i < 10; i++) {
                skeletonSingleDiv.children[0]?.remove();
            };
        };


        if (LoadCatagoriesItem?.length == 0 || LoadCatagoriesItem === "undefined") {
            const noDataTextWrapper = elementMaker("div", ["fc001_not_found_text_wrapper"]);
            const noDataText = elementMaker("span");
            noDataText.innerText = `No Item found`;
            noDataText.style.fontSize = `30px`;
            noDataText.style.color = `rgba(30,39,46,80%)`;
            noDataTextWrapper.appendChild(noDataText);
            document.querySelector(".fc001_featured_all_items").style.margin = `0 auto`;
            document.getElementById("fc001_featured_catagories_all_product_id").style.minHeight = `350px`;
            document.getElementById("fc001_featured_catagories_all_product_id").style.display = `flex`;
            document.getElementById("fc001_featured_catagories_all_product_id").style.alignItems = `center`;
            document.getElementById("fc001_featured_catagories_all_product_id").appendChild(noDataTextWrapper);
        }

        if (LoadCatagoriesItem?.length === 1) {
            document.getElementById("fc001_featured_catagories_all_product_id").style.justifyContent = "center";
        }

        for (let i = 0; i < LoadCatagoriesItem?.length; i++) {

            const element = LoadCatagoriesItem[i];
            // console.log("element", element);
            let FeatureImage = `https://www.soppiya.com/media/images/${BUSINESS_ID}/item/${element?._id}/${element?.image}`;
            const fc001_single_product = elementMaker("div", ["fc001_single_product"]);
            const fc001_product_top = elementMaker("div", ["fc001_product_top"]);
            const fc001_product_bottom = elementMaker("div", ["fc001_product_bottom"]);
            fc001_single_product.appendChild(fc001_product_top);
            fc001_single_product.appendChild(fc001_product_bottom);
            const fc001_item_overlay = elementMaker("div", ["fc001_item_overlay"]);
            fc001_product_top.appendChild(fc001_item_overlay);
            fc001_item_overlay.style.backgroundColor = `${itemOverlayColor}`;
            const fc001_product_img = elementMaker("div", ["fc001_product_img"]);
            let productImage = elementMaker("img");
            setAttributes(productImage, { "src": `${FeatureImage}` });
            fc001_product_img.appendChild(productImage);
            fc001_product_top.appendChild(fc001_product_img);
            const fc001_batch_wrapper = elementMaker("div", ["fc001_batch_wrapper", "fc001_batch_position_right"]);
            const fc001_batch_txt = elementMaker("div", ["fc001_batch_txt"]);
            if (element?.flashPrice) {
                fc001_batch_txt.innerText = `Sale`;
                fc001_batch_wrapper.appendChild(fc001_batch_txt);
                fc001_product_top.appendChild(fc001_batch_wrapper);
            };
            fc001_single_product.addEventListener("click", function () {
                typeof handleNavigate === "function" && handleNavigate(`(/item/${element.slug}`);
            });

            if (DisplayBoxShadow == true) {
                fc001_single_product.classList.add("fc001_card_shadow");
            }
            if (itemImageBackgroundColor == true) {
                fc001_product_img.style.backgroundColor = `red`;
            }


            // wishlist element
            const fc001_icon_group = elementMaker("div", ["fc001_icon_group"]);
            fc001_product_top.appendChild(fc001_icon_group);
            const fc001_icon_group_wrapper = elementMaker("div", ["fc001_icon_group_wrapper"]);
            fc001_icon_group.appendChild(fc001_icon_group_wrapper);
            const fc001_wishlist_icon_wrapper = elementMaker("div", ["fc001_wishlist_icon_wrapper"], `fc001_wishlist_icon_wrapper_id_${element?._id}`);
            fc001_icon_group_wrapper.appendChild(fc001_wishlist_icon_wrapper);
            let fc001_tooltip = elementMaker("div", ["fc001_tooltip"]);
            fc001_wishlist_icon_wrapper.appendChild(fc001_tooltip);
            let fc001_tooltip_txt_wrapper = elementMaker("div", ["fc001_tooltip_txt_wrapper"]);
            fc001_tooltip.appendChild(fc001_tooltip_txt_wrapper);
            let fc001_tooltip_txt = elementMaker("p", ["fc001_tooltip_txt"]);
            fc001_tooltip_txt.innerText = `Add to Wishlist`;
            fc001_tooltip_txt_wrapper.appendChild(fc001_tooltip_txt);
            const fc001_icon = elementMaker("div", ["fc001_icon", "fc001_wishlist_icon"]);
            fc001_icon.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" width="11.505"
                                                height="10.995" viewBox="0 0 11.505 10.995">
                                                <path id="heart"
                                                    d="M7.286.917A2.666,2.666,0,0,0,5,2.291,2.666,2.666,0,0,0,2.7.917,2.832,2.832,0,0,0,0,3.853C0,6.675,4.56,9.934,4.754,10.072l.241.17.241-.17c.194-.137,4.757-3.4,4.757-6.219A2.832,2.832,0,0,0,7.286.917Z"
                                                    transform="translate(0.757 -0.167)" fill="#1e272e"
                                                    stroke="#1e272e" stroke-width="1.5" />
                                            </svg>`;


            if (element?.hasVariations == false && showWishlistButton == true) {
                fc001_wishlist_icon_wrapper.appendChild(fc001_icon);
            }

            // add or remove wishlist 
            const fc001_item_action = elementMaker("div", ["fc001_item_action"]);
            fc001_product_top.appendChild(fc001_item_action);
            const fc001_item_action_content = elementMaker("div", ["fc001_item_action_content"]);
            fc001_item_action.appendChild(fc001_item_action_content);
            const fc001_item_action_txt = elementMaker("span", ["fc001_item_action_txt"]);
            fc001_item_action_txt.innerText = `Remove suceessfully`;
            fc001_item_action_content.appendChild(fc001_item_action_txt);


            /*  (async function checkWishlist() {
                 let wishlistData;
                 wishlistData = typeof getWishlist === "function" && await getWishlist();

                 for (i = 0; i <= wishlistData?.length; i++) {
                     let data = wishlistData[i];
                     if (data.entityId === element._id && data.selectorId === element._id) {
                         fc001_wishlist_icon_wrapper.children[1].classList.add("fc001_active_icon");
                     } else if (data.entityId === element._id && data.selectorId == "") {
                         fc001_wishlist_icon_wrapper.children[1].classList.add("fc001_active_icon");
                     } else if (data.entityId === element._id) {
                         fc001_wishlist_icon_wrapper.children[1].classList.add("fc001_active_icon");
                     };
                 }
             })(); */


            fc001_wishlist_icon_wrapper.addEventListener("click", async function () {
                event.stopPropagation();
                console.log("wishlist Click");

                if (document.getElementById(`fc001_wishlist_icon_wrapper_id_${element._id}`).children[1].classList.contains("fc001_active_icon")) {
                    // console.log("true");
                    let productRemovedFronWishlist = typeof handleWishlistAction === "function" && await handleWishlistAction("delete", {
                        type: "item",
                        Id: element._id,
                        quantity: 1
                    });
                    if (productRemovedFronWishlist.status === true) {
                        document.getElementById(`fc001_wishlist_icon_wrapper_id_${element._id}`).children[1].classList.remove("fc001_active_icon");
                        fc001_item_action_txt.innerText = ` Remove Successfull`;
                        fc001_tooltip_txt.innerText = `Add to Wishlist`;
                        setTimeout(() => {
                            fc001_item_action.classList.add("fc001_item_action_show");
                            console.log("added succesfull");
                        }, "100");
                    };

                };


                if (!document.getElementById(`fc001_wishlist_icon_wrapper_id_${element._id}`).children[1].classList.contains("fc001_active_icon")) {
                    let productRemovedFronWishlist = typeof handleWishlistAction === "function" && await handleWishlistAction("add", {
                        type: "item",
                        Id: element._id,
                        quantity: 1
                    });
                    if (productRemovedFronWishlist.status === true) {
                        document.getElementById(`fc001_wishlist_icon_wrapper_id_${element._id}`).children[1].classList.add("fc001_active_icon");
                        fc001_tooltip_txt.innerText = `Remove from Wishlist`;
                        setTimeout(() => {
                            fc001_item_action_txt.innerText = `Add suceessfully`;
                            fc001_item_action.classList.add("fc001_item_action_show");
                            console.log("remove succesfull");
                        }, "100");
                    };

                };

            });


            // cart element
            const fc001_cart_view_icon_group = elementMaker("div", ["fc001_cart_view_icon_group"]);
            fc001_icon_group_wrapper.appendChild(fc001_cart_view_icon_group);
            const fc001_cart_icon_wrapper = elementMaker("div", ["fc001_cart_icon_wrapper"], `fc001_cart_icon_wrapper_id_${element?._id}`);
            fc001_cart_view_icon_group.appendChild(fc001_cart_icon_wrapper);
            const cartToltipWrapper = elementMaker("div", ["fc001_tooltip"]);
            fc001_cart_icon_wrapper.appendChild(cartToltipWrapper);
            const cart_fc001_tooltip_txt_wrapper = elementMaker("div", ["fc001_tooltip_txt_wrapper"]);
            cartToltipWrapper.appendChild(cart_fc001_tooltip_txt_wrapper);
            const cartToltipText = elementMaker("p", ["fc001_tooltip_txt"]);
            cartToltipText.innerText = `Add to Cart`;
            cart_fc001_tooltip_txt_wrapper.appendChild(cartToltipText);

            const fc001_iconCart = elementMaker("div", ["fc001_icon", "fc001_cart_icon"]);
            fc001_iconCart.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                                                    viewBox="0 0 14 14">
                                                    <path id="shopping-bag_1_" data-name="shopping-bag (1)"
                                                        d="M10.5,3.5a3.5,3.5,0,1,0-7,0H0v8.75A1.75,1.75,0,0,0,1.75,14h10.5A1.75,1.75,0,0,0,14,12.25V3.5ZM7,1.167A2.333,2.333,0,0,1,9.333,3.5H4.667A2.333,2.333,0,0,1,7,1.167Z"
                                                        fill="#1e272e" />
                                                </svg>
            `;

            if (element?.hasVariations == false && showCartButton == true) {
                fc001_cart_icon_wrapper.appendChild(fc001_iconCart);
            };


            // add or remove cart
            /*  (async function checkCartData() {
                 let cartData;
                 cartData = typeof handleCartCompilation === "function" && await handleCartCompilation();

                 for (i = 0; i <= CartItemData?.length; i++) {
                     let data = CartItemData[i];
                     if (data.entityId === element._id && data.selectorId === element._id) {
                         fc001_cart_icon_wrapper.children[1].classList.add("fc001_active_icon");
                     } else if (data.entityId === element._id && data.selectorId == "") {
                         fc001_cart_icon_wrapper.children[1].classList.add("fc001_active_icon");
                     } else if (data.entityId === element._id) {
                         fc001_cart_icon_wrapper.children[1].classList.add("fc001_active_icon");
                     };
                 }
             })(); */

            fc001_cart_icon_wrapper.addEventListener("click", async function (event) {
                event.stopPropagation();
                console.log("Cart Clicked");
                if (document.getElementById(`fc001_cart_icon_wrapper_id_${element._id}`).children[1].classList.contains("fc001_active_icon")) {
                    // console.log("true");
                    let productRemovedFronCart = typeof handleCartAction === "function" && await handleWishlistAction("delete", {
                        type: "item",
                        Id: element._id,
                        quantity: 1
                    });
                    if (productRemovedFronCart.status === true) {
                        document.getElementById(`fc001_cart_icon_wrapper_id_${element._id}`).children[1].classList.remove("fc001_active_icon");
                        fc001_item_action_txt.innerText = `Remove suceessfully`;
                        fc001_tooltip_txt.innerText = `Add to Cart`;
                        setTimeout(() => {
                            fc001_item_action.classList.add("fc001_item_action_show");
                            console.log("added succesfull");
                        }, "100");
                    };

                };

                if (!document.getElementById(`fc001_cart_icon_wrapper_id_${element._id}`).children[1].classList.contains("fc001_active_icon")) {
                    // console.log("true");
                    let productRemovedFronCart = typeof handleCartAction === "function" && await handleWishlistAction("add", {
                        type: "item",
                        Id: element._id,
                        quantity: 1
                    });
                    if (productRemovedFronCart.status === true) {
                        document.getElementById(`fc001_cart_icon_wrapper_id_${element._id}`).children[1].classList.add("fc001_active_icon");
                        cartToltipText.innerText = `Remove from Cart`;
                        setTimeout(() => {
                            fc001_item_action.classList.add("fc001_item_action_show");
                            fc001_item_action_txt.innerText = `Add suceessfully`;
                            console.log("added succesfull");
                        }, "100");
                    };

                };


            });

            // view details element
            const fc001_view_details_icon_wrapper = elementMaker("div", ["fc001_view_details_icon_wrapper"]);
            fc001_cart_view_icon_group.appendChild(fc001_view_details_icon_wrapper);

            const viewMoreToltipWrapper = elementMaker("div", ["fc001_tooltip"]);
            fc001_view_details_icon_wrapper.appendChild(viewMoreToltipWrapper);
            const viewMoreToltiptextWrapper = elementMaker("div", ["fc001_tooltip_txt_wrapper"]);
            viewMoreToltipWrapper.appendChild(viewMoreToltiptextWrapper);
            const viewMoreToltiptext = elementMaker("p", ["fc001_tooltip_txt"]);
            viewMoreToltiptext.innerText = `View Details`;
            viewMoreToltiptextWrapper.appendChild(viewMoreToltiptext)
            const fc001_view_details_icon = elementMaker("div", ["fc001_icon", "fc001_view_details_icon"]);
            fc001_view_details_icon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="12.2"
                                                    height="12.2" viewBox="0 0 12.2 12.2">
                                                    <path id="info_1_" data-name="info (1)"
                                                        d="M12,6A6,6,0,1,1,6,0,6,6,0,0,1,12,6ZM7,6A1,1,0,0,0,6,5H5V6H6V9.5H7ZM6,2.5a.75.75,0,1,0,.75.75A.75.75,0,0,0,6,2.5Z"
                                                        transform="translate(0.1 0.1)" stroke="#fff"
                                                        stroke-width="0.2" />
                                                </svg>
             `;
            if (element?.hasVariations == true) {
                fc001_view_details_icon_wrapper.appendChild(fc001_view_details_icon);
                fc001_view_details_icon.addEventListener("click", function () {
                    console.log("slug", element.slug);
                    typeof handleNavigate === "function" && handleNavigate(`(/item/${element.slug}`);
                });
            };

            // product bottom content
            const fc001_product_content = elementMaker("div", ["fc001_product_content", `${productBottomAlignmentCenter}`]);
            fc001_product_bottom.appendChild(fc001_product_content);
            const fc001_product_name_wrapper = elementMaker("div", ["fc001_product_name_wrapper"]);
            fc001_product_content.appendChild(fc001_product_name_wrapper);
            const fc001_product_name = elementMaker("p", ["fc001_product_name"]);
            fc001_product_name.innerText = `${element?.name}`;
            fc001_product_name_wrapper.appendChild(fc001_product_name);
            fc001_product_name.style.color = `${itemNameColor}`;
            const fc001_product_variant = elementMaker("div", ["fc001_product_variant"]);
            fc001_product_content.appendChild(fc001_product_variant);
            const fc001_product_variant_txt = elementMaker("span", ["fc001_product_variant_txt"]);
            fc001_product_variant_txt.innerText = `Black,Metal`;
            fc001_product_variant.appendChild(fc001_product_variant_txt);
            fc001_product_variant_txt.style.color = `${itemVariationColor}`;
            const fc001_product_price_wrapper = elementMaker("div", ["fc001_product_price_wrapper"]);
            fc001_product_content.appendChild(fc001_product_price_wrapper);
            const fc001_product_price_regular = elementMaker("span", ["fc001_product_price", "fc001_product_regular_price"]);
            fc001_product_price_regular.innerText = ` ${CURRENCY} ${element?.price}`;
            fc001_product_price_regular.style.color = `${regularPriceColor}`;
            fc001_product_price_wrapper.appendChild(fc001_product_price_regular);
            const fc001_product_old_price = elementMaker("span", ["fc001_product_old_price", "fc001_product_price"]);
            fc001_product_old_price.style.color = `${oldPriceColor}`;
            fc001_product_old_price.innerText = `${CURRENCY} ${element?.flashPrice}`;
            if (element?.flashPrice) {
                fc001_product_price_wrapper.appendChild(fc001_product_old_price);
            }


            // product review showing
            const reviewParentElement = elementMaker("div", ["fc001_product_review_area"]);
            const ratingNumber = element?.reviewRating?.rating;
            function showReviewStar(ratingNumber, reviewParentElement) {
                let stars = ratingNumber;
                let starsFloor = Math.floor(stars);
                // console.log("starsFloor", starsFloor);
                for (let i = 0; i < starsFloor; i++) {
                    let fc001_review_star = elementMaker("span", ["fc001_review_star"]);
                    fc001_review_star.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11"> <path id="Star" d="M59.5,72.843,62.9,75,62,70.93l3-2.736-3.955-.357L59.5,64l-1.545,3.837L54,68.194l3,2.736L56.1,75Z" transform="translate(-54 -64)" fill="#fed300"></path> </svg>
                     `

                    reviewParentElement.appendChild(fc001_review_star);

                };
                let starDecimal = stars - starsFloor;
                if (starDecimal > 0) {
                    let fc001_review_star = elementMaker("span", ["fc001_review_star"]);
                    fc001_review_star.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="11" height="11" viewBox="0 0 11 11"> <defs> <linearGradient id="linear-gradient" y1="0.384" x2="1" y2="0.381" gradientUnits="objectBoundingBox"> <stop offset="0" stop-color="#fed300"></stop> <stop offset="0.5" stop-color="#fbd414"></stop> <stop offset="0.503" stop-color="#dedbcc"></stop> <stop offset="1" stop-color="#dcdcdc"></stop> </linearGradient> </defs> <path id="Star" d="M59.5,72.843,62.9,75,62,70.93l3-2.736-3.955-.357L59.5,64l-1.545,3.837L54,68.194l3,2.736L56.1,75Z" transform="translate(-54 -64)" fill="url(#linear-gradient)"></path> </svg>
                                `;
                    reviewParentElement.appendChild(fc001_review_star);
                };
                if ((5 - stars) > 0) {
                    for (let i = 0; i < Math.floor((5 - stars)); i++) {
                        let fc001_review_star = elementMaker("span", ["fc001_review_star"]);
                        fc001_review_star.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11"> <path id="Star" d="M59.5,72.843,62.9,75,62,70.93l3-2.736-3.955-.357L59.5,64l-1.545,3.837L54,68.194l3,2.736L56.1,75Z" transform="translate(-54 -64)" fill="#dfdfdf"></path> </svg>
                                `;
                        reviewParentElement.appendChild(fc001_review_star);
                    };
                };

                if (showZeroReview == true && displayRating == true) {
                    if (ratingNumber == 0 || ratingNumber !== 0) {
                        fc001_product_content.appendChild(reviewParentElement);
                    }
                } else if (showZeroReview == false) {
                    if (ratingNumber !== 0) {
                        fc001_product_content.appendChild(reviewParentElement);
                    }
                }


            }
            showReviewStar(ratingNumber, reviewParentElement);

            fc001_featured_catagories_all_product_id.appendChild(fc001_single_product);
        }
    };


    // hnadle slide controler

    const nextButton = document.querySelectorAll(".fc001_next_btn_wrapper");
    const previousButton = document.querySelectorAll(".fc001_prev_btn_wrapper");
    const allProductWrapper = document.querySelectorAll(".fc001_tab_content");

    function showProductSlide(LoadCatagoriesItem) {
        let slideProduct = LoadCatagoriesItem;
        slideProductMaxNumber = slideProduct.length;
    }
    console.log("slideProductMaxNumber", slideProductMaxNumber);

    allProductWrapper.forEach((item, i) => {

        let containerDimensions = document.querySelector(".fc001_single_product").getBoundingClientRect();

        containerDimensions = containerDimensions.width + 20;
        console.log("containerDimensions", containerDimensions);

        let nextBtnClick = 0;
        let previousBtnClick = 0;


        nextButton[i].addEventListener('click', () => {
            nextBtnClick++;
            /*  if (screenWidth <= 640) {
                 let showProduct = 3;
                 if (nextBtnClick == ((slideProductMaxNumber - showProduct))) {
                     document.getElementById("fc001_next_btn_wrapper_id").style.visibility = "hidden";
                 }
             }
 
             if (screenWidth => 640 && screenWidth < 900) {
                 let showProduct = 3;
                 if (nextBtnClick == (slideProductMaxNumber - showProduct)) {
                     document.getElementById("fc001_next_btn_wrapper_id").style.visibility = "hidden";
                 }
             } */

            item.scrollLeft += containerDimensions;
            allProductWrapper[i].style.overflowX = "scroll";
            item.style.scrollBehavior = "smooth";
            item.style.justifyContent = "flex-start";

        });


        previousButton[i].addEventListener('click', () => {
            previousBtnClick++;
            item.scrollLeft -= containerDimensions;
            allProductWrapper[i].style.overflowX = "scroll";
            item.style.scrollBehavior = "smooth";
            item.style.justifyContent = "flex-start";
        });

    });





    // view all btn
    function viewAllBtnHandle(CatagiresId) {
        document.getElementById("fc001_featured_item_btn_wrapper_id").addEventListener("click", function () {
            typeof handleNavigate === "function" && handleNavigate(`/category/${CatagiresId}`);
            console.log(`(/category/${CatagiresId}}`);
        });
    };


    function elementMaker(name, className, id) {
        try {
            let element = document.createElement(name);
            className && (element.className = className.join(" "));
            id && (element.id = id);
            return element;
        } catch (err) { };
    };
    function setAttributes(elementName, allAttributes) {
        for (let key in allAttributes) {
            elementName.setAttribute(key, allAttributes[key]);
        };
    };

})();