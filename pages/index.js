import React from 'react'
import { create } from 'apisauce'

const api = create({
  baseURL: "http://localhost:3000",
  headers: { 
      Accept: 'application/json',
      'Content-Type': 'application/json' 
  },
  timeout: 60000
});

const fetchData = async () => await api.get('/posts')
  .then(res => ({
    posts: res.data,
  }))
  .catch(() => ({
      posts: [],
    }),
  );

class Index extends React.Component {
  static async getInitialProps(ctx) {
    const res = await fetchData();
    const { posts } = res;
    return { posts }
  }
  render() {
      return <div>{JSON.stringify(this.props.posts)}</div>
  }
}

export default Index