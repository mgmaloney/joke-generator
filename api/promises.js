const jokeEndpoint = 'https://v2.jokeapi.dev/joke/Programming?safe-mode&type=twopart';

const getRequest = () => new Promise((resolve, reject) => {
  fetch(jokeEndpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// QUESTIONS
// 1. What are the similarities in each of the above functions?
// 2. What does GET do?
// 3. What does POST do?
// 4. What does PATCH do?
// 5. What does DELETE do?
// 6. OPTIONAL: Do you see an opportunity to create a utility function for your promise calls?

export default getRequest;
