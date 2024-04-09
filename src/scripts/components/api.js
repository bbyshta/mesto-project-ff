const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-10',
  headers: {
    authorization: '459f3f15-9abd-42cb-bef4-24dbba45bbab',
    'Content-Type': 'application/json'
  }
}

function getUserInfo () {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

function getInitialCards () {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Не удается получить карточки`);
  })
}

function sendProfileChanges (newName, newDescription) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newDescription
    })
  })
  .then((res) => {
    if (!res.ok) {
      return Promise.reject(`Изменения не сохранены! Ошибка: ${res.status}`);
    }
  })
}

function changeAvatar (avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar
    })
  })
  .then((res) => {
    if (!res.ok) {
      return Promise.reject(`Изменения не сохранены! Ошибка: ${res.status}`);
    } else {
      return res.json();
    }
  })
}

function postNewCard (cardData) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link
    })
  })
  .then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка при добавлении карточки: ${res.status}`);
    } else {
      return res.json();
    }
  })
}

function deleteCard (cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => {
    if(!res.ok) {
      return Promise.reject(`Не удалось удалить карточку: ${res.status}`);
    }
  })
}

function likeCard (cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then((res) => {
    if(!res.ok) {
      return Promise.reject(`Не удалось лайкнуть карточку: ${res.status}`);
    } else {
      return res.json();
    }
})
}

function dislikeCard (cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => {
    if(!res.ok) {
      return Promise.reject(`Не удалось убрать лайк: ${res.status}`);
    } else {
      return res.json();
    }
  })
}

export {config, getUserInfo, getInitialCards, sendProfileChanges, postNewCard, deleteCard, likeCard, dislikeCard, changeAvatar};