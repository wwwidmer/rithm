const api_url = 'http://localhost:5000/'

const api = {
    jokes: {
        dashboard: () =>
          fetch(`${api_url}jokes/`).then(resp => resp.json()),
        random: () =>
          fetch(`${api_url}jokes/random`).then(resp => resp.json()),
        vote: (id, vote) =>
          fetch(`${api_url}jokes/${id}/vote`, {
            method: 'POST',
            body: JSON.stringify({ vote: vote || undefined })
          }).then(resp => resp.json())
    }

}

export default api;
