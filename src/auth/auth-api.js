const serverUrl = 'http://localhost:5000';

const signin = async (user) => {
  try {
    const res = await fetch(`${serverUrl}/auth/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // credentials: 'include',
      body: JSON.stringify(user),
    });

    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export { signin };
