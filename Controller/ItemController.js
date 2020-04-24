import LocalStorageModel from "../Model/StorageConnector.js"

const createItemRegion = document.getElementById("create-item-region");

let ItemTypes = ["clothing", "tierlantin", "decoration"];
let currentItemType;
let totalAmountOfSteps;
let validUserInput;

//form field values
let nameValue;
let descriptionValue;
let purchasePriceValue;
let sellPriceValue;
let currStockValue;
let minStockValue;

//clothing specific
let clothingColorValue;
let clothingSizeValue;

//tierlatin speficic
let weightValue;

//decoration specific
let decorationSize;
let decorationColor;
let amountInPackage;
let storage;
let inventoryController;

//Mode
let mode;

export default class ItemController {
    constructor(invController) {
        inventoryController = invController;
        storage = new LocalStorageModel();
        mode = 'create';
        document.getElementById("create-item-btn").addEventListener('click', initCreationForm)

        document.getElementById("create-item-btn").click();
    }

    update() {
        modeUpdate();
    }

    step2(item, type) {
        createItemStepTwo(item, type);
    }

    hide() {
        hideAllExceptUpdate();
        totalAmountOfSteps = 2;
    }
}

function modeUpdate() {
    mode = 'update';
}

function initCreationForm() {
    //hide other regions
    mode = 'create';
    document.getElementById("clothing-region").classList.add('hide');
    document.getElementById("decoration-region").classList.add('hide');
    document.getElementById("tierlantin-region").classList.add('hide');
    document.getElementById("crud-region").classList.add('hide');
    document.getElementById('clothing-dropdown').parentElement.classList.add('hide');
    document.getElementById('tierlantin-dropdown').parentElement.classList.add('hide');
    document.getElementById('decoration-dropdown').parentElement.classList.add('hide');
    document.getElementById("create-item-region").classList.remove('hide');
    resetForm();
    for (let i = 1; i <= totalAmountOfSteps; i++) {
        let targetStep = 'step' + i;
        removeElementsByClass(targetStep);
    }
    totalAmountOfSteps = 1;
    createItemStepOne();
}

function createItemStepOne() {
    totalAmountOfSteps += 1;

    //step announcer
    let step1announcement = document.createElement('h1');
    step1announcement.classList.add('step1', 'smallMargin');
    step1announcement.innerHTML = 'Step 1: what would you like to make?';
    createItemRegion.append(step1announcement);

    //Clothing handler
    let btnclothingform = document.createElement('button');
    btnclothingform.classList.add('step1');
    btnclothingform.innerHTML = 'Clothing';
    btnclothingform.classList.add('btn', 'btn-info', 'smallMargin');
    createItemRegion.append(btnclothingform);

    btnclothingform.addEventListener('click', () => {
        currentItemType = ItemTypes[0];
        createItemStepTwo();
    });

    //Tierlatin handler
    let btntierlatinform = document.createElement('button');
    btntierlatinform.classList.add('step1');
    btntierlatinform.innerHTML = 'Tierlantin';
    btntierlatinform.classList.add('btn', 'btn-info', 'smallMargin');
    createItemRegion.append(btntierlatinform);

    btntierlatinform.addEventListener('click', () => {
        currentItemType = ItemTypes[1];
        createItemStepTwo();
    });

    //decoration handler
    let btndecorationform = document.createElement('button');
    btndecorationform.classList.add('step1');
    btndecorationform.innerHTML = 'Decoration';
    btndecorationform.classList.add('btn', 'btn-info', 'smallMargin');
    createItemRegion.append(btndecorationform);

    btndecorationform.addEventListener('click', () => {
        currentItemType = ItemTypes[2];
        createItemStepTwo()
    });

}

