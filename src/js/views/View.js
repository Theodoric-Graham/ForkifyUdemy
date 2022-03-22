import icons from 'url:../../img/icons.svg'; //Parcel 2

export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    //converts the string into real DOM node objects, basically creates a virtual DOM
    const newDom = document.createRange().createContextualFragment(newMarkup);
    console.log(newDom);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    // console.log(curElements);
    //we will see all the elements that will be contained in this newDom
    //element, that we created from generating the markup on the updated data.
    //produces a node list, that we are turning into an array using Array.from
    // console.log(newElements);

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      //.isEqualNode will compare the contents of one node to the one we pass in
      console.log(curEl, newEl.isEqualNode(curEl));
      // Updates changed TEXT - the value of nodeValue will be null for most node
      //types, but if its text you get the content of the text node
      //so if none of the nodeValues contain text directly, it will be false
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('💥', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }
      // Updates changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        console.log(Array.from(newEl.attributes));
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
