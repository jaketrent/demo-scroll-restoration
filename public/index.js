const STORAGE_KEY = 'aside-scroll-position-y'

function main() {
  stupifyBrowser()
  renderAside()

  restoreScrollPosition()
  bindScrollPositionSaving()
}

function stupifyBrowser() {
  // see https://html.spec.whatwg.org/multipage/history.html#scroll-restoration-mode
  window.history.scrollRestoration = 'manual'
}

function bindScrollPositionSaving() {
  const aside = document.querySelector('aside')
  const handleScroll = (evt) => {
    sessionStorage.setItem(STORAGE_KEY, evt.target.scrollTop)
  }
  aside.addEventListener('scroll', handleScroll)
}

function restoreScrollPosition() {
  const aside = document.querySelector('aside')
  const y = sessionStorage.getItem(STORAGE_KEY) || 0
  aside.scrollTo(0, y)
}

function renderAside(count = 300) {
  const aside = document.createElement('aside')
  aside.setAttribute('style', 'background-color: #' + randomColor())

  const ul = document.createElement('ul')
  const frag = document.createDocumentFragment()
  for (let i = 0; i < count; ++i) {
    const li = document.createElement('li')
    li.innerText = 'Item ' + i
    frag.appendChild(li)
  }
  ul.appendChild(frag)

  aside.appendChild(ul)

  document.body.append(aside)
}

function randomColor() {
  return Math.floor(Math.random() * 16777215).toString(16)
}

window.addEventListener('load', main)