function createItemStepTwo(item = null, type = null) {
    totalAmountOfSteps += 1;

    removeElementsByClass('step1');

    //creates required layout
    let verticalAlignment = document.createElement('div');
    verticalAlignment.classList.add('row', 'flex-column', 'smallMargin', 'step2');
    createItemRegion.append(verticalAlignment);

    //step announcer
    let step2announcement = document.createElement('h1');
    step2announcement.classList.add('smallVerticalMargin');
    step2announcement.innerHTML = 'Step 2: general information.';
    verticalAlignment.append(step2announcement);

    //name
    let nameLabel = document.createElement('label');
    nameLabel.innerHTML = 'Name';
    nameLabel.classList.add('smallVerticalMargin');
    nameLabel.setAttribute('id', 'item-name-label');
    verticalAlignment.append(nameLabel);

    let nameField = document.createElement('input');
    nameField.classList.add('form-control');
    nameField.setAttribute('id', 'item-name-field');
    verticalAlignment.append(nameField);

    let nameErrorMsg = document.createElement('p');
    nameErrorMsg.setAttribute('id', 'name-error-msg');
    nameErrorMsg.classList.add('alert-warning');
    verticalAlignment.append(nameErrorMsg);

    //description
    let descriptionLabel = document.createElement('label');
    descriptionLabel.innerHTML = 'Description';
    descriptionLabel.classList.add('smallVerticalMargin');
    descriptionLabel.setAttribute('id', 'item-description-label');
    verticalAlignment.append(descriptionLabel);

    let descriptionField = document.createElement('input');
    descriptionField.classList.add('form-control');
    descriptionField.setAttribute('id', 'item-description-field');
    verticalAlignment.append(descriptionField);

    let descriptionErrorMsg = document.createElement('p');
    descriptionErrorMsg.setAttribute('id', 'description-error-msg');
    descriptionErrorMsg.classList.add('alert-warning');
    verticalAlignment.append(descriptionErrorMsg);

    //purchase price
    let purchasePriceLabel = document.createElement('label');
    purchasePriceLabel.innerHTML = 'Purchase price';
    purchasePriceLabel.classList.add('smallVerticalMargin');
    purchasePriceLabel.setAttribute('id', 'item-purchasePrice-label');
    verticalAlignment.append(purchasePriceLabel);

    let purchasePriceField = document.createElement('input');
    purchasePriceField.classList.add('form-control');
    purchasePriceField.setAttribute('id', 'item-purchasePrice-field');
    verticalAlignment.append(purchasePriceField);

    let purchasePriceErrorMsg = document.createElement('p');
    purchasePriceErrorMsg.setAttribute('id', 'purchasePrice-error-msg');
    purchasePriceErrorMsg.classList.add('alert-warning');
    verticalAlignment.append(purchasePriceErrorMsg);

    //sell price excl. btw
    let sellPriceLabel = document.createElement('label');
    sellPriceLabel.innerHTML = 'Sell price excl. btw';
    sellPriceLabel.classList.add('smallVerticalMargin');
    sellPriceLabel.setAttribute('id', 'item-sellPrice-label');
    verticalAlignment.append(sellPriceLabel);

    let sellPriceField = document.createElement('input');
    sellPriceField.classList.add('form-control');
    sellPriceField.setAttribute('id', 'item-sellPrice-field');
    verticalAlignment.append(sellPriceField);

    let sellPriceErrorMsg = document.createElement('p');
    sellPriceErrorMsg.setAttribute('id', 'sellPrice-error-msg');
    sellPriceErrorMsg.classList.add('alert-warning');
    verticalAlignment.append(sellPriceErrorMsg);

    //current stock
    let currStockLabel = document.createElement('label');
    currStockLabel.innerHTML = 'Current stock';
    currStockLabel.classList.add('smallVerticalMargin');
    currStockLabel.setAttribute('id', 'item-curStock-label');
    verticalAlignment.append(currStockLabel);

    let currStockField = document.createElement('input');
    currStockField.classList.add('form-control');
    currStockField.setAttribute('id', 'item-curStock-field');
    verticalAlignment.append(currStockField);

    let currStockErrorMsg = document.createElement('p');
    currStockErrorMsg.setAttribute('id', 'currStock-error-msg');
    currStockErrorMsg.classList.add('alert-warning');
    verticalAlignment.append(currStockErrorMsg);

    //minimal stock
    let minStockLabel = document.createElement('label');
    minStockLabel.innerHTML = 'Minimal stock';
    minStockLabel.classList.add('smallVerticalMargin');
    minStockLabel.setAttribute('id', 'item-minStock-label');
    verticalAlignment.append(minStockLabel);

    let minStockField = document.createElement('input');
    minStockField.classList.add('form-control');
    minStockField.setAttribute('id', 'item-minStock-field');
    verticalAlignment.append(minStockField);

    let minStockErrorMsg = document.createElement('p');
    minStockErrorMsg.setAttribute('id', 'minStock-error-msg');
    minStockErrorMsg.classList.add('alert-warning');
    verticalAlignment.append(minStockErrorMsg);

    if (mode == 'update' && item != null) {
        nameField.value = item.name;
        descriptionField.value = item.description;
        purchasePriceField.value = item.import;
        sellPriceField.value = item.export;
        currStockField.value = item.cur_stock;
        minStockField.value = item.min_stock;
    }

    //To step 3 handler
    let toStepThreeBtn = document.createElement('button');
    toStepThreeBtn.innerHTML = 'To step 3';
    toStepThreeBtn.classList.add('btn', 'btn-info', 'smallMargin');
    verticalAlignment.append(toStepThreeBtn);

    toStepThreeBtn.addEventListener('click', () => {
        validateUserInputStepTwo();
        if (validUserInput) {
            createItemStepThree(item, type);
        }
    });
}

