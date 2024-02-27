const fetchToDo = require('./fetchToDo');
const fetchMock = require('jest-fetch-mock');

// test('the data is freeCodeCamp', async () => {
//   const data = await fetchToDo();
//   expect(data).toEqual({
//     userId: 1,
//     id: 1,
//     title: 'delectus aut autem',
//     completed: false,
//   });
// });

// const fetchToDo = require('./fetchToDo');

describe('fetchToDo', () => {
  it('fetches todo data from API', async () => {
    // Mocking the fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            userId: 1,
            id: 1,
            title: 'delectus aut autem',
            completed: false,
          }),
      })
    );

    // Call the function
    const data = await fetchToDo();

    // Expectations
    expect(data.userId).toBe(1);
    expect(data.id).toBe(1);
    expect(data.title).toBe('delectus aut autem');
    expect(data.completed).toBe(false);

    // Check if fetch was called with the correct URL
    expect(fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/todos/1'
    );
  });

  it('handles errors gracefully', async () => {
    // Mocking the fetch function to simulate an error
    global.fetch = jest.fn(() => Promise.reject('Network Error'));

    // Expect the function to throw an error
    await expect(fetchToDo()).rejects.toEqual('Network Error');

    // Check if fetch was called with the correct URL
    expect(fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/todos/1'
    );
  });
});
