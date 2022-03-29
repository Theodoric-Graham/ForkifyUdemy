import View from './View';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    //need to do this to make 'this' point to the right place previous code
    //caused bug, exported this into another method, then call the method with
    //the correct 'this' keyword bound to it
    //this._overlay.classList.toggle('hidden');
    //this._window.classList.toggle('hidden');
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      //FormData is a modern browser API, that gives us access to all of the form values
      // since we are in a handler 'this', points to the element
      // returns a weird object that we cant really use, so spreading it
      // into an array is the better option
      const dataArr = [...new FormData(this)];
      //the fromEntries method is basically the opposite of the entries method,
      //takes an array of entries, and converts it into an object
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
