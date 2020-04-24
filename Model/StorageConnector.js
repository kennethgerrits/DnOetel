export default class LocalStorageModel {

    constructor(){
        if (localStorage.getItem('used') == null) {
            let used = { products: [] };
            localStorage.setItem('used', JSON.stringify(used));
        }
        if (localStorage.getItem('unused') == null) {
            let unused = { products: [] };
            let jurk = {
                id: 1,
                placed_at: 0,
                name: "jurk",
                type: "clothing",
                description: "Rode jurk van zijden draad",
                import: 5.00,
                export: 7.50,
                export_btw: 7.50 * 1.25,
                min_stock: 2,
                cur_stock: 3,
                color: "red",
                size: "XL"
            };
            unused.products[unused.products.length] = jurk;
            localStorage.setItem('unused', JSON.stringify(unused));
        }
    }

    GetList(listtype){
        return JSON.parse(localStorage.getItem(listtype));
    }

    SetList(listtype, list){
        localStorage.setItem(listtype, JSON.stringify(list));
    }
}