function createItemStepThree(item = null, type = null) {
    totalAmountOfSteps += 1;
    removeElementsByClass('step2');

    //creates required layout
    let verticalAlignment = document.createElement('div');
    verticalAlignment.classList.add('row', 'flex-column', 'smallMargin', 'step3');
    createItemRegion.append(verticalAlignment);

    //step announcer
    let step3announcement = document.createElement('h1');
    step3announcement.classList.add('smallVerticalMargin');
    step3announcement.innerHTML = 'Step 3: item specific information.';
    verticalAlignment.append(step3announcement);

    if (mode == 'update' && item != null) {
        currentItemType = item.type;
    }

    switch (currentItemType) {
        case 'clothing':
            //color
            let clothingColorLabel = document.createElement('label');
            clothingColorLabel.innerHTML = 'Color';
            clothingColorLabel.classList.add('smallVerticalMargin');
            clothingColorLabel.setAttribute('id', 'item-clothing-color-label');
            verticalAlignment.append(clothingColorLabel);

            let clothingColorField = document.createElement('input');
            clothingColorField.classList.add('form-control');
            clothingColorField.setAttribute('id', 'item-clothing-color-field');
            verticalAlignment.append(clothingColorField);

            let clothingColorErrorMsg = document.createElement('p');
            clothingColorErrorMsg.setAttribute('id', 'clothing-color-error-msg');
            clothingColorErrorMsg.classList.add('alert-warning');
            verticalAlignment.append(clothingColorErrorMsg);

            //size
            let clothingSizeLabel = document.createElement('label');
            clothingSizeLabel.innerHTML = 'Size';
            clothingSizeLabel.classList.add('smallVerticalMargin');
            clothingSizeLabel.setAttribute('id', 'item-size-label');
            verticalAlignment.append(clothingSizeLabel);

            let clothingSizeField = document.createElement('input');
            clothingSizeField.classList.add('form-control');
            clothingSizeField.setAttribute('id', 'item-size-field');
            verticalAlignment.append(clothingSizeField);

            let clothingSizeErrorMsg = document.createElement('p');
            clothingSizeErrorMsg.setAttribute('id', 'clothing-size-error-msg');
            clothingSizeErrorMsg.classList.add('alert-warning');
            verticalAlignment.append(clothingSizeErrorMsg);

            //Create clothing piece
            let createClothingBtn = document.createElement('button');
            createClothingBtn.innerHTML = 'Create my clothing item!';
            createClothingBtn.classList.add('btn', 'btn-info', 'smallMargin');
            verticalAlignment.append(createClothingBtn);

            if (mode == 'update' && item != null) {
                clothingColorField.value = item.color;
                clothingSizeField.value = item.size;
            }
            createClothingBtn.addEventListener('click', () => {
                validateUserInputStepThreeTypeClothing();
                if (validUserInput) {
                    if (mode == 'create') {
                        let store = storage.GetList('unused');
                        let last;
                        if (store.products.length == 0) {
                            last = 0;
                        } else {
                            last = parseInt(store.products[store.products.length - 1].placed_at) + 1;
                        }
                        let newItem;
                        newItem = {
                            id: store.products.length,
                            placed_at: last,
                            name: nameValue,
                            type: 'clothing',
                            description: descriptionValue,
                            import: parseInt(purchasePriceValue),
                            export: parseInt(sellPriceValue),
                            export_btw: parseInt(sellPriceValue) * 1.21,
                            min_stock: parseInt(minStockValue),
                            cur_stock: parseInt(currStockValue),
                            color: clothingColorValue,
                            size: clothingSizeValue,
                        }

                        store.products[store.products.length] = newItem;
                        storage.SetList('unused', store);

                        let newDiv = inventoryController.createStartDiv_1(newItem, true);
                        inventoryController.addEmptyListener(newDiv);
                        if (newItem.type == "clothing") {
                            document.getElementById("clothing-dropdown").appendChild(newDiv);
                        }
                        if (newItem.type == "tierlantin") {
                            document.getElementById("tierlantin-dropdown").appendChild(newDiv);
                        }
                        if (newItem.type == "decoration") {
                            document.getElementById("decoration-dropdown").appendChild(newDiv);
                        }
                        document.getElementById("create-item-btn").click();
                    } else if (mode == 'update') {
                        item.name = nameValue;
                        item.type = 'clothing';
                        item.description = descriptionValue;
                        item.import = parseInt(purchasePriceValue);
                        item.export = parseInt(sellPriceValue);
                        item.export_btw = parseInt(sellPriceValue) * 1.21;
                        item.min_stock = parseInt(minStockValue);
                        item.cur_stock = parseInt(currStockValue);
                        item.color = clothingColorValue;
                        item.size = clothingSizeValue;
                        let list = storage.GetList(type);
                        list.products.forEach(function (product) {
                            if (product.placed_at == item.placed_at) {
                                list.products[list.products.indexOf(product)] = item;
                            }
                        });
                        storage.SetList(type, list);
                        document.getElementById("create-item-btn").click();
                    }
                }
            });

            break;
        case 'tierlantin':
            //weight
            let weightLabel = document.createElement('label');
            weightLabel.innerHTML = 'Weight';
            weightLabel.classList.add('smallVerticalMargin');
            weightLabel.setAttribute('id', 'item-weight-label');
            verticalAlignment.append(weightLabel);

            let weightField = document.createElement('input');
            weightField.classList.add('form-control');
            weightField.setAttribute('id', 'item-weight-field');
            verticalAlignment.append(weightField);

            let weightErrorMsg = document.createElement('p');
            weightErrorMsg.setAttribute('id', 'weight-error-msg');
            weightErrorMsg.classList.add('alert-warning');
            verticalAlignment.append(weightErrorMsg);

            //Create tierlatin piece
            let createTierlatinBtn = document.createElement('button');
            createTierlatinBtn.innerHTML = 'Create my tierlantin item!';
            createTierlatinBtn.classList.add('btn', 'btn-info', 'smallMargin');
            verticalAlignment.append(createTierlatinBtn);

            if (mode == 'update' && item != null) {
                weightField.value = item.weight;
            }
            createTierlatinBtn.addEventListener('click', () => {
                validateUserInputStepThreeTypeTierlatin();
                if (validUserInput) {
                    if (mode == 'create') {
                        let store = storage.GetList('unused');
                        let last;
                        if (store.products.length == 0) {
                            last = 0;
                        } else {
                            last = parseInt(store.products[store.products.length - 1].placed_at) + 1;
                        }
                        let newItem;
                        newItem = {
                            id: store.products.length,
                            placed_at: last,
                            name: nameValue,
                            type: 'tierlantin',
                            description: descriptionValue,
                            import: parseInt(purchasePriceValue),
                            export: parseInt(sellPriceValue),
                            export_btw: parseInt(sellPriceValue) * 1.21,
                            min_stock: parseInt(minStockValue),
                            cur_stock: parseInt(currStockValue),
                            weight: parseInt(weightValue)
                        }
                        store.products[store.products.length] = newItem;
                        storage.SetList('unused', store);

                        let newDiv = inventoryController.createStartDiv_1(newItem, true);
                        inventoryController.addEmptyListener(newDiv);
                        if (newItem.type == "clothing") {
                            document.getElementById("clothing-dropdown").appendChild(newDiv);
                        }
                        if (newItem.type == "tierlantin") {
                            document.getElementById("tierlantin-dropdown").appendChild(newDiv);
                        }
                        if (newItem.type == "decoration") {
                            document.getElementById("decoration-dropdown").appendChild(newDiv);
                        }
                        document.getElementById("create-item-btn").click();
                    } else if (mode == 'update') {
                        item.name = nameValue;
                        item.type = 'tierlantin';
                        item.description = descriptionValue;
                        item.import = parseInt(purchasePriceValue);
                        item.export = parseInt(sellPriceValue);
                        item.export_btw = parseInt(sellPriceValue) * 1.21;
                        item.min_stock = parseInt(minStockValue);
                        item.cur_stock = parseInt(currStockValue);
                        item.weight = parseInt(weightValue);
                        let list = storage.GetList(type);
                        list.products.forEach(function (product) {
                            if (product.placed_at == item.placed_at) {
                                list.products[list.products.indexOf(product)] = item;
                            }
                        });
                        storage.SetList(type, list);
                        document.getElementById("create-item-btn").click();
                    }
                }
            });
            break;
        case 'decoration':
            //size
            let decorationSizeLabel = document.createElement('label');
            decorationSizeLabel.innerHTML = 'Size in CM';
            decorationSizeLabel.classList.add('smallVerticalMargin');
            decorationSizeLabel.setAttribute('id', 'item-decoration-size-label');
            verticalAlignment.append(decorationSizeLabel);

            let decorationSizeField = document.createElement('input');
            decorationSizeField.classList.add('form-control');
            decorationSizeField.setAttribute('id', 'item-decoration-size-field');
            verticalAlignment.append(decorationSizeField);

            let decorationSizeErrorMsg = document.createElement('p');
            decorationSizeErrorMsg.setAttribute('id', 'decoration-size-error-msg');
            decorationSizeErrorMsg.classList.add('alert-warning');
            verticalAlignment.append(decorationSizeErrorMsg);

            //color
            let decorationColorLabel = document.createElement('label');
            decorationColorLabel.innerHTML = 'Color';
            decorationColorLabel.classList.add('smallVerticalMargin');
            decorationColorLabel.setAttribute('id', 'item-decoration-color-label');
            verticalAlignment.append(decorationColorLabel);

            let decorationColorField = document.createElement('input');
            decorationColorField.classList.add('form-control');
            decorationColorField.setAttribute('id', 'item-decoration-color-field');
            verticalAlignment.append(decorationColorField);

            let decorationColorErrorMsg = document.createElement('p');
            decorationColorErrorMsg.setAttribute('id', 'decoration-color-error-msg');
            decorationColorErrorMsg.classList.add('alert-warning');
            verticalAlignment.append(decorationColorErrorMsg);

            //package amount
            let packageAmountLabel = document.createElement('label');
            packageAmountLabel.innerHTML = 'Amount in package';
            packageAmountLabel.classList.add('smallVerticalMargin');
            packageAmountLabel.setAttribute('id', 'item-package-amount-label');
            verticalAlignment.append(packageAmountLabel);

            let packageAmountField = document.createElement('input');
            packageAmountField.classList.add('form-control');
            packageAmountField.setAttribute('id', 'item-decoration-package-amount-field');
            verticalAlignment.append(packageAmountField);

            let packageAmountErrorMsg = document.createElement('p');
            packageAmountErrorMsg.setAttribute('id', 'package-amount-error-msg');
            packageAmountErrorMsg.classList.add('alert-warning');
            verticalAlignment.append(packageAmountErrorMsg);

            //Create decoration piece
            let createDecorationBtn = document.createElement('button');
            createDecorationBtn.innerHTML = 'Create my decoration item!';
            createDecorationBtn.classList.add('btn', 'btn-info', 'smallMargin');
            verticalAlignment.append(createDecorationBtn);

            if (mode == 'update' && item != null) {
                decorationSizeField.value = item.sizecm;
                decorationColorField.value = item.color;
                packageAmountField.value = item.amountinpackage;
            }

            createDecorationBtn.addEventListener('click', () => {
                validateUserInputStepThreeTypeDecoration();
                if (validUserInput) {
                    if (mode == 'create') {
                        let store = storage.GetList('unused');
                        let last;
                        if (store.products.length == 0) {
                            last = 0;
                        } else {
                            last = parseInt(store.products[store.products.length - 1].placed_at) + 1;
                        }
                        let newItem;
                        newItem = {
                            id: store.products.length,
                            placed_at: last,
                            name: nameValue,
                            type: 'decoration',
                            description: descriptionValue,
                            import: parseInt(purchasePriceValue),
                            export: parseInt(sellPriceValue),
                            export_btw: parseInt(sellPriceValue) * 1.21,
                            min_stock: parseInt(minStockValue),
                            cur_stock: parseInt(currStockValue),
                            sizecm: decorationSize,
                            color: decorationColor,
                            amountinpackage: amountInPackage
                        }
                        store.products[store.products.length] = newItem;
                        storage.SetList('unused', store);

                        let newDiv = inventoryController.createStartDiv_1(newItem, true);
                        inventoryController.addEmptyListener(newDiv);
                        if (newItem.type == "clothing") {
                            document.getElementById("clothing-dropdown").appendChild(newDiv);
                        }
                        if (newItem.type == "tierlantin") {
                            document.getElementById("tierlantin-dropdown").appendChild(newDiv);
                        }
                        if (newItem.type == "decoration") {
                            document.getElementById("decoration-dropdown").appendChild(newDiv);
                        }
                        document.getElementById("create-item-btn").click();
                    } else if (mode == 'update') {
                        item.name = nameValue;
                        item.type = 'decoration';
                        item.description = descriptionValue;
                        item.import = parseInt(purchasePriceValue);
                        item.export = parseInt(sellPriceValue);
                        item.export_btw = parseInt(sellPriceValue) * 1.21;
                        item.min_stock = parseInt(minStockValue);
                        item.cur_stock = parseInt(currStockValue);
                        item.sizecm = decorationSize;
                        item.color = decorationColor;
                        item.amountinpackage = amountInPackage;
                        let list = storage.GetList(type);
                        list.products.forEach(function (product) {
                            if (product.placed_at == item.placed_at) {
                                list.products[list.products.indexOf(product)] = item;
                            }
                        });
                        storage.SetList(type, list);
                        document.getElementById("create-item-btn").click();
                    }
                }
            });
            break;
    }

}

