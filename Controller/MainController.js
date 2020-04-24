import WeatherController from './WeatherController.js';
import InventoryController from './InventoryController.js';
import ViewController from '../View/ViewController.js';
import ItemController from './ItemController.js';

let viewController = new ViewController();
let inventoryController = new InventoryController();
let weatherController = new WeatherController();
let itemController = new ItemController(inventoryController);
inventoryController.addItemController(itemController);

