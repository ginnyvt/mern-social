const serverUrl = 'http://localhost:5000';

const create = async (user) => {
  try {
    const res = await fetch(`${serverUrl}/api/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const list = async (signal) => {
  try {
    const res = await fetch(`${serverUrl}/api/users`, {
      method: 'GET',
      signal: signal,
    });

    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const read = async (params, credentials, signal) => {
  try {
    const res = await fetch(`${serverUrl}/api/users/${params.userId}`, {
      method: 'GET',
      signal: signal,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${credentials.token}`,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const update = async (params, credentials, user) => {
  try {
    const res = await fetch(`${serverUrl}/api/users/${params.userId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${credentials.token}`,
      },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const remove = async (params, credentials) => {
  console.log(params.userId);
  console.log(credentials.token);
  try {
    const res = await fetch(`${serverUrl}/api/users/${params.userId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${credentials.token}`,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export { create, list, read, update, remove };
