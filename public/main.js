// USE WITH FIREBASE AUTH
// import ViewDirectorBasedOnUserAuthStatus from './utils/viewDirector';
import 'bootstrap'; // import bootstrap elements and js
import '../styles/main.scss';
import getRequest from '../api/promises';

const htmlStructure = () => {
  document.querySelector('#app').innerHTML = `
  <div id="joke-card">
    <h1 class="title">Joke Generator</h1>
    <p id="joke-body"></p>
    <button class="btn btn-danger" id="get-joke">Get a joke!</button>
  </div>
  `;
};

const renderToDom = (divId, htmlToRender) => {
  const targetedDiv = document.getElementById(divId);
  targetedDiv.innerHTML = htmlToRender;
};

const jokesOnDom = (setup, punchline, phase, divId) => {
  const domString = `<div id="joke-card">
    <h1 class="title">Joke Generator</h1>
    <div id="joke-body">
      <p id="joke-setup">${setup}</p>
      <p id="joke-punchline">${punchline}</>
    </div>
    <button class="btn btn-danger" id="${phase}">Get a joke!</button>
    </div>
</div>
`;
  renderToDom(divId, domString);
};

const events = () => {
  let setup = '';
  let punchline = '';
  let phase = '';
  const app = document.querySelector('#app');
  const getJoke = async () => {
    const joke = await getRequest();
    console.warn(joke);
    setup = joke.setup;
    punchline = joke.delivery;
  };

  app.addEventListener('click', async (e) => {
    if (e.target.id === 'get-joke' || e.target.id === 'punchline-revealed') {
      await getJoke();
      phase = 'setup-revealed';
      jokesOnDom(setup, '', phase, 'app');
      document.querySelector('#setup-revealed').innerHTML = 'Get the punchline!';
    } else if (e.target.id === 'setup-revealed') {
      phase = 'punchline-revealed';
      jokesOnDom(setup, punchline, phase, 'app');
      document.querySelector('#punchline-revealed').innerHTML = 'Get a new joke!';
    }
  });
};

const startApp = () => {
  htmlStructure();
  events(); // ALWAYS LAST
};

startApp();