//user validation
function validateUserInputStepTwo() {
    validUserInput = true;

    //gather values
    nameValue = document.getElementById('item-name-field').value;
    descriptionValue = document.getElementById('item-description-field').value;
    purchasePriceValue = document.getElementById('item-purchasePrice-field').value;
    sellPriceValue = document.getElementById('item-sellPrice-field').value;
    currStockValue = document.getElementById('item-curStock-field').value;
    minStockValue = document.getElementById('item-minStock-field').value;

    if (nameValue == '') {
        validUserInput = false;
        document.getElementById('name-error-msg').classList.remove('hide');
        document.getElementById('name-error-msg').innerHTML = 'Please fill in the name';
    } else {
        document.getElementById('name-error-msg').classList.add('hide');
    }

    if (descriptionValue == '') {
        validUserInput = false;
        document.getElementById('description-error-msg').classList.remove('hide');
        document.getElementById('description-error-msg').innerHTML = 'Please fill in the description';
    } else {
        document.getElementById('description-error-msg').classList.add('hide');
    }

    if (purchasePriceValue == '' || isNaN(purchasePriceValue)) {
        validUserInput = false;
        document.getElementById('purchasePrice-error-msg').classList.remove('hide');
        document.getElementById('purchasePrice-error-msg').innerHTML = 'Please fill in the purchase price (number)';
    } else {
        document.getElementById('purchasePrice-error-msg').classList.add('hide');
    }

    if (sellPriceValue == '' || isNaN(sellPriceValue)) {
        validUserInput = false;
        document.getElementById('sellPrice-error-msg').classList.remove('hide');
        document.getElementById('sellPrice-error-msg').innerHTML = 'Please fill in the sell price (number)';
    } else {
        document.getElementById('sellPrice-error-msg').classList.add('hide');
    }

    if (currStockValue == '' || isNaN(currStockValue)) {
        validUserInput = false;
        document.getElementById('currStock-error-msg').classList.remove('hide');
        document.getElementById('currStock-error-msg').innerHTML = 'Please fill in the current stock (number)';
    } else {
        document.getElementById('currStock-error-msg').classList.add('hide');
    }

    if (minStockValue == '' || isNaN(minStockValue)) {
        validUserInput = false;
        document.getElementById('minStock-error-msg').classList.remove('hide');
        document.getElementById('minStock-error-msg').innerHTML = 'Please fill in the minimum stock (number)';
    } else {
        document.getElementById('minStock-error-msg').classList.add('hide');
    }
}

