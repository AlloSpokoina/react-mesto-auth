class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
  }


  _checkResponse(res) { return res.ok ? res.json() : Promise.reject(new Error(`Ошибка: ${res.status}`)); }


  _request(endpoint, options) {
    return fetch(endpoint, options).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    const method = isLiked ? 'PUT' : 'DELETE';
    return this._request(`${this._url}/cards/likes/${cardId}`, {
      method,
      headers: {
        authorization: this._authorization,
      },
    });
  }

  getInfo() {
    return this._request(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization,
      },
    });
  }

  getCards() {
    return this._request(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization,
      },
    });
  }

  setUserInfo(data) {
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.info,
      }),
    });
  }

  setAddNewAvatar(data) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }

  addCard(data) {
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  }

  addLike(cardId) {
    return this._request(`${this._url}/cards/${cardId}/like`, {
      method: 'PUT'
    });
  }

  deleteLike(cardId) {
    return this._request(`${this._url}/cards/${cardId}/like`, {
      method: 'DELETE'
    });
  }

  deleteCard(cardId) {
    return this._request(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
      },
    });
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: 'c3abc8e3-f6eb-4cdd-887e-2838650a2c76',
    'Content-Type': 'application/json',
  },
});

export default api;
