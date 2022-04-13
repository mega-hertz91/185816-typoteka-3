'use strict';

const templateComment = (comment) => `
<img class="last__list-image" src="/img/${comment.User.avatar}" width="20" height="20" alt="${comment.User.firstName}">
<b class="last__list-name">${comment.User.firstName} ${comment.User.lastName}</b>
<a class="last__list-link" href="/articles/10"><span>${comment.message}</span></a>
`;

const templatePublication = (publication) => `
 <time class="preview__time" datetime="#{article.createDate}"></time>
 <h3 class="preview__name"><a class="preview__name-link" href="/articles/${publication.id}"
 >${publication.title}</a></h3>
 <p class="preview__text">${publication.announce.slice(0, 100)}</p>
 <a class="preview__comment" href="#">Комментарии<span class="preview__cloud"></span><b class="preview__comment-count">0</b></a>
`;

(() => {
  const SERVER_URL = `http://localhost:3000`;
  const socket = io(SERVER_URL);

  socket.on(`connect`, () => {
    console.log(`connection success`); // true

    socket.addEventListener('publication:create', (publication) => {
      const publicationList = document.querySelector(`#publications`);

      if (publicationList) {
        const breadCrumbslist = document.createElement(`ul`);
        breadCrumbslist.classList.add(`preview__breadcrumbs`);

        publication.categories.forEach((category) => {
          const breadCrumbsItem = document.createElement(`li`);
          breadCrumbsItem.classList.add(`preview__breadcrumbs-item`);

          const link = document.createElement(`a`);
          link.classList.add(`preview__breadcrumbs-link`);
          link.textContent = category.name;
          link.setAttribute(`href`, `category/${category.id}`);

          breadCrumbsItem.appendChild(link);
          breadCrumbslist.appendChild(breadCrumbsItem);
        });

        const item = document.createElement(`li`);
        item.classList.add(`preview__item`);
        item.innerHTML = templatePublication(publication);
        item.firstChild.before(breadCrumbslist);
        publicationList.firstChild.before(item);

        publicationList.lastChild.remove();
      }
    });

    socket.addEventListener('comment:create', (comment) => {
      const commentList = document.querySelector(`#comments`);

      if (commentList) {
        const item = document.createElement(`li`);
        item.classList.add(`last__list-item`);
        item.innerHTML = templateComment(comment);
        commentList.firstChild.before(item);

        commentList.lastChild.remove();
      }
    });
  });

  socket.on(`disconnect`, () => {
    console.error(`disconnect socket`)
  })
})();
