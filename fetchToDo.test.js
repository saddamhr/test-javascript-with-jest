const fetchToDo = require('./fetchToDo');

describe('fetchToDo', () => {
  it('fetches todo data from API', async () => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            userId: 1,
            id: 1,
            title: 'delectus aut autem',
            completed: false,
          }),
      });
    });

    // Call the function
    const data = await fetchToDo();

    // Expectations
    expect(data).toEqual({
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
    });

    // Check if fetch was called with the correct URL
    expect(fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/todos/1'
    );
  });

  it('handles errors gracefully', async () => {
    // Mocking the fetch function to simulate an error
    global.fetch = jest.fn(() => Promise.reject(new Error('Network Error')));

    // Expect the function to throw an error
    await expect(fetchToDo()).rejects.toEqual('Network Error');

    // Check if fetch was called with the correct URL
    expect(fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/todos/1'
    );
  });
});