function validateUserInputStepThreeTypeClothing() {
    validUserInput = true;

    //gather values
    clothingColorValue = document.getElementById('item-clothing-color-field').value;
    clothingSizeValue = document.getElementById('item-size-field').value;

    if (clothingColorValue == '') {
        validUserInput = false;
        document.getElementById('clothing-color-error-msg').classList.remove('hide');
        document.getElementById('clothing-color-error-msg').innerHTML = 'Please fill in the color';
    } else {
        document.getElementById('clothing-color-error-msg').classList.add('hide');
    }

    if (clothingSizeValue == '') {
        validUserInput = false;
        document.getElementById('clothing-size-error-msg').classList.remove('hide');
        document.getElementById('clothing-size-error-msg').innerHTML = 'Please fill in the size';
    } else {
        document.getElementById('clothing-size-error-msg').classList.add('hide');
    }
}

function validateUserInputStepThreeTypeTierlatin() {
    validUserInput = true;

    //gather values
    weightValue = document.getElementById('item-weight-field').value;

    if (weightValue == '' || isNaN(weightValue)) {
        validUserInput = false;
        document.getElementById('weight-error-msg').classList.remove('hide');
        document.getElementById('weight-error-msg').innerHTML = 'Please fill in the weight';
    } else {
        document.getElementById('weight-error-msg').classList.add('hide');
    }
}

