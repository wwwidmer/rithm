const api_url = 'http://localhost:5000/'

const api = {
    jokes: {
        dashboard: () =>
          fetch(`${api_url}jokes/`).then(resp => resp.json()),
        random: {},
        vote: {}
    }

}

export default api;
