const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-10',
  headers: {
    authorization: '459f3f15-9abd-42cb-bef4-24dbba45bbab',
    'Content-Type': 'application/json'
  }
}

function checkResStatus (res) {
  if (res.ok) {
    return (res.json());
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

function getUserInfo () {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then((res) => {
    return checkResStatus(res);
  })
}

function getInitialCards () {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then((res) => {
    return checkResStatus(res);
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
    return checkResStatus(res);
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
    return checkResStatus(res);
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
    return checkResStatus(res);
  })
}

function deleteCard (cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => {
    return checkResStatus(res);
  })
}

function likeCard (cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then((res) => {
    return checkResStatus(res);
  })
}

function dislikeCard (cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => {
    return checkResStatus(res);
  })
}

export {getUserInfo, getInitialCards, sendProfileChanges, postNewCard, deleteCard, likeCard, dislikeCard, changeAvatar};