function validateUserInputStepThreeTypeDecoration() {
    validUserInput = true;
    //gather values
    decorationSize = document.getElementById('item-decoration-size-field').value;
    decorationColor = document.getElementById('item-decoration-color-field').value;
    amountInPackage = document.getElementById('item-decoration-package-amount-field').value;

    if (decorationSize == '') {
        validUserInput = false;
        document.getElementById('decoration-size-error-msg').classList.remove('hide');
        document.getElementById('decoration-size-error-msg').innerHTML = 'Please fill in the size';
    } else {
        document.getElementById('decoration-size-error-msg').classList.add('hide');
    }

    if (decorationColor == '') {
        validUserInput = false;
        document.getElementById('decoration-color-error-msg').classList.remove('hide');
        document.getElementById('decoration-color-error-msg').innerHTML = 'Please fill in the color';
    } else {
        document.getElementById('decoration-color-error-msg').classList.add('hide');
    }

    if (amountInPackage == '' || isNaN(amountInPackage)) {
        validUserInput = false;
        document.getElementById('package-amount-error-msg').classList.remove('hide');
        document.getElementById('package-amount-error-msg').innerHTML = 'Please fill in the package amount';
    } else {
        document.getElementById('package-amount-error-msg').classList.add('hide');
    }
}

//helper functions
function removeElementsByClass(className) {
    let elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function hideAllExceptUpdate() {
    document.getElementById("clothing-region").classList.add('hide');
    document.getElementById("decoration-region").classList.add('hide');
    document.getElementById("tierlantin-region").classList.add('hide');
    document.getElementById("crud-region").classList.add('hide');
    document.getElementById("create-item-region").classList.remove('hide');
    resetForm();
}

function resetForm() {
    //general
    nameValue = undefined;
    descriptionValue = undefined;
    purchasePriceValue = undefined;
    sellPriceValue = undefined;
    currStockValue = undefined;
    minStockValue = undefined;

    //clothing specific
    clothingColorValue = undefined;
    clothingSizeValue = undefined;

    //tierlantin specific
    weightValue = undefined;

    //decoration specific
    decorationSize = undefined;
    decorationColor = undefined;
    amountInPackage = undefined;

    //validation
    validUserInput = false;
}
